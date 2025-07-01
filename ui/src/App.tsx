import React from 'react';
import './App.css';
import { SearchProvider } from './contexts/SearchContext';
import { SearchBar, ChainDisplay } from './components';
import { SearchResults } from './components/SearchResults';

function AppContent() {
  return (
    <div className="App">
      {/* Login button positioned in top right corner */}
      <button className="login-button" title="Sign in (coming soon)">
        Login
      </button>
      
      <header className="App-header">
        <h1>StatFoundry</h1>
        <i>Finally, a better way to find stats</i>
        <SearchBar />
        <SearchResults searchResults={[]} searchError={null} />
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