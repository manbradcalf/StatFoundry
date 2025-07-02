import os

# Demo database credentials
URI = os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_URI")  # MSS > StatFoundry > StatFoundry-NFL instance 
AUTH = (
   "neo4j", 
    os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD"),
)

# API Keys for partner access
VALID_API_KEYS = {
    os.getenv("STATFOUNDRY_ADMIN_API_KEY", "admin-dev-key-123"): {
        "name": "Admin",
        "scopes": ["admin", "query", "schema"],
        "rate_limit": None
    },
    os.getenv("STATFOUNDRY_PARTNER_API_KEY", "partner-dev-key-456"): {
        "name": "Partner Access",
        "scopes": ["query"],
        "rate_limit": 100  # requests per hour
    }
}
