import React from "react";
import { usePlayerDetailContext } from "../../contexts/PlayerDetailContext";

export const PlayerInfo: React.FC = () => {
  const { playerInfo, isLoadingPlayerInfo, playerInfoError } =
    usePlayerDetailContext();

  if (playerInfoError) {
    return <div className="error-state">{playerInfoError}</div>;
  }

  if (isLoadingPlayerInfo) {
    return <div className="loading-state">Loading player information...</div>;
  }

  if (!playerInfo) {
    return <div className="loading-state">No player information available</div>;
  }

  const displayName = playerInfo.display_name;
  const position = playerInfo.position;
  const jerseyNumber = playerInfo.jersey_number;
  const teamAbbr = playerInfo.team_abbr;
  const height = playerInfo.height;
  const weight = playerInfo.weight;
  const yearsOfExperience = playerInfo.years_of_experience;
  const status = playerInfo.status;
  const college = playerInfo.college_name;
  const draftClub = playerInfo.draft_club;
  const draftRound = playerInfo.draftround;
  const draftNumber = playerInfo.draft_number;
  const rookieYear = playerInfo.rookie_year;


  return (
    <div className="player-info-card">
        {/* Player Name */}
        <h1 className="player-name-title">
          {displayName || 'Unknown Player'}
        </h1>

        {/* Basic Info Grid */}
        <div className="player-basic-info">
          {/* Position & Jersey */}
          <div>
            <div className="player-position-jersey">
              <span className="player-position">
                {position || 'N/A'}
              </span>
              {jerseyNumber && (
                <span className="player-jersey">
                  #{jerseyNumber}
                </span>
              )}
            </div>
            {teamAbbr && (
              <div className="player-team">
                {teamAbbr}
              </div>
            )}
          </div>

          {/* Physical Stats */}
          <div>
            {(height || weight) && (
              <div className="player-info-section">
                <div className="player-info-label">
                  Physical
                </div>
                <div className="player-info-value">
                  {height && (
                    <span>{Math.floor(height / 12)}'{height % 12}"</span>
                  )}
                  {height && weight && " • "}
                  {weight && <span>{weight} lbs</span>}
                </div>
              </div>
            )}
          </div>

          {/* Experience */}
          {yearsOfExperience !== undefined && yearsOfExperience !== null && (
            <div className="player-info-section">
              <div className="player-info-label">
                Experience
              </div>
              <div className="player-info-value">
                {yearsOfExperience} {yearsOfExperience === 1 ? 'year' : 'years'}
              </div>
            </div>
          )}

          {/* Status */}
          {status && (
            <div className="player-info-section">
              <div className="player-info-label">
                Status
              </div>
              <div className="player-info-value">
                {status}
              </div>
            </div>
          )}
        </div>

        {/* Additional Details */}
        {/* College */}
        {college && (
          <div className="player-additional-info">
            College: {college}
          </div>
        )}

        {/* Draft */}
        {draftClub && (
          <div className="player-additional-info">
            Draft: {draftClub}
          </div>
        )}

        {/* Rookie Year */}
        {rookieYear && (
          <div className="player-additional-info">
            Rookie Year: {rookieYear}
          </div>
        )}

        {/* Draft Round */}
        {draftRound && (
          <div className="player-additional-info">
            Draft Round: {draftRound}
          </div>
        )}

        {/* Draft Number */}
        {draftNumber && (
          <div className="player-additional-info">
            Draft Number: {draftNumber}
          </div>
        )}
    </div>
  );
};
