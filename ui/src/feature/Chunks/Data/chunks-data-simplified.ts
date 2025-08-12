import { Chunk } from "../Types/Chunk";
import { generateStatChunks, StatDefinition } from "./stat-chunk-generator";
import {
  generatePositionChunks,
  generateEntityRelationshipChunks,
  generatePlayerInfoChunks,
} from "./entity-chunk-generators";
import {
  generatePlayerGameConstraints,
  generatePlayerSeasonConstraints,
} from "./game-constraint-generators";
import { SlotType } from "../Enums/SlotType";

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

/**
 * Simplified chunk data structure that consolidates all chunks using generators
 */
export function getAllChunksSimplified(): Chunk[] {
  return [
    // Generated entity and relationship chunks
    ...generatePositionChunks(),
    ...generateEntityRelationshipChunks(),
    ...generatePlayerInfoChunks(),
    ...generatePlayerGameConstraints(),
    ...generatePlayerSeasonConstraints(),

    // Generated stat chunks
    ...PASSING_SEASON_CHUNKS,
    ...PASSING_GAME_CHUNKS,
    ...RUSHING_SEASON_CHUNKS,
    ...RUSHING_GAME_CHUNKS,
    ...RECEIVING_SEASON_CHUNKS,
    ...RECEIVING_GAME_CHUNKS,
  ];
}
