import { Chunk } from "./Chunk";
import { Entity } from "./EntityTypes/Entity";

/**
 * Node in the linked-list chain of chunks.
 * Use explicit null for next/prev to avoid TS assignment issues.
 */
export interface ChunkNode {
  chunk: Chunk<Entity>;
  next: ChunkNode | null;
  prev: ChunkNode | null;
}
