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
    English: "who had [rushing stats] in a Game",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}",
    EnglishTemplate: "who had {condition} {value} {stat} in a Game",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: AliasType.Player }],
    Outputs: [
      { Name: "p", Label: AliasType.Player },
      { Name: "pg", Label: AliasType.RBGame },
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
    Cypher: "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} > {value}",
    EnglishTemplate: "who had {condition} {value} {stat} in a Season",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: AliasType.Player }],
    Outputs: [
      { Name: "p", Label: AliasType.Player },
      { Name: "ps", Label: AliasType.RBSeason },
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
  {
    English: "return rushing stats by game",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS].join(", pg.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "pg", Label: AliasType.RBGame }],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing stats by season",
    Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS].join(", ps.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "ps", Label: AliasType.RBSeason }],
    Outputs: [],
    Slots: [],
  },
];
