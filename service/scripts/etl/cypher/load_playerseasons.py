import sys
from src.neo4j_client import driver

# Constraint on player_season_id (already exists, but ensure it's created)
create_constraint = """
CREATE CONSTRAINT player_season_id_PlayerSeason_uniq IF NOT EXISTS
FOR (ps:PlayerSeason) REQUIRE ps.player_season_id IS UNIQUE
"""


def get_load_playerseasons_query(season: int) -> str:
    """Generate the LOAD CSV query for a specific player season."""
    return f"""
// Read player season stats (aggregated across the regular season)
LOAD CSV WITH HEADERS FROM
  'https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_reg_{season}.csv'
  AS line

WITH line
WHERE toInteger(line.season) = {season}
  AND line.season_type = 'REG'
  AND line.player_id IS NOT NULL
  AND line.player_id <> ''

WITH line,
     toInteger(line.season) AS season,
     toInteger(line.games) AS games,
     line.player_id + '_' + toString(toInteger(line.season)) AS player_season_id

// Create PlayerSeason node with unique player_season_id
MERGE (ps:PlayerSeason {{player_season_id: player_season_id}})

// Set all player season stats properties
SET ps += {{
  // identity & context
  player_season_id:    player_season_id,
  player_id:           line.player_id,
  player_name:         line.player_display_name,
  position:            line.position,
  position_group:      line.position_group,
  season:              season,
  season_type:         line.season_type,
  games:               games,
  teams:               CASE WHEN line.recent_team IS NOT NULL AND line.recent_team <> ''
                            THEN [line.recent_team]
                            ELSE [] END,

  // passing
  completions:                 toIntegerOrNull(line.completions),
  attempts:                    toIntegerOrNull(line.attempts),
  passing_yards:               toFloatOrNull(line.passing_yards),
  passing_tds:                 toIntegerOrNull(line.passing_tds),
  passing_air_yards:           toFloatOrNull(line.passing_air_yards),
  passing_yards_after_catch:   toFloatOrNull(line.passing_yards_after_catch),
  passing_first_downs:         toFloatOrNull(line.passing_first_downs),
  passing_epa:                 toFloatOrNull(line.passing_epa),
  passing_2pt_conversions:     toIntegerOrNull(line.passing_2pt_conversions) > 0,
  interceptions:               toFloatOrNull(line.passing_interceptions),
  sacks:                       toFloatOrNull(line.sacks_suffered),
  sack_yards:                  toFloatOrNull(line.sack_yards_lost),
  sack_fumbles:                toIntegerOrNull(line.sack_fumbles),
  sack_fumbles_lost:           toIntegerOrNull(line.sack_fumbles_lost),
  dakota:                      toFloatOrNull(line.dakota),

  // rushing
  carries:                     toIntegerOrNull(line.carries),
  rushing_yards:               toFloatOrNull(line.rushing_yards),
  rushing_tds:                 toIntegerOrNull(line.rushing_tds),
  rushing_first_downs:         toFloatOrNull(line.rushing_first_downs),
  rushing_fumbles:             toFloatOrNull(line.rushing_fumbles),
  rushing_fumbles_lost:        toFloatOrNull(line.rushing_fumbles_lost),
  rushing_epa:                 toFloatOrNull(line.rushing_epa),
  rushing_2pt_conversions:     toIntegerOrNull(line.rushing_2pt_conversions),
  yards_per_carry:             CASE
                                  WHEN toFloatOrNull(line.carries) IS NOT NULL AND toFloatOrNull(line.carries) > 0
                                  THEN toFloatOrNull(line.rushing_yards) / toFloatOrNull(line.carries)
                                  ELSE 0.0
                               END,

  // receiving
  targets:                     toIntegerOrNull(line.targets),
  receptions:                  toIntegerOrNull(line.receptions),
  receiving_yards:             toFloatOrNull(line.receiving_yards),
  receiving_tds:               toIntegerOrNull(line.receiving_tds),
  receiving_first_downs:       toFloatOrNull(line.receiving_first_downs),
  receiving_fumbles:           toFloatOrNull(line.receiving_fumbles),
  receiving_fumbles_lost:      toFloatOrNull(line.receiving_fumbles_lost),
  receiving_air_yards:         toFloatOrNull(line.receiving_air_yards),
  receiving_yards_after_catch: toFloatOrNull(line.receiving_yards_after_catch),
  receiving_epa:               toFloatOrNull(line.receiving_epa),
  receiving_2pt_conversions:   toIntegerOrNull(line.receiving_2pt_conversions),

  // advanced/share stats
  target_share:                toFloatOrNull(line.target_share),
  air_yards_share:             toFloatOrNull(line.air_yards_share),
  ay_sh:                       toFloatOrNull(line.ay_sh),
  yac_sh:                      toFloatOrNull(line.yac_sh),
  racr:                        toFloatOrNull(line.racr),
  wopr:                        toFloatOrNull(line.wopr),
  pacr:                        toFloatOrNull(line.pacr),
  wopr_x:                      toFloatOrNull(line.wopr_x),
  wopr_y:                      toFloatOrNull(line.wopr_y),
  dom:                         toFloatOrNull(line.dom),
  w8dom:                       toFloatOrNull(line.w8dom),
  ry_sh:                       toFloatOrNull(line.ry_sh),
  rtd_sh:                      toFloatOrNull(line.rtd_sh),
  rfd_sh:                      toFloatOrNull(line.rfd_sh),
  rtdfd_sh:                    toFloatOrNull(line.rtdfd_sh),
  tgt_sh:                      toFloatOrNull(line.tgt_sh),
  ppr_sh:                      toFloatOrNull(line.ppr_sh),
  yptmpa:                      toFloatOrNull(line.yptmpa),

  // fantasy
  fantasy_points:              toFloatOrNull(line.fantasy_points),
  fantasy_points_ppr:          toFloatOrNull(line.fantasy_points_ppr),

  // special teams
  special_teams_tds:           toFloatOrNull(line.special_teams_tds),

  // derived
  scrimmage_yards:             coalesce(toFloatOrNull(line.rushing_yards), 0.0) +
                               coalesce(toFloatOrNull(line.receiving_yards), 0.0)
}}

RETURN count(ps) AS loaded;
"""


