import React, { useEffect } from "react";
import Modal from "react-modal";
import "./App.css";
import { SearchProvider } from "./contexts/SearchContext";
import { SearchBar, BreadcrumbChain, AliasesDisplay } from "./components";
import { SearchResults } from "./components/SearchResults";
import { LoginButton } from "./components/LoginButton";
import { CTA } from "./components/CTA";
// App configured for environment-based deployment (development/production)

function AppContent() {
  return (
    <div className="App">
      {/* Login button positioned in top right corner */}

      <LoginButton />
      <header className="App-header">
        <h1>StatFoundry</h1>
      </header>
      <div className="App-body">
        <BreadcrumbChain />
        <SearchBar />
        <AliasesDisplay />
        <SearchResults />
      </div>
      <CTA />
      <div className="stats-sourced-from">
        <p>stats sourced from <a href="https://github.com/nflverse" target="_blank" rel="noopener noreferrer">NFLVerse</a></p>
        <p>developed by <a href="https://www.benmedcalf.com" target="_blank" rel="noopener noreferrer">Ben Medcalf</a> at <a href="https://www.medcalfsoftwaresolutions.com" target="_blank" rel="noopener noreferrer">Medcalf Software Solutions</a></p>
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
