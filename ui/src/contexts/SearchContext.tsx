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
    const validNextChunks = chain.getNextValidChunksFromChunks(availableChunks);

    // INTELLIGENT FILTERING: Prioritize suggestions based on context
    const prioritizedSuggestions = validNextChunks
      .filter(chunk => {
        if (!partialInput) return true;
        // Match both start of words and full text for better UX
        const input = partialInput.toLowerCase();
        const text = chunk.English.toLowerCase();
        return text.includes(input) || text.split(' ').some(word => word.startsWith(input));
      })
      .sort((a, b) => {
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

    setSuggestions(prioritizedSuggestions);
    setShowSuggestions(prioritizedSuggestions.length > 0);
    setSelectedSuggestionIndex(-1);
  }, [query, chain, getPartialInput]);

  /**
   * Handles suggestion selection (both mouse clicks and keyboard selection)
   * Manages the chunk chain, slot modals, and auto-suggestions
   */
  const handleSuggestionClick = (suggestion: Suggestion) => {
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
      // No slots - append chunk directly to chain
      chain.append(chunkCopy);
      chain.update();
      setQuery(chain.English);
      
      // Auto-show next relevant suggestions
      showNextSuggestions();
    }
  };

  /**
   * Shows contextually relevant suggestions after a chunk is added to the chain
   * This creates a smooth user experience by immediately showing what can come next
   */
  const showNextSuggestions = () => {
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
  };

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
        // Select current highlighted suggestion
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          // Select highlighted suggestion
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else if (chain.Cypher.trim()) {
          // No suggestion selected - execute search with current chain
          executeSearch(chain.Cypher);
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

    // Build the chunk with filled slots and add to chain
    const chunkWithSlots = { ...pendingChunk, Slots: updatedSlots } as Chunk;
    const filled = buildFilledChunk(chunkWithSlots);
    chain.append(filled);
    chain.update();
    setQuery(chain.English);

    // Show next contextual suggestions
    showNextSuggestions();

    // Reset modal state
    setIsSlotModalOpen(false);
    setPendingChunk(null);
    setPendingSlots([]);
  };

  const handleSlotModalCancel = () => {
    setIsSlotModalOpen(false);
    setPendingChunk(null);
    setPendingSlots([]);
  };

  const value: SearchContextType = {
    // State
    userInput: query,
    chain,
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
    search: () => executeSearch(chain.Cypher),
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
      {isSlotModalOpen && (
        <SlotModal slots={pendingSlots} onSave={handleSlotModalSave} onCancel={handleSlotModalCancel} />
      )}
    </SearchContext.Provider>
  );
}; 
