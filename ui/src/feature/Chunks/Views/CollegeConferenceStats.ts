export const COLLEGECONFERENCE_STATS = [
  { key: "name", type: "string" },
];

export const COLLEGECONFERENCE_STATS_SEASON = [
  ...COLLEGECONFERENCE_STATS,
  { key: "teams", type: "string" }, // many teams per player per season
];

export const COLLEGECONFERENCE_STATS_GAME = [
  ...COLLEGECONFERENCE_STATS,
  { key: "recent_team", type: "string" }, // one team per player per game
];
