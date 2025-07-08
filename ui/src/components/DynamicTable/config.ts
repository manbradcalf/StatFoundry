import { PASSING_STATS } from "../../feature/Chunks/Views/PassingStats";
import { RUSHING_STATS } from "../../feature/Chunks/Views/RushingStats";
import { RECEIVING_STATS } from "../../feature/Chunks/Views/ReceivingStats";
import { TableGroup } from "./types";

// Default NFL stats grouping
export const defaultNFLGroups: TableGroup[] = [
  {
    name: "player",
    keys: [
      "player_display_name",
      "display_name",
      "position",
      "position_group",
      "recent_team",
    ],
    priority: 1,
  },
  {
    name: "rushing",
    keys: [...RUSHING_STATS],
    priority: 2,
  },
  {
    name: "passing",
    keys: [...PASSING_STATS],
    priority: 3,
  },
  {
    name: "receiving",
    keys: [...RECEIVING_STATS],
    priority: 4,
  },
  {
    name: "fantasy",
    keys: ["fantasy_points", "fantasy_points_ppr"],
    priority: 5,
  },
  {
    name: "game",
    keys: [
      "opponent_team",
      "won",
      "season",
      "week",
      "season_type",
      "game_id",
      "player_game_id",
      "player_id",
    ],
    priority: 6,
  },
];

export const defaultExcludeColumns = ["headshot_url", "player_name"];

// Key identifying fields that should always be shown in master rows
export const identifyingFields = [
  "player_display_name",
  "display_name",
  "position",
  "recent_team",
  "season",
  "week",
];
