import React, { useEffect } from 'react';
import { PlayerInfo } from './PlayerInfo';
import { PlayerGames } from './PlayerGames';
import { PlayerSeasons } from './PlayerSeasons';
import { useParams } from 'react-router-dom';

export const PlayerDetail: React.FC = () => {
  let { gsisId } = useParams();

  if (gsisId === undefined) {
    gsisId = ""
  }

  return (
    <div className="player-detail">
      <PlayerInfo gsisId={gsisId} />
      <PlayerGames gsisId={gsisId} />
      <PlayerSeasons gsisId={gsisId} />
    </div>
  );
};
