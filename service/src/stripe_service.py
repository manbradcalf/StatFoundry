import stripe
from typing import Dict, Any, Optional
from src.config import (
    STRIPE_SECRET_KEY,
    STRIPE_PRICE_ID_PRO,
    STRIPE_WEBHOOK_SECRET,
    ENVIRONMENT,
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
            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[
                    {
                        "price": STRIPE_PRICE_ID_PRO,
                        "quantity": 1,
                    }
                ],
                mode="subscription",
                success_url=success_url,
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

        except stripe.error.StripeError as e:
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

        except stripe.error.StripeError as e:
            raise Exception(f"Stripe error: {str(e)}")

    @staticmethod
    def get_subscription(subscription_id: str) -> Optional[Dict[str, Any]]:
        """
        Get subscription details from Stripe
        """
        try:
            subscription = stripe.Subscription.retrieve(subscription_id)
            return {
                "id": subscription.id,
                "status": subscription.status,
                "current_period_end": subscription.current_period_end,
                "customer_id": subscription.customer,
                "price_id": subscription["items"]["data"][0]["price"]["id"],
            }
        except stripe.error.StripeError as e:
            print(f"Error retrieving subscription: {str(e)}")
            return None

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
        except ValueError as e:
            raise Exception("Invalid payload")
        except stripe.error.SignatureVerificationError as e:
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
