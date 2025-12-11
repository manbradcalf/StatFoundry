from fastapi import FastAPI, HTTPException, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from src.neo4j_client import driver, execute_readonly_query, fetch_schema
from src.requests import (
    QueryAuraDBRequest,
    CreateCheckoutSessionRequest,
    CreatePortalSessionRequest,
)
from src.config import ENVIRONMENT
from src.telemetry import add_cypher_telemetry, add_query_result

app = FastAPI()

# Configure CORS only for local development
if ENVIRONMENT.lower() in ["development", "local"]:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get("/api/schema")
async def get_schema():
    schema = fetch_schema(driver)
    return schema


@app.post("/api/query")
async def query(request: QueryAuraDBRequest):
    add_cypher_telemetry(request.cypher_query, "custom")

    try:
        result = execute_readonly_query(driver, request.cypher_query)
        add_query_result(len(result) if result else 0)
        return result
    except ValueError as e:
        add_query_result(0, success=False, error=str(e))
        raise HTTPException(status_code=400, detail="Invalid request parameters")

# Public endpoints (no auth required)
@app.get("/api/healthcheck")
async def healthcheck():
    return {"status": "ok"}

