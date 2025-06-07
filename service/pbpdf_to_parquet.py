from pathlib import Path
import pandas as pd
from typing import Dict

def map_pbp_to_parquet(pbp_df: pd.DataFrame, output_dir: Path) -> Dict[str, Path]:
    """
    Maps play-by-play dataframe to parquet files organized by game_id
    
    Args:
        pbp_df: DataFrame containing play-by-play data
        output_dir: Directory to write parquet files to
        
    Returns:
        Dict mapping game_ids to parquet file paths
    """
    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Group by game_id and write each game to separate parquet file
    game_files = {}
    for game_id, game_df in pbp_df.groupby('game_id'):
        file_path = output_dir / f'{game_id}.parquet'
        game_df.to_parquet(file_path)
        game_files[game_id] = file_path
        
    return game_files

def read_game_parquet(game_id: str, data_dir: Path) -> pd.DataFrame:
    """
    Reads parquet file for a specific game_id
    
    Args:
        game_id: ID of game to read
        data_dir: Directory containing parquet files
        
    Returns:
        DataFrame containing play-by-play data for specified game
    """
    file_path = data_dir / f'{game_id}.parquet'
    if not file_path.exists():
        raise FileNotFoundError(f'No parquet file found for game_id {game_id}')
        
    return pd.read_parquet(file_path)

def generate_play_cypher(game_df: pd.DataFrame) -> str:
    """
    Generates Cypher query to create Play nodes from play-by-play parquet data
    
    Args:
        game_df: DataFrame containing play-by-play data for a single game
        
    Returns:
        Cypher query string to create Play nodes
    """
    # Build list of play properties to include
    play_props = [
        'play_id', 'game_id', 'drive', 'quarter', 'down', 'time', 
        'yards_to_go', 'play_type', 'yards_gained', 'description',
        'play_clock', 'game_clock', 'start_time', 'time_of_day',
        'play_count_game', 'play_count_drive'
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
    plays = game_df[play_props].where(pd.notnull(game_df), None).to_dict('records')
    
    return cypher, {'plays': plays}
