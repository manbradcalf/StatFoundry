export const PASSING_STATS = [
  { key: "attempts", type: "number" },
  { key: "completions", type: "number" },
  { key: "passing_yards", type: "number" },
  { key: "passing_tds", type: "number" },
  { key: "interceptions", type: "number" },
  { key: "passing_air_yards", type: "number" },
  { key: "passing_first_downs", type: "number" },
  { key: "passing_epa", type: "number" },
  { key: "passing_2pt_conversions", type: "number" },
];

export const PASSING_STATS_SEASON = [
  ...PASSING_STATS,
  { key: "teams", type: "string" }, // many teams per player per season
];

export const PASSING_STATS_GAME = [
  ...PASSING_STATS,
  { key: "recent_team", type: "string" }, // one team per player per game
];
