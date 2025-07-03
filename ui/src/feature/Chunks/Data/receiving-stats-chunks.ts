import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { RECEIVING_STATS } from "../Views/ReceivingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";
export const RECEIVING_STATS_CHUNKS: Chunk[] = [
  // Game
  {
    English: "who had MORE than [...receivingStats] in a Game",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}",
    EnglishTemplate: "who had MORE THAN {value} {stat} in a Game",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [
      { Name: "p", Label: Label.Player },
      { Name: "pg", Label: Label.PlayerGame },
    ],
    Slots: [
      {
        Name: "value",
        Value: 1000,
        SlotValueTypes: [SlotType.FilterValue],
      },
      {
        Name: "stat",
        Value: "rushing_yards",
        SlotValueTypes: [SlotType.SelectReceivingStats],
      },
    ],
  },
  {
    English: "who had LESS than [...receivingStats] in a Game",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} < {value}",
    EnglishTemplate: "who had LESS THAN {value} {stat} in a Game",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [
      { Name: "p", Label: Label.Player },
      { Name: "pg", Label: Label.PlayerGame },
    ],
    Slots: [
      {
        Name: "value",
        Value: 1000,
        SlotValueTypes: [SlotType.FilterValue],
      },
      {
        Name: "stat",
        Value: "rushing_yards",
        SlotValueTypes: [SlotType.SelectReceivingStats],
      },
    ],
  },
  //  Season
  {
    English: "who had MORE THAN [...receivingStats] in a Season",
    Cypher: "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} > {value}",
    EnglishTemplate: "who had MORE THAN {value} {stat} in a Season",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [
      { Name: "p", Label: Label.Player },
      { Name: "ps", Label: Label.PlayerSeason },
    ],
    Slots: [
      {
        Name: "value",
        Value: 1000,
        SlotValueTypes: [SlotType.FilterValue],
      },
      {
        Name: "stat",
        Value: "ruhsing_yards",
        SlotValueTypes: [SlotType.SelectReceivingStats],
      },
    ],
  },
  {
    English: "who had LESS THAN [...receivingStats] in a Season",
    Cypher: "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} < {value}",
    EnglishTemplate: "who had LESS THAN {value} {stat} in a Season",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(pg:PlayerSeason) WHERE ps.{stat} < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [
      { Name: "p", Label: Label.Player },
      { Name: "ps", Label: Label.PlayerSeason },
    ],
    Slots: [
      {
        Name: "value",
        Value: 1000,
        SlotValueTypes: [SlotType.FilterValue],
      },
      {
        Name: "stat",
        Value: "ruhsing_yards",
        SlotValueTypes: [SlotType.SelectReceivingStats],
      },
    ],
  },
  {
    English: "return receiving stats by game",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...RECEIVING_STATS].join(", pg.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving stats by season",
    Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...RECEIVING_STATS].join(", ps.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
    Outputs: [],
    Slots: [],
  },
];
