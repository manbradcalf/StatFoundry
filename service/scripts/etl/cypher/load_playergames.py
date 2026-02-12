import sys

import polars as pl
import nflreadpy as nfl

from scripts.etl.cypher.season_config import SEASONS
from src.neo4j_client import driver

create_constraint = """
CREATE CONSTRAINT playergame_unique IF NOT EXISTS
FOR (pg:PlayerGame) REQUIRE (pg.player_id, pg.game_id) IS UNIQUE
"""

load_playergames_query = """
UNWIND $rows AS row

// Match the Game directly by game_id (indexed via constraint)
MATCH (g:Game {game_id: row.game_id})

// Create/link PlayerGame
MERGE (pg:PlayerGame {player_id: row.player_id, game_id: row.game_id})
MERGE (pg)-[:OF]->(g)

// Link to existing Player
WITH row, g, pg
MATCH (p:Player {gsis_id: row.player_id})
MERGE (p)-[:HAD]->(pg)

// Source player_name from the matched Player node for consistency
SET pg += {
  // identity & context
  player_name:         p.display_name,
  position:            row.position,
  position_group:      row.position_group,
  headshot_url:        row.headshot_url,
  season_type:         row.season_type,
  season:              row.season,
  week:                row.week,

  // teams & ids
  team:                row.team,
  opponent_team:       row.opponent_team,
  game_id:             row.game_id,
  player_game_id:      row.player_game_id,

  // passing
  completions:                 row.completions,
  attempts:                    row.attempts,
  passing_yards:               row.passing_yards,
  passing_tds:                 row.passing_tds,
  passing_air_yards:           row.passing_air_yards,
  passing_yards_after_catch:   row.passing_yards_after_catch,
  passing_first_downs:         row.passing_first_downs,
  passing_2pt_conversions:     row.passing_2pt_conversions,
  passing_epa:                 row.passing_epa,

  // interceptions
  passing_interceptions:       row.passing_interceptions,
  def_interceptions:           row.def_interceptions,
  def_interception_yards:      row.def_interception_yards,
  interceptions:               row.interceptions,

  // sacks taken (QB/ballcarrier) & fumbles
  sacks:                       row.sacks,
  sack_yards:                  row.sack_yards,
  sack_fumbles:                row.sack_fumbles,
  sack_fumbles_lost:           row.sack_fumbles_lost,

  // rushing
  carries:                     row.carries,
  rushing_yards:               row.rushing_yards,
  rushing_tds:                 row.rushing_tds,
  rushing_first_downs:         row.rushing_first_downs,
  rushing_fumbles:             row.rushing_fumbles,
  rushing_fumbles_lost:        row.rushing_fumbles_lost,
  rushing_epa:                 row.rushing_epa,
  rushing_2pt_conversions:     row.rushing_2pt_conversions,
  yards_per_carry:             row.yards_per_carry,

  // receiving
  targets:                     row.targets,
  receptions:                  row.receptions,
  receiving_yards:             row.receiving_yards,
  receiving_tds:               row.receiving_tds,
  receiving_first_downs:       row.receiving_first_downs,
  receiving_fumbles:           row.receiving_fumbles,
  receiving_fumbles_lost:      row.receiving_fumbles_lost,
  receiving_air_yards:         row.receiving_air_yards,
  receiving_yards_after_catch: row.receiving_yards_after_catch,
  receiving_epa:               row.receiving_epa,
  receiving_2pt_conversions:   row.receiving_2pt_conversions,

  // shares & advanced
  target_share:                row.target_share,
  air_yards_share:             row.air_yards_share,
  racr:                        row.racr,
  wopr:                        row.wopr,
  pacr:                        row.pacr,

  // defense totals
  def_sacks:                   row.def_sacks,
  def_sack_yards:              row.def_sack_yards,

  // specials/fantasy
  special_teams_tds:           row.special_teams_tds,
  fantasy_points:              row.fantasy_points,
  fantasy_points_ppr:          row.fantasy_points_ppr,

  // derived from matched Game scores
  won:                         CASE
                                  WHEN row.team = g.home_team
                                    THEN g.home_score > g.away_score
                                  ELSE g.away_score > g.home_score
                                END
}

RETURN count(pg) AS loaded
"""


def prepare_rows(df: pl.DataFrame) -> list[dict]:
    """Transform nflreadpy DataFrame into Neo4j-ready row dicts."""
    df = df.rename({
        'sacks_suffered': 'sacks',
        'sack_yards_lost': 'sack_yards',
    })

    df = df.with_columns(
        # Derived fields
        pl.when(pl.col('carries') > 0)
          .then(pl.col('rushing_yards') / pl.col('carries'))
          .otherwise(None)
          .alias('yards_per_carry'),
        pl.coalesce('passing_interceptions', 'def_interceptions')
          .alias('interceptions'),
        (pl.col('player_id') + '_' + pl.col('game_id'))
          .alias('player_game_id'),
        # Boolean conversions (original schema stored these as booleans)
        (pl.col('passing_2pt_conversions').fill_null(0) > 0)
          .alias('passing_2pt_conversions'),
        (pl.col('rushing_2pt_conversions').fill_null(0) > 0)
          .alias('rushing_2pt_conversions'),
        (pl.col('receiving_2pt_conversions').fill_null(0) > 0)
          .alias('receiving_2pt_conversions'),
        (pl.col('sack_fumbles').fill_null(0) > 0)
          .alias('sack_fumbles'),
        (pl.col('sack_fumbles_lost').fill_null(0) > 0)
          .alias('sack_fumbles_lost'),
    )

    rows = df.to_dicts()

    # Replace NaN with None (Neo4j driver doesn't handle NaN)
    for row in rows:
        for key, value in row.items():
            if isinstance(value, float) and value != value:
                row[key] = None

    return rows


def load_season(season: int) -> int:
    """Load player game stats for a single season using nflreadpy."""
    df = nfl.load_player_stats(seasons=[season], summary_level='week')

    df = df.filter(
        (pl.col('season') == season)
        & pl.col('player_id').is_not_null()
        & pl.col('team').is_not_null()
        & pl.col('opponent_team').is_not_null()
    )

    if df.is_empty():
        return 0

    rows = prepare_rows(df)
    result = driver.execute_query(load_playergames_query, rows=rows)
    record = result.records[0] if result.records else None
    return record["loaded"] if record else 0


try:
    driver.execute_query(create_constraint)
    print("Constraint creation completed")

    total_loaded = 0
    for season in SEASONS:
        loaded = load_season(season)
        total_loaded += loaded
        print(f"Loaded PlayerGame data for {season}: {loaded} records")

    print(f"Total PlayerGame records processed: {total_loaded}")
except Exception as e:
    print(f"ERROR: Failed to load playergames: {e}")
    sys.exit(1)
