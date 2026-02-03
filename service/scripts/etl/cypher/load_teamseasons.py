import sys
from scripts.etl.cypher.season_config import SEASONS
from src.neo4j_client import driver

# Constraint on composite key (team, season, season_type)
create_constraint = """
CREATE CONSTRAINT teamseason_unique IF NOT EXISTS
FOR (ts:TeamSeason) REQUIRE (ts.team, ts.season, ts.season_type) IS UNIQUE
"""


def get_load_teamseasons_query(season: int) -> str:
    """Generate the LOAD CSV query for a specific season."""
    return f"""
// Read team season stats (aggregated across the season)
// Using reg file which contains only regular season data for all 32 teams
LOAD CSV WITH HEADERS FROM
  'https://github.com/nflverse/nflverse-data/releases/download/stats_team/stats_team_reg_{season}.csv'
  AS line

WITH line
WHERE toInteger(line.season) = {season}
  AND line.team IS NOT NULL

WITH line,
     toInteger(line.season) AS season,
     toInteger(line.games) AS games

// Create TeamSeason node with composite key
MERGE (ts:TeamSeason {{team: line.team, season: season, season_type: line.season_type}})

// Set all team season stats properties
SET ts += {{
  // identity & context
  team:                line.team,
  season:              season,
  season_type:         line.season_type,
  games:               games,

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

  // defense (production stats - what the defense DID, not what they allowed)
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
  fg_made_list:                CASE WHEN line.fg_made_list IS NOT NULL AND line.fg_made_list <> '' THEN split(line.fg_made_list, ';') ELSE [] END,
  fg_missed_list:              CASE WHEN line.fg_missed_list IS NOT NULL AND line.fg_missed_list <> '' THEN split(line.fg_missed_list, ';') ELSE [] END,
  fg_blocked_list:             CASE WHEN line.fg_blocked_list IS NOT NULL AND line.fg_blocked_list <> '' THEN split(line.fg_blocked_list, ';') ELSE [] END,
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
  gwfg_blocked:                toIntegerOrNull(line.gwfg_blocked)
}}

RETURN count(ts) AS loaded;
"""


def get_compute_defense_allowed_query(season: int) -> str:
    """Compute defensive stats (yards allowed) from opponent TeamGame data for a season.

    The nflverse CSV only provides defensive *production* stats (sacks, INTs, etc.),
    not "yards allowed". To calculate yards allowed, we aggregate offensive stats
    from TeamGame where the team was the opponent - i.e., sum up what opposing
    offenses gained against each defense.
    """
    return f"""
// For each team, sum up what opponents threw/rushed against them
MATCH (tg:TeamGame)-[:OF]->(g:Game)
WHERE g.season = {season} AND tg.season_type = 'REG'

// tg.opponent_team is the DEFENSE that faced this offense
WITH tg.opponent_team AS defense_team,
     SUM(tg.passing_yards) AS pass_yards_allowed,
     SUM(tg.rushing_yards) AS rush_yards_allowed,
     SUM(tg.passing_yards + tg.rushing_yards) AS total_yards_allowed,
     SUM(tg.passing_epa + tg.rushing_epa) AS offensive_epa_allowed,
     COUNT(DISTINCT g) AS games

// Update the TeamSeason node with allowed stats
MATCH (ts:TeamSeason {{team: defense_team, season: {season}, season_type: 'REG'}})
SET ts.pass_yards_allowed = pass_yards_allowed,
    ts.pass_yards_allowed_per_game = CASE WHEN games > 0 THEN pass_yards_allowed / games ELSE null END,
    ts.rush_yards_allowed = rush_yards_allowed,
    ts.rush_yards_allowed_per_game = CASE WHEN games > 0 THEN rush_yards_allowed / games ELSE null END,
    ts.total_yards_allowed = total_yards_allowed,
    ts.total_yards_allowed_per_game = CASE WHEN games > 0 THEN total_yards_allowed / games ELSE null END,
    ts.offensive_epa_allowed = offensive_epa_allowed,
    ts.offensive_epa_allowed_per_game = CASE WHEN games > 0 THEN offensive_epa_allowed / games ELSE null END

RETURN count(ts) AS updated;
"""


