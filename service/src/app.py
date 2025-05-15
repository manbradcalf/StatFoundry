from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import driver, fetch_schema

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


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5001) 