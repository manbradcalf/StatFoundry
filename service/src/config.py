import os

# Demo database credentials
URI = os.getenv("NEO4J_FOOTBALLSTATS_URI")  # footballstats db
AUTH = (
    os.getenv("NEO4J_FOOTBALLSTATS_USERNAME"),
    os.getenv("NEO4J_FOOTBALLSTATS_PASSWORD"),
)