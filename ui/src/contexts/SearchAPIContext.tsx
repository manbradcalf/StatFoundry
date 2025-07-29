import React, {
  createContext,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { useSearchAPIEnhanced } from "../hooks/useSearchAPIEnhanced";
import { Alias } from "../feature/Chunks/Types/Alias";

interface SearchAPIContextType {
  // State
  searchResults: any[] | null;
  isSearching: boolean;
  searchError: string | null;

  // Actions
  executeSearch: (cypher: string, aliases: Alias[], position: string) => void;
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
    executeSearch: executeSearchAPI,
    clearSearch,
  } = useSearchAPIEnhanced();

  // Execute search with active alias filtering
  const executeSearch = useCallback(
    (cypher: string, aliases: Alias[], position: string) => {
      executeSearchAPI(cypher, aliases, position);
    },
    [executeSearchAPI],
  );

  const value: SearchAPIContextType = {
    // State
    searchResults,
    isSearching,
    searchError,

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
