import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { ChunkChain } from "../feature/Chunks/ChunkChain";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { Slot } from "../feature/Chunks/Types/Slot";
import { SlotModal } from "../components/SlotModal";
import { buildFilledChunk } from "../utils/slotFiller";
import { Suggestion } from "./Suggestion";
import { SearchContextType } from "./SearchContextType";
import { useSearchAPI } from "../hooks/useSearchAPI";
import { useSuggestionEngine } from "../hooks/useSuggestionEngine";
import { useSuggestionSelection } from "../hooks/useSuggestionSelection";
import { useFocusManagement } from "../hooks/useFocusManagement";
import { useChainOperations } from "../hooks/useChainOperations";

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState("");
  const [chain, setChain] = useState(new ChunkChain());

  // Alias toggle state
  const [activeAliases, setActiveAliases] = useState<Set<string>>(new Set());

  // Modal state
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [pendingChunk, setPendingChunk] = useState<Chunk | null>(null);
  const [pendingSlots, setPendingSlots] = useState<Slot[]>([]);
  const [editingChunkIndex, setEditingChunkIndex] = useState<number | null>(
    null
  );
  const [insertingAtIndex, setInsertingAtIndex] = useState<number | null>(null);

  const {
    searchResults,
    isSearching,
    searchError,
    executeSearch,
    clearSearch,
  } = useSearchAPI();
  const { shouldFocusSearchBar, focusSearchBar, resetFocusFlag } =
    useFocusManagement();

  // Debounced search execution for alias changes
  const debouncedAliasSearch = useDebouncedCallback(
    () => {
      if (chain.Cypher) {
        const activeAliasObjects = chain.Aliases.filter((alias) =>
          activeAliases.has(alias.Name)
        );
        console.log(chain)
        const position = chain.Head?.chunk.English || "";
        executeSearch(chain.Cypher, activeAliasObjects, position);
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

  // Chain operations using useChainOperations hook
  const {
    editChunk,
    insertChunkAt,
    removeChunk,
    appendChunk,
    insertChunk,
    updateChunkAtIndex,
  } = useChainOperations({
    chain,
    setChain,
    setQuery,
    onEditChunk: (index: number, chunkCopy: Chunk) => {
      setPendingChunk(chunkCopy);
      setPendingSlots(chunkCopy.Slots);
      setEditingChunkIndex(index);
      setIsSlotModalOpen(true);
    },
    onInsertMode: (index: number) => {
      setInsertingAtIndex(index);
    },
    onFocusSearchBar: focusSearchBar,
  });

  // Use the new suggestion hooks
  const { suggestions, showNextSuggestions } = useSuggestionEngine({
    query,
    chain,
    insertingAtIndex,
  });

  // Initialize suggestion selection hook
  const {
    selectedIndex,
    selectedSuggestion,
    setKeyboardNavigationEnabled,
    handleKeyDown,
    clearSelection,
  } = useSuggestionSelection({
    suggestions,
    onExecuteSearch: () => {
      // Filter aliases by activeAliases before executing search
      const activeAliasObjects = chain.Aliases.filter((alias) =>
        activeAliases.has(alias.Name)
      );
      const position = chain.English;
      executeSearch(chain.Cypher, activeAliasObjects, position);
      clearSelection();
    },
  });

  // Handles suggestion selection (both mouse clicks and keyboard selection)
  const handleSuggestionClick = useCallback(
    (suggestion: Suggestion) => {
      // Work on a copy to avoid mutating the original chunk catalog
      const chunkCopy = {
        ...suggestion.chunk,
        Slots: suggestion.chunk.Slots.map((s) => ({ ...s })),
      };

      // If chunk has slots (parameters), open modal for user input
      if (chunkCopy.Slots && chunkCopy.Slots.length > 0) {
        setPendingChunk(chunkCopy);
        setPendingSlots(chunkCopy.Slots);
        setIsSlotModalOpen(true);
      } else {
        // No slots - handle insertion or append directly to chain
        if (insertingAtIndex !== null) {
          insertChunk(insertingAtIndex, chunkCopy);
          setInsertingAtIndex(null);
        } else {
          appendChunk(chunkCopy);
        }

        // Auto-show next relevant suggestions
        const nextSuggestions = showNextSuggestions();
        if (nextSuggestions.length > 0) {
          setKeyboardNavigationEnabled(true);
        }
      }
    },
    [
      insertingAtIndex,
      showNextSuggestions,
      setKeyboardNavigationEnabled,
      appendChunk,
      insertChunk,
    ]
  );

  // Watch for keyboard selection events
  useEffect(() => {
    if (selectedSuggestion) {
      handleSuggestionClick(selectedSuggestion);
      clearSelection(); // Clear the selectedSuggestion to prevent infinite loop
    }
  }, [selectedSuggestion, handleSuggestionClick, clearSelection]);

  // Auto-enable keyboard navigation when suggestions become available
  useEffect(() => {
    if (suggestions.length > 0) {
      // Enable keyboard navigation if there are suggestions and:
      // 1. User is actively typing (query not empty and different from chain)
      // 2. OR suggestions are auto-populated after chain update (query is empty)
      if ((query.trim() !== "" && query !== chain.English) || query.trim() === "") {
        setKeyboardNavigationEnabled(true);
      }
    } else {
      setKeyboardNavigationEnabled(false);
    }
  }, [suggestions, query, chain.English, setKeyboardNavigationEnabled]);

  // Clears the entire search state - query, chain, suggestions, and results
  const clearQuery = () => {
    setQuery("");
    setChain(new ChunkChain());
    setActiveAliases(new Set());
    clearSelection();
    clearSearch();
  };

  /**
   * Handles saving slot values from the modal and updating the chain
   * Called when user fills in parameters for a chunk that requires input
   */
  const handleSlotModalSave = (updatedSlots: Slot[]) => {
    if (!pendingChunk) {
      setIsSlotModalOpen(false);
      return;
    }

    // Build the chunk with filled slots
    const chunkWithSlots = { ...pendingChunk, Slots: updatedSlots } as Chunk;
    const filled = buildFilledChunk(chunkWithSlots);

    if (editingChunkIndex !== null) {
      // Editing existing chunk
      updateChunkAtIndex(editingChunkIndex, filled);
      setEditingChunkIndex(null);
    } else if (insertingAtIndex !== null) {
      // Inserting at specific index
      insertChunk(insertingAtIndex, filled);
      setInsertingAtIndex(null);
    } else {
      // Adding new chunk
      appendChunk(filled);

      // Show next contextual suggestions
      const nextSuggestions = showNextSuggestions();
      if (nextSuggestions.length > 0) {
        setKeyboardNavigationEnabled(true);
      }
    }

    // Reset modal state
    setIsSlotModalOpen(false);
    setPendingChunk(null);
    setPendingSlots([]);
  };

  const handleSlotModalCancel = () => {
    setIsSlotModalOpen(false);
    setPendingChunk(null);
    setPendingSlots([]);
    setEditingChunkIndex(null);
  };

  const value: SearchContextType = {
    // State
    userInput: query,
    chain,
    shouldFocusSearchBar,
    suggestions,
    builtQuery: null,
    selectedIndex,
    searchResults,
    isSearching,
    searchError,
    aliasesToReturn: [],
    activeAliases,

    // Actions
    setUserInput: setQuery,
    selectSuggestion: handleSuggestionClick,
    handleKeyDown,
    clearAll: clearQuery,
    search: () => {
      // Filter aliases by activeAliases before executing search
      const activeAliasObjects = chain.Aliases.filter((alias) =>
        activeAliases.has(alias.Name)
      );
      executeSearch(chain.Cypher, activeAliasObjects, "");
      clearSelection();
    },
    editChunk,
    insertChunkAt,
    removeChunk,
    focusSearchBar,
    resetFocusFlag,
    toggleAlias,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SlotModal
        isOpen={isSlotModalOpen}
        slots={pendingSlots}
        onSave={handleSlotModalSave}
        onCancel={handleSlotModalCancel}
        title={editingChunkIndex !== null ? "Edit chunk" : "Fill in values"}
      />
    </SearchContext.Provider>
  );
};
