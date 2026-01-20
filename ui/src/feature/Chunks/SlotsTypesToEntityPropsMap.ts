import { SlotType } from "./Enums/SlotType";
// TODO: i am pretty sure we are duplicating logic between these Views and chunks_data_simplified.ts
import {
  PASSING_STATS,
  PASSING_STATS_GAME,
  PASSING_STATS_SEASON,
} from "./Views/PassingStats";
import {
  FLEX_STATS,
  FLEX_STATS_GAME,
  FLEX_STATS_SEASON,
} from "./Views/FlexStats";
import { PLAYER_LABEL_PROPERTIES } from "./Views/PlayerLabelView";
import { PLAYERGAME_LABEL_PROPERTIES } from "./Views/PlayerGameLabelView";
import { PLAYERSEASON_LABEL_PROPERTIES } from "./Views/PlayerSeasonLabelView";
import { PLAY_LABEL_PROPERTIES } from "./Views/PlayLabelView";

// For QUERY building...
// Modular property definitions for each entity type
export const ENTITY_PROPERTIES: Record<SlotType, string[]> = {
  [SlotType.SelectPlayerProperty]: [...PLAYER_LABEL_PROPERTIES].map(
    (x) => x.key,
  ),
  [SlotType.SelectPlayerGameProperty]: [...PLAYERGAME_LABEL_PROPERTIES].map(
    (x) => x.key,
  ),
  [SlotType.SelectPlayerSeasonProperty]: [...PLAYERSEASON_LABEL_PROPERTIES].map(
    (x) => x.key,
  ),
  [SlotType.SelectFlexStats]: [...FLEX_STATS.map((x) => x.key)],
  [SlotType.SelectFlexStatsGame]: [...FLEX_STATS_GAME.map((x) => x.key)],
  [SlotType.SelectFlexStatsSeason]: [...FLEX_STATS_SEASON.map((x) => x.key)],
  [SlotType.SelectPassingStats]: [...PASSING_STATS.map((x) => x.key)],
  [SlotType.SelectPassingStatsGame]: [...PASSING_STATS_GAME.map((x) => x.key)],
  [SlotType.SelectPassingStatsSeason]: [
    ...PASSING_STATS_SEASON.map((x) => x.key),
  ],
  [SlotType.SelectPlayerPosition]: ["QB", "RB", "WR", "TE", "K"],
  // Placeholder for future entity types - will be extended as needed
  [SlotType.SelectTeamProperty]: [],
  [SlotType.SelectGameProperty]: [],
  [SlotType.SelectSeasonProperty]: [],
  [SlotType.SelectTeamGameProperty]: [],
  [SlotType.SelectTeamSeasonProperty]: [],
  [SlotType.Filter]: [],
  [SlotType.FilterCondition]: [">", ">=", "=", "<", "<=", "<>", "in"],
  [SlotType.FilterValue]: [],
  [SlotType.SelectPlayStats]: [...PLAY_LABEL_PROPERTIES.map((x) => x.key)],
  // SelectReturnProperties is handled by ReturnPropertySelector component
  [SlotType.SelectReturnProperties]: [],
};
