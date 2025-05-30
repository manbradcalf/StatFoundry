import React from 'react';
import './App.css';
import { SearchProvider } from './contexts/SearchContext';
import { SearchBar, ChainDisplay, QueryResult } from './components';

function AppContent() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>StatNug</h1>
        
        <SearchBar placeholder="Receivers who caught at least..." />

        <QueryResult />

        <ChainDisplay />
      </header>
    </div>
  );
}

function App() {
  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
}

export default App; 