import { Chunk } from "../Types/Chunk";
import { PLAYER_INFO_CHUNKS } from "./player-info-chunks";
import { PLAYER_GAME_CHUNKS } from "./playergame-chunks";
import { PASSING_STATS_CHUNKS } from "./passing-stats-chunks";
import { RECEIVING_STATS_CHUNKS } from "./receiving-stats-chunks";
import { RUSHING_STATS_CHUNKS } from "./rushing-stats-chunks";
import { MATCH_ENTITY_CHUNKS } from "./match-entity-chunks";

export function getAvailableChunks(): Chunk[] {
  console.log(...RUSHING_STATS_CHUNKS)
  return [
    ...MATCH_ENTITY_CHUNKS,
    ...PLAYER_INFO_CHUNKS,
    ...PLAYER_GAME_CHUNKS,
    ...PASSING_STATS_CHUNKS,
    ...RECEIVING_STATS_CHUNKS,
    ...RUSHING_STATS_CHUNKS,
  ];
}
