import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";

export const PASSING_STATS_CHUNKS: Chunk[] = [
  // Game
  {
    English: "who had [passing stat] > [value] in a Game",
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
        Value: "passing_yards",
        SlotValueTypes: [SlotType.SelectPassingStats]
      },
    ]
  },
  {
    English: "who had [passing stat] < [value] in a Game",
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
        Value: "passing_epa",
        SlotValueTypes: [SlotType.SelectPassingStats]
      },
    ]
  },

  //  Season
  {
    English: "who passed for MORE THAN [...] in a Season",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerSeason) WHERE ps.{stat} > {value}",
    EnglishTemplate: "who passed for MORE THAN {value} {stat}",
    CypherTemplate: "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "ps", Label: Label.PlayerSeason }],
    Slots: [
      {
        Name: "value",
        Value: 4000,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "passing_yards",
        SlotValueTypes: [SlotType.SelectPassingStats]
      },
    ]
  },
  {
    English: "who passed for LESS THAN [...] in a Season",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerSeason) WHERE ps.{stat} < {value}",
    EnglishTemplate: "who passed for LESS THAN {value} {stat}",
    CypherTemplate: "MATCH (p)-[:HAD]-(pg:PlayerSeason) WHERE ps.{stat} < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "ps", Label: Label.PlayerSeason }],
    Slots: [
      {
        Name: "value",
        Value: 4000,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "ruhsing_yards",
        SlotValueTypes: [SlotType.SelectPassingStats]
      },
    ]
  },
];
