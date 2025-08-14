import { SlotType } from "./Enums/SlotType";
// TODO: i am pretty sure we are duplicating logic between these Views and chunks_data_simplified.ts
import { PLAYER_GAME_INFO_PROPERTIES } from "./Views/PlayerGameInfo";
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
import { PLAYER_INFO_PROPERTIES } from "./Views/PlayerInfo";
import { PLAYER_SEASON_INFO_PROPERTIES } from "./Views/PlayerSeasonInfo";
import { PLAY_STATS } from "./Views/PlayStats";

// For QUERY building...
// Modular property definitions for each entity type
export const ENTITY_PROPERTIES: Record<SlotType, string[]> = {
  [SlotType.SelectPlayerProperty]: [...PLAYER_INFO_PROPERTIES],
  [SlotType.SelectPlayerGameProperty]: [...PLAYER_GAME_INFO_PROPERTIES],
  [SlotType.SelectPlayerSeasonProperty]: [...PLAYER_SEASON_INFO_PROPERTIES],
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
  [SlotType.FilterCondition]: [">", "=>", "=", "<", "<=", "<>", "in"],
  [SlotType.FilterValue]: [],
  [SlotType.MultiStatFilter]: [],
  [SlotType.SelectPlayStats]: [...PLAY_STATS.map((x) => x.key)],
};
