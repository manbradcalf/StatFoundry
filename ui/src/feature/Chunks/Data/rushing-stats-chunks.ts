import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { RUSHING_STATS } from "../Views/RushingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";

export const RUSHING_STATS_CHUNKS: Chunk[] = [
  // Game
  {
    English: "who had [rushing stat] > [value] in a Game",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}",
    EnglishTemplate: "who had MORE THAN {value} {stat} in a Game",
    CypherTemplate: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "rushing_yards",
        SlotValueTypes: [SlotType.SelectRushingStats]
      },
    ]
  },
  {
    English: "who had [rushing stat] < [value] in a Game",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} < {value}",
    EnglishTemplate: "who had LESS THAN {value} {stat} in a Game",
    CypherTemplate: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "value",
        Value: 2.0,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "rushing_epa",
        SlotValueTypes: [SlotType.SelectRushingStats]
      },
    ]
  },
  {
    English: "who had [rushing stat] == [value] in a Game",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} = {value}",
    EnglishTemplate: "who had EXACTLY {value} {stat} in a Game",
    CypherTemplate: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "rushing_fumbles",
        SlotValueTypes: [SlotType.SelectRushingStats]
      },
    ]
  },
  //  Season
  {
    English: "who had [rushing stat] > [value] in a Season",
    Cypher: "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} > {value}",
    EnglishTemplate: "who had MORE THAN {value} {stat} in a Season",
    CypherTemplate: "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "ps", Label: Label.PlayerSeason }],
    Slots: [
      {
        Name: "value",
        Value: 1000,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "ruhsing_yards",
        SlotValueTypes: [SlotType.SelectRushingStats]
      },
    ]
  },
  {
    English: "who had [rushing stat] < [value] in a Season",
    Cypher: "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} < {value}",
    EnglishTemplate: "who rushed for LESS THAN {value} {stat} in a Season",
    CypherTemplate: "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "ps", Label: Label.PlayerSeason }],
    Slots: [
      {
        Name: "value",
        Value: 50,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "carries",
        SlotValueTypes: [SlotType.SelectRushingStats]
      },
    ]
  },
  {
    English: "return rushing stats by game",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RUSHING_STATS].join(", pg.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing stats by season",
    Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RUSHING_STATS].join(", ps.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
    Outputs: [],
    Slots: [],
  },
];
