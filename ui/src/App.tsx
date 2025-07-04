import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';
import { SearchProvider } from './contexts/SearchContext';
import { SearchBar, ChainDisplay } from './components';
import { SearchResults } from './components/SearchResults';
// App configured for environment-based deployment (development/production)

function AppContent() {
  return (
    <div className="App">
      {/* Login button positioned in top right corner */}
      <button className="login-button" title="Sign in (coming soon)" onClick={() => alert("Login functionality coming soon!")}>
        Login
      </button>

      <header className="App-header">
        <h1>StatFoundry</h1>
        <i>Finally, a better way </i>
        <SearchBar />
      </header>
      <div className="App-body">
        <ChainDisplay />
        <SearchResults searchResults={[]} searchError={null} />
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Set the app element for react-modal (for accessibility)
    Modal.setAppElement('#root');
  }, []);

  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
}

export default App; 
