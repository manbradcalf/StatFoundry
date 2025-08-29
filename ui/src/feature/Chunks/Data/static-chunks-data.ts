import { Chunk } from "../Types/Chunk";
import {
  generateFilterChunks,
  generatePlayFilterChunks,
  FilterableProperty,
} from "./static-chunk-generator";
import {
  generatePositionChunks,
  generateEntityRelationshipChunks,
  generatePlayerInfoChunks,
  generatePlayChunks,
} from "./entity-chunk-generators";
import { generatePlayerGameConstraintChunks } from "./player-game-constraint-generators";
import { generatePlayerSeasonConstraintChunks } from "./player-season-constraint-generator";
import { SlotType } from "../Enums/SlotType";
import { generatePlayConstraintChunks } from "./play-constraint-generators";

// TODO: This is the part that should be automatically built on startup based on our /schema endpoint response
// Consolidated stat definitions
const PASSING_STATS: FilterableProperty[] = [
  { key: "attempts", type: "number", defaultValue: 20 },
  { key: "completions", type: "number", defaultValue: 15 },
  { key: "passing_yards", type: "number", defaultValue: 300 },
  { key: "passing_tds", type: "number", defaultValue: 2 },
  { key: "interceptions", type: "number", defaultValue: 1 },
  { key: "passing_air_yards", type: "number", defaultValue: 200 },
  { key: "passing_first_downs", type: "number", defaultValue: 10 },
  { key: "passing_epa", type: "number", defaultValue: 5 },
  { key: "passing_fumbles", type: "number", defaultValue: 1 },
  { key: "passing_fumbles_lost", type: "number", defaultValue: 1 },
  { key: "passing_fumbles_recovered", type: "number", defaultValue: 1 },
  // todo: 2pt_conversions are a bool in the db. Why?
  // { key: "passing_2pt_conversions", type: "number", defaultValue: 1 },
];

const RUSHING_STATS: FilterableProperty[] = [
  { key: "rushing_yards", type: "number", defaultValue: 100 },
  { key: "rushing_yards", type: "number", defaultValue: 100 },
  { key: "rushing_tds", type: "number", defaultValue: 1 },
  { key: "rushing_first_downs", type: "number", defaultValue: 5 },
  { key: "rushing_epa", type: "number", defaultValue: 3 },
  { key: "rushing_fumbles", type: "number", defaultValue: 1 },
  { key: "rushing_fumbles_lost", type: "number", defaultValue: 1 },
  { key: "carries", type: "number", defaultValue: 15 },
  { key: "yards_per_carry", type: "number", defaultValue: 3 },
  // todo: 2pt_conversions are a bool in the db. Why?
  // { key: "rushing_2pt_conversions", type: "number", defaultValue: 1 },
];

const RECEIVING_STATS: FilterableProperty[] = [
  { key: "receiving_yards", type: "number", defaultValue: 100 },
  { key: "receptions", type: "number", defaultValue: 5 },
  { key: "receiving_tds", type: "number", defaultValue: 1 },
  { key: "receiving_air_yards", type: "number", defaultValue: 80 },
  { key: "receiving_first_downs", type: "number", defaultValue: 5 },
  { key: "receiving_epa", type: "number", defaultValue: 3 },
  { key: "receiving_fumbles", type: "number", defaultValue: 1 },
  { key: "receiving_fumbles_lost", type: "number", defaultValue: 1 },
  { key: "air_yards_share", type: "number", defaultValue: 0.2 },
  { key: "targets", type: "number", defaultValue: 8 },
  { key: "target_share", type: "number", defaultValue: 0.15 },
  // todo: 2pt_conversions are a bool in the db. Why?
  // { key: "receiving_2pt_conversions", type: "number", defaultValue: 1 },
];
const FANTASY_STATS: FilterableProperty[] = [
  { key: "fantasy_points", type: "number", defaultValue: 10 },
  { key: "fantasy_points_ppr", type: "number", defaultValue: 10 },
];

