import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render, mockFetch, simulateUserFlow, waitForAsyncOperations } from '../setup/test-utils';
import { useSearchContext } from '../../contexts/SearchContext';

// Test component to interact with SearchContext
const SearchWorkflowTestComponent = ({ onStateChange }: { onStateChange?: (state: any) => void }) => {
  const searchContext = useSearchContext();

  React.useEffect(() => {
    onStateChange?.(searchContext);
  }, [searchContext, onStateChange]);

  return (
    <div>
      <div data-testid="query">{searchContext.userInput}</div>
      <div data-testid="chain-english">{searchContext.chain.English}</div>
      <div data-testid="suggestions-count">{searchContext.suggestions.length}</div>
      <div data-testid="should-focus">{searchContext.shouldFocusSearchBar.toString()}</div>
      
      {/* Simulate buttons for testing */}
      <button 
        data-testid="select-players"
        onClick={() => searchContext.selectSuggestion(simulateUserFlow.selectSuggestion({
          English: "Players",
          Cypher: "MATCH (p:Player)",
          Slots: []
        }))}
      >
        Select Players
      </button>
      
      <button 
        data-testid="select-rb-filter"
        onClick={() => searchContext.selectSuggestion(simulateUserFlow.selectSuggestion({
          English: "RB",
          Cypher: "WHERE p.position = 'RB'",
          Slots: []
        }))}
      >
        Select RB Filter
      </button>

      <button
        data-testid="select-stats-chunk"
        onClick={() => searchContext.selectSuggestion(simulateUserFlow.selectSuggestion({
          English: "games with {operator} {value} {statName}",
          Cypher: "MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE pg.{statName} {operator} {value}",
          Slots: [
            { Name: "operator", Value: "", Type: "operator" },
            { Name: "value", Value: "", Type: "number" },
            { Name: "statName", Value: "", Type: "stat" }
          ]
        }))}
      >
        Select Stats Chunk
      </button>

      <button
        data-testid="execute-search"
        onClick={() => searchContext.search()}
      >
        Execute Search
      </button>

      {/* Mock slot modal for testing */}
      <div data-testid="mock-slot-modal" style={{ display: 'none' }}>
        <button
          data-testid="save-slots"
          onClick={() => {
            // Simulate slot modal save with filled values
            const filledSlots = [
              { Name: "operator", Value: ">=", Type: "operator" },
              { Name: "value", Value: "1000", Type: "number" },
              { Name: "statName", Value: "rushing_yards", Type: "stat" }
            ];
            // This would normally be handled by the slot modal
            // For testing, we'll trigger the appendChunk directly
          }}
        >
          Save Slots
        </button>
      </div>
    </div>
  );
};

describe('Core Search Workflow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows user to build a complete query and execute search', async () => {
    mockFetch([{ display_name: 'Test Player', position: 'RB' }]);

    let latestState: any;
    const handleStateChange = (state: any) => {
      latestState = state;
    };

    render(<SearchWorkflowTestComponent onStateChange={handleStateChange} />);

    // Step 1: Start with empty state
    expect(screen.getByTestId('query')).toHaveTextContent('');
    expect(screen.getByTestId('chain-english')).toHaveTextContent('');

    // Step 2: Select initial chunk (Players)
    fireEvent.click(screen.getByTestId('select-players'));
    await waitForAsyncOperations();

    // Verify query cleared and chain updated
    expect(screen.getByTestId('query')).toHaveTextContent('');
    expect(screen.getByTestId('chain-english')).toContain('Players');

    // Step 3: Add filter chunk (RB)
    fireEvent.click(screen.getByTestId('select-rb-filter'));
    await waitForAsyncOperations();

    // Verify query cleared and chain updated
    expect(screen.getByTestId('query')).toHaveTextContent('');
    expect(screen.getByTestId('chain-english')).toContain('RB');

    // Step 4: Execute search
    fireEvent.click(screen.getByTestId('execute-search'));
    await waitForAsyncOperations();

    // Verify search was called with correct query
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/query'),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('MATCH (p:Player)')
      })
    );
  });

  it('handles chunk without slots workflow correctly', async () => {
    render(<SearchWorkflowTestComponent />);

    // Select simple chunk (no slots)
    fireEvent.click(screen.getByTestId('select-players'));
    await waitForAsyncOperations();

    // Verify chunk added immediately
    expect(screen.getByTestId('chain-english')).toContain('Players');
    
    // Verify search bar cleared
    expect(screen.getByTestId('query')).toHaveTextContent('');
    
    // Verify suggestions are available (contextual)
    const suggestionsCount = parseInt(screen.getByTestId('suggestions-count').textContent || '0');
    expect(suggestionsCount).toBeGreaterThan(0);
  });

  it('maintains proper state during complex workflow', async () => {
    let stateHistory: any[] = [];
    const handleStateChange = (state: any) => {
      stateHistory.push({
        query: state.userInput,
        chainEnglish: state.chain.English,
        suggestionsCount: state.suggestions.length,
        timestamp: Date.now()
      });
    };

    render(<SearchWorkflowTestComponent onStateChange={handleStateChange} />);

    // Build a multi-chunk query
    fireEvent.click(screen.getByTestId('select-players'));
    await waitForAsyncOperations();

    fireEvent.click(screen.getByTestId('select-rb-filter'));
    await waitForAsyncOperations();

    // Verify state progression
    const finalState = stateHistory[stateHistory.length - 1];
    expect(finalState.query).toBe(''); // Search bar always cleared
    expect(finalState.chainEnglish).toContain('Players');
    expect(finalState.chainEnglish).toContain('RB');
    expect(finalState.suggestionsCount).toBeGreaterThan(0); // Has contextual suggestions
  });

  it('handles search execution correctly', async () => {
    const mockResponse = [
      { display_name: 'Derrick Henry', position: 'RB', rushing_yards: 2027 },
      { display_name: 'Nick Chubb', position: 'RB', rushing_yards: 1259 }
    ];
    mockFetch(mockResponse);

    render(<SearchWorkflowTestComponent />);

    // Build query and execute search
    fireEvent.click(screen.getByTestId('select-players'));
    await waitForAsyncOperations();

    fireEvent.click(screen.getByTestId('execute-search'));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Verify search was executed with built query
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/query'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('MATCH (p:Player)')
      })
    );
  });
});