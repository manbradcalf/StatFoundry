from src.neo4j_client import driver
from scripts.etl.player_game_etl_tools import map_stats_player_week

pgs = map_stats_player_week(1, 2025)


query = """
    MATCH (n) RETURN n LIMIT 1
    """

driver.execute_query(query)
