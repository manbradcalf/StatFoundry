import React, { createContext, useContext, ReactNode } from "react";
import { useSearchAPIEnhanced } from "../hooks/useSearchAPIEnhanced";
import { Alias } from "../feature/Chunks/Types/Alias";

interface SearchAPIContextType {
  // State
  searchResults: any[] | null;
  isSearching: boolean;
  searchError: string | null;
  resultsCleared: boolean;

  // Actions
  executeSearch: (cypher: string, aliases: Alias[], position: string, selectedProperties?: string[]) => void;
  clearSearch: () => void;
}

const SearchAPIContext = createContext<SearchAPIContextType | undefined>(
  undefined,
);

export const useSearchAPIContext = () => {
  const context = useContext(SearchAPIContext);
  if (!context) {
    throw new Error(
      "useSearchAPIContext must be used within a SearchAPIProvider",
    );
  }
  return context;
};

interface SearchAPIProviderProps {
  children: ReactNode;
}

export const SearchAPIProvider: React.FC<SearchAPIProviderProps> = ({
  children,
}) => {
  const {
    searchResults,
    isSearching,
    searchError,
    resultsCleared,
    executeSearch,
    clearSearch,
  } = useSearchAPIEnhanced();

  const value: SearchAPIContextType = {
    // State
    searchResults,
    isSearching,
    searchError,
    resultsCleared,

    // Actions
    executeSearch,
    clearSearch,
  };

  return (
    <SearchAPIContext.Provider value={value}>
      {children}
    </SearchAPIContext.Provider>
  );
};
