import { useState } from "react";
import { config } from "../config";

export const useSearchAPI = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const appendReturnClause = (cypherQuery: string) => {
    if (cypherQuery.includes("RETURN")) {
      return cypherQuery;
    } else {
      // TODO: Give the user options for what to return (e.g. all, player game info, rushing stats, passing stats, receiving stats)
      // This is temporary for the UX demo, I want to show the UX before solving for return clause
      // They won't always search players
      return `${cypherQuery} RETURN *`
    }
  };
  const executeSearch = async (cypherQuery: string) => {
    if (!cypherQuery.trim()) return;

    cypherQuery = appendReturnClause(cypherQuery);
    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch(`${config.serviceUrl}/api/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cypher_query: cypherQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} `);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setSearchError(errorMessage);
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setSearchError(null);
    setIsSearching(false);
  };

  return {
    searchResults,
    isSearching,
    searchError,
    executeSearch,
    clearSearch,
  };
};
