import { Chunk } from "../Types/Chunk";
import {
  generateStatChunks,
  generatePlayStatChunks,
  StatDefinition,
} from "./stat-chunk-generator";
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
const PASSING_STATS: StatDefinition[] = [
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

const RUSHING_STATS: StatDefinition[] = [
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

const RECEIVING_STATS: StatDefinition[] = [
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
const FANTASY_STATS: StatDefinition[] = [
  { key: "fantasy_points", type: "number", defaultValue: 10 },
  { key: "fantasy_points_ppr", type: "number", defaultValue: 10 },
];

// TODO: boolean vals here may need to be updated in db to true/false, as they are now 0.0 and 1.0
const PLAY_STATS: StatDefinition[] = [
  { key: "epa", type: "number", defaultValue: 0.5 },
  { key: "wpa", type: "number", defaultValue: 0.05 },
  { key: "yards_gained", type: "number", defaultValue: 10 },
  { key: "down", type: "number", defaultValue: 3 },
  { key: "yards_to_go", type: "number", defaultValue: 7 },
  { key: "yrdln", type: "number", defaultValue: "WAS 36" },
  { key: "quarter", type: "number", defaultValue: 4 },
  { key: "score_differential", type: "number", defaultValue: 7 },
  { key: "success", type: "boolean", defaultValue: true },
  { key: "shotgun", type: "boolean", defaultValue: true },
  { key: "no_huddle", type: "boolean", defaultValue: true },
  { key: "red_zone", type: "boolean", defaultValue: true },
  { key: "goal_to_go", type: "boolean", defaultValue: true },
  { key: "touchdown", type: "boolean", defaultValue: true },
  { key: "first_down", type: "boolean", defaultValue: true },
  { key: "complete_pass", type: "boolean", defaultValue: true },
  { key: "receiver", type: "string", defaultValue: "J. Jefferson" },
  { key: "wp", type: "number", defaultValue: 0.5 },
  { key: "tdprob", type: "number", defaultValue: 0.2 },
  { key: "defense_coverage_type", type: "string", defaultValue: "COVER_4" },
  { key: "vegas_wp", type: "number", defaultValue: 0.75 },
  {
    key: "defense_man_zone_type",
    type: "string",
    defaultValue: "ZONE_COVERAGE",
  },
  { key: "stadium", type: "string", defaultValue: "Commander's Field" },
  { key: "spread_line", type: "number", defaultValue: 7.0 },
  { key: "drive_play_count", type: "number", defaultValue: 3.0 },
];

// Generate all stat chunks
const PASSING_SEASON_CHUNKS = generateStatChunks(
  PASSING_STATS,
  "season",
  SlotType.SelectPassingStats,
);
const PASSING_GAME_CHUNKS = generateStatChunks(
  PASSING_STATS,
  "game",
  SlotType.SelectPassingStats,
);

const RUSHING_SEASON_CHUNKS = generateStatChunks(
  RUSHING_STATS,
  "season",
  SlotType.SelectFlexStatsSeason,
);
const RUSHING_GAME_CHUNKS = generateStatChunks(
  RUSHING_STATS,
  "game",
  SlotType.SelectFlexStatsGame,
);

const RECEIVING_SEASON_CHUNKS = generateStatChunks(
  RECEIVING_STATS,
  "season",
  SlotType.SelectFlexStatsSeason,
);
const RECEIVING_GAME_CHUNKS = generateStatChunks(
  RECEIVING_STATS,
  "game",
  SlotType.SelectFlexStatsGame,
);

const FANTASY_GAME_CHUNKS = generateStatChunks(
  FANTASY_STATS,
  "game",
  SlotType.FilterValue,
);

const FANTASY_SEASON_CHUNKS = generateStatChunks(
  FANTASY_STATS,
  "season",
  SlotType.FilterValue,
);

const PLAY_CHUNKS = generatePlayStatChunks(PLAY_STATS, SlotType.FilterValue);

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

    // Generated play chunks
    ...PLAY_CHUNKS,
  ];
}
