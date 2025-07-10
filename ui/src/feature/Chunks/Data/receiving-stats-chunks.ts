import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { RECEIVING_STATS } from "../Views/ReceivingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";

export const RECEIVING_STATS_CHUNKS: Chunk[] = [
  // Game
  {
    English: "who had [receiving stats] in a Game",
    Cypher: `
        CALL (p) { 
          MATCH (p)-[:HAD]-(pg:PlayerGame) 
          WHERE pg.{stat} > {value} 
          RETURN p, pg
      }`,
    EnglishTemplate: "who had {condition} {value} {stat} in a Game",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}",
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [
      { Name: "p", AliasType: AliasType.Player },
      { Name: "pg", AliasType: AliasType.PlayerGame },
    ],
    Slots: [
      {
        Name: "stat",
        Value: "receiving_yards",
        SlotValueTypes: [SlotType.SelectReceivingStats],
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
    English: "who had [receiving stats] in a Season",
    Cypher:
      "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} {condition} {value}",
    EnglishTemplate: "who had {condition} {value} {stat} in a Season",
    CypherTemplate: `
        CALL (p) {
        MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} {condition} {value}
        RETURN p, ps
      }`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [
      { Name: "p", AliasType: AliasType.Player },
      { Name: "ps", AliasType: AliasType.PlayerSeason },
    ],
    Slots: [
      {
        Name: "stat",
        Value: "receiving_yards",
        SlotValueTypes: [SlotType.SelectReceivingStats],
      },
      {
        Name: "condition",
        Value: ">",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      {
        Name: "value",
        Value: 4000,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "return receiving stats by game",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RECEIVING_STATS].join(", pg.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "return receiving stats by season",
    Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RECEIVING_STATS].join(", ps.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
    Provides: [],
    Slots: [],
  },
];
