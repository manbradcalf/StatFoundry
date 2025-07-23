import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchAPIEnhanced } from "../hooks/useSearchAPIEnhanced";
import { Alias } from "../feature/Chunks/Types/Alias";
import { useChainContext } from "./ChainContext";

interface SearchAPIContextType {
  // State
  searchResults: any[] | null;
  isSearching: boolean;
  searchError: string | null;
  activeAliases: Set<string>;

  // Actions
  executeSearch: (cypher: string, aliases: Alias[], position: string) => void;
  clearSearch: () => void;
  toggleAlias: (aliasName: string) => void;
}

const SearchAPIContext = createContext<SearchAPIContextType | undefined>(undefined);

export const useSearchAPIContext = () => {
  const context = useContext(SearchAPIContext);
  if (!context) {
    throw new Error("useSearchAPIContext must be used within a SearchAPIProvider");
  }
  return context;
};

interface SearchAPIProviderProps {
  children: ReactNode;
}

export const SearchAPIProvider: React.FC<SearchAPIProviderProps> = ({ children }) => {
  const { chain } = useChainContext();
  const [activeAliases, setActiveAliases] = useState<Set<string>>(new Set());

  const {
    searchResults,
    isSearching,
    searchError,
    executeSearch: executeSearchAPI,
    clearSearch,
  } = useSearchAPIEnhanced();

  // Debounced search execution for alias changes
  const debouncedAliasSearch = useDebouncedCallback(
    () => {
      if (chain.Cypher) {
        const activeAliasObjects = chain.Aliases.filter((alias) =>
          activeAliases.has(alias.Name)
        );
        const position = chain.Head?.chunk.English || "";
        executeSearchAPI(chain.Cypher, activeAliasObjects, position);
      }
    },
    300 // 300ms debounce delay
  );

  // Initialize all aliases as active when chain changes
  useEffect(() => {
    const allAliases = chain.Aliases.map((alias) => alias.Name);
    setActiveAliases(new Set(allAliases));
  }, [chain.Aliases]);

  // Execute debounced search when activeAliases change 
  const [isInitialMount, setIsInitialMount] = useState(true);
  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }
    // Only trigger search if we have existing search results (meaning user has already searched)
    debouncedAliasSearch();
  }, [activeAliases, debouncedAliasSearch, isInitialMount]);

  // Toggle alias active state
  const toggleAlias = useCallback((aliasName: string) => {
    setActiveAliases((prev) => {
      const newSet = new Set(prev);

      // Prevent turning off the last active alias
      if (newSet.has(aliasName) && newSet.size === 1) {
        return prev; // Don't allow turning off the last alias
      }

      if (newSet.has(aliasName)) {
        newSet.delete(aliasName);
      } else {
        newSet.add(aliasName);
      }

      return newSet;
    });
  }, []);

  // Execute search with active alias filtering
  const executeSearch = useCallback((cypher: string, aliases: Alias[], position: string) => {
    const activeAliasObjects = aliases.filter((alias) =>
      activeAliases.has(alias.Name)
    );
    executeSearchAPI(cypher, activeAliasObjects, position);
  }, [activeAliases, executeSearchAPI]);

  const value: SearchAPIContextType = {
    // State
    searchResults,
    isSearching,
    searchError,
    activeAliases,

    // Actions
    executeSearch,
    clearSearch,
    toggleAlias,
  };

  return (
    <SearchAPIContext.Provider value={value}>
      {children}
    </SearchAPIContext.Provider>
  );
};