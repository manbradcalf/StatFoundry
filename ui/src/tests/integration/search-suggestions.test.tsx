import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render, waitForAsyncOperations } from '../setup/test-utils';
import { useSearchContext } from '../../contexts/SearchContext';

const SearchSuggestionsTestComponent = () => {
  const searchContext = useSearchContext();

  return (
    <div>
      <input
        data-testid="search-input"
        value={searchContext.userInput}
        onChange={(e) => searchContext.setUserInput(e.target.value)}
        placeholder="Search for chunks..."
      />

      <div data-testid="suggestions-count">{searchContext.suggestions.length}</div>
      <div data-testid="chain-length">{searchContext.chain.toArray().length}</div>
      <div data-testid="chain-english">{searchContext.chain.English}</div>

      {/* Display suggestions for testing */}
      <div data-testid="suggestions-list">
        {searchContext.suggestions.map((suggestion, index) => (
          <div
            key={index}
            data-testid={`suggestion-${index}`}
            onClick={() => searchContext.selectSuggestion(suggestion)}
          >
            {suggestion.displayText}
          </div>
        ))}
      </div>

      <button
        data-testid="add-simple-chunk"
        onClick={() => searchContext.selectSuggestion({
          chunk: {
            English: "Players",
            Cypher: "MATCH (p:Player)",
            QueryType: "MATCH_START" as any,
            Requires: [],
            Provides: [],
            Slots: [],
            SuggestionKeywords: "player"

          },
          displayText: "Players"
        })}
      >
        Add Simple Chunk
      </button>

      <button
        data-testid="clear-all"
        onClick={() => searchContext.clearAll()}
      >
        Clear All
      </button>
    </div>
  );
};

describe('Search Bar & Suggestions Behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('clears search bar after adding any chunk', async () => {
    render(<SearchSuggestionsTestComponent />);

    // Type something in search bar
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(searchInput).toHaveValue('test query');

    // Add a chunk
    fireEvent.click(screen.getByTestId('add-simple-chunk'));
    await waitForAsyncOperations();

    // Search bar should be cleared
    expect(searchInput).toHaveValue('');
  });

  it('shows contextual suggestions after adding chunk', async () => {
    render(<SearchSuggestionsTestComponent />);

    // Initially should have some suggestions
    const initialSuggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');
    expect(initialSuggestionsCount).toBeGreaterThan(0);

    // Add a chunk
    fireEvent.click(screen.getByTestId('add-simple-chunk'));
    await waitForAsyncOperations();

    // Should still have suggestions (contextual based on tail)
    const newSuggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');
    expect(newSuggestionsCount).toBeGreaterThan(0);

    // Chain should be updated
    expect(screen.getByTestId('chain-length')).toHaveTextContent('1');
    expect(screen.getByTestId('chain-english')).toContain('Players');
  });

  it('shows search results while user types', async () => {
    render(<SearchSuggestionsTestComponent />);

    const searchInput = screen.getByTestId('search-input');

    // Start typing
    fireEvent.change(searchInput, { target: { value: 'pl' } });
    await waitForAsyncOperations();

    // Should show search results
    const suggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');
    expect(suggestionsCount).toBeGreaterThan(0);

    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    await waitForAsyncOperations();

    // Should show contextual suggestions again
    const contextualSuggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');
    expect(contextualSuggestionsCount).toBeGreaterThan(0);
  });

  it('handles empty search bar correctly', async () => {
    render(<SearchSuggestionsTestComponent />);

    // Ensure search bar is empty
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toHaveValue('');

    // Should show contextual suggestions, not search results
    const suggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');
    expect(suggestionsCount).toBeGreaterThan(0);

    // Add a chunk to change context
    fireEvent.click(screen.getByTestId('add-simple-chunk'));
    await waitForAsyncOperations();

    // Search bar should still be empty
    expect(searchInput).toHaveValue('');

    // Should show new contextual suggestions based on chain tail
    const newSuggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');
    expect(newSuggestionsCount).toBeGreaterThan(0);
  });

  it('updates suggestions when chain changes', async () => {
    render(<SearchSuggestionsTestComponent />);

    // Capture initial suggestions
    const initialSuggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');

    // Add a chunk to change chain
    fireEvent.click(screen.getByTestId('add-simple-chunk'));
    await waitForAsyncOperations();

    // Suggestions should update (may be same count but different content)
    await waitFor(() => {
      const newSuggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');
      expect(newSuggestionsCount).toBeGreaterThan(0);
    });

    // Chain should reflect the change
    expect(screen.getByTestId('chain-english')).toContain('Players');
  });

  it('handles rapid user interactions correctly', async () => {
    render(<SearchSuggestionsTestComponent />);

    const searchInput = screen.getByTestId('search-input');

    // Rapid typing
    fireEvent.change(searchInput, { target: { value: 'p' } });
    fireEvent.change(searchInput, { target: { value: 'pl' } });
    fireEvent.change(searchInput, { target: { value: 'pla' } });
    fireEvent.change(searchInput, { target: { value: 'play' } });

    await waitForAsyncOperations();

    // Should handle final state correctly
    expect(searchInput).toHaveValue('play');
    const suggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');
    expect(suggestionsCount).toBeGreaterThan(0);

    // Rapid chunk additions
    fireEvent.click(screen.getByTestId('add-simple-chunk'));
    fireEvent.change(searchInput, { target: { value: 'rb' } });

    await waitForAsyncOperations();

    // Should handle final state correctly
    expect(screen.getByTestId('chain-length')).toHaveTextContent('1');
    expect(searchInput).toHaveValue('rb');
  });

  it('maintains suggestion state consistency', async () => {
    let stateSnapshots: any[] = [];

    const StateCapture = () => {
      const context = useSearchContext();

      React.useEffect(() => {
        stateSnapshots.push({
          query: context.userInput,
          suggestionsCount: context.suggestions.length,
          chainLength: context.chain.toArray().length,
          timestamp: Date.now()
        });
      });

      return null;
    };

    render(
      <>
        <SearchSuggestionsTestComponent />
        <StateCapture />
      </>
    );

    // Perform sequence of actions
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: 'test' } });
    await waitForAsyncOperations();

    fireEvent.click(screen.getByTestId('add-simple-chunk'));
    await waitForAsyncOperations();

    fireEvent.change(searchInput, { target: { value: 'filter' } });
    await waitForAsyncOperations();

    // Verify state consistency
    const finalSnapshot = stateSnapshots[stateSnapshots.length - 1];
    expect(finalSnapshot.suggestionsCount).toBeGreaterThan(0);
    expect(finalSnapshot.chainLength).toBe(1);
    expect(finalSnapshot.query).toBe('filter');
  });
});