import os
import sys

# Environment configuration
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Service configuration
BIGRFS_SERVICE_URL = os.getenv("BIGRFS_SERVICE_URL", "localhost:3000")

# Database credentials
URI_ENV_VAR = "NEO4J_BIGRFS_URI"
URI = os.getenv(URI_ENV_VAR) 
PASSWORD_ENV_VAR = "NEO4J_BIGRFS_PASSWORD"
PASSWORD = os.getenv(PASSWORD_ENV_VAR)

# Validate required environment variables
if not URI:
    print(f"ERROR: URI environment variable {URI_ENV_VAR} is not set")
    sys.exit(1)

if not PASSWORD:
    print(
        f"ERROR: PASSWORD environment variable {PASSWORD_ENV_VAR} is not set"
    )
    sys.exit(1)

AUTH = ("neo4j", PASSWORD)

