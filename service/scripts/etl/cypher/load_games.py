from src.neo4j_client import driver

load_2025_games = """
    // LOAD and Merge Games from NFLVerse CSV
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/nflverse/nfldata/master/data/games.csv' AS line
WITH line
WHERE
  toInteger(line.season) = 2025 AND
  line.game_id IS NOT NULL AND
  line.game_id <> ''

// 1) MERGE ONLY on the stable identifier
MERGE (g:Game {game_id: line.game_id})

// 2) Build a props map with safe casts (no NaN)
WITH
  g,
  line,
  {
    total: toFloatOrNull(line.total),
    result: toFloatOrNull(line.result),
    espn: toIntegerOrNull(line.espn),
    game_type: line.game_type,
    surface: line.surface,
    gsis: toIntegerOrNull(line.gsis),
    location: line.location,
    home_moneyline: line.home_moneyline,
    old_game_id: toIntegerOrNull(line.old_game_id),
    div_game: toBooleanOrNull(line.div_game),
    stadium_id: line.stadium_id,
    under_odds: line.under_odds,
    home_spread_odds: line.home_spread_odds,
    weekday: line.weekday,
    over_odds: line.over_odds,
    home_qb_id: line.home_qb_id,
    away_moneyline: line.away_moneyline,
    away_team: line.away_team,
    pfr: line.pfr,
    away_qb_id: line.away_qb_id,
    spread_line: toFloatOrNull(line.spread_line),
    home_team: line.home_team,
    away_spread_odds: line.away_spread_odds,
    home_coach: line.home_coach,
    gametime: line.gametime,
    wind: toFloatOrNull(line.wind),
    away_qb_name: line.away_qb_name,
    away_coach: line.away_coach,
    home_score: toFloatOrNull(line.home_score),
    away_rest: toIntegerOrNull(line.away_rest),
    away_score: toFloatOrNull(line.away_score),
    total_line: toFloatOrNull(line.total_line),
    roof: line.roof,
    season: toIntegerOrNull(line.season),
    ftn: line.ftn,
    referee: line.referee,
    stadium: line.stadium,
    home_qb_name: line.home_qb_name,
    temp: toFloatOrNull(line.temp),
    home_rest: toIntegerOrNull(line.home_rest),
    overtime: toFloatOrNull(line.overtime),
    week: toIntegerOrNull(line.week),
    // CSV is ISO like 2024-09-05T00:00:00Z; guard blanks:
    gameday:
      CASE
        WHEN
          line.gameday IS NOT NULL AND line.gameday <> ''
          THEN datetime(line.gameday)
      END
  } AS raw

// 3) (Optional) drop null/empty-string props (requires APOC)
WITH g, apoc.map.clean(raw, [null, ''], [true]) AS cleaned
SET g += cleaned
RETURN g
    """

try:
    result = driver.execute_query(load_2025_games)
    catch:
