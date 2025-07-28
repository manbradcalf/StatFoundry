import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePlayerDetailContext } from '../contexts/PlayerDetailContext';
import { slugToDisplayName } from '../utils/playerUtils';

export const PlayerDetail: React.FC = () => {
  const { gsisId, slug } = useParams<{ gsisId: string; slug: string }>();
  const { fetchPlayerByGsisId, player, isLoading, error } = usePlayerDetailContext();

  useEffect(() => {
    if (gsisId) {
      console.log('PlayerDetail - gsisId:', gsisId, 'slug:', slug);

      // Fetch player data using gsis_id (slug is just for SEO)
      fetchPlayerByGsisId(gsisId);
    }
  }, [gsisId, fetchPlayerByGsisId]);

  // Loading state
  if (isLoading) {
    return (
      <div className="player-detail">
        <div className="App">
          <header className="App-header">
            <h1>Loading Player...</h1>
          </header>
          <div className="App-body">
            <p>Fetching player information...</p>
            <a href="/">← Back to Search</a>
          </div>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !player) {
    return (
      <div className="player-detail">
        <div className="App">
          <header className="App-header">
            <h1>Player Not Found</h1>
          </header>
          <div className="App-body">
            <p>{error || `Player "${slug}" not found`}</p>
            <a href="/">← Back to Search</a>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="player-detail">
      <div className="App">
        <header className="App-header">
          <h1>Player Detail</h1>
        </header>
        <div className="App-body">
          <h2>{player["p.display_name"]}</h2>
          <div className="player-info">
            <p><strong>Name:</strong> {player["p.display_name"]}</p>
            <p><strong>Position:</strong> {player["p.position"]}</p>
          </div>
          <a href="/">← Back to Search</a>
        </div>
      </div>
    </div>
  );
};
