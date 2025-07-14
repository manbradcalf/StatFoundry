import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";
import { PASSING_STATS } from "../Views/PassingStats";
import { Chunk } from "../Types/Chunk";

export const PASSING_STATS_CHUNKS: Chunk[] = PASSING_STATS.map((stat) => [
  // Season
  {
    English: `who had [${stat.key}] in a Season`,
    Cypher: "",
    EnglishTemplate: "who had {stat} {condition} {value} in a Season",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} {condition} {value}",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "ps", AliasType: AliasType.PassingSeason }],
    Slots: [
      {
        Name: "stat",
        Value: stat.key, // todo: make this whatever stat
        SlotValueTypes: [SlotType.SelectPassingStats],
      },
      {
        Name: "condition",
        Value: ">",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      { Name: "value", Value: 4000, SlotValueTypes: [SlotType.FilterValue] },
    ],
  },
  {
    English: `...and had [${stat.key}] in those Seasons`,
    Cypher: "",
    EnglishTemplate: "and who had {stat} {condition} {value} in those Seasons",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} {condition} {value}",
    QueryType: QueryType.FILTER_EXTEND,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "ps", AliasType: AliasType.PassingSeason }],
    Slots: [
      {
        Name: "stat",
        Value: stat.key,
        SlotValueTypes: [SlotType.SelectPassingStats],
      },
      {
        Name: "condition",
        Value: ">",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      { Name: "value", Value: 100, SlotValueTypes: [SlotType.FilterValue] },
    ],
  },
  // Game
  {
    English: "who had [passing stats] in a Game",
    Cypher: "",
    EnglishTemplate: "who had {condition} {value} {stat} in a Game",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} {condition} {value}",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "pg", AliasType: AliasType.PassingGame }],
    Slots: [
      {
        Name: "stat",
        Value: stat.key,
        SlotValueTypes: [SlotType.SelectPassingStats],
      },
      {
        Name: "condition",
        Value: ">",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      { Name: "value", Value: 100, SlotValueTypes: [SlotType.FilterValue] },
    ],
  },
  {
    English: `...and had [${stat.key}] in those Games`,
    Cypher: "",
    EnglishTemplate: "and who had {stat} {condition} {value} in those Games",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} {condition} {value}",
    QueryType: QueryType.FILTER_EXTEND,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "pg", AliasType: AliasType.PassingGame }],
    Slots: [
      {
        Name: "stat",
        Value: stat.key,
        SlotValueTypes: [SlotType.SelectPassingStats],
      },
      {
        Name: "condition",
        Value: ">",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      { Name: "value", Value: 100, SlotValueTypes: [SlotType.FilterValue] },
    ],
  },
]).flat();
