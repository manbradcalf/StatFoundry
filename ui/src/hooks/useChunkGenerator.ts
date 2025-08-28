import { useState, useEffect, useCallback, useMemo } from 'react';
import { Chunk } from '../feature/Chunks/Types/Chunk';
import { DynamicChunkGenerator } from '../feature/Chunks/Services/DynamicChunkGenerator';
import { getAllChunks } from '../feature/Chunks/Data/chunks-data';

export interface UseChunkGeneratorResult {
  staticChunks: Chunk[];
  dynamicChunks: Chunk[];
  allChunks: Chunk[];
  isLoading: boolean;
  error: string | null;
  refreshDynamicChunks: () => Promise<void>;
}

export function useChunkGenerator(): UseChunkGeneratorResult {
  const [dynamicChunks, setDynamicChunks] = useState<Chunk[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generator] = useState(() => new DynamicChunkGenerator());

  const staticChunks = useMemo(() => getAllChunks(), []);

  const loadDynamicChunks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const chunks = await generator.generateChunks();
      setDynamicChunks(chunks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate dynamic chunks';
      setError(errorMessage);
      console.error('Error generating dynamic chunks:', err);
    } finally {
      setIsLoading(false);
    }
  }, [generator]);

  const refreshDynamicChunks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const chunks = await generator.refreshChunks();
      setDynamicChunks(chunks);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh dynamic chunks';
      setError(errorMessage);
      console.error('Error refreshing dynamic chunks:', err);
    } finally {
      setIsLoading(false);
    }
  }, [generator]);

  useEffect(() => {
    loadDynamicChunks();
  }, [loadDynamicChunks]);

  const allChunks = useMemo(() => [...staticChunks, ...dynamicChunks], [staticChunks, dynamicChunks]);

  return {
    staticChunks,
    dynamicChunks,
    allChunks,
    isLoading,
    error,
    refreshDynamicChunks
  };
}