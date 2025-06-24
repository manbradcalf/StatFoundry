import { useState } from "react";

export const useSearchAPI = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const executeSearch = async (cypherQuery: string) => {
    if (!cypherQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch("http://localhost:8000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cypher_query: cypherQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
