import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchAPIContext } from '../contexts/SearchAPIContext';
import { slugToDisplayName } from '../utils/playerUtils';

export const PlayerDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { fetchPlayerByName, searchResults, isSearching, searchError } = useSearchAPIContext();

  useEffect(() => {
    if (slug) {
      // Convert slug back to display name for database query
      const displayName = slugToDisplayName(slug);
      console.log('PlayerDetail - slug:', slug, 'displayName:', displayName);

      // Use simple player fetch method
      fetchPlayerByName(displayName);
    }
  }, [slug, fetchPlayerByName]);

  // Extract player from search results
  const player = searchResults?.[0];

  console.log(searchResults?.[0])
  // Loading state
  if (isSearching) {
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
  if (searchError || !player) {
    console.log("player is", player)
    console.log("we got something bqad...", searchError)
    return (
      <div className="player-detail">
        <div className="App">
          <header className="App-header">
            <h1>Player Not Found</h1>
          </header>
          <div className="App-body">
            <p>{searchError || `Player "${slug}" not found`}</p>
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
