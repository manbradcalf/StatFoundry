import nfl_data_py as nfl
import os
import pandas as pd

def generate_and_append_playergameids_by_week(season: int, week: int) -> pd.DataFrame:
    """
    Create merged dataframe of player stats and game data for one week/season.
    
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

    # find the game_id for each playergame, taking into account the home vs away team
    def find_game_id(playergame_row):
        """Matches a player's performance with the corresponding game_id."""
        matching_games = games[
            (games["home_team"] == playergame_row["recent_team"]) | 
            (games["away_team"] == playergame_row["recent_team"])
        ]
        return matching_games["game_id"].iloc[0] if len(matching_games) > 0 else None

    # append the game_id to the playergame dataframe
    weekly_playergames["game_id"] = weekly_playergames.apply(find_game_id, axis=1)
    weekly_playergames = weekly_playergames.dropna(subset=["game_id"])
    
    # now that we have the game id, we can create and append the playergame_id
    weekly_playergames["player_game_id"] = (
        weekly_playergames["player_id"].astype(str) + "_" + weekly_playergames["game_id"].astype(str)
    )
    return weekly_playergames

def generate_player_game_parquets(seasons: range, weeks: range) -> pd.DataFrame:
    """
    Generate player-game parquet files for specified seasons and weeks.
    
    Args:
        seasons: Range of seasons to process
        weeks: Range of weeks to process
        
    Returns:
        Combined DataFrame of all processed player-game data
    """
    os.makedirs("data", exist_ok=True)
    all_playergames = []
    
    for season in seasons:
        for week in weeks:
            df = generate_and_append_playergameids_by_week(season, week)
            if len(df) > 0:
                output_file = f"data/player_game_data_{season}_{week}.parquet"
                df.to_parquet(output_file)
                all_playergames.append(df)
    
    return pd.concat(all_playergames, ignore_index=True) if all_playergames else pd.DataFrame()
