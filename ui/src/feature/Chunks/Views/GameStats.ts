export const GAME_STATS = [
  { key: "location", type: "string" },
  { key: "pff", type: "string" },
  { key: "overtime", type: "number" },
  { key: "referee", type: "string" },
  { key: "away_moneyline", type: "string" },
  { key: "home_rest", type: "number" },
  { key: "away_score", type: "number" },
  { key: "under_odds", type: "number" },
  { key: "display_score", type: "string" },
  { key: "total_line", type: "number" },
  { key: "home_moneyline", type: "string" },
  { key: "surface", type: "string" },
  { key: "wind", type: "number" },
  { key: "game_type", type: "string" },
  { key: "away_team", type: "string" },
  { key: "temp", type: "number" },
  { key: "spread_line", type: "number" },
  { key: "away_rest", type: "number" },
  { key: "gsis", type: "number" },
  { key: "home_coach", type: "string" },
  { key: "ftn", type: "string" },
  { key: "roof", type: "string" },
  { key: "home_team", type: "string" },
  { key: "div_game", type: "boolean" },
  { key: "total", type: "number" },
  { key: "home_score", type: "number" },
  { key: "gametime", type: "string" },
  { key: "winner", type: "string" },
  { key: "gameday", type: "string" },
  { key: "over_odds", type: "number" },
  { key: "home_spread_odds", type: "number" },
  { key: "away_spread_odds", type: "number" },
  { key: "weekday", type: "string" },
  { key: "espn", type: "number" },
  { key: "away_coach", type: "string" },
  { key: "pfr", type: "string" },
  { key: "result", type: "number" },
  { key: "stadium", type: "string" },
];

export const GAME_STATS_SEASON = [
  ...GAME_STATS,
  { key: "teams", type: "string" }, // many teams per player per season
];

export const GAME_STATS_GAME = [
  ...GAME_STATS,
  { key: "recent_team", type: "string" }, // one team per player per game
];
