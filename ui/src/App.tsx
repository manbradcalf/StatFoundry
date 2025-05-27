import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { ChunkChain, Chunk } from './chunks';
import { getAvailableChunks } from './chunks-data';

interface Suggestion {
  chunk: Chunk;
  displayText: string;
}

function App() {
  const [query, setQuery] = useState('');
  const [chain, setChain] = useState(new ChunkChain());
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [builtQuery, setBuiltQuery] = useState<{ English: string; Cypher: string; Outputs: string[] } | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Get current outputs from the chain to determine next valid chunks
  const getCurrentOutputs = (): string[] => {
    const chainArray = chain.toArray();
    if (chainArray.length === 0) return [];
    
    // Get all outputs from all chunks in the chain
    const allOutputs = chainArray.reduce((acc, chunk) => {
      return [...acc, ...chunk.Outputs];
    }, [] as string[]);
    
    return Array.from(new Set(allOutputs)); // Remove duplicates
  };

  // Update suggestions based on current query and chain state
  useEffect(() => {
    console.log('🔍 useEffect triggered:', { query, chainLength: chain.toArray().length });
    
    if (query.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const currentOutputs = getCurrentOutputs();
    const availableChunks = getAvailableChunks();
    
    console.log('📊 Debug info:', { 
      currentOutputs, 
      availableChunksCount: availableChunks.length 
    });
    
    // Filter chunks based on:
    // 1. If chain is empty, show chunks with no required inputs
    // 2. If chain has chunks, show chunks whose required inputs are satisfied by current outputs
    const validChunks = availableChunks.filter(chunk => {
      if (chain.toArray().length === 0) {
        return chunk.RequiredInputs.length === 0;
      }
      return chunk.RequiredInputs.every(input => currentOutputs.includes(input));
    });

    // Filter by query text and create suggestions
    const filteredSuggestions = validChunks
      // .filter(chunk => 
      //   chunk.English.toLowerCase().includes(query.toLowerCase())
      // )
      .map(chunk => ({
        chunk,
        displayText: chunk.English
      }));

    setSuggestions(filteredSuggestions);
    setShowSuggestions(validChunks.length > 0);
    setSelectedSuggestionIndex(-1);
  }, [query, chain]); // Removed getCurrentOutputs from dependenciestA

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    
    // Move cursor to end of input
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(e.target.value.length, e.target.value.length);
      }
    }, 0);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    console.log('🎯 Suggestion clicked:', suggestion);
    
    // Add the selected chunk to the chain
    const newChain = new ChunkChain();
    
    // Copy existing chunks
    chain.toArray().forEach(chunk => newChain.append(chunk));
    
    // Add new chunk
    newChain.append(suggestion.chunk);
    
    setChain(newChain);
    
    // Update query to show the built query so far
    const result = newChain.buildQuery();
    setQuery(result.English);
    setBuiltQuery(result);
    
    // Move cursor to end after updating query
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(result.English.length, result.English.length);
        inputRef.current.focus();
      }
    }, 0);
    
    // Clear suggestions
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = selectedSuggestionIndex < suggestions.length - 1 ? selectedSuggestionIndex + 1 : selectedSuggestionIndex;
        setSelectedSuggestionIndex(nextIndex);
        scrollToSuggestion(nextIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : -1;
        setSelectedSuggestionIndex(prevIndex);
        if (prevIndex >= 0) {
          scrollToSuggestion(prevIndex);
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const scrollToSuggestion = (index: number) => {
    if (suggestionsRef.current) {
      const suggestionElement = suggestionsRef.current.children[index] as HTMLElement;
      if (suggestionElement) {
        suggestionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  };

  const clearQuery = () => {
    setQuery('');
    setChain(new ChunkChain());
    setBuiltQuery(null);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fantasy Football Oracle</h1>
        <div className="search-container">
          <div className="search-box">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Receivers who caught at least..."
              className="search-input"
              autoComplete="off"
            />
            {query && (
              <button onClick={clearQuery} className="clear-button">
                ×
              </button>
            )}
          </div>
          
          {showSuggestions && (
            <div ref={suggestionsRef} className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.displayText}
                </div>
              ))}
            </div>
          )}
        </div>

        {builtQuery && (
          <div className="query-result">
            <h3>Built Query:</h3>
            <div className="english-query">
              <strong>English:</strong> {builtQuery.English}
            </div>
            <div className="cypher-query">
              <strong>Cypher:</strong>
              <pre>{builtQuery.Cypher}</pre>
            </div>
            <div className="outputs">
              <strong>Outputs:</strong> {builtQuery.Outputs.join(', ')}
            </div>
          </div>
        )}

        <div className="chain-debug">
          <h4>Current Chain ({chain.toArray().length} chunks):</h4>
          {chain.toArray().map((chunk, index) => (
            <div key={index} className="chunk-item">
              <strong>Chunk {index + 1}:</strong> {chunk.English}
              <br />
              <small>Inputs: [{chunk.Inputs.join(', ')}] → Outputs: [{chunk.Outputs.join(', ')}]</small>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App; 