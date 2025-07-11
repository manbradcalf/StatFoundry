import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";
import { PLAYER_GAME_INFO_PROPERTIES } from "../Views/PlayerGameInfo";
import { PASSING_STATS } from "../Views/PassingStats";
import { PLAYER_SEASON_INFO_PROPERTIES } from "../Views/PlayerSeasonInfo";

export const PASSING_STATS_CHUNKS: Chunk[] = [
  // Game
  {
    English: "who had [passing stats] in a Game",
    Cypher: `CALL (p) {
        MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}
        RETURN p, pg
      }`,
    EnglishTemplate: "who had {condition} {value} {stat} in a Game",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(pg:PlayerGame) WHERE pg.{stat} > {value}",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [
      { Name: "p", AliasType: AliasType.Player },
      { Name: "pg", AliasType: AliasType.PlayerGame },
    ],
    Slots: [
      {
        Name: "stat",
        Value: "passing_yards",
        SlotValueTypes: [SlotType.SelectPassingStats],
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
    English: "who had [passing stats] in a Season",
    Cypher: "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} > {value}",
    EnglishTemplate: "who had {condition} {value} {stat} in a Season",
    CypherTemplate:
      "MATCH (p)-[:HAD]-(ps:PlayerSeason) WHERE ps.{stat} > {value}",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [
      { Name: "p", AliasType: AliasType.Player },
      { Name: "ps", AliasType: AliasType.PlayerSeason },
    ],
    Slots: [
      {
        Name: "stat",
        Value: "passing_yards",
        SlotValueTypes: [SlotType.SelectPassingStats],
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
    English: "return passing stats by game",
    Cypher: `RETURN pg.${[...PLAYER_GAME_INFO_PROPERTIES, ...PASSING_STATS].join(", pg.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [],
    Slots: [],
  },
  {
    English: "return passing stats by season",
    Cypher: `RETURN ps.${[...PLAYER_SEASON_INFO_PROPERTIES, ...PASSING_STATS].join(", ps.")}`,
    QueryType: QueryType.RETURN,
    Requires: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
    Provides: [],
    Slots: [],
  },
];
