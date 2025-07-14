export const FLEX_STATS = [
  { key: "rushing_yards", type: "number" },
  { key: "rushing_tds", type: "number" },
  { key: "rushing_first_downs", type: "number" },
  { key: "rushing_epa", type: "number" },
  { key: "rushing_2pt_conversions", type: "number" },
  { key: "rushing_fumbles", type: "number" },
  { key: "rushing_fumbles_lost", type: "number" },
  { key: "carries", type: "number" },
  { key: "receiving_yards", type: "number" },
  { key: "receptions", type: "number" },
  { key: "receiving_tds", type: "number" },
  { key: "receiving_air_yards", type: "number" },
  { key: "receiving_first_downs", type: "number" },
  { key: "receiving_epa", type: "number" },
  { key: "receiving_2pt_conversions", type: "number" },
  { key: "receiving_fumbles", type: "number" },
  { key: "receiving_fumbles_lost", type: "number" },
  { key: "air_yards_share", type: "number" },
  { key: "target_share", type: "number" }
];

export const FLEX_STATS_SEASON = [
  ...FLEX_STATS,
  { key: "teams", type: "string" }, // many teams per player per season
]

export const FLEX_STATS_GAME = [
  ...FLEX_STATS,
  { key: "recent_team", type: "string" }, // one team per player per game
]
