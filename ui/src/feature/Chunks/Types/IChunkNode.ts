import { Chunk } from "./Chunk";

/**
 * Node in the linked-list chain of chunks.
 * Use explicit null for next/prev to avoid TS assignment issues.
 */
export interface ChunkNode {
  chunk: Chunk;
  next: ChunkNode | null;
  prev: ChunkNode | null;
}
