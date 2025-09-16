export const PLAYER_STATS = [
  { key: "position_group", type: "string" },
  { key: "status_description_abbr", type: "string" },
  { key: "suffix", type: "string" },
  { key: "headshot", type: "string" },
  { key: "status_short_description", type: "string" },
  { key: "draft_club", type: "string" },
  { key: "rookie_year", type: "number" },
  { key: "college_conference", type: "string" },
  { key: "status", type: "string" },
  { key: "uniform_number", type: "string" },
  { key: "entry_year", type: "number" },
  { key: "jersey_number", type: "number" },
  { key: "years_of_experience", type: "number" },
  { key: "birth_date", type: "string" },
  { key: "draftround", type: "number" },
  { key: "height", type: "number" },
  { key: "weight", type: "number" },
  { key: "draft_number", type: "number" },
];

export const PLAYER_STATS_SEASON = [
  ...PLAYER_STATS,
  { key: "teams", type: "string" }, // many teams per player per season
];

export const PLAYER_STATS_GAME = [
  ...PLAYER_STATS,
  { key: "recent_team", type: "string" }, // one team per player per game
];
