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

  // Update suggestions based on current query and chain state
  // This useEffect runs when query, chain, or getPartialInput changes
  useEffect(() => {
    console.log('🔄 useEffect running with:', { 
      query: `"${query}"`, 
      chainEnglish: `"${chain.English}"`, 
      matches: query === chain.English 
    });

    // RACE CONDITION FIX: Skip useEffect if query exactly matches chain.English 
    // This happens right after selecting a suggestion. The sequence is:
    // 1. User selects suggestion → handleSuggestionClick runs
    // 2. We call setQuery(chain.English) and set auto-suggestions
    // 3. React's state updates are async, so this useEffect might run before setQuery takes effect
    // 4. This check prevents us from wiping out the auto-suggestions we just set
    if (query === chain.English) {
      console.log('✅ Query matches chain.English, preserving auto-suggestions');
      return;
    }

    if (query.trim() === '') {
      console.log('❌ Query empty, clearing suggestions');
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const currentOutputs = chain.Aliases;
    const availableChunks = getAvailableChunks();
    const partialInput = getPartialInput();

    console.log('📊 Debug info:', {
      currentOutputs,
      availableChunksCount: availableChunks.length,
      partialInput: `"${partialInput}"`
    });

    const validNextChunks = chain.getNextValidChunksFromChunks(availableChunks);

    // Filter by partial input text and create suggestions
    const filteredSuggestions = validNextChunks.filter(chunk => {
        if (!partialInput) return true; // Show all valid chunks if no partial input

        // Filter chunks that start with or contain the partial input
        return chunk.English.toLowerCase().includes(partialInput.toLowerCase());
      })
      .map(chunk => ({
        chunk,
        displayText: chain.toArray().length > 0 ? "and " + chunk.English : chunk.English
      }));

    console.log('🔄 useEffect setting suggestions:', filteredSuggestions.length, 'items');
    setSuggestions(filteredSuggestions);
    setShowSuggestions(filteredSuggestions.length > 0);
    setSelectedSuggestionIndex(-1);
  }, [query, chain, getPartialInput]);

  const handleSuggestionClick = (suggestion: Suggestion) => {
    console.log('🎯 Suggestion clicked:', suggestion);

    // Work on a copy so that we don't mutate the original immutable catalogue
    const chunkCopy = { ...suggestion.chunk, Slots: suggestion.chunk.Slots.map((s) => ({ ...s })) };

    // If the chunk contains slots, open modal for user input
    if (chunkCopy.Slots && chunkCopy.Slots.length > 0) {
      setPendingChunk(chunkCopy);
      setPendingSlots(chunkCopy.Slots);
      setIsSlotModalOpen(true);
    } else {
      // No slots – append chunk as-is
      chain.append(chunkCopy);

      // Update chain strings right away
      chain.update();

      setQuery(chain.English);
      console.log('🎯 Setting query to:', `"${chain.English}"`);
      
      // Automatically show suggestions for the next valid chunks
      const availableChunks = getAvailableChunks();
      const validNextChunks = chain.getNextValidChunksFromChunks(availableChunks);
      
      if (validNextChunks.length > 0) {
        const autoSuggestions = validNextChunks.map(chunk => ({
          chunk,
          displayText: "and " + chunk.English
        }));
        
        console.log('🔮 Setting auto-suggestions:', autoSuggestions.length, 'items');
        setSuggestions(autoSuggestions);
        setShowSuggestions(true);
        setSelectedSuggestionIndex(-1);
      } else {
        console.log('⚠️ No valid next chunks found for auto-suggestions');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
      setSuggestions([]);
      return;
    }

    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = selectedSuggestionIndex < suggestions.length - 1 ? selectedSuggestionIndex + 1 : selectedSuggestionIndex;
        setSelectedSuggestionIndex(nextIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : -1;
        setSelectedSuggestionIndex(prevIndex);
        break;
      case 'Tab':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else if (chain.Cypher.trim()) {
          executeSearch(chain.Cypher); // Execute search on Enter when no suggestion selected
        }
        break;
    }
  };

  const clearQuery = () => {
    setQuery('');
    setChain(new ChunkChain());
    setSuggestions([]);
    setShowSuggestions(false);
    clearSearch();
  };

  // Handlers for SlotModal
  const handleSlotModalSave = (updatedSlots: Slot[]) => {
    if (!pendingChunk) {
      setIsSlotModalOpen(false);
      return;
    }

    const chunkWithSlots = { ...pendingChunk, Slots: updatedSlots } as Chunk;
    const filled = buildFilledChunk(chunkWithSlots);
    chain.append(filled);
    chain.update();
    setQuery(chain.English);
    console.log('🎯 Setting query to (after slot modal):', `"${chain.English}"`);

    // Automatically show suggestions for the next valid chunks after slot modal
    const availableChunks = getAvailableChunks();
    const validNextChunks = chain.getNextValidChunksFromChunks(availableChunks);
    
    if (validNextChunks.length > 0) {
      const autoSuggestions = validNextChunks.map(chunk => ({
        chunk,
        displayText: "and " + chunk.English
      }));
      
      console.log('🔮 Setting auto-suggestions (after slot modal):', autoSuggestions.length, 'items');
      setSuggestions(autoSuggestions);
      setShowSuggestions(true);
      setSelectedSuggestionIndex(-1);
    } else {
      console.log('⚠️ No valid next chunks found for auto-suggestions (after slot modal)');
    }

    // reset modal state
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
