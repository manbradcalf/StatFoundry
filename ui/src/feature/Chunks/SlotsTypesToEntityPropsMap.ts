import { SlotType } from "./Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "./Views/PlayerGameInfo";
import { PASSING_STATS } from "./Views/PassingStats";
import { RECEIVING_STATS } from "./Views/ReceivingStats";
import { RUSHING_STATS } from "./Views/RushingStats";
import { PLAYER_INFO_PROPERTIES } from "./Views/PlayerInfo";
import { PLAYER_SEASON_INFO_PROPERTIES } from "./Views/PlayerSeasonInfo";

// Modular property definitions for each entity type
export const ENTITY_PROPERTIES: Record<SlotType, string[]> = {
  [SlotType.SelectPlayerProperty]: [...PLAYER_INFO_PROPERTIES],
  [SlotType.SelectPlayerGameProperty]: [...PLAYER_GAME_INFO_PROPERTIES],
  [SlotType.SelectPlayerSeasonProperty]: [...PLAYER_SEASON_INFO_PROPERTIES],
  [SlotType.SelectRushingStats]: [...RUSHING_STATS],
  [SlotType.SelectReceivingStats]: [...RECEIVING_STATS],
  [SlotType.SelectPassingStats]: [...PASSING_STATS],
  [SlotType.SelectPlayerPosition]: ["QB", "RB", "WR", "TE", "K"],
  // Placeholder for future entity types - will be extended as needed
  [SlotType.SelectTeamProperty]: [],
  [SlotType.SelectGameProperty]: [],
  [SlotType.SelectSeasonProperty]: [],
  [SlotType.SelectTeamGameProperty]: [],
  [SlotType.SelectTeamSeasonProperty]: [],
  [SlotType.Filter]: [],
  [SlotType.FilterCondition]: [">", "=>", "=", "<", "<=", "<>"],
  [SlotType.FilterValue]: [],
};
