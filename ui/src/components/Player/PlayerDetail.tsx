import React, { useEffect } from "react";
import { PlayerInfo } from "./PlayerInfo";
import { PlayerGames } from "./PlayerGames";
import { PlayerSeasons } from "./PlayerSeasons";
import { useParams, useNavigate } from "react-router-dom";
import { usePlayerDetailContext } from "../../contexts/PlayerDetailContext";

export const PlayerDetail: React.FC = () => {
  const { gsisId } = useParams();
  const navigate = useNavigate();
  const {
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

  console.log(showSeason2000Warning);
  return (
    <div className="player-detail">
      <div className="player-detail-header">
        <button onClick={() => navigate("/")} className="back-button">
          ← Back to Search
        </button>
      </div>
      <PlayerInfo />
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
