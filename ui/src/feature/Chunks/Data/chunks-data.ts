import { Chunk } from "../Types/Chunk";
import { getAllChunksSimplified } from "./static-chunks-data";

// Generate chunks once when the module is first imported
const ALL_CHUNKS: Chunk[] = getAllChunksSimplified();

export function getAllChunks(): Chunk[] {
  return ALL_CHUNKS;
}
