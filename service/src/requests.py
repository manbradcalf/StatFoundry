from pydantic import BaseModel
from typing import Optional, Dict, Any


class CreateCheckoutSessionRequest(BaseModel):
    """Request model for creating a Stripe checkout session"""

    user_email: str
    user_id: str
    success_url: Optional[str] = None
    cancel_url: Optional[str] = None


class CreatePortalSessionRequest(BaseModel):
    """Request model for creating a Stripe customer portal session"""

    customer_id: str
    return_url: Optional[str] = None

class QueryAuraDBRequest(BaseModel):
    cypher_query: str
