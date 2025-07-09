import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { RUSHING_STATS } from "../Views/RushingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";

export const RUSHING_STATS_CHUNKS: Chunk[] = [
  // Game
  {
    English: "who had [rushing stats] in Games",
    Cypher:
      "CALL (p) { MATCH (p)-[:HAD]-(pg) WHERE pg.{stat} {condition} {value} RETURN pg as rbGame }",
    EnglishTemplate: "who had {condition} {value} {stat} in a Game",
    CypherTemplate:
      "CALL (p) { MATCH (p)-[:HAD]-(pg) WHERE pg.{stat} {condition} {value} RETURN pg as rbGame }",
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", Label: AliasType.Player }],
    Provides: [
      { Name: "p", Label: AliasType.Player },
      { Name: "rbGame", Label: AliasType.RBGame },
    ],
    Slots: [
      {
        Name: "stat",
        Value: "rushing_yards",
        SlotValueTypes: [SlotType.SelectRushingStats],
      },
      {
        Name: "condition",
        Value: ">",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  // Season
  {
    English: "who had [rushing stats] in a Season",
    Cypher:
      "CALL (p) { MATCH (p)-[:HAD]-(ps) WHERE ps.{stat} {condition} {value} RETURN ps as rbSeason }",
    EnglishTemplate: "who had {condition} {value} {stat} in a Season",
    CypherTemplate:
      "CALL (p) { MATCH (p)-[:HAD]-(ps) WHERE ps.{stat} {condition} {value} RETURN ps as rbSeason }",
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", Label: AliasType.Player }],
    Provides: [
      { Name: "p", Label: AliasType.Player },
      { Name: "rbSeason", Label: AliasType.RBSeason },
    ],
    Slots: [
      {
        Name: "stat",
        Value: "rushing_yards",
        SlotValueTypes: [SlotType.SelectRushingStats],
      },
      {
        Name: "condition",
        Value: ">",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      {
        Name: "value",
        Value: 1000,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "return rushing stats by game",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS].join(", pg.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "pg", Label: AliasType.RBGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "return rushing stats by season",
    Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS].join(", ps.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "ps", Label: AliasType.RBSeason }],
    Provides: [],
    Slots: [],
  },
];
