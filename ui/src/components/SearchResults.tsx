import React from 'react';
import { SearchResultItem } from './SearchBar';
import { useSearchContext } from '../contexts/SearchContext';

interface SearchResultsProps {
  searchResults: any[] | null;
  searchError: string | null;
}

export const SearchResults: React.FC<SearchResultsProps> = () => {
  const { searchResults, searchError } = useSearchContext();
  return (
      <div className="search-results-body">
        {searchResults ? (
          <ul>
            {searchResults.map((result: any, index: number) => (
              <SearchResultItem key={index} result={result}></SearchResultItem>
            ))}
          </ul>
        ) : (
          <div style={{ color: "#888" }}>No results</div>
        )}
        <p style={{ color: searchError ? "red" : "#888" }}>
          {searchError ? searchError : ""}
        </p>
      </div>
  );
};