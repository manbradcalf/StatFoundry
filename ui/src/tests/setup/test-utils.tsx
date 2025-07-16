import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SearchProvider } from '../../contexts/SearchContext';
import Modal from 'react-modal';

// Mock Modal setup to prevent warnings
beforeAll(() => {
  // Create a div to use as modal root if it doesn't exist
  if (!document.getElementById('modal-root')) {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }
  Modal.setAppElement('#modal-root');
});

// Mock fetch for useSearchAPI
global.fetch = jest.fn();

// Mock fetch implementation
export const mockFetch = (response: any, ok: boolean = true) => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok,
    json: async () => response,
    status: ok ? 200 : 500,
  });
};

// Mock fetch to reject (network error)
export const mockFetchError = (error: string = 'Network request failed') => {
  (global.fetch as jest.Mock).mockRejectedValueOnce(new Error(error));
};

// Clear fetch mocks
export const clearFetchMocks = () => {
  (global.fetch as jest.Mock).mockClear();
};

// Custom render with SearchProvider
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchProvider>
      {children}
    </SearchProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

// Helper to get chunks for testing
export const getTestChunks = () => {
  return [
    {
      English: "Players",
      Cypher: "MATCH (p:Player)",
      QueryType: "MATCH_START",
      Requires: [],
      Provides: [{ Name: "p", AliasType: "Player" }],
      Slots: [],
    },
    {
      English: "RB",
      Cypher: "WHERE p.position = 'RB'",
      QueryType: "FILTER",
      Requires: [{ Name: "p", AliasType: "Player" }],
      Provides: [],
      Slots: [],
    },
    {
      English: "games with {operator} {value} {statName}",
      EnglishTemplate: "games with {operator} {value} {statName}",
      Cypher: "MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE pg.{statName} {operator} {value}",
      CypherTemplate: "MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE pg.{statName} {operator} {value}",
      QueryType: "FILTER_WITH_STATS",
      Requires: [{ Name: "p", AliasType: "Player" }],
      Provides: [{ Name: "pg", AliasType: "PlayerGame" }],
      Slots: [
        { Name: "operator", Value: "", Type: "operator" },
        { Name: "value", Value: "", Type: "number" },
        { Name: "statName", Value: "", Type: "stat" }
      ],
    }
  ];
};

// Helper to simulate user workflow
export const simulateUserFlow = {
  selectSuggestion: (chunk: any) => ({
    chunk,
    displayText: chunk.English
  }),
  
  fillSlots: (slots: any[]) => 
    slots.map(slot => ({ ...slot, Value: getDefaultSlotValue(slot) })),
};

const getDefaultSlotValue = (slot: any) => {
  switch (slot.Type) {
    case 'operator': return '>=';
    case 'number': return '1000';
    case 'stat': return 'rushing_yards';
    default: return 'test_value';
  }
};

// Mock chunk data access - moved to setupTests for proper initialization
export const mockGetAllChunks = jest.fn(() => getTestChunks());

// Wait for async operations to complete
export const waitForAsyncOperations = () => new Promise(resolve => setTimeout(resolve, 0));