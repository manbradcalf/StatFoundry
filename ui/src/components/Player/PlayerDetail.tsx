import React, { useEffect } from "react";
import { PlayerInfo } from "./PlayerInfo";
import { PlayerGames } from "./PlayerGames";
import { PlayerSeasons } from "./PlayerSeasons";
import { useParams, useNavigate } from "react-router-dom";
import { usePlayerDetailContext } from "../../contexts/PlayerDetailContext";
import { Helmet } from "react-helmet-async";
import { GoogleAd } from "../GoogleAd";

export const PlayerDetail: React.FC = () => {
  const { gsisId, slug } = useParams();
  const navigate = useNavigate();
  const {
    playerInfo,
    isLoadingPlayerInfo,
    fetchPlayerInfo,
    fetchPlayerGames,
    fetchPlayerSeasons,
    showSeason2000Warning,
  } = usePlayerDetailContext();

  useEffect(() => {
    if (gsisId) {
      fetchPlayerInfo(gsisId);
      fetchPlayerGames(gsisId);
      fetchPlayerSeasons(gsisId);
    }
  }, [gsisId, fetchPlayerInfo, fetchPlayerGames, fetchPlayerSeasons]);

  if (!gsisId) {
    return <div>No player ID provided</div>;
  }

  // Generate dynamic meta content
  const playerName = playerInfo?.display_name || "Player";
  const position = playerInfo?.position || "";
  const team = playerInfo?.team_abbr || "";
  const college = playerInfo?.college_name || "";
  const experience = playerInfo?.years_of_experience || 0;

  const pageTitle = isLoadingPlayerInfo
    ? "Loading Player Stats | StatFoundry"
    : `${playerName} Stats & Analysis | StatFoundry`;

  const pageDescription = isLoadingPlayerInfo
    ? "Loading NFL player stats and analysis..."
    : `Complete ${playerName} NFL stats, career highlights, and fantasy analysis. ${position}${team ? ` for ${team}` : ""}${college ? `. College: ${college}` : ""}${experience > 0 ? `. ${experience} years experience.` : ""}`;

  const canonicalUrl = `https://www.statfoundry.com/players/${slug}/${gsisId}`;

  const ogTitle = isLoadingPlayerInfo
    ? "NFL Player Stats | StatFoundry"
    : `${playerName} NFL Stats | StatFoundry`;

  return (
    <div className="player-detail">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph for social previews */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="profile" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* Additional meta tags for NFL players */}
        {playerInfo && (
          <>
            <meta
              name="keywords"
              content={`${playerName}, NFL, ${position}, ${team}, stats, fantasy football, player analysis`}
            />
            <meta
              property="profile:first_name"
              content={playerInfo.first_name}
            />
            <meta property="profile:last_name" content={playerInfo.last_name} />
          </>
        )}
      </Helmet>
      <div className="player-detail-header">
        <button onClick={() => navigate("/")} className="back-button">
          ← Back to Search
        </button>
      </div>
      <PlayerInfo />
      <GoogleAd />
      {showSeason2000Warning && (
        <h4>
          <span style={{ color: "red" }}>Note:</span> Our data only goes back to
          the year 2000. We may not be showing all data for this player
        </h4>
      )}
      <PlayerGames />
      <PlayerSeasons />
    </div>
  );
};
