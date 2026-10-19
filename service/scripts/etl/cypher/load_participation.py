import sys
from src.neo4j_client import driver

# Participation data (incl. defensive coverage scheme) is a separate nflverse
# release, joined onto existing Play nodes via game_id + play_id.
# Only became available again for 2023+ after the 2022 NGS licensing gap;
# a season's file isn't finalized/published until that season is complete.
SEASONS = [2024, 2025]


def get_load_participation_query(season: int) -> str:
    """Generate the LOAD CSV query for a single season's participation file."""
    return """
// LOAD and merge participation data (personnel, formation, coverage) onto existing Plays
LOAD CSV WITH HEADERS FROM 'https://github.com/nflverse/nflverse-data/releases/download/pbp_participation/pbp_participation_""" + str(season) + """.csv' AS line

WITH line
WHERE line.nflverse_game_id IS NOT NULL AND line.nflverse_game_id <> ''
  AND line.play_id IS NOT NULL AND line.play_id <> ''

CALL {
  WITH line

  // Only attach to Plays that already exist; never create Play nodes here
  MATCH (p:Play {id: line.nflverse_game_id + ' ' + line.play_id})

  WITH p, line, {
    possession_team: line.possession_team,

    // Personnel & formation
    offense_formation: line.offense_formation,
    offense_personnel: line.offense_personnel,
    defense_personnel: line.defense_personnel,
    defenders_in_box: toIntegerOrNull(line.defenders_in_box),
    number_of_pass_rushers: toIntegerOrNull(line.number_of_pass_rushers),
    n_offense: toIntegerOrNull(line.n_offense),
    n_defense: toIntegerOrNull(line.n_defense),

    // Coverage & pass rush (FTN charting)
    defense_man_zone_type: line.defense_man_zone_type,
    defense_coverage_type: line.defense_coverage_type,
    was_pressure: toBooleanOrNull(line.was_pressure),
    route: line.route,
    ngs_air_yards: toFloatOrNull(line.ngs_air_yards),
    time_to_throw: toFloatOrNull(line.time_to_throw)
  } AS raw

  WITH p, apoc.map.clean(raw, [], [null, '']) AS cleaned
  SET p += cleaned

} IN TRANSACTIONS OF 500 ROWS
"""


try:
    with driver.session() as session:
        for season in SEASONS:
            print(f"Loading participation data for {season}...")
            result = session.run(get_load_participation_query(season))
            summary = result.consume()  # Must consume to commit
            print(f"  Properties set: {summary.counters.properties_set}")
except Exception as e:
    print(f"ERROR: Failed to load participation: {e}")
    sys.exit(1)
