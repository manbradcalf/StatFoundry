import { useMemo, useEffect, useState } from "react";
import { ChunkChain } from "../feature/Chunks/ChunkChain";
import { getAllChunks } from "../feature/Chunks/Data/chunks-data";
import { Suggestion } from "../contexts/Suggestion";
import Fuse from "fuse.js";

interface UseSuggestionEngineParams {
  query: string;
  chain: ChunkChain;
  insertingAtIndex?: number | null;
}

interface UseSuggestionEngineReturn {
  suggestions: Suggestion[];
  showNextSuggestions: () => Suggestion[];
}

export const useSuggestionEngine = ({
  query,
  chain,
  insertingAtIndex,
}: UseSuggestionEngineParams): UseSuggestionEngineReturn => {
  const [chainSuggestions, setChainSuggestions] = useState<Suggestion[]>([]);

  // Get valid chunks for current context
  const getValidChunks = (contextChain: ChunkChain) => {
    const availableChunks = getAllChunks();
    return contextChain.getNextValidChunksFromChunks(availableChunks);
  };

  // Extract partial input from query
  const getPartialInput = (query: string, chainEnglish: string): string => {
    if (chainEnglish.length === 0) return query.trim();
    if (query.length > chainEnglish.length) {
      const partial = query.substring(chainEnglish.length).trim();
      return partial.startsWith("and ") ? partial.substring(4).trim() : partial;
    }
    return "";
  };

  // Create Fuse.js searcher
  const createFuseSearcher = (chunks: any[]) => {
    return new Fuse(chunks, {
      keys: ["English", "EnglishTemplate"],
      threshold: 0.3,
      includeScore: true,
    });
  };

  // Convert chunks to suggestions
  const chunksToSuggestions = (
    chunks: any[],
    hasChain: boolean
  ): Suggestion[] => {
    return chunks.map((chunk) => ({
      chunk,
      displayText: hasChain ? "and " + chunk.English : chunk.English,
    }));
  };

  // Memoize the context chain based on insertion state
  const contextChain = useMemo(() => {
    if (insertingAtIndex === null || insertingAtIndex === undefined) {
      return chain;
    }

    const newContextChain = new ChunkChain();
    const chainArray = chain.toArray();
    for (let i = 0; i < insertingAtIndex; i++) {
      newContextChain.append(chainArray[i]);
    }
    newContextChain.compile();
    return newContextChain;
  }, [chain, insertingAtIndex]);

  // Real-time suggestions based on typing
  const suggestions = useMemo((): Suggestion[] => {
    if (query === chain.English || query.trim() === "") {
      return chainSuggestions;
    }

    // Use the memoized contextChain
    const validChunks = getValidChunks(contextChain);
    const partialInput = getPartialInput(query, chain.English);

    if (!partialInput)
      return chunksToSuggestions(validChunks, chain.toArray().length > 0);

    const fuse = createFuseSearcher(validChunks);
    const results = fuse.search(partialInput).map((result) => result.item);

    return chunksToSuggestions(results, chain.toArray().length > 0);
  }, [query, contextChain, chainSuggestions, chain]);

  // Auto-generate suggestions when chain changes
  useEffect(() => {
    const validChunks = getValidChunks(chain);
    const fuse = createFuseSearcher(validChunks);

    // Use last chunk's English text as context for next suggestions
    const lastChunk = chain.toArray().slice(-1)[0];
    if (lastChunk && validChunks.length > 0) {
      const contextQuery = lastChunk.English;
      const results = fuse.search(contextQuery).map((result) => result.item);
      setChainSuggestions(chunksToSuggestions(results.slice(0, 8), true));
    } else {
      setChainSuggestions(
        chunksToSuggestions(validChunks.slice(0, 8), chain.toArray().length > 0)
      );
    }
  }, [chain, chain.English]); // Only trigger when chain English changes

  // Legacy function for backward compatibility
  const showNextSuggestions = () => chainSuggestions;

  return {
    suggestions,
    showNextSuggestions,
  };
};
