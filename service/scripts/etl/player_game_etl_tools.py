import pandas as pd


def map_stats_player_week(week: int, season: int):
    """
    loads games and stats_player_week from nfelodcm, which loads from nflverse
    then creates playergame_id and adds it to stats_player_week
    """

    # read the csvs for games (alltime) and player stats (weekly)
    csvfile = f"stats_player/stats_player_week_{season}.csv"
    pgs = pd.read_csv(
        f"https://github.com/nflverse/nflverse-data/releases/download/{csvfile}"
    )
    gs = pd.read_csv(
        "https://raw.githubusercontent.com/nflverse/nfldata/master/data/games.csv"
    )

    # filter the csvs down to the week
    pgs = pgs[pgs["week"] == week]
    gs = gs[(gs["week"] == week) & (gs["season"] == season)]

    print(pgs)
    # create a map so we can create p;
    game_lookup = {}
    for _, game in gs.iterrows():
        game_lookup[game["home_team"]] = game["game_id"]
        game_lookup[game["away_team"]] = game["game_id"]

    print(game_lookup)

    # Use lookup instead of filtering each time
    pgs["game_id"] = pgs["team"].map(game_lookup)

    # now that we have the game id, we can create and append the playergame_id
    pgs["player_game_id"] = (
        pgs["player_id"].astype(str) + "_" + pgs["game_id"].astype(str)
    )
    print(pgs)
    return pgs


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
    season = df["season"].iloc[0]
    week = df["week"].iloc[0]

    # Create Season and Week
    season_week_query = """
    MERGE (s:Season {season_id: $season})
    MERGE (w:NFLWeek {week: $week})
    MERGE (w)-[:OF]->(s)
    """
    queries.append((season_week_query, {"season": season, "week": week}))

    # Create all unique games at once
    unique_games = df[["game_id"]].drop_duplicates()
    games_query = """
    UNWIND $games as game
    MERGE (g:NFLGame {game_id: game})
    WITH g
    MATCH (w:NFLWeek {week: $week})
    MERGE (g)-[:OF]->(w)
    """
    queries.append(
        (games_query, {"games": unique_games["game_id"].tolist(), "week": week})
    )

    # Then process each player-game
    df_cols = [col for col in df.columns if col not in ["season", "week"]]
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
        queries.extend(
            [
                (
                    player_query,
                    {
                        "player_id": row["player_id"],
                        "position": row["position"],
                        "player_name": row["player_name"],
                    },
                ),
                (
                    player_game_query,
                    {
                        "player_id": row["player_id"],
                        "game_id": row["game_id"],
                        "playergame_id": row["player_game_id"],
                        "properties": properties,
                    },
                ),
            ]
        )

    return queries
