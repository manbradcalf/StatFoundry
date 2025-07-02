import nfl_data_py as nfl
import os
import pandas as pd
import glob

def generate_playergame_dataframe_for_specific_week(season: int, week: int) -> pd.DataFrame:
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
    try:
        weekly_playergames = weekly_playergames[weekly_playergames["week"] == week]
    except:
        print(f"No data for week {week} in season {season}")
        return pd.DataFrame()

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

def generete_player_game_dataframes_for_season(season: int) -> list[pd.DataFrame]: # type: ignore
    """
    Generate player-game dataframes for all weeks in a season.
    """
    for week in range(1, 23):
        df = generate_playergame_dataframe_for_specific_week(season, week)
        yield df

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
    df = generate_playergame_dataframe_for_specific_week(season, week)
    return dataframe_to_cypher_queries(df)

def process_and_generate_weekly_playergame_csvs_by_seasons(seasons:list[int]) -> None:
    """
    Process player-game data and generate Cypher queries.
    """ 
    for season in seasons:
        for week in range(1, 23):
            df = generate_playergame_dataframe_for_specific_week(season, week)
            df.to_csv(f"csvs/playergames/weeks/{season}_{week}_playergames.csv", index=False)

def concat_csvs_of_playergame_weeks_into_season_csv(season:int) -> None:
    """
    Concatenate all playergame csvs for a season.
    """
    df = pd.DataFrame()
    for week in range(1, 23):
        df = pd.concat([df, pd.read_csv(f"csvs/playergames/weeks/{season}_{week}_playergames.csv")])
    df.to_csv(f"csvs/playergames/seasons/{season}_playergames.csv", index=False)

def concat_all_season_csvs_into_one():
    """
    Concatenate all season CSVs in the seasons directory into one large CSV file.
    """
    # Get all CSV files in the seasons directory
    csv_files = glob.glob('csvs/playergames/seasons/*_playergames.csv')
    
    # Sort the files to ensure consistent ordering
    csv_files.sort()
    
    # Read and concatenate all CSVs
    print(f"Found {len(csv_files)} CSV files to concatenate")
    dfs = []
    for file in csv_files:
        print(f"Reading {file}...")
        df = pd.read_csv(file)
        dfs.append(df)
    
    print("Concatenating all dataframes...")
    merged_df = pd.concat(dfs, ignore_index=True)
    
    # Save the merged result
    output_path = 'csvs/playergames/all_player_games.csv'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    print(f"Saving to {output_path}...")
    merged_df.to_csv(output_path, index=False)
    print("Done!")
    return merged_df


