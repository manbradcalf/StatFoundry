import { useMemo } from "react";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import generatedChunksData from "../feature/Chunks/Data/generated-chunks.json";

export interface UseChunkGeneratorResult {
  generatedChunks: Chunk[];
  allChunks: Chunk[];
  isLoading: boolean;
  error: string | null;
}

export function useChunkGenerator(): UseChunkGeneratorResult {
  const generatedChunks = useMemo(() => generatedChunksData as Chunk[], []);
  const allChunks = useMemo(() => [...generatedChunks], [generatedChunks]);

  return {
    generatedChunks,
    allChunks,
    isLoading: false, // Never loading since everything is static
    error: null, // No runtime errors since no async operations
  };
}
