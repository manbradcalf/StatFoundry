import { Chunk } from "../Types/Chunk";
import { getAllChunksSimplified } from "./chunks-data-simplified";

export function getAllChunks(): Chunk[] {
  return getAllChunksSimplified();
}
