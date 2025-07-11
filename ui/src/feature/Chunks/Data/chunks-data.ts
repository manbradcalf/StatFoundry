import { Chunk } from "../Types/Chunk";
import { PLAYER_INFO_CHUNKS } from "./player-info-chunks";
import { PLAYER_GAME_CHUNKS } from "./playergame-chunks";
import { PASSING_STATS_CHUNKS } from "./passing-stats-chunks";
import { FLEX_STATS_CHUNKS } from "./flex-stats-chunks";
import { MATCH_ENTITY_CHUNKS } from "./match-entity-chunks";

export function getAllChunks(): Chunk[] {
  return [
    ...MATCH_ENTITY_CHUNKS,
    ...PLAYER_INFO_CHUNKS,
    ...PLAYER_GAME_CHUNKS,
    ...PASSING_STATS_CHUNKS,
    ...FLEX_STATS_CHUNKS
  ];
}
