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
      <div className="player-info-header">
        <h1 className="player-name">{displayName || "Unknown Player"}</h1>
        <div className="player-subtitle">
          <span>{position || "N/A"}</span>
          <span>&bull;</span>
          <span>#{jerseyNumber || "N/A"}</span>
          <span>&bull;</span>
          <span>{teamAbbr || "N/A"}</span>
        </div>
      </div>

      <div className="player-info-body">
        <div className="info-item">
          <span className="info-label">Height</span>
          <span className="info-value">{height ? `${Math.floor(height / 12)}'${height % 12}"` : "N/A"}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Weight</span>
          <span className="info-value">{weight ? `${weight} lbs` : "N/A"}</span>
        </div>
        <div className="info-item">
          <span className="info-label">College</span>
          <span className="info-value">{college || "N/A"}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Experience</span>
          <span className="info-value">
            {yearsOfExperience !== undefined && yearsOfExperience !== null
              ? `${yearsOfExperience} ${yearsOfExperience === 1 ? "year" : "years"}`
              : "N/A"}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Draft</span>
          <span className="info-value">
            {draftRound && draftNumber
              ? `Round ${draftRound}, Pick ${draftNumber}`
              : "N/A"}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Status</span>
          <span className="info-value">{status || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};
