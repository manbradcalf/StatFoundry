from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from src.neo4j_client import driver, execute_query, fetch_schema
from src.requests import QueryAuraDBRequest
from src.config import VALID_API_KEYS

app = FastAPI()
security = HTTPBearer()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def validate_api_key(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Validate API key and return user info"""
    api_key = credentials.credentials
    
    if api_key not in VALID_API_KEYS:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )
    
    return VALID_API_KEYS[api_key]

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

# Protected endpoints
@app.get("/api/schema")
async def get_schema(user_info: dict = Depends(require_scope("schema"))):
    schema = fetch_schema(driver)
    return {"schema": schema, "accessed_by": user_info["name"]}

@app.post("/api/query")
async def query(request: QueryAuraDBRequest, user_info: dict = Depends(require_scope("query"))):
    result = execute_query(driver, request.cypher_query)
    return {
        "result": result, 
        "accessed_by": user_info["name"],
        "query": request.cypher_query
    }

# Partner-specific endpoints (for ESX, etc.)
@app.get("/api/partner/info")
async def partner_info(user_info: dict = Depends(validate_api_key)):
    return {
        "partner": user_info["name"],
        "scopes": user_info["scopes"],
        "rate_limit": user_info["rate_limit"]
    }
