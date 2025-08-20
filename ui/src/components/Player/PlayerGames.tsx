import React, { useState } from "react";
import { usePlayerDetailContext } from "../../contexts/PlayerDetailContext";
import { analytics } from "../../firebase/config";
import { usePositionToStatColumnsMapper } from "../../hooks/usePositionToColumnMapper";
import { analyticsService } from "../../utils/analytics";
import { DynamicTable } from "../DynamicTable";
import { useAuth } from "../../contexts/AuthContext";

export const PlayerGames: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { playerGames, isLoadingPlayerGames } = usePlayerDetailContext();

  const gamesArray: any[] = Array.isArray(playerGames) ? playerGames : [];

  const tableData = gamesArray.map((g) => g.pg || g);

  // Determine player type (position_group) from first row
  const playerPosition = tableData[0]?.position;

  const playerGameColumns = [
    "season",
    "week",
    "recent_team",
    "opponent_team",
    "game_id",
  ];

  const statColumns = usePositionToStatColumnsMapper(playerPosition);

  if (isLoadingPlayerGames) {
    return <div className="loading-state">Loading player games...</div>;
  }

  const handleExport = () => {
    // This is where you'd handle paywall logic, analytics, etc.
    console.log("CSV export triggered for player games");
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <h2 style={{ margin: 0 }}>Games</h2>
        <p
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ cursor: "pointer", margin: 0 }}
        >
          {isCollapsed ? "▶" : "▼"}
        </p>
      </div>
      {!isCollapsed && (
        <div>
          <DynamicTable
            data={tableData}
            columns={[...playerGameColumns, ...statColumns]}
            enableExport={true}
            exportFilename="player-games"
            onExport={handleExport}
          />
        </div>
      )}
    </div>
  );
};
