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
   export NEO4J_FOOTBALLSTATS_URI="bolt://localhost:7687"
   export NEO4J_FOOTBALLSTATS_USERNAME="neo4j"
   export NEO4J_FOOTBALLSTATS_PASSWORD="your-password"
   ```

## Development

Run the service in development mode:

```bash
uvicorn src.service:app --reload
```

The API will be available at http://localhost:5001

## API Documentation

Once the service is running, visit:

- Swagger UI: http://localhost:5001/docs
- ReDoc: http://localhost:5001/redoc
