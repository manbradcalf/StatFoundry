import React, { useState } from "react";
import { usePlayerDetailContext } from "../../contexts/PlayerDetailContext";
import { RUSHING_STATS } from "../../feature/Chunks/Views/FlexStats";
import { PASSING_STATS_GAME } from "../../feature/Chunks/Views/PassingStats";
import { DynamicTable } from "../DynamicTable";

export const PlayerSeasons: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { playerSeasons, playerSeasonsError, isLoadingPlayerSeasons } =
    usePlayerDetailContext();

  if (playerSeasonsError) {
    return <div>{playerSeasonsError}</div>;
  }

  if (isLoadingPlayerSeasons) {
    return <div className="loading-state">Loading player seasons...</div>;
  }

  // TODO: Type playerSeasons properly. For now, treat as any[] for table display.
  const seasonsArray: any[] = Array.isArray(playerSeasons) ? playerSeasons : [];
  const tableData = seasonsArray.map((s) => {
    const season = s.ps || s;
    return {
      ...season,
      teams: Array.isArray(season.teams)
        ? season.teams.join(", ")
        : season.teams,
    };
  });

  // Determine player type (position_group) from first row
  const playerType = tableData[0]?.position || "FLEX";

  // Map player type to relevant columns based on position
  const getColumnsForPosition = (position: string): string[] => {
    const playerSeasonColumns = ["season", "games", "teams"];

    switch (position) {
      case "QB":
        return [
          ...playerSeasonColumns,
          ...PASSING_STATS_GAME.map((x) => x.key),
          ...RUSHING_STATS.map((x) => x.key),
        ];
      case "RB":
        return [
          ...playerSeasonColumns,
          "rushing_yards",
          "rushing_tds",
          "receiving_yards",
          "receiving_tds",
          "fantasy_points_ppr",
        ];
      case "WR":
      case "TE":
        return [
          ...playerSeasonColumns,
          "receiving_yards",
          "receiving_tds",
          "targets",
          "receptions",
          "fantasy_points_ppr",
        ];
      default:
        return [
          ...playerSeasonColumns,
          "passing_yards",
          "rushing_yards",
          "receiving_yards",
          "fantasy_points_ppr",
        ];
    }
  };

  const columns = getColumnsForPosition(playerType);

  const handleExport = () => {
    // This is where you'd handle paywall logic, analytics, etc.
    console.log("CSV export triggered for player seasons");
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <h2 style={{ margin: 0 }}>Seasons</h2>
        <p
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{ cursor: "pointer", margin: 0 }}
        >
          {isCollapsed ? "▶" : "▼"}
        </p>
      </div>
      {!isCollapsed && (
        <DynamicTable
          data={tableData}
          columns={columns}
          enableExport={true}
          exportFilename={`player-seasons-${playerType.toLowerCase()}`}
          onExport={handleExport}
          requireAuthForExport={true}
        />
      )}
    </div>
  );
};
