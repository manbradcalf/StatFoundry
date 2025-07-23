import React, { createContext, useContext, useCallback, ReactNode } from "react";
import { useChainContext } from "./ChainContext";
import { useModalContext } from "./ModalContext";
import { useSearchAPIContext } from "./SearchAPIContext";
import { SearchInputProvider, useSearchInputContext } from "./SearchInputContext";
import { Suggestion } from "./Suggestion";
// import { Chunk } from "../feature/Chunks/Types/Chunk"; // Will be needed for modal integration

// This provides the old SearchContext interface for backwards compatibility
interface IntegratedSearchContextType {
  // State from various contexts
  userInput: string;
  chain: ReturnType<typeof useChainContext>['chain'];
  shouldFocusSearchBar: boolean;
  suggestions: ReturnType<typeof useSearchInputContext>['suggestions'];
  selectedIndex: number;
  searchResults: any[] | null;
  isSearching: boolean;
  searchError: string | null;
  activeAliases: Set<string>;
  showSuggestions: boolean;

  // Legacy properties for compatibility
  builtQuery: null;
  aliasesToReturn: never[];

  // Actions
  setUserInput: (input: string) => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  selectSuggestion: (suggestion: Suggestion) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  clearAll: () => void;
  search: () => void;
  editChunk: (index: number) => void;
  insertChunkAt: (index: number) => void;
  removeChunk: (index: number) => void;
  focusSearchBar: () => void;
  resetFocusFlag: () => void;
  toggleAlias: (aliasName: string) => void;
  toggleSuggestions: () => void;
}

const IntegratedSearchContext = createContext<IntegratedSearchContextType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(IntegratedSearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within an IntegratedSearchProvider");
  }
  return context;
};

interface IntegratedSearchProviderProps {
  children: ReactNode;
}

const IntegratedSearchProviderInner: React.FC<IntegratedSearchProviderProps> = ({ children }) => {
  const chainContext = useChainContext();
  const modalContext = useModalContext();
  const apiContext = useSearchAPIContext();
  const searchInputContext = useSearchInputContext();

  // Handle suggestion selection - this integrates modal and chain contexts
  const handleSuggestionSelect = useCallback((suggestion: Suggestion) => {
    const chunkCopy = {
      ...suggestion.chunk,
      Slots: suggestion.chunk.Slots.map((s) => ({ ...s })),
    };

    // If chunk has slots, open modal
    if (chunkCopy.Slots && chunkCopy.Slots.length > 0) {
      modalContext.openSlotModal(
        chunkCopy, 
        chunkCopy.Slots, 
        undefined, 
        modalContext.insertingAtIndex ?? undefined
      );
    } else {
      // No slots - handle insertion or append directly
      if (modalContext.insertingAtIndex !== null) {
        chainContext.insertChunk(modalContext.insertingAtIndex, chunkCopy);
        modalContext.setInsertingAtIndex(null);
      } else {
        chainContext.appendChunk(chunkCopy);
      }
    }
  }, [chainContext, modalContext]);

  // Handle search execution
  const handleSearch = useCallback(() => {
    apiContext.executeSearch(
      chainContext.chain.Cypher, 
      chainContext.chain.Aliases,
      chainContext.chain.English
    );
  }, [apiContext, chainContext]);

  // Handle chunk editing - integrate with modal
  const handleEditChunk = useCallback((index: number) => {
    const chainArray = chainContext.chain.toArray();
    if (index < 0 || index >= chainArray.length) {
      console.error('Invalid chunk index:', index);
      return;
    }

    const chunkToEdit = chainArray[index];

    // Only editable chunks have slots
    if (chunkToEdit.Slots.length === 0) {
      console.error('Cannot edit chunk with no slots:', chunkToEdit.English);
      return;
    }

    // Create a copy with the original templates restored for editing
    const chunkCopy = {
      ...chunkToEdit,
      English: chunkToEdit.EnglishTemplate!,
      Cypher: chunkToEdit.CypherTemplate!,
      Slots: chunkToEdit.Slots.map((s) => ({ ...s }))
    };

    modalContext.openSlotModal(chunkCopy, chunkCopy.Slots, index);
  }, [chainContext, modalContext]);

  // Handle chunk insertion setup
  const handleInsertChunkAt = useCallback((index: number) => {
    modalContext.setInsertingAtIndex(index);
    chainContext.focusSearchBar();
  }, [modalContext, chainContext]);

  // Clear all state
  const handleClearAll = useCallback(() => {
    chainContext.clearChain();
    searchInputContext.clearQuery();
    apiContext.clearSearch();
  }, [chainContext, searchInputContext, apiContext]);

  const value: IntegratedSearchContextType = {
    // State
    userInput: searchInputContext.query,
    chain: chainContext.chain,
    shouldFocusSearchBar: chainContext.shouldFocusSearchBar,
    suggestions: searchInputContext.suggestions,
    selectedIndex: searchInputContext.selectedIndex,
    searchResults: apiContext.searchResults,
    isSearching: apiContext.isSearching,
    searchError: apiContext.searchError,
    activeAliases: apiContext.activeAliases,
    showSuggestions: searchInputContext.showSuggestions,

    // Legacy properties
    builtQuery: null,
    aliasesToReturn: [],

    // Actions
    setUserInput: searchInputContext.setQuery,
    handleInputFocus: searchInputContext.handleInputFocus,
    handleInputBlur: searchInputContext.handleInputBlur,
    selectSuggestion: handleSuggestionSelect,
    handleKeyDown: searchInputContext.handleKeyDown,
    clearAll: handleClearAll,
    search: handleSearch,
    editChunk: handleEditChunk,
    insertChunkAt: handleInsertChunkAt,
    removeChunk: chainContext.removeChunk,
    focusSearchBar: chainContext.focusSearchBar,
    resetFocusFlag: chainContext.resetFocusFlag,
    toggleAlias: apiContext.toggleAlias,
    toggleSuggestions: searchInputContext.toggleSuggestions,
  };

  return (
    <IntegratedSearchContext.Provider value={value}>
      {children}
    </IntegratedSearchContext.Provider>
  );
};

export const IntegratedSearchProvider: React.FC<IntegratedSearchProviderProps> = ({ children }) => {
  const chainContext = useChainContext();
  const modalContext = useModalContext();

  return (
    <SearchInputProvider
      chain={chainContext.chain}
      insertingAtIndex={modalContext.insertingAtIndex}
      onSuggestionSelect={() => {}} // This will be handled by the inner component
      onExecuteSearch={() => {}} // This will be handled by the inner component
    >
      <IntegratedSearchProviderInner>
        {children}
      </IntegratedSearchProviderInner>
    </SearchInputProvider>
  );
};