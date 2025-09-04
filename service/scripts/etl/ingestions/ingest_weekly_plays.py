from src.neo4j_client import driver

print("ingest_weekly_plays called")
# TODO: Update
query = "MERGE (n:TestNode {name:'This is a test node'}) RETURN (n) LIMIT 1"
driver.execute_query(query)
