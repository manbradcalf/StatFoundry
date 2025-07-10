import { useState } from "react";
import { config } from "../config";
import { buildSmartReturnClause } from "../feature/Chunks/returnClauseBuilder";
import { Alias } from "../feature/Chunks/Types/Alias";

export const useSearchAPI = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const executeSearch = async (cypherQuery: string, aliases: Alias[] = []) => {
    if (!cypherQuery.trim()) return;

    cypherQuery = `${cypherQuery} ${buildSmartReturnClause(aliases)}`;
    setIsSearching(true);
    console.log("searching " + cypherQuery);
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
        console.log(response);
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