// TODO: boolean vals here may need to be updated in db to true/false, as they are now 0.0 and 1.0
const PLAY_PROPERTIES: FilterableProperty[] = [
  // Core identifiers
  { key: "season", type: "number", defaultValue: 2024 },
  { key: "posteam", type: "string", defaultValue: "MIN" },
  { key: "defteam", type: "string", defaultValue: "GB" },
  { key: "home_team", type: "string", defaultValue: "WAS" },
  { key: "away_team", type: "string", defaultValue: "ARI" },

  // Play context
  { key: "down", type: "number", defaultValue: 3 },
  { key: "ydstogo", type: "number", defaultValue: 7 },
  { key: "qtr", type: "number", defaultValue: 4 },
  { key: "yards_gained", type: "number", defaultValue: 10 },
  { key: "yrdln", type: "string", defaultValue: "WAS 28" },
  { key: "play_type", type: "string", defaultValue: "pass" },

  // Passing specific
  { key: "air_yards", type: "number", defaultValue: 6 },
  { key: "receiving_yards", type: "number", defaultValue: 6 },
  { key: "pass_location", type: "string", defaultValue: "right" },
  { key: "pass_length", type: "string", defaultValue: "short" },
  { key: "route", type: "string", defaultValue: "HITCH" },

  // Advanced metrics
  { key: "epa", type: "number", defaultValue: 0.5 },
  { key: "wpa", type: "number", defaultValue: 0.05 },
  { key: "wp", type: "number", defaultValue: 0.5 },
  { key: "td_prob", type: "number", defaultValue: 0.38 },
  { key: "cp", type: "number", defaultValue: 0.75 },

  // Situational booleans
  { key: "success", type: "boolean", defaultValue: true },
  { key: "shotgun", type: "boolean", defaultValue: true },
  { key: "no_huddle", type: "boolean", defaultValue: false },
  { key: "goal_to_go", type: "boolean", defaultValue: false },
  { key: "touchdown", type: "boolean", defaultValue: false },
  { key: "complete_pass", type: "boolean", defaultValue: true },
  { key: "sack", type: "boolean", defaultValue: false },
  { key: "interception", type: "boolean", defaultValue: false },
  { key: "fumble", type: "boolean", defaultValue: false },

  // Personnel & Formation
  { key: "offense_formation", type: "string", defaultValue: "SHOTGUN" },
  {
    key: "offense_personnel",
    type: "string",
    defaultValue: "1 RB, 1 TE, 3 WR",
  },
  {
    key: "defense_personnel",
    type: "string",
    defaultValue: "2 DL, 4 LB, 5 DB",
  },
  { key: "defense_coverage_type", type: "string", defaultValue: "COVER_3" },
  {
    key: "defense_man_zone_type",
    type: "string",
    defaultValue: "ZONE_COVERAGE",
  },

  // TODO: Write this to the Game nodes
  // Game context
  { key: "weather", type: "string", defaultValue: "Cloudy" },
  { key: "roof", type: "string", defaultValue: "outdoors" },
  { key: "div_game", type: "boolean", defaultValue: false },
];

const PLAYER_SEASON_PROPERTIES: FilterableProperty[] = [
  {
    key: "season",
    type: "number",
    defaultValue: 2024,
  },
];

// Generate all stat chunks
const PASSING_SEASON_CHUNKS = generateFilterChunks(
  PASSING_STATS,
  "season",
  SlotType.SelectPassingStats,
);
const PASSING_GAME_CHUNKS = generateFilterChunks(
  PASSING_STATS,
  "game",
  SlotType.SelectPassingStats,
);

const RUSHING_SEASON_CHUNKS = generateFilterChunks(
  RUSHING_STATS,
  "season",
  SlotType.SelectFlexStatsSeason,
);
const RUSHING_GAME_CHUNKS = generateFilterChunks(
  RUSHING_STATS,
  "game",
  SlotType.SelectFlexStatsGame,
);

const RECEIVING_SEASON_CHUNKS = generateFilterChunks(
  RECEIVING_STATS,
  "season",
  SlotType.SelectFlexStatsSeason,
);
const RECEIVING_GAME_CHUNKS = generateFilterChunks(
  RECEIVING_STATS,
  "game",
  SlotType.SelectFlexStatsGame,
);

const FANTASY_GAME_CHUNKS = generateFilterChunks(
  FANTASY_STATS,
  "game",
  SlotType.FilterValue,
);

const FANTASY_SEASON_CHUNKS = generateFilterChunks(
  FANTASY_STATS,
  "season",
  SlotType.FilterValue,
);

const PLAY_CHUNKS = generatePlayFilterChunks(
  PLAY_PROPERTIES,
  SlotType.FilterValue,
);

const PLAYER_SEASON_CHUNKS = generateFilterChunks(
  PLAYER_SEASON_PROPERTIES,
  "season",
  SlotType.FilterValue,
);
/**
 * Simplified chunk data structure that consolidates all chunks using generators
 */
export function getAllChunksSimplified(): Chunk[] {
  return [
    // Generated entity and relationship chunks
    ...generatePositionChunks(),
    ...generatePlayChunks(),
    ...generateEntityRelationshipChunks(),
    ...generatePlayerInfoChunks(),
    ...generatePlayerGameConstraintChunks(),
    ...generatePlayerSeasonConstraintChunks(),
    ...generatePlayConstraintChunks(),

    // Generated stat chunks
    ...PASSING_SEASON_CHUNKS,
    ...PASSING_GAME_CHUNKS,
    ...RUSHING_SEASON_CHUNKS,
    ...RUSHING_GAME_CHUNKS,
    ...RECEIVING_SEASON_CHUNKS,
    ...RECEIVING_GAME_CHUNKS,
    ...FANTASY_GAME_CHUNKS,
    ...FANTASY_SEASON_CHUNKS,

    // Generated general entity properties
    ...PLAY_CHUNKS,
    // TODO: GAME_CHUNKS,
    // TODO: SEASON_CHUNKS,
    ...PLAYER_SEASON_CHUNKS,
    // TODO: PLAYER_GAME_CHUNKS
  ];
}
