import nfl_data_py as nfl
import os
import pandas as pd


def generate_playergame_dataframe(season: int, week: int) -> pd.DataFrame:
    """
    Create "merged" dataframe of player stats and game data for one week/season.
    In reality, we just create and append the playergame_id to the player-game dataframe.

    Args:
        season: NFL season year (e.g. 2023)
        week: Week number of the season

    Returns:
        DataFrame containing player-game stats with game context
    """
    weekly_playergames = nfl.import_weekly_data([season])
    weekly_playergames = weekly_playergames[weekly_playergames["week"] == week]

    games = nfl.import_schedules([season])
    games = games[games["week"] == week]

    # Create game lookup dictionary
    game_lookup = {}
    for _, game in games.iterrows():
        game_lookup[game['home_team']] = game['game_id']
        game_lookup[game['away_team']] = game['game_id']

    # Use lookup instead of filtering each time
    weekly_playergames['game_id'] = weekly_playergames['recent_team'].map(game_lookup)
    weekly_playergames = weekly_playergames.dropna(subset=["game_id"])

    # now that we have the game id, we can create and append the playergame_id
    weekly_playergames["player_game_id"] = (
        weekly_playergames["player_id"].astype(str)
        + "_"
        + weekly_playergames["game_id"].astype(str)
    )
    return weekly_playergames


def dataframe_to_cypher_queries(df: pd.DataFrame) -> list[str]:
    """
    Convert player-game DataFrame to Cypher queries following the StatFoundry schema.
    
    Args:
        df: DataFrame containing player-game data
        
    Returns:
        List of Cypher queries for creating nodes and relationships
    """
    queries = []
    
    # Get unique season and week
    season = df['season'].iloc[0]
    week = df['week'].iloc[0]
    
    # Create Season and Week
    season_week_query = """
    MERGE (s:Season {season_id: $season})
    MERGE (w:NFLWeek {week: $week})
    MERGE (w)-[:OF]->(s)
    """
    queries.append((season_week_query, {'season': season, 'week': week}))
    
    # Create all unique games at once
    unique_games = df[['game_id']].drop_duplicates()
    games_query = """
    UNWIND $games as game
    MERGE (g:NFLGame {game_id: game})
    WITH g
    MATCH (w:NFLWeek {week: $week})
    MERGE (g)-[:OF]->(w)
    """
    queries.append((games_query, {
        'games': unique_games['game_id'].tolist(),
        'week': week
    }))
    
    # Then process each player-game
    df_cols = [col for col in df.columns if not col in ['season', 'week']]
    for _, row in df.iterrows():
        # Create/merge Player nodes
        player_query = """
        MERGE (p:Player {gsis_id: $player_id})
        SET p.position = $position,
            p.display_name = $player_name
        """
        
        # Create PlayerGame and relationships
        properties = {col: row.get(col, 0) for col in df_cols}

        player_game_query = """
        MATCH (p:Player {gsis_id: $player_id})
        MATCH (g:NFLGame {game_id: $game_id})
        MERGE (pg:PlayerGame {playergame_id: $playergame_id})
        MERGE (p)-[:MADE]->(pg)
        MERGE (pg)-[:OF]->(g)
        SET pg += $pg_props
        """
        
        # Add queries with their parameters
        queries.extend([
            (player_query, {
                'player_id': row['player_id'],
                'position': row['position'],
                'player_name': row['player_name']
            }),
            (player_game_query, {
                'player_id': row['player_id'],
                'game_id': row['game_id'],
                'playergame_id': row['player_game_id'],
                'properties': properties
            })
        ])
    
    return queries

# Example usage:
def process_and_generate_queries(season: int, week: int) -> list[str]:
    """
    Process player-game data and generate Cypher queries.
    
    Args:
        season: NFL season year (e.g. 2023)
        week: Week number of the season
        
    Returns:
        List of Cypher queries
    """
    df = generate_playergame_dataframe(season, week)
    return dataframe_to_cypher_queries(df)
