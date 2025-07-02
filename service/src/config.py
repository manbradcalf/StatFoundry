import os

# Demo database credentials
URI = os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_URI")  # MSS > StatFoundry > StatFoundry-NFL instance 
AUTH = (
   "neo4j", 
    os.getenv("NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD"),
)
