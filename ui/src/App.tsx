import React, { useEffect } from "react";
import Modal from "react-modal";
import "./App.css";
import { SearchProvider } from "./contexts/SearchContext";
import { SearchBar, BreadcrumbChain, AliasesDisplay } from "./components";
import { SearchResults } from "./components/SearchResults";
import { LoginButton } from "./components/LoginButton";
// App configured for environment-based deployment (development/production)

function AppContent() {
  return (
    <div className="App">
      {/* Login button positioned in top right corner */}

      <LoginButton />
      <header className="App-header">
        <h1>StatFoundry</h1>
        <i>Finally, a better way </i>
      </header>
      <div className="App-body">
        <BreadcrumbChain />
        <SearchBar />
        <AliasesDisplay />
        <SearchResults />
      </div>
      <div className="stats-sourced-from">
        <i>stats sourced from <a href="https://github.com/nflverse" target="_blank" rel="noopener noreferrer">NFLVerse</a></i>
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Set the app element for react-modal (for accessibility)
    Modal.setAppElement("#root");
  }, []);

  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
}

export default App;
