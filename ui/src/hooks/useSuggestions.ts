import { useMemo } from "react";
import { ChunkChain } from "../feature/Chunks/ChunkChain";
import { getAllChunks } from "../feature/Chunks/Data/chunks-data";
import { Suggestion } from "../contexts/Suggestion";
import Fuse from "fuse.js";
import { Chunk } from "../feature/Chunks/Types/Chunk";

interface UseSuggestionsParams {
  query: string;
  chain: ChunkChain;
  insertingAtIndex?: number | null;
}

const SUGGESTION_LIMIT = 20

// Get valid chunks for current context
const getValidChunks = (contextChain: ChunkChain) => {
  const availableChunks = getAllChunks();
  return contextChain.getNextValidChunksFromChunks(availableChunks);
};

// Create Fuse.js searcher
const createFuseSearcher = (chunks: Chunk[]) => {
  return new Fuse(chunks, {
    keys: ["English", "EnglishTemplate","SuggestionKeywords"],
    threshold: 0.6,
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

// Get contextual suggestions when search bar is empty
const getContextualSuggestions = (validChunks: any[], chain: ChunkChain): Suggestion[] => {
  const chainArray = chain.toArray();

  if (validChunks.length === 0) {
    return [];
  }

  // Use last chunk's SuggestionKeywords text as context for next suggestions
  const lastChunk = chainArray.slice(-1)[0];
  if (lastChunk && validChunks.length > 0) {
    const fuse = createFuseSearcher(validChunks);
    const contextQuery = lastChunk.English;
    const results = fuse.search(contextQuery).map((result) => result.item);
    return chunksToSuggestions(results.slice(0, SUGGESTION_LIMIT), true);
  } else {
    return chunksToSuggestions(validChunks.slice(0, SUGGESTION_LIMIT), chainArray.length > 0);
  }
};

// Search chunks based on user input
const searchChunks = (validChunks: any[], query: string): Suggestion[] => {
  const fuse = createFuseSearcher(validChunks);
  const results = fuse.search(query).map((result) => result.item);
  return chunksToSuggestions(results, true);
};

export const useSuggestions = ({
  query,
  chain,
  insertingAtIndex,
}: UseSuggestionsParams): Suggestion[] => {
  // Determine the context chain based on insertion state
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

  return useMemo(() => {
    const validChunks = getValidChunks(contextChain);
    const chainArray = contextChain.toArray();
    const lastChunk = chainArray[chainArray.length - 1];

    // Special case: After MATCH_START, always show JUNCTION chunks regardless of query
    if (lastChunk?.QueryType === "MATCH_START") {
      const junctionChunks = validChunks.filter(chunk => chunk.QueryType === "JUNCTION");
      if (junctionChunks.length > 0) {
        return chunksToSuggestions(junctionChunks, true);
      }
    }

    if (query.trim() === "") {
      return getContextualSuggestions(validChunks, contextChain);
    } else {
      return searchChunks(validChunks, query);
    }
  }, [query, contextChain]);
};
