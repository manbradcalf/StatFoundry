import React, { useEffect } from "react";
import { PlayerInfo } from "./PlayerInfo";
import { PlayerGames } from "./PlayerGames";
import { PlayerSeasons } from "./PlayerSeasons";
import { useParams } from "react-router-dom";
import { usePlayerDetailContext } from "../../contexts/PlayerDetailContext";

export const PlayerDetail: React.FC = () => {
  const { gsisId } = useParams();
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
      <PlayerInfo />
      <PlayerGames />
      <PlayerSeasons />
    </div>
  );
};
