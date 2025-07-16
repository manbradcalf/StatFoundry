// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchProvider, useSearchContext } from './SearchContext';

const SimpleTestComponent: React.FC = () => {
  const search = useSearchContext();

  return (
    <div>
      <div data-testid="chain-english">{search.chain.English}</div>
      <div data-testid="user-input">{search.userInput}</div>
    </div>
  );
};

describe('SearchContext basic functionality', () => {
  it('initializes with empty state', () => {
    render(
      <SearchProvider>
        <SimpleTestComponent />
      </SearchProvider>
    );

    // Should initialize with empty chain and query
    expect(screen.getByTestId('chain-english')).toHaveTextContent('');
    expect(screen.getByTestId('user-input')).toHaveTextContent('');
  });
});
