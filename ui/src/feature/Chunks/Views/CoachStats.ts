export const COACH_STATS = [
  { key: "name", type: "string" },
];

export const COACH_STATS_SEASON = [
  ...COACH_STATS,
  { key: "teams", type: "string" }, // many teams per player per season
];

export const COACH_STATS_GAME = [
  ...COACH_STATS,
  { key: "recent_team", type: "string" }, // one team per player per game
];
