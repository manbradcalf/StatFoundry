from src.neo4j_client import driver

print("ingest_weekly_playergame called")
# TODO: Update
query = "MATCH (n) RETURN (n) LIMIT 1"
driver.execute_query(query)
