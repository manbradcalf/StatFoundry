import { PASSING_STATS } from "../../feature/Chunks/Views/PassingStats";
import {
  RECEIVING_STATS,
  RUSHING_STATS,
} from "../../feature/Chunks/Views/FlexStats";
import { TableGroup, ColumnGroup } from "./types";
import {
  GAME_PROPERTIES,
  GAME_PROPERTIES_BETTING,
  GAME_PROPERTIES_PEOPLE,
  GAME_PROPERTIES_PLACE,
} from "../../feature/Chunks/Views/GameStats";

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

// Columns that should always remain visible (cannot be hidden)
export const alwaysVisibleColumns = [
  "player_display_name",
  "display_name",
  "position",
  "recent_team",
];

// Column groups for organizing the visibility dropdown
export const columnGroups: ColumnGroup[] = [
  {
    name: "player",
    label: "Player Info",
    columns: [
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
    label: "Rushing Stats",
    columns: RUSHING_STATS.map((stat) => stat.key),
    priority: 2,
  },
  {
    name: "receiving",
    label: "Receiving Stats",
    columns: RECEIVING_STATS.map((stat) => stat.key),
    priority: 3,
  },
  {
    name: "passing",
    label: "Passing Stats",
    columns: PASSING_STATS.map((stat) => stat.key),
    priority: 4,
  },
  {
    name: "fantasy",
    label: "Fantasy",
    columns: ["fantasy_points", "fantasy_points_ppr"],
    priority: 5,
  },
  {
    name: "gameProperties",
    label: "Game Info",
    columns: [...GAME_PROPERTIES.map((x) => x.key)],
    priority: 6,
  },
  {
    name: "gameBetting",
    label: "Odds & Lines",
    columns: [...GAME_PROPERTIES_BETTING.map((x) => x.key)],
    priority: 6,
  },
  {
    name: "gamePeople",
    label: "Coaches & Refs",
    columns: [...GAME_PROPERTIES_PEOPLE.map((x) => x.key)],
    priority: 6,
  },
  {
    name: "gameWeather",
    label: "Weather & Place",
    columns: [...GAME_PROPERTIES_PLACE.map((x) => x.key)],
    priority: 6,
  },
];
