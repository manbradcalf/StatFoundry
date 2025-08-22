import os
import sys

# Environment configuration
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Service configuration
STATFOUNDRY_SERVICE_URL = os.getenv("STATFOUNDRY_SERVICE_URL", "localhost:3000")

# Stripe configuration
STRIPE_SECRET_KEY = os.getenv("STRIPE_TEST_SK")
STRIPE_PUBLISHABLE_KEY = os.getenv("STRIPE_TEST_PK")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")
STRIPE_PRICE_ID_PRO = os.getenv("STRIPE_PRICE_ID_PRO")

# Database credentials
URI = os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_URI_CLONE")
PASSWORD = os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD_CLONE")

# Validate required environment variables
if not URI:
    print("ERROR: NEO4J_STATFOUNDRY_NFL_AURA_URI environment variable is not set")
    sys.exit(1)

if not PASSWORD:
    print("ERROR: NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD environment variable is not set")
    sys.exit(1)

AUTH = ("neo4j", PASSWORD)

# Debug logging for Stripe configuration
print("=== STRIPE CONFIGURATION DEBUG ===")
print(f"STRIPE_SECRET_KEY: {'SET' if STRIPE_SECRET_KEY else 'NOT SET'}")
print(f"STRIPE_PUBLISHABLE_KEY: {'SET' if STRIPE_PUBLISHABLE_KEY else 'NOT SET'}")
print(f"STRIPE_WEBHOOK_SECRET: {'SET' if STRIPE_WEBHOOK_SECRET else 'NOT SET'}")
print(f"STRIPE_PRICE_ID_PRO: {'SET' if STRIPE_PRICE_ID_PRO else 'NOT SET'}")
if STRIPE_SECRET_KEY:
    print(f"STRIPE_SECRET_KEY starts with: {STRIPE_SECRET_KEY[:15]}...")
if STRIPE_PUBLISHABLE_KEY:
    print(f"STRIPE_PUBLISHABLE_KEY starts with: {STRIPE_PUBLISHABLE_KEY[:15]}...")
print("=== END STRIPE DEBUG ===")
print()
