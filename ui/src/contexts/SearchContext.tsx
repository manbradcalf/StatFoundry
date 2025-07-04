import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getAvailableChunks } from '../feature/Chunks/Data/chunks-data';
import { ChunkChain } from '../feature/Chunks/ChunkChain';
import { Chunk } from '../feature/Chunks/Types/Chunk';
import { Slot } from '../feature/Chunks/Types/Slot';
import { SlotModal } from '../components/SlotModal';
import { buildFilledChunk } from '../utils/slotFiller';
import { Suggestion } from './Suggestion';
import { SearchContextType } from './SearchContextType';
import { useSearchAPI } from '../hooks/useSearchAPI';
import Fuse from 'fuse.js';

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [query, setQuery] = useState('');
  const [chain, setChain] = useState(new ChunkChain());
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  // Modal state
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [pendingChunk, setPendingChunk] = useState<Chunk | null>(null);
  const [pendingSlots, setPendingSlots] = useState<Slot[]>([]);
  const [editingChunkIndex, setEditingChunkIndex] = useState<number | null>(null);
  const [insertingAtIndex, setInsertingAtIndex] = useState<number | null>(null);
  const [shouldFocusSearchBar, setShouldFocusSearchBar] = useState(false);

  const { searchResults, isSearching, searchError, executeSearch, clearSearch } = useSearchAPI();

  // Extract the partial input that the user is currently typing
  // useCallback memoizes this function so it only changes when dependencies change
  // This prevents the suggestions useEffect from running on every render
  const getPartialInput = useCallback((): string => {
    if (chain.English.length === 0) return query.trim();

    // If the query is longer than the english, extract the partial input
    if (query.length > chain.English.length) {
      const partial = query.substring(chain.English.length).trim();
      // Remove leading "and " if present
      console.log('partial', partial);
      return partial.startsWith('and ') ? partial.substring(4).trim() : partial;
    }

    return '';
  }, [query, chain.English]);

  /**
   * Shows contextually relevant suggestions after a chunk is added to the chain
   * This creates a smooth user experience by immediately showing what can come next
   */
  const showNextSuggestions = useCallback(() => {
    const availableChunks = getAvailableChunks();
    const validNextChunks = chain.getNextValidChunksFromChunks(availableChunks);

    if (validNextChunks.length > 0) {
      // Apply the same intelligent sorting as in the main useEffect
      const intelligentSuggestions = validNextChunks
        .sort((a, b) => {
          // Context-aware auto-suggestions based on what was just added
          const lastChunk = chain.toArray().slice(-1)[0];
          if (lastChunk) {
            const lastChunkText = lastChunk.English.toLowerCase();
            const aText = a.English.toLowerCase();
            const bText = b.English.toLowerCase();

            // Prioritize related suggestions
            if (lastChunkText.includes('running back')) {
              if (aText.includes('rush') || aText.includes('carry')) return -1;
              if (bText.includes('rush') || bText.includes('carry')) return 1;
            }

            if (lastChunkText.includes('receiver') || lastChunkText.includes('wide receiver')) {
              if (aText.includes('catch') || aText.includes('receiv') || aText.includes('target')) return -1;
              if (bText.includes('catch') || bText.includes('receiv') || bText.includes('target')) return 1;
            }
          }

          return a.English.localeCompare(b.English);
        })
        .slice(0, 8) // Fewer auto-suggestions to avoid overwhelming
        .map(chunk => ({
          chunk,
          displayText: "and " + chunk.English
        }));

      setSuggestions(intelligentSuggestions);
      setShowSuggestions(true);
      setSelectedSuggestionIndex(-1);
    }
  }, [chain]);

  /**
   * Handles suggestion selection (both mouse clicks and keyboard selection)
   * Manages the chunk chain, slot modals, and auto-suggestions
   */
  const handleSuggestionClick = useCallback((suggestion: Suggestion) => {
    // Work on a copy to avoid mutating the original chunk catalog
    const chunkCopy = {
      ...suggestion.chunk,
      Slots: suggestion.chunk.Slots.map((s) => ({ ...s }))
    };

    // If chunk has slots (parameters), open modal for user input
    if (chunkCopy.Slots && chunkCopy.Slots.length > 0) {
      setPendingChunk(chunkCopy);
      setPendingSlots(chunkCopy.Slots);
      setIsSlotModalOpen(true);
    } else {
      // No slots - handle insertion or append directly to chain
      if (insertingAtIndex !== null) {
        chain.insertAt(insertingAtIndex, chunkCopy);
        setInsertingAtIndex(null);
      } else {
        chain.append(chunkCopy);
      }
      chain.compile();
      setQuery(chain.English);

      // Auto-show next relevant suggestions
      showNextSuggestions();
    }
  }, [chain, insertingAtIndex, showNextSuggestions]);

  /**
   * Smart suggestion system that updates based on current query and chain state
   * Features:
   * - Filters suggestions based on partial user input
   * - Prevents race conditions when selecting suggestions
   * - Shows contextually relevant suggestions based on chain history
   */
  useEffect(() => {
    // RACE CONDITION FIX: Skip if query exactly matches chain.English 
    // This happens right after selecting a suggestion to prevent wiping auto-suggestions
    if (query === chain.English) {
      return;
    }

    // Clear suggestions if query is empty
    if (query.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const availableChunks = getAvailableChunks();
    const partialInput = getPartialInput();

    // If inserting, create a partial chain up to the insertion point
    let contextChain = chain;
    if (insertingAtIndex !== null) {
      contextChain = new ChunkChain();
      const chainArray = chain.toArray();
      for (let i = 0; i < insertingAtIndex; i++) {
        contextChain.append(chainArray[i]);
      }
      contextChain.compile();
    }

    const validNextChunks = contextChain.getNextValidChunksFromChunks(availableChunks);

    // INTELLIGENT FILTERING: Prioritize suggestions based on context
    const prioritizedSuggestions = (() => {
      if (!partialInput) return validNextChunks;
      const fuse = new Fuse(validNextChunks, { keys: ['English'], threshold: 0.6 });
      return fuse.search(partialInput).map(result => result.item);
    })()

    // AUTO-SELECT: If there's an exact match, select it automatically
    const exactMatch = prioritizedSuggestions.find(chunk =>
      chunk.English.toLowerCase() === partialInput.toLowerCase()
    );
    if (exactMatch) {
      handleSuggestionClick({ chunk: exactMatch });
      return;
    }

    const sortedSuggestions = prioritizedSuggestions.sort((a, b) => {
      // SMART PRIORITIZATION based on chain context
      const aText = a.English.toLowerCase();
      const bText = b.English.toLowerCase();
      const input = partialInput.toLowerCase();

      // Exact matches first
      if (aText.startsWith(input) && !bText.startsWith(input)) return -1;
      if (bText.startsWith(input) && !aText.startsWith(input)) return 1;

      // Context-aware suggestions (you can expand this logic)
      // For example, if last chunk was about running backs, prioritize rushing stats
      const lastChunk = chain.toArray().slice(-1)[0];
      if (lastChunk) {
        const lastChunkText = lastChunk.English.toLowerCase();

        // Simple context matching - can be expanded based on your domain knowledge
        if (lastChunkText.includes('running back') || lastChunkText.includes('rush')) {
          if (aText.includes('rush') || aText.includes('yard')) return -1;
          if (bText.includes('rush') || bText.includes('yard')) return 1;
        }

        if (lastChunkText.includes('receiver') || lastChunkText.includes('catch')) {
          if (aText.includes('catch') || aText.includes('receiv') || aText.includes('target')) return -1;
          if (bText.includes('catch') || bText.includes('receiv') || bText.includes('target')) return 1;
        }
      }

      // Alphabetical fallback
      return aText.localeCompare(bText);
    })
      .slice(0, 10) // Limit to top 10 suggestions for performance
      .map(chunk => ({
        chunk,
        displayText: chain.toArray().length > 0 ? "and " + chunk.English : chunk.English
      }));

    setSuggestions(sortedSuggestions);
    setShowSuggestions(sortedSuggestions.length > 0);
    setSelectedSuggestionIndex(-1);
  }, [handleSuggestionClick, query, chain, getPartialInput, insertingAtIndex]);



  /**
   * Handles keyboard navigation and selection in the suggestions dropdown
   * Supports: Arrow keys for navigation, Tab/Enter for selection, Escape to close
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Escape key - close suggestions
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      setSuggestions([]);
      return;
    }

    // Only handle other keys if suggestions are visible
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Navigate down, don't wrap around at bottom
        const nextIndex = selectedSuggestionIndex < suggestions.length - 1
          ? selectedSuggestionIndex + 1
          : selectedSuggestionIndex;
        setSelectedSuggestionIndex(nextIndex);
        break;

      case 'ArrowUp':
        e.preventDefault();
        // Navigate up, can go to -1 (no selection)
        const prevIndex = selectedSuggestionIndex > 0
          ? selectedSuggestionIndex - 1
          : -1;
        setSelectedSuggestionIndex(prevIndex);
        break;

      case 'Tab':
        e.preventDefault();
        // Navigate down like ArrowDown, wrapping to first suggestion
        const tabNextIndex = selectedSuggestionIndex < suggestions.length - 1
          ? selectedSuggestionIndex + 1
          : 0; // Wrap to first suggestion
        setSelectedSuggestionIndex(tabNextIndex);
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          // Select highlighted suggestion
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else if (chain.Cypher.trim()) {
          // No suggestion selected - execute search with current chain
          executeSearch(chain.Cypher);
          setSuggestions([]);
          setShowSuggestions(false);
        }
        break;
    }
  };

  /**
   * Clears the entire search state - query, chain, suggestions, and results
   * Used by the clear button (×) in the search input
   */
  const clearQuery = () => {
    setQuery('');
    setChain(new ChunkChain());
    setSuggestions([]);
    setShowSuggestions(false);
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
      chain.updateChunkAtIndex(editingChunkIndex, filled);
      chain.compile();
      setQuery(chain.English);
      setEditingChunkIndex(null);
    } else if (insertingAtIndex !== null) {
      // Inserting at specific index
      chain.insertAt(insertingAtIndex, filled);
      chain.compile();
      setQuery(chain.English);
      setInsertingAtIndex(null);
    } else {
      // Adding new chunk
      chain.append(filled);
      chain.compile();
      setQuery(chain.English);

      // Show next contextual suggestions
      showNextSuggestions();
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

  /**
   * Opens the slot modal to edit an existing chunk at the specified index.
   * 
   * The key insight: chunks in the chain have filled English/Cypher (like "over 300 yards")
   * but we need to edit the template version (like "over {threshold} {property}").
   * The SlotModal expects template strings with placeholders, not filled strings.
   */
  const editChunk = (index: number) => {
    const chainArray = chain.toArray();
    if (index < 0 || index >= chainArray.length) {
      console.error('Invalid chunk index:', index);
      return;
    }

    const chunkToEdit = chainArray[index];

    // Only editable chunks have slots, and only chunks with slots need template restoration
    if (chunkToEdit.Slots.length === 0) {
      console.error('Cannot edit chunk with no slots:', chunkToEdit.English);
      return;
    }

    // Create a copy with the original templates restored for editing
    // This way the SlotModal can show placeholders like {threshold} instead of filled values like "300"
    // But the Slots array still has the current values (300) to pre-fill the input fields
    const chunkCopy = {
      ...chunkToEdit,
      English: chunkToEdit.EnglishTemplate!,   // Restore template version
      Cypher: chunkToEdit.CypherTemplate!,     // Restore template version  
      Slots: chunkToEdit.Slots.map((s) => ({ ...s }))  // Keep current values for pre-filling
    };

    setPendingChunk(chunkCopy);
    setPendingSlots(chunkCopy.Slots);
    setEditingChunkIndex(index);
    setIsSlotModalOpen(true);
  };

  /**
   * Sets up insertion mode at the specified index
   * @param index The index to insert at (chunks after this will be shifted)
   */
  const insertChunkAt = (index: number) => {
    setInsertingAtIndex(index);
    setQuery(''); // Clear query to show all suggestions
    setShouldFocusSearchBar(true); // Trigger focus
  };

  /**
   * Remove a chunk from the chain at the specified index
   * @param index The index of the chunk to remove
   */
  const removeChunk = (index: number) => {
    const chainArray = chain.toArray();
    if (index < 0 || index >= chainArray.length) return;

    // Rebuild chain without the chunk at the specified index
    const newChain = new ChunkChain();
    chainArray.forEach((chunk, i) => {
      if (i !== index) {
        newChain.append(chunk);
      }
    });

    setChain(newChain);
    newChain.compile();
    setQuery(newChain.English);
  };

  /**
   * Signal that the search bar should be focused
   */
  const focusSearchBar = () => {
    setShouldFocusSearchBar(true);
  };

  /**
   * Reset the focus flag after focusing is complete
   */
  const resetFocusFlag = () => {
    setShouldFocusSearchBar(false);
  };

  const value: SearchContextType = {
    // State
    userInput: query,
    chain,
    shouldFocusSearchBar,
    suggestions,
    builtQuery: null,
    selectedIndex: selectedSuggestionIndex,
    searchResults,
    isSearching,
    searchError,

    // Actions
    setUserInput: setQuery,
    selectSuggestion: handleSuggestionClick,
    handleKeyDown,
    clearAll: clearQuery,
    search: () => {
      executeSearch(chain.Cypher);
      setSuggestions([]);
      setShowSuggestions(false);
    },
    editChunk,
    insertChunkAt,
    removeChunk,
    focusSearchBar,
    resetFocusFlag,
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
