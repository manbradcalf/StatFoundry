import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

export const RUSHING_STATS_CHUNKS: Chunk[] = [
  // Game
  {
    English: "who had [rushing stats] in Games",
    Cypher:
      "CALL (p) { MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} {condition} {value} RETURN p as rb, pg as rbGames }",
    EnglishTemplate: "who had {condition} {value} {stat} in a Game",
    CypherTemplate:
      "CALL (p) { MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} {condition} {value} RETURN p as rb, pg as rbGames }",
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [
      { Name: "rbGames", AliasType: AliasType.RBGame },
      { Name: "rb", AliasType: AliasType.Player },
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
    English: "during the [season]",
    Cypher: "",
    EnglishTemplate: "during the {season} season",
    CypherTemplate: `CALL (rbGames) { 
      WITH rbGames WHERE rbGames.season = {season} 
      RETURN rbGames as rbGamesDuringSeason 
    }`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "rbGames", AliasType: AliasType.RBGame }],
    Provides: [{ Name: "rbGamesDuringSeason", AliasType: AliasType.RBGame }],
    Slots: [
      {
        Name: "season",
        Value: 2024,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  // Season
  {
    English: "who had [rushing stats] in a Season",
    Cypher:
      "CALL (p) { MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} {condition} {value} RETURN ps as rbSeason }",
    EnglishTemplate: "who had {condition} {value} {stat} in a Season",
    CypherTemplate:
      "CALL (p) { MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} {condition} {value} RETURN ps as rbSeason }",
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "rbSeason", AliasType: AliasType.RBSeason }],
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
];
