import { useEffect } from "react";
import Modal from "react-modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePageTracking, useAnalyticsInit, useSessionTracking } from "./hooks/useAnalytics";
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
import { VerticalAd } from "./components/VerticalAd";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Inner component that uses the analytics hooks
function AppContent() {
  usePageTracking();
  useSessionTracking();

  return (
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
          <div className="App-layout">
            <div className="App-sidebar-left">
              <VerticalAd />
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
            <div className="App-sidebar-right">
              <VerticalAd />
            </div>
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
              </a>{" "}
              licensed under CC BY 4.0
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
  );
}

function App() {
  useAnalyticsInit();

  useEffect(() => {
    // Set the app element for react-modal (for accessibility)
    Modal.setAppElement("#root");
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
