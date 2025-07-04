import os
import sys

# Environment configuration
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Service configuration
STATFOUNDRY_SERVICE_URL = os.getenv("STATFOUNDRY_SERVICE_URL", "localhost:3000")

# Database credentials
URI = os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_URI")
PASSWORD = os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD")

# Validate required environment variables
if not URI:
    print("ERROR: NEO4J_STATFOUNDRY_NFL_AURA_URI environment variable is not set")
    sys.exit(1)

if not PASSWORD:
    print("ERROR: NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD environment variable is not set")
    sys.exit(1)

AUTH = ("neo4j", PASSWORD)
