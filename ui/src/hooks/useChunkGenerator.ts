import { useMemo } from 'react';
import { Chunk } from '../feature/Chunks/Types/Chunk';
import { getAllChunks } from '../feature/Chunks/Data/chunks-data';
import generatedChunksData from '../feature/Chunks/Data/generated-chunks.json';

export interface UseChunkGeneratorResult {
  staticChunks: Chunk[];
  dynamicChunks: Chunk[];
  allChunks: Chunk[];
  isLoading: boolean;
  error: string | null;
  refreshDynamicChunks: () => Promise<void>;
}

export function useChunkGenerator(): UseChunkGeneratorResult {
  // Get chunks from static imports - no async operations needed!
  const staticChunks = useMemo(() => getAllChunks(), []);
  const dynamicChunks = useMemo(() => generatedChunksData as Chunk[], []);
  const allChunks = useMemo(() => [...staticChunks, ...dynamicChunks], [staticChunks, dynamicChunks]);

  // No-op refresh function for backward compatibility
  const refreshDynamicChunks = async () => {
    console.log('Dynamic chunks are now build-time generated. Run "npm run generate-chunks" to update.');
  };

  return {
    staticChunks,
    dynamicChunks,
    allChunks,
    isLoading: false, // Never loading since everything is static
    error: null, // No runtime errors since no async operations
    refreshDynamicChunks
  };
}