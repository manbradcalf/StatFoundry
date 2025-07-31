import { PASSING_STATS } from "../../feature/Chunks/Views/PassingStats";
import {
  RECEIVING_STATS,
  RUSHING_STATS,
} from "../../feature/Chunks/Views/FlexStats";
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
    keys: [...RUSHING_STATS.map((x) => x.key)],
    priority: 2,
  },
  {
    name: "receiving",
    keys: [...RECEIVING_STATS.map((x) => x.key)],
    priority: 3,
  },
  {
    name: "passing",
    keys: [...PASSING_STATS.map((x) => x.key)],
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

export const defaultExcludeColumns = [
  "headshot_url",
  "gsis_id",
  "p.gsis_id",
  "pg.player_display_name",
  "ps.player_display_name",
];

// Key identifying fields that should always be shown in master rows
export const identifyingFields = [
  "player_display_name",
  "display_name",
  "position",
  "recent_team",
  "season",
  "week",
];
