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
}

export const useSearchAPIEnhanced = (): UseSearchAPIReturn => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);


  const executeSearch = useCallback(async (
    cypherQuery: string,
    aliases: Alias[] = [],
    position: string = ""
  ) => {
    if (!cypherQuery.trim()) return;


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
    }
  }, []);


  const clearSearch = useCallback(() => {
    setSearchResults(null);
    setSearchError(null);
  }, []);

  return {
    searchResults,
    isSearching,
    searchError,
    executeSearch,
    clearSearch,
  };
};
