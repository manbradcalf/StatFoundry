import { useMemo, useCallback } from 'react';
import { ChunkChain } from '../feature/Chunks/ChunkChain';
import { Chunk } from '../feature/Chunks/Types/Chunk';
import { getAvailableChunks } from '../feature/Chunks/Data/chunks-data';
import { Suggestion } from '../contexts/Suggestion';
import Fuse from 'fuse.js';

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
  insertingAtIndex
}: UseSuggestionEngineParams): UseSuggestionEngineReturn => {

  // Extract the partial input that the user is currently typing
  const getPartialInput = useCallback((): string => {
    if (chain.English.length === 0) return query.trim();

    // If the query is longer than the english, extract the partial input
    if (query.length > chain.English.length) {
      const partial = query.substring(chain.English.length).trim();
      // Remove leading "and " if present
      return partial.startsWith('and ') ? partial.substring(4).trim() : partial;
    }

    return '';
  }, [query, chain.English]);

  // Generate contextually relevant suggestions after a chunk is added to the chain
  const showNextSuggestions = useCallback((): Suggestion[] => {
    const availableChunks = getAvailableChunks();
    const validNextChunks = chain.getNextValidChunksFromChunks(availableChunks);

    if (validNextChunks.length === 0) return [];

    // Apply intelligent sorting based on context
    return validNextChunks
      .sort((a, b) => {
        // Context-aware auto-suggestions based on what was just added
        const lastChunk = chain.toArray().slice(-1)[0];
        if (lastChunk) {
          const lastChunkText = lastChunk.English.toLowerCase();
          const aText = a.English.toLowerCase();
          const bText = b.English.toLowerCase();

          // Prioritize related suggestions
          if (lastChunkText.includes('running back')) {
            if (aText.includes('rush') || aText.includes('carry')) return -1;
            if (bText.includes('rush') || bText.includes('carry')) return 1;
          }

          if (lastChunkText.includes('receiver') || lastChunkText.includes('wide receiver')) {
            if (aText.includes('catch') || aText.includes('receiv') || aText.includes('target')) return -1;
            if (bText.includes('catch') || bText.includes('receiv') || bText.includes('target')) return 1;
          }
        }

        return a.English.localeCompare(b.English);
      })
      .slice(0, 8) // Fewer auto-suggestions to avoid overwhelming
      .map(chunk => ({
        chunk,
        displayText: "and " + chunk.English
      }));
  }, [chain]);

  // Generate suggestions based on current query and chain state
  const suggestions = useMemo((): Suggestion[] => {
    // Skip if query exactly matches chain.English to prevent race conditions
    if (query === chain.English) {
      return [];
    }

    // Clear suggestions if query is empty
    if (query.trim() === '') {
      return [];
    }

    const availableChunks = getAvailableChunks();
    const partialInput = getPartialInput();

    // If inserting, create a partial chain up to the insertion point
    let contextChain = chain;
    if (insertingAtIndex !== null && insertingAtIndex !== undefined) {
      contextChain = new ChunkChain();
      const chainArray = chain.toArray();
      for (let i = 0; i < insertingAtIndex; i++) {
        contextChain.append(chainArray[i]);
      }
      contextChain.compile();
    }

    const validNextChunks = contextChain.getNextValidChunksFromChunks(availableChunks);

    // Intelligent filtering: prioritize suggestions based on context
    const prioritizedSuggestions: Chunk[] = (() => {
      if (!partialInput) return validNextChunks;
      const fuse = new Fuse(validNextChunks, { keys: ['English'], threshold: 0.7 });
      return fuse.search(partialInput).map(result => result.item);
    })();

    return prioritizedSuggestions.sort((a, b) => {
      // Smart prioritization based on chain context
      const aText = a.English.toLowerCase();
      const bText = b.English.toLowerCase();
      const input = partialInput.toLowerCase();

      // Exact matches first
      if (aText.startsWith(input) && !bText.startsWith(input)) return -1;
      if (bText.startsWith(input) && !aText.startsWith(input)) return 1;

      // Context-aware suggestions
      const lastChunk = chain.toArray().slice(-1)[0];
      if (lastChunk) {
        const lastChunkText = lastChunk.English.toLowerCase();

        // Simple context matching - can be expanded based on domain knowledge
        if (lastChunkText.includes('running back') || lastChunkText.includes('rush')) {
          if (aText.includes('rush') || aText.includes('yard')) return -1;
          if (bText.includes('rush') || bText.includes('yard')) return 1;
        }

        if (lastChunkText.includes('receiver') || lastChunkText.includes('catch')) {
          if (aText.includes('catch') || aText.includes('receiv') || aText.includes('target')) return -1;
          if (bText.includes('catch') || bText.includes('receiv') || bText.includes('target')) return 1;
        }
      }

      // Alphabetical fallback
      return aText.localeCompare(bText);
    })
      .slice(0, 10) // Limit to top 10 suggestions for performance
      .map(chunk => ({
        chunk,
        displayText: chain.toArray().length > 0 ? "and " + chunk.English : chunk.English
      }));
  }, [query, chain, getPartialInput, insertingAtIndex]);

  return {
    suggestions,
    showNextSuggestions
  };
};
