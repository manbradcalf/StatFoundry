from pathlib import Path
import pandas as pd
from typing import Dict


def generate_insert_plays_cypher_from_game_df(game_df: pd.DataFrame) -> str:
    """
    Generates Cypher query to create Play nodes from play-by-play parquet data

    Args:
        game_df: DataFrame containing play-by-play data for a single game

    Returns:
        Cypher query string to create Play nodes
    """
    # Build list of play properties to include
    play_props = [
        "play_id",
        "game_id",
        "drive",
        "quarter",
        "down",
        "time",
        "yards_to_go",
        "play_type",
        "yards_gained",
        "description",
        "play_clock",
        "game_clock",
        "start_time",
        "time_of_day",
        "play_count_game",
        "play_count_drive",
    ]

    # Start Cypher query
    cypher = """
    UNWIND $plays as play
    MERGE (p:NFLPlay {play_id: play.play_id, game_id: play.game_id})
    SET p += {
        drive: play.drive,
        quarter: play.quarter,
        down: play.down,
        time: play.time,
        yardsToGo: play.yards_to_go,
        playType: play.play_type,
        yardsGained: play.yards_gained,
        description: play.description,
        playClock: play.play_clock,
        gameClock: play.game_clock,
        startTime: play.start_time,
        timeOfDay: play.time_of_day,
        playCountGame: play.play_count_game,
        playCountDrive: play.play_count_drive
    }
    WITH p, playj
    MERGE (d:Drive {drive_id: play.drive, game_id: play.game_id})
    MERGE (p)-[:OF]->(d)
    """

    # Convert DataFrame to list of dictionaries for Neo4j parameters

    plays = game_df[play_props].where(pd.notnull(game_df), None).to_dict("records")

    return cypher, {"plays": plays}
