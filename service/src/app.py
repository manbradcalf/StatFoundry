from fastapi import FastAPI, HTTPException, Request, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.neo4j_client import driver, execute_query, fetch_schema
from src.requests import QueryAuraDBRequest
from src.models import CreateCheckoutSessionRequest, CreatePortalSessionRequest
from src.stripe_service import StripeService
from src.config import ENVIRONMENT, STRIPE_SECRET_KEY

app = FastAPI()
security = HTTPBearer()

# Configure CORS only for local development
if ENVIRONMENT.lower() in ["development", "local"]:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.get("/api/schema")
async def get_schema():
    schema = fetch_schema(driver)
    return schema


@app.post("/api/query")
async def query(request: QueryAuraDBRequest):
    try:
        result = execute_query(driver, request.cypher_query)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid request parameters")


@app.get("/api/player/{gsis_id}")
async def get_player(gsis_id: str):
    try:
        cypher_query = f'MATCH (p:Player {{gsis_id: "{gsis_id}"}}) RETURN p'
        result = execute_query(driver, cypher_query)
        if not result:
            raise HTTPException(status_code=404, detail="Player not found")
        return result if result else None
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid request parameters")


@app.get("/api/player/{gsis_id}/games")
async def get_playergames(gsis_id: str):
    try:
        cypher_query = f'MATCH (p:Player) WHERE p.gsis_id="{gsis_id}" WITH p MATCH (p)-[:HAD]-(pg:PlayerGame) RETURN pg'
        result = execute_query(driver, cypher_query)
        if not result:
            print(cypher_query)
            print(result)
            raise HTTPException(status_code=404, detail="Player Games not found")
        return result if result else None
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid request parameters")


@app.get("/api/player/{gsis_id}/seasons")
async def get_playerseasons(gsis_id: str):
    try:
        cypher_query = f'MATCH (p:Player {{gsis_id: "{gsis_id}"}})-[:HAD]-(ps:PlayerSeason) RETURN ps'
        result = execute_query(driver, cypher_query)
        if not result:
            raise HTTPException(status_code=404, detail="Player Seasons not found")
        return result if result else None
    except ValueError as e:
        raise HTTPException(status_code=400, detail="Invalid request parameters")

def require_scope(required_scope: str):
    """Decorator to require specific scope"""
    def scope_checker(user_info: dict = Depends(validate_api_key)):
        if required_scope not in user_info["scopes"]:
            raise HTTPException(
                status_code=403,
                detail=f"Insufficient permissions. Required scope: {required_scope}"
            )
        return user_info
    return scope_checker

# Public endpoints (no auth required)
@app.get("/api/healthcheck")
async def healthcheck():
    return {"status": "ok"}

# Stripe API Endpoints
@app.post("/api/stripe/create-checkout-session")
async def create_checkout_session(request: CreateCheckoutSessionRequest):
    """
    Create a Stripe checkout session for Pro subscription
    """
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    try:
        # Use default URLs if not provided
        success_url = request.success_url or "http://localhost:3000/payment/success"
        cancel_url = request.cancel_url or "http://localhost:3000/payment/cancel"
        
        result = StripeService.create_checkout_session(
            customer_email=request.user_email,
            user_id=request.user_id,
            success_url=success_url,
            cancel_url=cancel_url
        )
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=400, detail="Request processing failed")


@app.post("/api/stripe/create-portal-session")
async def create_portal_session(request: CreatePortalSessionRequest):
    """
    Create a Stripe customer portal session for subscription management
    """
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
        
    try:
        return_url = request.return_url or "http://localhost:3000/account"
        
        result = StripeService.create_customer_portal_session(
            customer_id=request.customer_id,
            return_url=return_url
        )
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=400, detail="Request processing failed")


@app.get("/api/stripe/subscription-status/{firebase_uid}")
async def get_subscription_status(firebase_uid: str):
    """
    Get subscription status by Firebase UID - queries Stripe directly
    """
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    try:
        subscription_data = StripeService.get_subscription_status_by_firebase_uid(firebase_uid)
        return subscription_data
        
    except Exception as e:
        raise HTTPException(status_code=400, detail="Request processing failed")


@app.get("/api/stripe/verify-session/{session_id}")
async def verify_stripe_session(session_id: str):
    """
    Verify Stripe checkout session and return subscription data for frontend sync
    """
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    try:
        # Retrieve session from Stripe
        session_data = StripeService.verify_checkout_session(session_id)
        return session_data
        
    except Exception as e:
        raise HTTPException(status_code=400, detail="Request processing failed")


@app.post("/api/stripe/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None, alias="stripe-signature")):
    """
    Handle Stripe webhook events for subscription updates
    """
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
        
    try:
        # Get the raw body for signature verification
        payload = await request.body()
        
        # Construct the event with signature verification
        event = StripeService.construct_webhook_event(payload, stripe_signature)
        
        # Handle subscription-related events
        if event['type'] in [
            'customer.subscription.created',
            'customer.subscription.updated',
            'customer.subscription.deleted',
            'invoice.payment_succeeded',
            'invoice.payment_failed'
        ]:
            subscription_data = event['data']['object']
            
            # Process the subscription event
            firebase_update = StripeService.handle_subscription_event(
                event['type'], 
                subscription_data
            )
            
            # Subscription data is now stored with Stripe using firebase_uid metadata
            print(f"Webhook processed: {event['type']} for user {firebase_update['user_id']}")
            print(f"Firebase update data: {firebase_update}")
            
            return {"status": "success", "processed": event['type']}
        else:
            # Event type we don't handle
            print(f"Unhandled webhook event type: {event['type']}")
            return {"status": "ignored", "event_type": event['type']}
            
    except Exception as e:
        print(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")