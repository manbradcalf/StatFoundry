import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";
import { PASSING_STATS } from "../Views/PassingStats";

export const PASSING_STATS_CHUNKS: Chunk[] = [
  // Game
  {
    English: "who passed for MORE than [...] in a Game",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}",
    EnglishTemplate: "who passed for MORE THAN {value} {stat} in a Game",
    CypherTemplate: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE p.{stat} > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "value",
        Value: 1000,
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
    English: "who passed for LESS THAN [...] in a Game",
    Cypher: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} < {value}",
    EnglishTemplate: "who passed for LESS THAN {value} {stat} in a Game",
    CypherTemplate: "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE p.{stat} < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [{ Name: "p", Label: Label.Player }],
    Outputs: [{ Name: "p", Label: Label.Player }, { Name: "pg", Label: Label.PlayerGame }],
    Slots: [
      {
        Name: "value",
        Value: 1000,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "passing_yards",
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
        Value: 1000,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "ruhsing_yards",
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
        Value: 1000,
        SlotValueTypes: [SlotType.FilterValue]
      },
      {
        Name: "stat",
        Value: "ruhsing_yards",
        SlotValueTypes: [SlotType.SelectPassingStats]
      },
    ]
  },
  {
    English: "return passing stats by game",
    Cypher: `RETURN pg.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", pg.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing stats by season",
    Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", ps.")}`,
    QueryType: QueryType.RETURN,
    Inputs: [{ Name: "ps", Label: Label.PlayerSeason }],
    Outputs: [],
    Slots: [],
  },
];
