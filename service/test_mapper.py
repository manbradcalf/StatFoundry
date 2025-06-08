# test_mapper.py
from service.player_game_mapper import generate_playergame_dataframes
import pandas as pd

pd.set_option('display.max_columns', None)  # Show all columns
pd.set_option('display.width', 1000)        # Wide display

def test_one_week():
    df = generate_playergame_dataframes(range(2023, 2024), range(1, 2))
    
    print(f"\nFetched {len(df)} player-games")
    print("\nColumns available:")
    print(df.columns.tolist())
    
    print("\nSample of data (first 5 rows):")
    print(df.head())
    
    # Show some stats
    print("\nPositions breakdown:")
    print(df['position'].value_counts())
    
    print("\nTeams represented:")
    print(df['recent_team'].unique())
    
    # Check for any missing game_ids
    missing_games = df[df['game_id'].isna()]
    if len(missing_games) > 0:
        print("\nWARNING: Found rows missing game_ids:")
        print(missing_games[['player_name', 'recent_team', 'position']])

if __name__ == "__main__":
    test_one_week()