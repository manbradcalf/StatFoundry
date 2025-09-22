import { TableGroup, ColumnGroup } from "./types";

// Default NFL stats grouping
export const defaultNFLGroups: TableGroup[] = [];

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
  "team",
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
export const columnGroups: ColumnGroup[] = [];
