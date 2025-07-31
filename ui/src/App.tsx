import React, { useEffect } from "react";
import Modal from "react-modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import { AppContextProvider } from "./contexts/AppContextProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginButton } from "./components/LoginButton";
import { CTA } from "./components/CTA";
import { SearchContent } from "./components/SearchContent";
import { PlayerDetail } from "./components/Player/PlayerDetail";
import { AccountDetail } from "./components/AccountDetail";

function App() {
  useEffect(() => {
    // Set the app element for react-modal (for accessibility)
    Modal.setAppElement("#root");
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppContextProvider>
            <div className="App">
              {/* Login button positioned in top right corner */}
              <LoginButton />
              <header className="App-header">
                <h1>StatFoundry</h1>
                <i>The easiest way to search for NFL stats this millenium</i>
              </header>
              <div className="App-body">
                <Routes>
                  <Route path="/" element={<SearchContent />} />
                  <Route path="/account" element={<AccountDetail />} />
                  <Route
                    path="/players/:gsisId/:slug"
                    element={<PlayerDetail />}
                  />
                  <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
              </div>
              <CTA />
              <div className="stats-sourced-from">
                <p>
                  stats sourced from{" "}
                  <a
                    href="https://github.com/nflverse"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    NFLVerse
                  </a>
                </p>
                <p>PlayerStats : 2000 - 2024</p>
                <p>
                  developed by{" "}
                  <a
                    href="https://www.benmedcalf.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ben Medcalf
                  </a>{" "}
                  at{" "}
                  <a
                    href="https://www.medcalfsoftwaresolutions.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Medcalf Software Solutions
                  </a>
                </p>
              </div>
            </div>
          </AppContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
