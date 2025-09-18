export const GAME_PROPERTIES = [
  { key: "season", type: "number" },
  { key: "week", type: "number" },
  { key: "display_score", type: "string" },
  { key: "winner", type: "string" },
  { key: "home_team", type: "string" },
  { key: "away_team", type: "string" },
  { key: "home_score", type: "number" },
  { key: "away_score", type: "number" },
  { key: "result", type: "number" },
  { key: "home_rest", type: "number" },
  { key: "game_type", type: "string" },
  { key: "away_rest", type: "number" },
  { key: "div_game", type: "boolean" },
  { key: "total", type: "number" },
  { key: "gametime", type: "string" },
  { key: "gameday", type: "datetime" },
  { key: "weekday", type: "string" },
  { key: "overtime", type: "number" },
];

export const GAME_PROPERTIES_PEOPLE = [
  { key: "home_coach", type: "string" },
  { key: "away_coach", type: "string" },
  { key: "referee", type: "string" },
];
export const GAME_PROPERTIES_PLACE = [
  { key: "roof", type: "string" },
  { key: "surface", type: "string" },
  { key: "wind", type: "number" },
  { key: "temp", type: "number" },
  { key: "stadium", type: "string" },
  { key: "location", type: "string" },
];

export const GAME_PROPERTIES_BETTING = [
  { key: "home_spread_odds", type: "number" },
  { key: "away_spread_odds", type: "number" },
  { key: "over_odds", type: "number" },
  { key: "under_odds", type: "number" },
  { key: "away_moneyline", type: "string" },
  { key: "home_moneyline", type: "string" },
  { key: "total_line", type: "number" },
  { key: "spread_line", type: "number" },
];
export const GAME_PROPERTIES_IDS = [
  { key: "game_id", type: "string" },
  { key: "pfr", type: "string" },
  { key: "pff", type: "string" },
  { key: "ftn", type: "string" },
  { key: "gsis", type: "number" },
  { key: "espn", type: "number" },
];
export const GAME_STATS_SEASON = [
  ...GAME_PROPERTIES,
  { key: "teams", type: "string" }, // many teams per player per season
];

export const GAME_STATS_GAME = [
  ...GAME_PROPERTIES,
  { key: "recent_team", type: "string" }, // one team per player per game
];
