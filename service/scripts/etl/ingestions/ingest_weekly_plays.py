from src.neo4j_client import driver

print("ingest_weekly_pbp called")
# TODO:
print("Downloading play_by_play_2025.csv")
# TODO:
print("Creating id column from game_id + play_id")
# TODO:
print("Transforming CSV Data for Cypher script (ints to bools, etc)")
# TODO:
print("Running Cypher ingestion script")


query = """
    MATCH (n) RETURN (n) RETURN n LIMIT 1
    """

driver.execute_query(query)
