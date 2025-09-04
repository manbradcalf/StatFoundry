# OLD
#
#
# from src.neo4j_client import driver
#
# print("ingest_weekly_pbp called")
# # TODO:
# print("Downloading play_by_play_2025.csv")
# # TODO:
# print("Creating id column from game_id + play_id")
# # TODO:
# print("Transforming CSV Data for Cypher script (ints to bools, etc)")
# # TODO:
# print("Running Cypher ingestion script")
#
#
# query = """
#     MATCH (n) RETURN n LIMIT 1
#     """
#
# driver.execute_query(query)
#
#
# NEW
#
#
import io
import requests
import pandas as pd
from src.neo4j_client import driver

YEAR = 2024

# Direct release asset (weekly player stats, CSV). Parquet is also available; CSV keeps this example simple.
# Release docs & examples show the stable path pattern:
#   https://github.com/nflverse/nflverse-data/releases/download/player_stats/stats_player_week_2024.csv
ASSET_URL = f"https://github.com/nflverse/nflverse-data/releases/download/player_stats/stats_player_week_{YEAR}.csv"


def download_csv(url: str) -> pd.DataFrame:
    r = requests.get(url, timeout=120)
    r.raise_for_status()
    # Some nflverse assets may be gzip-compressed; handle both transparently.
    content = r.content
    df = pd.read_csv(io.BytesIO(content), low_memory=False)
    return df


# Minimal, opinionated mapping:
# - (:Player {gsis_id})       basic identity
# - (:Game {game_id})
# - (:PlayerGame {player_id, game_id, season, week, team, position, ...stats})
# - (:Team {team_abbr})
# Relationships:
#   (Player)-[:PLAYED_IN_PLAYER_GAME]->(PlayerGame)-[:OF]->(Game)
#   (Team)-[:HAD_PLAYER_GAME]->(PlayerGame)
def ingest(df: pd.DataFrame):
    # Keep a subset of columns commonly used; adjust to your schema.
    keep_cols = [
        "player_id",
        "player_name",
        "gsis_id",
        "pos",
        "team",
        "season",
        "week",
        "game_id",
        # core box score-ish fields (add as needed)
        "attempts",
        "completions",
        "passing_yards",
        "passing_tds",
        "interceptions",
        "rush_attempts",
        "rushing_yards",
        "rushing_tds",
        "receptions",
        "receiving_yards",
        "receiving_tds",
        "fumbles",
        "fumbles_lost",
        "sacks",
    ]
    cols_present = [c for c in keep_cols if c in df.columns]
    df = df.loc[df["season"] == YEAR, cols_present].copy()

    # Basic normalization
    df.rename(columns={"pos": "position", "team": "team_abbr"}, inplace=True)

    # Fill NaNs so Neo4j gets predictable values
    df = df.fillna(0).replace({pd.NA: 0})

    # Convert a few ints
    for c in ["season", "week"]:
        if c in df.columns:
            df[c] = df[c].astype(int, errors="ignore")

    records = df.to_dict("records")

    cypher = """
    UNWIND $rows AS row
    // Players
    MERGE (p:Player {gsis_id: coalesce(row.gsis_id, row.player_id)})
      ON CREATE SET p.player_id = row.player_id, p.name = row.player_name
      ON MATCH  SET p.player_id = coalesce(p.player_id, row.player_id),
                  p.name = coalesce(p.name, row.player_name)

    // Teams
    MERGE (t:Team {abbr: row.team_abbr})

    // Games
    MERGE (g:Game {game_id: row.game_id})

    // PlayerGame node (compound/reified)
    MERGE (pg:PlayerGame {player_id: row.player_id, game_id: row.game_id})
      ON CREATE SET pg.season = row.season, pg.week = row.week, pg.team_abbr = row.team_abbr, pg.position = row.position
    SET
      pg.attempts        = coalesce(row.attempts, 0),
      pg.completions     = coalesce(row.completions, 0),
      pg.passing_yards   = coalesce(row.passing_yards, 0),
      pg.passing_tds     = coalesce(row.passing_tds, 0),
      pg.interceptions   = coalesce(row.interceptions, 0),
      pg.rush_attempts   = coalesce(row.rush_attempts, 0),
      pg.rushing_yards   = coalesce(row.rushing_yards, 0),
      pg.rushing_tds     = coalesce(row.rushing_tds, 0),
      pg.receptions      = coalesce(row.receptions, 0),
      pg.receiving_yards = coalesce(row.receiving_yards, 0),
      pg.receiving_tds   = coalesce(row.receiving_tds, 0),
      pg.fumbles         = coalesce(row.fumbles, 0),
      pg.fumbles_lost    = coalesce(row.fumbles_lost, 0),
      pg.sacks           = coalesce(row.sacks, 0)

    MERGE (p)-[:PLAYED_IN_PLAYER_GAME]->(pg)
    MERGE (pg)-[:OF]->(g)
    MERGE (t)-[:HAD_PLAYER_GAME]->(pg)
    """

    # Chunk to keep memory & tx size sane on Actions runners
    batch = 10_000
    with driver.session() as sess:
        for i in range(0, len(records), batch):
            sess.run(cypher, rows=records[i : i + batch])
    driver.close()


if __name__ == "__main__":
    print(f"Downloading {ASSET_URL} …")
    df = download_csv(ASSET_URL)
    print(f"Rows downloaded: {len(df):,}")
    ingest(df)
    print("Ingestion complete.")
