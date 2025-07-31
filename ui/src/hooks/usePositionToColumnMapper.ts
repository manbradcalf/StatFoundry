import {
  RECEIVING_STATS,
  RUSHING_STATS,
} from "../feature/Chunks/Views/FlexStats";
import { PASSING_STATS } from "../feature/Chunks/Views/PassingStats";

export const usePositionToStatColumnsMapper = (position: string): string[] => {
  const rushingStatsColumns = RUSHING_STATS.map((x) => x.key);
  const receivingStatsColumns = RECEIVING_STATS.map((x) => x.key);
  const passingStatsColumns = PASSING_STATS.map((x) => x.key);

  switch (position) {
    case "QB":
      return [...passingStatsColumns, ...rushingStatsColumns];
    case "RB":
      return [
        ...rushingStatsColumns,
        ...receivingStatsColumns,
        "fantasy_points",
        "fantasy_points_ppr",
      ];
    case "WR":
    case "TE":
      return [
        ...receivingStatsColumns,
        ...rushingStatsColumns,
        "fantasy_points",
        "fantasy_points_ppr",
      ];
    default:
      return [
        ...rushingStatsColumns,
        ...receivingStatsColumns,
        ...passingStatsColumns,
        "fantasy_points",
        "fantasy_points_ppr",
      ];
  }
};