def get_compute_rankings_query(season: int, stat: str, rank_field: str, ascending: bool = True) -> str:
    """Generate ranking query for a specific stat and season.

    Args:
        season: The season year
        stat: The property to rank by
        rank_field: The property name to store the rank
        ascending: If True, lower values get rank 1 (good for defense/yards allowed).
                   If False, higher values get rank 1 (good for offense/yards gained).
    """
    order = "ASC" if ascending else "DESC"
    return f"""
// Compute {rank_field} for {season}
MATCH (ts:TeamSeason)
WHERE ts.season = {season} AND ts.season_type = 'REG'
WITH ts ORDER BY ts.{stat} {order}
WITH collect(ts) AS teams
UNWIND range(0, size(teams)-1) AS idx
WITH teams[idx] AS ts, idx + 1 AS rank
SET ts.{rank_field} = rank
RETURN count(ts) AS ranked;
"""


def _execute_season_load(tx, season: int) -> dict:
    """Execute all season load operations within a transaction."""
    results = {"loaded": 0, "updated": 0, "offense_ranked": False, "defense_ranked": False}

    # Step 1: Load the teamseasons data from CSV
    load_query = get_load_teamseasons_query(season)
    result = tx.run(load_query)
    record = result.single()
    results["loaded"] = record["loaded"] if record else 0

    if results["loaded"] == 0:
        return results

    # Step 2: Compute offensive rankings (from CSV data, no dependencies)
    offense_rankings = [
        ("passing_yards", "pass_offense_rank"),
        ("rushing_yards", "rush_offense_rank"),
        ("passing_epa", "pass_epa_offense_rank"),
        ("rushing_epa", "rush_epa_offense_rank"),
    ]

    for stat, rank_field in offense_rankings:
        rank_query = get_compute_rankings_query(season, stat, rank_field, ascending=False)
        tx.run(rank_query)

    results["offense_ranked"] = True

    # Step 3: Compute defensive stats (yards allowed) from TeamGame data
    # NOTE: The CSV only has defensive *production* stats (sacks, INTs, forced fumbles),
    # not "yards allowed". To rank defenses by stinginess, we need to aggregate what
    # opposing offenses gained *against* each team. This requires TeamGame data which
    # has per-game offensive stats with opponent_team field.
    defense_query = get_compute_defense_allowed_query(season)
    defense_result = tx.run(defense_query)
    defense_record = defense_result.single()
    results["updated"] = defense_record["updated"] if defense_record else 0

    if results["updated"] == 0:
        return results

    # Step 4: Compute defensive rankings (requires TeamGame data)
    defense_rankings = [
        ("pass_yards_allowed_per_game", "pass_defense_rank"),
        ("rush_yards_allowed_per_game", "rush_defense_rank"),
        ("total_yards_allowed_per_game", "total_defense_rank"),
        ("offensive_epa_allowed_per_game", "epa_defense_rank"),
    ]

    for stat, rank_field in defense_rankings:
        rank_query = get_compute_rankings_query(season, stat, rank_field, ascending=True)
        tx.run(rank_query)

    results["defense_ranked"] = True
    return results


def load_season(season: int) -> bool:
    """Load TeamSeason data and compute rankings for a single season."""
    print(f"\n{'='*50}")
    print(f"Loading season {season}")
    print(f"{'='*50}")

    try:
        # Execute all operations in a single transaction for atomicity
        with driver.session() as session:
            results = session.execute_write(_execute_season_load, season)

        print(f"  Loaded {results['loaded']} TeamSeason nodes")

        if results["loaded"] == 0:
            print(f"  WARNING: No data loaded for {season}")
            return False

        if results["offense_ranked"]:
            print(f"  Computed offensive rankings")

        if results["updated"] == 0:
            print(f"  WARNING: No TeamGame data for {season}, skipping defensive rankings")
            return True  # Still loaded TeamSeason + offensive rankings

        print(f"  Computed defensive stats for {results['updated']} teams")

        if results["defense_ranked"]:
            print(f"  Computed defensive rankings")

        return True

    except Exception as e:
        print(f"  ERROR loading {season}: {e}")
        return False


try:
    # Create the constraint
    driver.execute_query(create_constraint)
    print("Constraint creation completed")

    # Load all seasons
    success_count = 0
    for season in SEASONS:
        if load_season(season):
            success_count += 1

    print(f"\n{'='*50}")
    print(f"COMPLETE: Loaded {success_count}/{len(SEASONS)} seasons")
    print(f"{'='*50}")

    # Verify total count
    verify = driver.execute_query("""
        MATCH (ts:TeamSeason)
        RETURN ts.season, count(ts) AS teams
        ORDER BY ts.season
    """)
    print("\nTeamSeason nodes by season:")
    for r in verify.records:
        print(f"  {r['ts.season']}: {r['teams']} teams")

except Exception as e:
    print(f"ERROR: Failed to load teamseasons: {e}")
    sys.exit(1)
