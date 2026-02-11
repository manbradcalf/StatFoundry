import sys
from scripts.etl.cypher.season_config import SEASONS
from src.neo4j_client import driver

# Constraint on composite key (team, game_id) - not the derived team_game_id field
# This follows the same pattern as PlayerGame for consistency
create_constraint = """
CREATE CONSTRAINT teamgame_unique IF NOT EXISTS
FOR (tg:TeamGame) REQUIRE (tg.team, tg.game_id) IS UNIQUE
"""


def get_load_teamgames_query(season: int) -> str:
    """Generate the LOAD CSV query for a specific season."""
    return f"""
// Read weekly team stats
LOAD CSV WITH HEADERS FROM
  'https://github.com/nflverse/nflverse-data/releases/download/stats_team/stats_team_week_{season}.csv'
  AS line

WITH line
WHERE toInteger(line.season) = {season}
  AND line.team IS NOT NULL
  AND line.opponent_team IS NOT NULL

WITH line,
     toInteger(line.season) AS season,
     toInteger(line.week)   AS week

// Match the Game directly by game_id (indexed via constraint)
MATCH (g:Game {{game_id: line.game_id}})

WITH line, g, season, week, line.game_id AS game_id

// Create/link TeamGame
MERGE (tg:TeamGame {{team: line.team, game_id: game_id}})
MERGE (tg)-[:OF]->(g)

// Set all team stats properties
SET tg += {{
  // identity & context
  season_type:         line.season_type,
  season:              season,
  week:                week,
  team:                line.team,
  opponent_team:       line.opponent_team,
  game_id:             game_id,
  team_game_id:        line.team + '_' + game_id,

  // passing
  completions:                 toIntegerOrNull(line.completions),
  attempts:                    toIntegerOrNull(line.attempts),
  passing_yards:               toFloatOrNull(line.passing_yards),
  passing_tds:                 toIntegerOrNull(line.passing_tds),
  passing_interceptions:       toIntegerOrNull(line.passing_interceptions),
  sacks_suffered:              toIntegerOrNull(line.sacks_suffered),
  sack_yards_lost:             toFloatOrNull(line.sack_yards_lost),
  sack_fumbles:                toIntegerOrNull(line.sack_fumbles),
  sack_fumbles_lost:           toIntegerOrNull(line.sack_fumbles_lost),
  passing_air_yards:           toFloatOrNull(line.passing_air_yards),
  passing_yards_after_catch:   toFloatOrNull(line.passing_yards_after_catch),
  passing_first_downs:         toFloatOrNull(line.passing_first_downs),
  passing_epa:                 toFloatOrNull(line.passing_epa),
  passing_cpoe:                toFloatOrNull(line.passing_cpoe),
  passing_2pt_conversions:     toIntegerOrNull(line.passing_2pt_conversions),

  // rushing
  carries:                     toIntegerOrNull(line.carries),
  rushing_yards:               toFloatOrNull(line.rushing_yards),
  rushing_tds:                 toIntegerOrNull(line.rushing_tds),
  rushing_fumbles:             toIntegerOrNull(line.rushing_fumbles),
  rushing_fumbles_lost:        toIntegerOrNull(line.rushing_fumbles_lost),
  rushing_first_downs:         toFloatOrNull(line.rushing_first_downs),
  rushing_epa:                 toFloatOrNull(line.rushing_epa),
  rushing_2pt_conversions:     toIntegerOrNull(line.rushing_2pt_conversions),

  // receiving (team aggregates)
  receptions:                  toIntegerOrNull(line.receptions),
  targets:                     toIntegerOrNull(line.targets),
  receiving_yards:             toFloatOrNull(line.receiving_yards),
  receiving_tds:               toIntegerOrNull(line.receiving_tds),
  receiving_fumbles:           toIntegerOrNull(line.receiving_fumbles),
  receiving_fumbles_lost:      toIntegerOrNull(line.receiving_fumbles_lost),
  receiving_air_yards:         toFloatOrNull(line.receiving_air_yards),
  receiving_yards_after_catch: toFloatOrNull(line.receiving_yards_after_catch),
  receiving_first_downs:       toFloatOrNull(line.receiving_first_downs),
  receiving_epa:               toFloatOrNull(line.receiving_epa),
  receiving_2pt_conversions:   toIntegerOrNull(line.receiving_2pt_conversions),

  // special teams
  special_teams_tds:           toIntegerOrNull(line.special_teams_tds),

  // defense
  def_tackles_solo:            toIntegerOrNull(line.def_tackles_solo),
  def_tackles_with_assist:     toIntegerOrNull(line.def_tackles_with_assist),
  def_tackle_assists:          toIntegerOrNull(line.def_tackle_assists),
  def_tackles_for_loss:        toIntegerOrNull(line.def_tackles_for_loss),
  def_tackles_for_loss_yards:  toFloatOrNull(line.def_tackles_for_loss_yards),
  def_fumbles_forced:          toIntegerOrNull(line.def_fumbles_forced),
  def_sacks:                   toIntegerOrNull(line.def_sacks),
  def_sack_yards:              toFloatOrNull(line.def_sack_yards),
  def_qb_hits:                 toIntegerOrNull(line.def_qb_hits),
  def_interceptions:           toIntegerOrNull(line.def_interceptions),
  def_interception_yards:      toFloatOrNull(line.def_interception_yards),
  def_pass_defended:           toIntegerOrNull(line.def_pass_defended),
  def_tds:                     toIntegerOrNull(line.def_tds),
  def_fumbles:                 toIntegerOrNull(line.def_fumbles),
  def_safeties:                toIntegerOrNull(line.def_safeties),

  // misc
  misc_yards:                  toFloatOrNull(line.misc_yards),
  fumble_recovery_own:         toIntegerOrNull(line.fumble_recovery_own),
  fumble_recovery_yards_own:   toFloatOrNull(line.fumble_recovery_yards_own),
  fumble_recovery_opp:         toIntegerOrNull(line.fumble_recovery_opp),
  fumble_recovery_yards_opp:   toFloatOrNull(line.fumble_recovery_yards_opp),
  fumble_recovery_tds:         toIntegerOrNull(line.fumble_recovery_tds),

  // penalties & timeouts
  penalties:                   toIntegerOrNull(line.penalties),
  penalty_yards:               toFloatOrNull(line.penalty_yards),
  timeouts:                    toIntegerOrNull(line.timeouts),

  // returns
  punt_returns:                toIntegerOrNull(line.punt_returns),
  punt_return_yards:           toFloatOrNull(line.punt_return_yards),
  kickoff_returns:             toIntegerOrNull(line.kickoff_returns),
  kickoff_return_yards:        toFloatOrNull(line.kickoff_return_yards),

  // field goals
  fg_made:                     toIntegerOrNull(line.fg_made),
  fg_att:                      toIntegerOrNull(line.fg_att),
  fg_missed:                   toIntegerOrNull(line.fg_missed),
  fg_blocked:                  toIntegerOrNull(line.fg_blocked),
  fg_long:                     toIntegerOrNull(line.fg_long),
  fg_pct:                      toFloatOrNull(line.fg_pct),
  fg_made_0_19:                toIntegerOrNull(line.fg_made_0_19),
  fg_made_20_29:               toIntegerOrNull(line.fg_made_20_29),
  fg_made_30_39:               toIntegerOrNull(line.fg_made_30_39),
  fg_made_40_49:               toIntegerOrNull(line.fg_made_40_49),
  fg_made_50_59:               toIntegerOrNull(line.fg_made_50_59),
  fg_made_60_:                 toIntegerOrNull(line.fg_made_60_),
  fg_missed_0_19:              toIntegerOrNull(line.fg_missed_0_19),
  fg_missed_20_29:             toIntegerOrNull(line.fg_missed_20_29),
  fg_missed_30_39:             toIntegerOrNull(line.fg_missed_30_39),
  fg_missed_40_49:             toIntegerOrNull(line.fg_missed_40_49),
  fg_missed_50_59:             toIntegerOrNull(line.fg_missed_50_59),
  fg_missed_60_:               toIntegerOrNull(line.fg_missed_60_),
  fg_made_list:                line.fg_made_list,
  fg_missed_list:              line.fg_missed_list,
  fg_blocked_list:             line.fg_blocked_list,
  fg_made_distance:            toFloatOrNull(line.fg_made_distance),
  fg_missed_distance:          toFloatOrNull(line.fg_missed_distance),
  fg_blocked_distance:         toFloatOrNull(line.fg_blocked_distance),

  // PAT
  pat_made:                    toIntegerOrNull(line.pat_made),
  pat_att:                     toIntegerOrNull(line.pat_att),
  pat_missed:                  toIntegerOrNull(line.pat_missed),
  pat_blocked:                 toIntegerOrNull(line.pat_blocked),
  pat_pct:                     toFloatOrNull(line.pat_pct),

  // game winning field goal
  gwfg_made:                   toIntegerOrNull(line.gwfg_made),
  gwfg_att:                    toIntegerOrNull(line.gwfg_att),
  gwfg_missed:                 toIntegerOrNull(line.gwfg_missed),
  gwfg_blocked:                toIntegerOrNull(line.gwfg_blocked),
  gwfg_distance:               toFloatOrNull(line.gwfg_distance)
}}

RETURN count(tg) AS loaded;
"""


try:
    # First, create the constraint
    driver.execute_query(create_constraint)
    print("Constraint creation completed")

    # Then, load the teamgames data
    total_loaded = 0
    for season in SEASONS:
        load_query = get_load_teamgames_query(season)
        result = driver.execute_query(load_query)
        record = result.records[0] if result.records else None
        loaded = record["loaded"] if record else 0
        total_loaded += loaded
        print(f"Loaded TeamGame data for {season}: {loaded} records")

    print(f"Total TeamGame records processed: {total_loaded}")
except Exception as e:
    print(f"ERROR: Failed to load teamgames: {e}")
    sys.exit(1)
