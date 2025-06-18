# Add this Pydantic model
from openai import BaseModel


class QueryAuraDBRequest(BaseModel):
    cypher_query: str