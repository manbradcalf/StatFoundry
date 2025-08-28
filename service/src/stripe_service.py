from typing import Any, Dict, Optional

import stripe

from src.config import (
    ENVIRONMENT,
    STRIPE_PRICE_ID_PRO,
    STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET,
)

# Initialize Stripe
if STRIPE_SECRET_KEY:
    stripe.api_key = STRIPE_SECRET_KEY


class StripeService:
    @staticmethod
    def create_checkout_session(
        customer_email: str, user_id: str, success_url: str, cancel_url: str
    ) -> Dict[str, Any]:
        """
        Create a Stripe checkout session for Pro subscription
        """
        try:
            # Add session_id parameter to success URL for verification
            success_url_with_session = (
                f"{success_url}?session_id={{CHECKOUT_SESSION_ID}}"
            )

            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price": STRIPE_PRICE_ID_PRO,
                        "quantity": 1,
                    }
                ],
                mode="subscription",
                success_url=success_url_with_session,
                cancel_url=cancel_url,
                customer_email=customer_email,
                metadata={"user_id": user_id, "product_type": "pro_subscription"},
                allow_promotion_codes=True,
                billing_address_collection="auto",
                automatic_tax={"enabled": True}
                if ENVIRONMENT == "production"
                else None,
            )

            return {"checkout_url": session.url, "session_id": session.id}

        except stripe.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")

    @staticmethod
    def create_customer_portal_session(
        customer_id: str, return_url: str
    ) -> Dict[str, str]:
        """
        Create a Stripe customer portal session for subscription management
        """
        try:
            session = stripe.billing_portal.Session.create(
                customer=customer_id,
                return_url=return_url,
            )

            return {"portal_url": session.url}

        except stripe.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")

    @staticmethod
    def get_subscription(subscription_id: str) -> Optional[Dict[str, Any]]:
        """
        Get subscription details from Stripe
        """
        try:
            subscription = stripe.Subscription.retrieve(subscription_id)

            # Safely extract price_id
            price_id = None
            try:
                if hasattr(subscription, "items") and subscription.items.data:
                    price_id = subscription.items.data[0].price.id
            except (AttributeError, IndexError):
                pass  # Skip price_id if we can't access it safely

            return {
                "id": subscription.id,
                "status": subscription.status,
                "current_period_end": subscription.current_period_end,
                "customer_id": subscription.customer,
                "price_id": price_id,
            }
        except stripe.error.StripeError as e:
            print(f"Error retrieving subscription: {str(e)}")
            return None

    @staticmethod
    def verify_checkout_session(session_id: str) -> Dict[str, Any]:
        """
        Verify checkout session and return subscription data
        """
        try:
            # Retrieve the checkout session
            session = stripe.checkout.Session.retrieve(session_id)

            if session.payment_status != "paid":
                raise Exception(
                    f"Payment not completed. Status: {session.payment_status}"
                )

            # Get the subscription if it exists
            subscription_data = None
            if session.subscription:
                subscription = stripe.Subscription.retrieve(session.subscription)
                subscription_data = {
                    "id": subscription.id,
                    "status": subscription.status,
                    "customer_id": subscription.customer,
                }

                # Add current_period_end if it exists
                if hasattr(subscription, "current_period_end"):
                    subscription_data["current_period_end"] = (
                        subscription.current_period_end
                    )

                # Add price_id if items exist
                try:
                    if hasattr(subscription, "items"):
                        items = subscription.items
                        if hasattr(items, "data") and len(items.data) > 0:
                            subscription_data["price_id"] = items.data[0].price.id
                        elif hasattr(items, "list"):
                            items_list = items.list()
                            if len(items_list.data) > 0:
                                subscription_data["price_id"] = items_list.data[
                                    0
                                ].price.id
                except Exception:
                    pass  # Skip price_id if we can't access it

            # Extract Firebase user ID from metadata
            firebase_user_id = session.metadata.get("user_id")
            if not firebase_user_id:
                raise Exception("No user_id found in session metadata")

            return {
                "session_id": session.id,
                "payment_status": session.payment_status,
                "firebase_user_id": firebase_user_id,
                "customer_id": session.customer,
                "subscription": subscription_data,
                "is_pro": subscription_data["status"] in ["active", "trialing"]
                if subscription_data
                else False,
            }

        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")

    @staticmethod
    def construct_webhook_event(payload: bytes, sig_header: str):
        """
        Construct and verify Stripe webhook event
        """
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, STRIPE_WEBHOOK_SECRET
            )
            return event
        except ValueError:
            raise Exception("Invalid payload")
        except stripe.error.SignatureVerificationError:
            raise Exception("Invalid signature")

    @staticmethod
    def handle_subscription_event(
        event_type: str, subscription_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Process subscription webhook events and return Firebase update data
        """
        user_id = subscription_data.get("metadata", {}).get("user_id")

        if not user_id:
            raise Exception("No user_id found in subscription metadata")

        subscription_status = subscription_data.get("status")

        # Map Stripe subscription statuses to our Pro status
        is_pro = subscription_status in ["active", "trialing"]

        return {
            "user_id": user_id,
            "is_pro": is_pro,
            "stripe_subscription_id": subscription_data.get("id"),
            "stripe_customer_id": subscription_data.get("customer"),
            "subscription_status": subscription_status,
            "current_period_end": subscription_data.get("current_period_end"),
        }

    @staticmethod
    def get_subscription_status_by_firebase_uid(firebase_uid: str) -> Dict[str, Any]:
        """
        Get subscription status by Firebase UID using Stripe customer search
        """
        try:
            # Search for customer by Firebase UID in metadata
            customers = stripe.Customer.search(
                query=f'metadata["user_id"]:"{firebase_uid}"'
            )

            if not customers.data:
                return {
                    "is_pro": False,
                    "subscription": None,
                    "customer_id": None,
                    "firebase_uid": firebase_uid,
                }

            customer = customers.data[0]

            # Get active subscriptions for this customer
            subscriptions = stripe.Subscription.list(
                customer=customer.id, status="active", limit=1
            )

            # Also check for trialing subscriptions
            trialing_subscriptions = stripe.Subscription.list(
                customer=customer.id, status="trialing", limit=1
            )

            # Combine active and trialing subscriptions
            all_valid_subs = list(subscriptions.data) + list(
                trialing_subscriptions.data
            )

            if not all_valid_subs:
                return {
                    "is_pro": False,
                    "subscription": None,
                    "customer_id": customer.id,
                    "firebase_uid": firebase_uid,
                }

            subscription = all_valid_subs[0]  # Take the first valid subscription

            return {
                "is_pro": True,
                "subscription": {
                    "id": subscription.id,
                    "status": subscription.status,
                    "customer_id": subscription.customer,
                    "current_period_end": getattr(
                        subscription, "current_period_end", None
                    ),
                    "price_id": subscription.items.data[0].price.id
                    if hasattr(subscription, "items") and subscription.items.data
                    else None,
                },
                "customer_id": customer.id,
                "firebase_uid": firebase_uid,
            }

        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")
