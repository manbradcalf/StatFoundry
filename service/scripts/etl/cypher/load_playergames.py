from src.neo4j_client import driver

load_2025_playergames = """
    // Ensure 2025 Game nodes exist first (as discussed earlier)

// Unique key for PlayerGame
CREATE CONSTRAINT playergame_unique IF NOT EXISTS
FOR (pg:PlayerGame) REQUIRE (pg.player_id, pg.game_id) IS UNIQUE;

// Read weekly player stats (calculate_stats output)
LOAD CSV WITH HEADERS FROM
  'https://github.com/nflverse/nflverse-data/releases/download/stats_player/stats_player_week_2025.csv'
  AS line

WITH line
WHERE toInteger(line.season) = 2025
  AND line.player_id IS NOT NULL
  AND line.team IS NOT NULL
  AND line.opponent_team IS NOT NULL

WITH line,
     toInteger(line.season) AS season,
     toInteger(line.week)   AS week

// Match the correct Game by season/week + (home,away) team pairing
MATCH (g:Game)
WHERE g.season = season AND g.week = week
  AND (
        (g.home_team = line.team AND g.away_team = line.opponent_team) OR
        (g.home_team = line.opponent_team AND g.away_team = line.team)
      )

// Build canonical game_id from the matched Game
WITH line, g, season, week,
     (CASE WHEN week < 10 THEN '0' + toString(week) ELSE toString(week) END) AS ww,
     g.away_team AS away, g.home_team AS home
WITH line, g, season, week, ww, away, home,
     toString(season) + '_' + ww + '_' + away + '_' + home AS game_id

// Create/link PlayerGame
MERGE (pg:PlayerGame {player_id: line.player_id, game_id: game_id})
MERGE (pg)-[:OF]->(g)

// Minimal properties to verify; expand as needed
SET pg += {
  // identity & context
  player_name:         line.player_name,
  player_display_name: line.player_display_name,
  position:            line.position,
  position_group:      line.position_group,
  headshot_url:        line.headshot_url,
  season_type:         line.season_type,
  season:              season,
  week:                week,

  // teams & ids
  recent_team:         line.team,             // your prior schema used `recent_team`
  opponent_team:       line.opponent_team,
  game_id:             game_id,               // built from matched Game
  player_game_id:      line.player_id + '_' + game_id,

  // passing
  completions:                 toIntegerOrNull(line.completions),
  attempts:                    toIntegerOrNull(line.attempts),
  passing_yards:               toFloatOrNull(line.passing_yards),
  passing_tds:                 toIntegerOrNull(line.passing_tds),
  passing_air_yards:           toFloatOrNull(line.passing_air_yards),
  passing_yards_after_catch:   toFloatOrNull(line.passing_yards_after_catch),
  passing_first_downs:         toFloatOrNull(line.passing_first_downs),
  passing_2pt_conversions:     (line.passing_2pt_conversions IN ["1","true","TRUE","True"]),
  passing_epa:                 toFloatOrNull(line.passing_epa),

  // interceptions (prior schema used a single `interceptions` value)
  passing_interceptions:       toIntegerOrNull(line.passing_interceptions),
  def_interceptions:           toFloatOrNull(line.def_interceptions),
  def_interception_yards:      toFloatOrNull(line.def_interception_yards),
  interceptions:               coalesce(toFloatOrNull(line.passing_interceptions),
                                        toFloatOrNull(line.def_interceptions)),

  // sacks taken (QB/ballcarrier) & fumbles
  sacks:                       toFloatOrNull(line.sacks_suffered),   // <- name change
  sack_yards:                  toFloatOrNull(line.sack_yards_lost),  // <- name change
  sack_fumbles:                (line.sack_fumbles IN ["1","true","TRUE","True"]),
  sack_fumbles_lost:           (line.sack_fumbles_lost IN ["1","true","TRUE","True"]),

  // rushing
  carries:                     toIntegerOrNull(line.carries),
  rushing_yards:               toFloatOrNull(line.rushing_yards),
  rushing_tds:                 toIntegerOrNull(line.rushing_tds),
  rushing_first_downs:         toFloatOrNull(line.rushing_first_downs),
  rushing_fumbles:             toFloatOrNull(line.rushing_fumbles),
  rushing_fumbles_lost:        toFloatOrNull(line.rushing_fumbles_lost),
  rushing_epa:                 toFloatOrNull(line.rushing_epa),
  rushing_2pt_conversions:     (line.rushing_2pt_conversions IN ["1","true","TRUE","True"]),
  yards_per_carry:             CASE
                                  WHEN toFloatOrNull(line.carries) IS NOT NULL AND toFloatOrNull(line.carries) <> 0
                                  THEN toFloatOrNull(line.rushing_yards) / toFloatOrNull(line.carries)
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
  receiving_2pt_conversions:   (line.receiving_2pt_conversions IN ["1","true","TRUE","True"]),

  // shares & advanced
  target_share:                toFloatOrNull(line.target_share),
  air_yards_share:             toFloatOrNull(line.air_yards_share),
  racr:                        toFloatOrNull(line.racr),
  wopr:                        toFloatOrNull(line.wopr),
  pacr:                        toFloatOrNull(line.pacr),

  // defense totals (kept as separate fields too)
  def_sacks:                   toFloatOrNull(line.def_sacks),
  def_sack_yards:              toFloatOrNull(line.def_sack_yards),

  // specials/fantasy
  special_teams_tds:           toFloatOrNull(line.special_teams_tds),
  fantasy_points:              toFloatOrNull(line.fantasy_points),
  fantasy_points_ppr:          toFloatOrNull(line.fantasy_points_ppr),

  // derived from matched Game scores (boolean like your prior schema)
  won:                         CASE
                                  WHEN line.team = g.home_team
                                    THEN toFloatOrNull(g.home_score) > toFloatOrNull(g.away_score)
                                  ELSE toFloatOrNull(g.away_score) > toFloatOrNull(g.home_score)
                                END
}


RETURN pg
LIMIT 5;
"""

result = driver.execute_query(load_2025_playergames)
print(result)
