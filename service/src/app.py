from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.neo4j_client import driver, execute_query, fetch_schema
from src.requests import QueryAuraDBRequest

app = FastAPI()

# Configure CORS
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
    result = execute_query(driver, request.cypher_query)
    return result

@app.get("/api/healthcheck")
async def healthcheck():
    return {"status": "ok"}
