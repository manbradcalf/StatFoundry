import os
import sys

# Environment configuration
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Service configuration
STATFOUNDRY_SERVICE_URL = os.getenv("STATFOUNDRY_SERVICE_URL", "localhost:3000")

# Stripe configuration
if ENVIRONMENT == "production":
    STRIPE_SECRET_KEY = os.getenv("STRIPE_LIVE_SK")
    STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_LIVE_PK")
else:
    STRIPE_SECRET_KEY = os.getenv("STRIPE_TEST_SK")
    STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_TEST_PK")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
STRIPE_PRICE_ID_PRO = os.getenv("STRIPE_PRICE_ID_PRO")

# Database credentials
URI = os.getenv("NEO4J_STATFOUNDRY_LOCAL_URI") if ENVIRONMENT == "local" else os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_URI_CLONE")
PASSWORD = os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD_CLONE")

# Validate required environment variables
if not URI:
    print("ERROR: NEO4J_STATFOUNDRY_NFL_AURA_URI_CLONE environment variable is not set")
    sys.exit(1)

if not PASSWORD:
    print(
        "ERROR: NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD_CLONE environment variable is not set"
    )
    sys.exit(1)

AUTH = ("neo4j", PASSWORD)

