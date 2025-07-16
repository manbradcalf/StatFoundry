import { useState, useRef, useCallback } from "react";
import { config } from "../config";
import { buildSmartReturnClause } from "../feature/Chunks/returnClauseBuilder";
import { Alias } from "../feature/Chunks/Types/Alias";

interface UseSearchAPIReturn {
  searchResults: any[] | null;
  isSearching: boolean;
  searchError: string | null;
  executeSearch: (cypherQuery: string, aliases?: Alias[], position?: string) => Promise<void>;
  clearSearch: () => void;
  cancelSearch: () => void;
}

export const useSearchAPIEnhanced = (): UseSearchAPIReturn => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Track current request for cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  const executeSearch = useCallback(async (
    cypherQuery: string, 
    aliases: Alias[] = [], 
    position: string = ""
  ) => {
    if (!cypherQuery.trim()) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    const finalQuery = `${cypherQuery} ${buildSmartReturnClause(aliases, position)}`;
    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch(`${config.serviceUrl}/api/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cypher_query: finalQuery }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Search failed with status ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error: any) {
      // Don't set error for aborted requests
      if (error.name === 'AbortError') {
        return;
      }
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unknown error occurred during search";
      setSearchError(errorMessage);
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
      abortControllerRef.current = null;
    }
  }, []);

  const cancelSearch = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsSearching(false);
  }, []);

  const clearSearch = useCallback(() => {
    cancelSearch();
    setSearchResults(null);
    setSearchError(null);
  }, [cancelSearch]);

  return {
    searchResults,
    isSearching,
    searchError,
    executeSearch,
    clearSearch,
    cancelSearch,
  };
};