def get_create_relationships_query(season: int) -> str:
    """Create relationships for PlayerSeason nodes: (Player)-[:HAD]->(PlayerSeason)-[:OF]->(Season)."""
    return f"""
// Match PlayerSeason nodes for this season and create relationships
MATCH (ps:PlayerSeason)
WHERE ps.season = {season}

// Link to Player node
WITH ps
OPTIONAL MATCH (p:Player {{gsis_id: ps.player_id}})
FOREACH (_ IN CASE WHEN p IS NOT NULL THEN [1] ELSE [] END |
    MERGE (p)-[:HAD]->(ps)
)

// Need WITH to continue after FOREACH
WITH ps

// Link to Season node
OPTIONAL MATCH (s:Season {{season: {season}}})
FOREACH (_ IN CASE WHEN s IS NOT NULL THEN [1] ELSE [] END |
    MERGE (ps)-[:OF]->(s)
)

RETURN count(ps) AS relationships_created;
"""


try:
    # Create the constraint (if not exists)
    driver.execute_query(create_constraint)
    print("Constraint verification completed")

    # Load 2025 only (previous seasons already loaded)
    season = 2025
    print(f"\nLoading PlayerSeason data for {season}...")

    # Step 1: Load the data
    load_query = get_load_playerseasons_query(season)
    result = driver.execute_query(load_query)
    record = result.records[0] if result.records else None
    loaded = record["loaded"] if record else 0
    print(f"  Loaded {loaded} PlayerSeason nodes")

    if loaded > 0:
        # Step 2: Create relationships
        rel_query = get_create_relationships_query(season)
        rel_result = driver.execute_query(rel_query)
        rel_record = rel_result.records[0] if rel_result.records else None
        relationships = rel_record["relationships_created"] if rel_record else 0
        print(f"  Created relationships for {relationships} nodes")

    print(f"\nCOMPLETE: Loaded {season} season")

    # Verify total count
    verify = driver.execute_query("""
        MATCH (ps:PlayerSeason)
        RETURN ps.season, count(ps) AS players
        ORDER BY ps.season
    """)
    print("\nPlayerSeason nodes by season:")
    for r in verify.records:
        print(f"  {r['ps.season']}: {r['players']} players")

    # Verify relationships
    rel_verify = driver.execute_query("""
        MATCH (p:Player)-[:HAD]->(ps:PlayerSeason)-[:OF]->(s:Season)
        RETURN s.season, count(ps) AS linked
        ORDER BY s.season
    """)
    print("\nPlayerSeason nodes with complete relationships:")
    for r in rel_verify.records:
        print(f"  {r['s.season']}: {r['linked']} players")

except Exception as e:
    print(f"ERROR: Failed to load playerseasons: {e}")
    sys.exit(1)
