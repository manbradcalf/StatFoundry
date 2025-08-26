import React, { useState } from 'react';
import { useEnhancedSuggestions } from '../hooks/useEnhancedSuggestions';
import { useChunkGenerator } from '../hooks/useChunkGenerator';

export function DynamicChunkExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    suggestions, 
    isLoading, 
    error, 
    totalDynamic 
  } = useEnhancedSuggestions(searchTerm, {
    includeStatic: false, // Only show dynamic chunks
    includeDynamic: true
  });
  
  const { refreshDynamicChunks } = useChunkGenerator();

  // Simplify categories for non-technical users
  const getSimpleCategory = (chunk: any) => {
    const english = chunk.English.toLowerCase();
    if (english.includes('players') || english.includes('teams')) return 'Find';
    if (english.includes('with ') || english.includes('greater') || english.includes('less') || english.includes('equal')) return 'Filter';
    if (english.includes('return')) return 'Show';
    return 'Query';
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={refreshDynamicChunks}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Builder
        </h1>
        <p className="text-lg text-gray-600">
          Start typing to see what you can search for ({totalDynamic} options available)
        </p>
      </div>

      {/* Search Box - Using exact styling from actual search */}
      <div className="search-container">
        <div className="search-input-row">
          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Try typing 'yards', 'touchdowns', 'players'..."
              className="search-input"
              autoComplete="off"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="clear-button"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {searchTerm && (
        <div className="space-y-4">
          {suggestions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">🤔</div>
              <div className="text-xl font-medium mb-2">No matches found</div>
              <div className="text-lg">Try "yards", "touchdowns", "players", or "teams"</div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900">
                {suggestions.length} search option{suggestions.length !== 1 ? 's' : ''} found:
              </h2>
              
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    {/* Category */}
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                        {getSimpleCategory(suggestion.chunk)}
                      </span>
                    </div>
                    
                    {/* Main description */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {suggestion.chunk.English}
                    </h3>
                    
                    {/* Placeholders - if any */}
                    {suggestion.placeholders.length > 0 && (
                      <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm font-medium text-yellow-800 mb-2">
                          You can customize:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {suggestion.placeholders.map((placeholder, i) => (
                            <span key={i} className="text-sm bg-yellow-200 text-yellow-900 px-2 py-1 rounded font-mono">
                              {placeholder}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Query details */}
                    <details className="mt-3">
                      <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium">
                        View technical details
                      </summary>
                      <div className="mt-2 p-3 bg-gray-900 rounded border">
                        <code className="block text-sm text-green-400 font-mono">
                          {suggestion.chunk.Cypher}
                        </code>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Refresh button */}
      <div className="text-center pt-6">
        <button
          onClick={refreshDynamicChunks}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Options'}
        </button>
      </div>
    </div>
  );
}