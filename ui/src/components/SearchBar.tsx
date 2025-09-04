import React, { useRef, useEffect, useCallback, useState } from "react";
import { User } from "firebase/auth";
import { useChainContext } from "../contexts/ChainContext";
import { useModalContext } from "../contexts/ModalContext";
import { useSearchAPIContext } from "../contexts/SearchAPIContext";
import {
  SearchInputProvider,
  useSearchInputContext,
} from "../contexts/SearchInputContext";
import { Suggestions } from "./Suggestions";
import { SaveSearchModal } from "./SaveSearchModal";
import { Suggestion } from "../contexts/Suggestion";
import { useSavedSearches } from "../hooks/useSavedSearches";
import { useAuth } from "../contexts/AuthContext";
import { analyticsService } from "../utils/analytics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

interface SearchBarInnerProps {
  onSaveSearch: () => void;
  user: User | null;
}

const SearchBarInner: React.FC<SearchBarInnerProps> = ({
  onSaveSearch,
  user,
}) => {
  const chainContext = useChainContext();
  const apiContext = useSearchAPIContext();

  const placeholderExamples = [
    "Build your search query by linking and filtering Entities",
    "Entities: Player, PlayerGame, PlayerSeason, Game, College, etc",
    "Expand your Search by chaining other Entities with Relationships",
    "Relationships: Player HAD PlayerGame, Player ATTENDED College",
    "Filter your search by adding filters to your Entities",
    "Filters: rushing_yards (PlayerGame), jersey_number (Player)",
    "Try Players HAD PlayerGame with rushing_yards > 100, season = 2024",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholder every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholderExamples.length]);

  const {
    query,
    setQuery,
    suggestions,
    selectedIndex,
    showSuggestions,
    handleInputFocus,
    handleInputBlur,
    handleKeyDown,
    clearQuery,
    selectSuggestion: handleSuggestionSelect,
  } = useSearchInputContext();

  const handleSearch = useCallback(() => {
    analyticsService.trackSearch({
      search_term: query,
      chain_length: chainContext.chain.toArray().length,
      cypher_query: chainContext.chain.Cypher,
    });

    apiContext.executeSearch(
      chainContext.chain.Cypher,
      chainContext.chain.Aliases,
      chainContext.chain.English,
    );
  }, [apiContext, chainContext, query]);

  // Clear all state
  const handleClearAll = useCallback(() => {
    chainContext.clearChain();
    clearQuery();
    apiContext.clearSearch();
  }, [chainContext, clearQuery, apiContext]);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    // Move cursor to end of input after state update
    setTimeout(() => {
      if (inputRef.current) {
        const length = inputRef.current.value.length;
        inputRef.current.setSelectionRange(length, length);
      }
    }, 0);
  };

  const scrollToSuggestion = (index: number) => {
    if (suggestionsRef.current) {
      const suggestionElement = suggestionsRef.current.children[
        index
      ] as HTMLElement;
      if (suggestionElement) {
        suggestionElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  };
  // Scroll to suggestion when selectedIndex changes
  useEffect(() => {
    if (selectedIndex >= 0) {
      scrollToSuggestion(selectedIndex);
    }
  }, [selectedIndex]);

  // Focus search bar when requested
  useEffect(() => {
    if (chainContext.shouldFocusSearchBar && inputRef.current) {
      inputRef.current.focus();
      chainContext.resetFocusFlag();
    }
  }, [chainContext]);

  return (
    <div className="search-container">
      <div
        className={`search-input-row ${showSuggestions && suggestions.length > 0 ? "suggestions-active" : ""}`}
      >
        <div className="search-box">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={
              chainContext.chain.toArray().length > 0
                ? "Add another filter..."
                : placeholderExamples[placeholderIndex]
            }
            className="search-input"
            autoComplete="off"
          />
          {query && (
            <button onClick={handleClearAll} className="clear-button">
              ×
            </button>
          )}
        </div>
        <div className="button-row">
          <div className="search-button">
            <button onClick={handleSearch} className="primary-button">
              Search
            </button>
          </div>
          <div className="save-button">
            <button
              className="secondary-button"
              title={!user ? "Sign in to save searches" : "Save this search"}
              data-tooltip={
                !user ? "Please sign in to save searches" : undefined
              }
              onClick={onSaveSearch}
              disabled={!user}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {!user && <FontAwesomeIcon icon={faLock} size="sm" />}
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions dropdown - positioned to overlay entire search area */}
      <Suggestions
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        onSelect={handleSuggestionSelect}
        showSuggestions={showSuggestions}
        ref={suggestionsRef}
      />
    </div>
  );
};

// Wrapper component that provides SearchInputContext
export const SearchBar: React.FC = () => {
  const chainContext = useChainContext();
  const modalContext = useModalContext();
  const { user } = useAuth();
  const { saveSavedSearch, loading, error, clearError } = useSavedSearches();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Create the real suggestion selection function
  const handleSuggestionSelection = useCallback(
    (suggestion: Suggestion, suggestionIndex?: number) => {
      analyticsService.trackSuggestionSelect({
        suggestion_text: suggestion.chunk.English,
        suggestion_index: suggestionIndex || -1,
        chain_state: chainContext.chain.English,
        query_string: JSON.stringify(suggestion.chunk.Slots || {}),
      });

      const chunkCopy = {
        ...suggestion.chunk,
        Slots: suggestion.chunk.Slots.map((s) => ({ ...s })),
      };

      if (chunkCopy.Slots && chunkCopy.Slots.length > 0) {
        modalContext.openSlotModal(
          chunkCopy,
          chunkCopy.Slots,
          undefined,
          modalContext.insertingAtIndex ?? undefined,
        );
      } else {
        if (modalContext.insertingAtIndex !== null) {
          chainContext.insertChunk(modalContext.insertingAtIndex, chunkCopy);
          modalContext.setInsertingAtIndex(null);
        } else {
          chainContext.appendChunk(chunkCopy);
        }
      }
    },
    [chainContext, modalContext],
  );

  const handleSaveSearch = useCallback(() => {
    if (chainContext.chain.toArray().length === 0) {
      alert("Build a search first before saving");
      return;
    }

    setIsSaveModalOpen(true);
  }, [chainContext.chain]);

  const handleSaveModalSave = useCallback(
    async (name: string, description?: string) => {
      await saveSavedSearch(chainContext.chain, name, description);
    },
    [saveSavedSearch, chainContext.chain],
  );

  const handleSaveModalClose = useCallback(() => {
    setIsSaveModalOpen(false);
    clearError();
  }, [clearError]);

  return (
    <>
      <SearchInputProvider
        chain={chainContext.chain}
        insertingAtIndex={modalContext.insertingAtIndex}
        onSuggestionSelect={handleSuggestionSelection}
      >
        <SearchBarInner onSaveSearch={handleSaveSearch} user={user} />
      </SearchInputProvider>

      <SaveSearchModal
        isOpen={isSaveModalOpen}
        onClose={handleSaveModalClose}
        onSave={handleSaveModalSave}
        loading={loading}
        error={error}
      />
    </>
  );
};
