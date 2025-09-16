export const DIVISION_STATS = [
  { key: "name", type: "string" },
];

export const DIVISION_STATS_SEASON = [
  ...DIVISION_STATS,
  { key: "teams", type: "string" }, // many teams per player per season
];

export const DIVISION_STATS_GAME = [
  ...DIVISION_STATS,
  { key: "recent_team", type: "string" }, // one team per player per game
];
