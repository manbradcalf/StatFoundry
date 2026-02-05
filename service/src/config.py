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

# Neo4j environment: "local", "qa", or "prod"
NEO4J_ENV = os.getenv("NEO4J_ENV", "prod")

NEO4J_CONFIG = {
    "local": {
        "uri": "NEO4J_STATFOUNDRY_NFL_LOCAL_URI",
        "password": "NEO4J_STATFOUNDRY_NFL_LOCAL_PASSWORD",
    },
    "qa": {
        "uri": "NEO4J_STATFOUNDRY_NFL_AURA_URI_CLONE_QA_URI",
        "password": "NEO4J_STATFOUNDRY_NFL_AURA_URI_CLONE_QA_PASSWORD",
    },
    "prod": {
        "uri": "NEO4J_STATFOUNDRY_NFL_AURA_URI_CLONE",
        "password": "NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD_CLONE",
    },
}

if NEO4J_ENV not in NEO4J_CONFIG:
    print(f"ERROR: NEO4J_ENV must be one of: {list(NEO4J_CONFIG.keys())}")
    sys.exit(1)

_cfg = NEO4J_CONFIG[NEO4J_ENV]
URI = os.getenv(_cfg["uri"])
PASSWORD = os.getenv(_cfg["password"])

if not URI:
    print(f"ERROR: {_cfg['uri']} not set (NEO4J_ENV={NEO4J_ENV})")
    sys.exit(1)

if not PASSWORD:
    print(f"ERROR: {_cfg['password']} not set (NEO4J_ENV={NEO4J_ENV})")
    sys.exit(1)

AUTH = ("neo4j", PASSWORD)
