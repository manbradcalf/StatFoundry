import React, { useEffect } from "react";
import { PlayerInfo } from "./PlayerInfo";
import { PlayerGames } from "./PlayerGames";
import { PlayerSeasons } from "./PlayerSeasons";
import { useParams, useNavigate } from "react-router-dom";
import { usePlayerDetailContext } from "../../contexts/PlayerDetailContext";

export const PlayerDetail: React.FC = () => {
  const { gsisId } = useParams();
  const navigate = useNavigate();
  const { fetchPlayerInfo, fetchPlayerGames, fetchPlayerSeasons } =
    usePlayerDetailContext();

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

  return (
    <div className="player-detail">
      <div className="player-detail-header">
        <button 
          onClick={() => navigate('/')}
          className="back-button"
        >
          ← Back to Search
        </button>
      </div>
      <PlayerInfo />
      <PlayerGames />
      <PlayerSeasons />
    </div>
  );
};
