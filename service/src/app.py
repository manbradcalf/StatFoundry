from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.neo4j_client import driver, fetch_schema

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