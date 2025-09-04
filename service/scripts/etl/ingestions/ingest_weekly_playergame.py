from src.neo4j_client import driver

print("ingest_weekly_playergame called")
# TODO:
print("Downloading stats_player_week_2025.csv")
# TODO:
print("Creating player_game_id column from gsis_id + game_id")
# TODO:
print("Transforming CSV Data for Cypher script (ints to bools, etc)")
# TODO:
print("Running Cypher ingestion script")

query = """
    MATCH (n) RETURN n LIMIT 1
    """

driver.execute_query(query)
