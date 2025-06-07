import nfl_data_py as nfl
import os
import pandas as pd
import argparse


def generate_pqs_of_playergames_by_season_and_week(season: range, week: range):
    """
    Ingest player-game data for multiple seasons and weeks, saving each to a parquet file.
    
    Args:
        season: Range of seasons to process
        week: Range of weeks to process
    """
    # Create data directory if it doesn't exist
    os.makedirs("data", exist_ok=True)
    
    all_playergames = []
    
    for s in season:
        for w in week:
            try:
                print(f"\nProcessing season {s}, week {w}...")
                df = create_player_game_merge(s, w)
                
                # Save to parquet if we got data
                if len(df) > 0:
                    output_file = f"data/player_game_data_{s}_{w}.parquet"
                    df.to_parquet(output_file)
                    print(f"Saved {len(df)} records to {output_file}")
                    all_playergames.append(df)
                else:
                    print(f"No data found for season {s}, week {w}")
                    
            except Exception as e:
                print(f"Error processing season {s}, week {w}: {str(e)}")
                continue
    
    # Combine all data if we have any
    if all_playergames:
        return pd.concat(all_playergames, ignore_index=True)
    return pd.DataFrame()

def create_player_game_merge(season: int, week: int) -> pd.DataFrame:
    """
    Create merged dataframe of player stats and game data for one week/season
    """
    
    print(f"Getting data for {season} season, week {week}...")

    # Get player stats for the week
    weekly_players = nfl.import_weekly_data([season])
    weekly_players = weekly_players[weekly_players["week"] == week]

    # Print info about players with None names
    none_name_players = weekly_players[weekly_players["player_name"].isna()]
    if len(none_name_players) > 0:
        print("\nFound players with None names:")
        print("\nSample of players with None names (showing all available data):")
        pd.set_option('display.max_columns', None)
        print(none_name_players.head().to_string())
        print(f"\nTotal players with None names: {len(none_name_players)}")
        
        # Show stats distribution for None name players
        print("\nStats summary for players with None names:")
        stats_cols = ["passing_yards", "rushing_yards", "receiving_yards", "targets", "receptions"]
        print(none_name_players[stats_cols].describe())
        
        # Show position distribution
        print("\nPosition distribution for None name players:")
        print(none_name_players["position"].value_counts())

    # Get game schedule for the season
    games = nfl.import_schedules([season])
    games = games[games["week"] == week]

    # Function to find the matching game_id for each player
    def find_game_id(row):
        """
        Matches a player's performance with the corresponding game_id.
        Finds the game where the player's team was either home or away team.
        """
        matching_games = games[
            (games["home_team"] == row["recent_team"]) | 
            (games["away_team"] == row["recent_team"])
        ]
        
        if len(matching_games) == 0:
            print(f"Warning: No matching game found for {row['player_name']} (team: {row['recent_team']})")
            return None
            
        return matching_games["game_id"].iloc[0]

    # Create game_id for each player performance
    weekly_players["game_id"] = weekly_players.apply(find_game_id, axis=1)

    # Drop rows where we couldn't find a matching game
    initial_len = len(weekly_players)
    weekly_players = weekly_players.dropna(subset=["game_id"])
    if len(weekly_players) < initial_len:
        print(f"Dropped {initial_len - len(weekly_players)} rows where no matching game was found")

    # Create unique identifier for each player-game combination
    weekly_players["player_game_id"] = (
        weekly_players["player_id"].astype(str)
        + "_"
        + weekly_players["game_id"].astype(str)
    )

    # Merge player stats with game info, keeping player data for duplicate columns
    merged_data = weekly_players.merge(
        games, on=["game_id", "season", "week"], how="inner", suffixes=('', '_game')
    )

    # Rename recent_team to team for clarity
    merged_data = merged_data.rename(columns={'recent_team': 'team'})

    # Add home/away indicator and opponent team
    merged_data["home_away"] = merged_data.apply(
        lambda row: "Home" if row["team"] == row["home_team"] else "Away", axis=1
    )
    merged_data["opponent_team"] = merged_data.apply(
        lambda row: row["away_team"] if row["team"] == row["home_team"] else row["home_team"], 
        axis=1
    )

    print(f"Created dataframe with {len(merged_data)} player-game records")
    print(f"Unique games: {merged_data['game_id'].nunique()}")
    print(f"Unique players: {merged_data['player_id'].nunique()}")

    return merged_data


# Run the function
if __name__ == "__main__":
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Generate player game data for NFL seasons and weeks')
    parser.add_argument('--start-season', type=int, required=True, help='Start season (e.g. 2011)')
    parser.add_argument('--end-season', type=int, required=True, help='End season inclusive (e.g. 2012)')
    parser.add_argument('--start-week', type=int, required=True, help='Start week (e.g. 1)')
    parser.add_argument('--end-week', type=int, required=True, help='End week inclusive (e.g. 17)')
    
    args = parser.parse_args()
    
    # Create ranges from the arguments
    seasons = range(args.start_season, args.end_season + 1)
    weeks = range(args.start_week, args.end_week + 1)
    
    print(f"Processing seasons {args.start_season} to {args.end_season}")
    print(f"Processing weeks {args.start_week} to {args.end_week}")
    
    all_player_game_data = generate_pqs_of_playergames_by_season_and_week(seasons, weeks)
    
    if len(all_player_game_data) > 0:
        print("\nFirst 10 rows:")
        print(all_player_game_data.head(10))

        print("\nDataframe info:")
        print(all_player_game_data.info())

        print(f"\nSample player-game combinations:")
        print(all_player_game_data[["player_name", "team", "home_away", "player_game_id"]].head())
