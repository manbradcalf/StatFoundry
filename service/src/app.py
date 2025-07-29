from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.neo4j_client import driver, execute_query, fetch_schema
from src.requests import QueryAuraDBRequest
from src.config import ENVIRONMENT

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
    try:
        result = execute_query(driver, request.cypher_query)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/player/{gsis_id}")
async def get_player(gsis_id: str):
    try:
        cypher_query = f'MATCH (p:Player {{gsis_id: "{gsis_id}"}}) RETURN p'
        result = execute_query(driver, cypher_query)
        if not result:
            raise HTTPException(status_code=404, detail="Player not found")
        return result if result else None
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/player/{gsis_id}/games")
async def get_playergames(gsis_id: str):
    try:
        cypher_query = f'MATCH (p:Player) WHERE p.gsis_id="{gsis_id}" WITH p MATCH (p)-[:HAD]-(pg:PlayerGame) RETURN pg'
        result = execute_query(driver, cypher_query)
        if not result:
            print(cypher_query)
            print(result)
            raise HTTPException(status_code=404, detail="Player Games not found")
        return result if result else None
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/player/{gsis_id}/seasons")
async def get_playerseasons(gsis_id: str):
    try:
        cypher_query = f'MATCH (p:Player {{gsis_id: "{gsis_id}"}})-[:HAD]-(ps:PlayerSeason) RETURN ps'
        result = execute_query(driver, cypher_query)
        if not result:
            raise HTTPException(status_code=404, detail="Player Seasons not found")
        return result if result else None
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/healthcheck")
async def healthcheck():
    return {"status": "ok"}
