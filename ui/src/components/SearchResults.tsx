import React from 'react';
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
        <div>
          <h2>Results</h2>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          width: '50vw',
          padding: '16px', 
          borderRadius: '4px',
          textAlign: 'start',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: '14px',
          lineHeight: '1.4'
        }}>
          {JSON.stringify(searchResults, null, 2)}
        </pre>
        </div>
      ) : (
        <div style={{ color: "#888" }}>No results</div>
      )}
      <p style={{ color: searchError ? "red" : "#888" }}>
        {searchError ? searchError : ""}
      </p>
    </div>
  );
};
