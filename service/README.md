# StatFoundry Service

FastAPI backend service for StatFoundry.

## Setup

1. Install Python 3.11.9:

   ```bash
   pyenv install 3.11.9
   pyenv local 3.11.9
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   export ENVIRONMENT="development"
   export NEO4J_STATFOUNDRY_NFL_AURA_URI_CLONE="neo4j+s://your-aura-instance"
   export NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD_CLONE="your-password"
   # For local Neo4j:
   # export ENVIRONMENT="local"
   # export NEO4J_STATFOUNDRY_LOCAL_URI="bolt://localhost:7687"
   ```

## Development

Run the service in development mode:

```bash
uvicorn src.app:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once the service is running, visit:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
