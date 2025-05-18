import os

# Demo database credentials
URI = os.getenv("NEO4J_FOOTBALLSTATS_URI")  # footballstats db
AUTH = (
    os.getenv("NEO4J_FOOTBALLSTATS_USERNAME"),
    os.getenv("NEO4J_FOOTBALLSTATS_PASSWORD"),
)

print(os.getenv("STATFOUNDRY_ENV"))
if os.getenv("STATFOUNDRY_ENV") == "Prod":
    PORT = 80
else:
    PORT = 5001

__all__ = ["PORT"]
