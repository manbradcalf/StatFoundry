export const COLLEGE_STATS = [
  { key: "name", type: "string" },
];

export const COLLEGE_STATS_SEASON = [
  ...COLLEGE_STATS,
  { key: "teams", type: "string" }, // many teams per player per season
];

export const COLLEGE_STATS_GAME = [
  ...COLLEGE_STATS,
  { key: "recent_team", type: "string" }, // one team per player per game
];
