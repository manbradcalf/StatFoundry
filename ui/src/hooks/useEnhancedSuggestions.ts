import { useState, useEffect, useMemo } from "react";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { useDebounce } from "use-debounce";
import { useChunkGenerator } from "./useChunkGenerator";

export interface EnhancedChunkSuggestion {
  chunk: Chunk;
  matchScore: number;
  placeholders: string[];
  source: 'static' | 'dynamic';
  category: string;
}

export interface UseEnhancedSuggestionsOptions {
  includeStatic?: boolean;
  includeDynamic?: boolean;
  maxSuggestions?: number;
  prioritizeStatic?: boolean;
}

const defaultOptions: UseEnhancedSuggestionsOptions = {
  includeStatic: true,
  includeDynamic: true,
  maxSuggestions: 20,
  prioritizeStatic: true
};

export function useEnhancedSuggestions(
  searchTerm: string,
  options: UseEnhancedSuggestionsOptions = {}
) {
  const [suggestions, setSuggestions] = useState<EnhancedChunkSuggestion[]>([]);
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  
  const opts = { ...defaultOptions, ...options };
  const { staticChunks, dynamicChunks, isLoading, error } = useChunkGenerator();

  const chunks = useMemo(() => {
    const result: Array<{ chunk: Chunk; source: 'static' | 'dynamic' }> = [];
    
    if (opts.includeStatic) {
      result.push(...staticChunks.map(chunk => ({ chunk, source: 'static' as const })));
    }
    
    if (opts.includeDynamic) {
      result.push(...dynamicChunks.map(chunk => ({ chunk, source: 'dynamic' as const })));
    }
    
    return result;
  }, [staticChunks, dynamicChunks, opts.includeStatic, opts.includeDynamic]);

  useEffect(() => {
    if (!debouncedSearch) {
      setSuggestions([]);
      return;
    }

    const newSuggestions = chunks
      .map(({ chunk, source }) => {
        const english = chunk.English.toLowerCase();
        const search = debouncedSearch.toLowerCase();
        
        // Calculate match score with different weights
        let matchScore = 0;
        
        // Exact match bonus
        if (english.includes(search)) {
          matchScore += 100;
        }
        
        // Word boundary matches
        const words = search.split(' ');
        const englishWords = english.split(' ');
        
        words.forEach((word: string) => {
          if (englishWords.some(engWord => engWord.includes(word))) {
            matchScore += 50;
          }
        });
        
        // Fuzzy matching for typos
        if (matchScore === 0) {
          const similarity = calculateSimilarity(english, search);
          if (similarity > 0.6) {
            matchScore += Math.floor(similarity * 25);
          }
        }
        
        // Static chunk priority boost
        if (source === 'static' && opts.prioritizeStatic) {
          matchScore += 10;
        }

        // Extract placeholders from English template
        const placeholders = (chunk.EnglishTemplate || chunk.English)
          .match(/\{([^}]+)\}/g)?.map((p) => p.slice(1, -1)) || [];

        const category = categorizeChunk(chunk, source);

        return {
          chunk,
          matchScore,
          placeholders,
          source,
          category,
        };
      })
      .filter((suggestion) => suggestion.matchScore > 0)
      .sort((a, b) => {
        // Sort by match score descending, then by source priority
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore;
        }
        if (opts.prioritizeStatic) {
          if (a.source === 'static' && b.source === 'dynamic') return -1;
          if (a.source === 'dynamic' && b.source === 'static') return 1;
        }
        return 0;
      })
      .slice(0, opts.maxSuggestions);

    setSuggestions(newSuggestions);
  }, [debouncedSearch, chunks, opts.maxSuggestions, opts.prioritizeStatic]);

  return {
    suggestions,
    isLoading,
    error,
    totalStatic: staticChunks.length,
    totalDynamic: dynamicChunks.length
  };
}

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => 
    Array(str1.length + 1).fill(null)
  );
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

function categorizeChunk(chunk: Chunk, source: 'static' | 'dynamic'): string {
  const english = chunk.English.toLowerCase();
  
  // Simple categories that anyone can understand
  if (english.includes('players') || english.includes('teams')) return 'Find';
  if (english.includes('with ') || english.includes('greater') || english.includes('less') || english.includes('equal')) return 'Filter';  
  if (english.includes('return')) return 'Show';
  if (english.includes('player') || english.includes('team')) return 'Players & Teams';
  if (english.includes('game') || english.includes('season')) return 'Games & Seasons';
  
  return 'Query';
}