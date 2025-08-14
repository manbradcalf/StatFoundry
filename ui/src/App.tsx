import { useEffect } from "react";
import Modal from "react-modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import { AppContextProvider } from "./contexts/AppContextProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginButton } from "./components/LoginButton";
import { CTA } from "./components/CTA";
import { SearchContent } from "./components/SearchContent";
import { PlayerDetail } from "./components/Player/PlayerDetail";
import { AccountDetail } from "./components/AccountDetail";
import { FAQPage } from "./components/FAQPage";
import { HelpBar } from "./components/HelpBar";
import { VideoTutorials } from "./components/VideoTutorials";
import { StatsPage } from "./components/StatsComponent";
import { AboutPage } from "./components/AboutPage";

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
              <Helmet>
                <title>Advanced NFL Player Stats Search | StatFoundry</title>
                <meta
                  name="description"
                  content="Search and analyze NFL player stats quickly with StatFoundry. Explore game, season, and career data with powerful tools designed for fantasy football fans."
                />
                <link rel="canonical" href="https://www.statfoundry.com/" />

                {/* Optional Open Graph for social previews */}
                <meta
                  property="og:title"
                  content="StatFoundry - Advanced NFL Player Stats"
                />
                <meta
                  property="og:description"
                  content="Search NFL stats faster than ever. Perfect for fantasy football players."
                />
                <meta
                  property="og:url"
                  content="https://www.statfoundry.com/"
                />
                <meta property="og:type" content="website" />

                {/* Optional Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                  name="twitter:title"
                  content="StatFoundry - Advanced NFL Player Stats"
                />
                <meta
                  name="twitter:description"
                  content="Search NFL stats quickly. Analyze players, games, and seasons with ease."
                />
              </Helmet>
              <header className="App-header">
                <h1>StatFoundry</h1>
                <i>Do your own research. Be your own expert.</i>
                <LoginButton />
                <HelpBar />
              </header>
              
              {/* Database Status Banner */}
              <div style={{
                backgroundColor: '#ffa500',
                color: '#000',
                padding: '12px 20px',
                textAlign: 'center',
                fontWeight: 'bold',
                borderBottom: '2px solid #ff8c00'
              }}>
                📊 Good news: We've added Play by Play data to the database! 💀 Bad news: We've knocked the database offline.
              </div>
              <div className="App-body">
                <Routes>
                  <Route path="/" element={<SearchContent />} />
                  <Route path="/account" element={<AccountDetail />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/faqs" element={<FAQPage />} />
                  <Route path="/video-tutorials" element={<VideoTutorials />} />
                  <Route path="/stats" element={<StatsPage />} />
                  <Route
                    path="/players/:slug/:gsisId"
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
                <p>PlayerStats from 2000 to 2024</p>
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
