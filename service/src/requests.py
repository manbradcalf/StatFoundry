# Add this Pydantic model
from pydantic import BaseModel


class QueryAuraDBRequest(BaseModel):
    cypher_query: str

