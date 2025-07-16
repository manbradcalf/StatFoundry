import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

import { FLEX_STATS } from "../Views/FlexStats"; // adjust path as needed

export const FLEX_STATS_CHUNKS = FLEX_STATS.map((stat) => [
  // Currently, the only string-filterable stat is recent_team, team, display_name, etc
  // So you will see some logic here that assumes all string stats need "=" for the condition
  // TODO: Moving forward, we should handle string stats more dynamically, in case we want to check for IN or STARTSWITH etc
  {
    English:
      stat.type === "number"
        ? `Seasons with [${stat.key}]`
        : `had Season for [${stat.key}]`,
    Cypher: "",
    EnglishTemplate: "Seasons with {condition} {value} {stat.key}",
    CypherTemplate:
      stat.type === "number"
        ? "MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE ps.{stat.key} {condition} {value}"
        : "MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE {value} {condition} ps.{stat.key}}",
    QueryType: QueryType.FILTER_START,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
    Slots: [
      {
        Name: "stat",
        Value: stat.key,
        SlotValueTypes: [SlotType.SelectFlexStatsSeason],
      },
      {
        Name: "condition",
        Value: stat.type === "number" ? ">" : "in",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      {
        Name: "value",
        Value: stat.type === "number" ? 1000 : "player name, team name, etc",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: "rush rushed received caught ran"
  },
  {
    English:
      stat.type === "number"
        ? `...and [${stat.key}] that season`
        : `...and had season for [${stat.key}]`,
    Cypher: "",
    EnglishTemplate: "and who had {condition} {value} {stat.key} that Season",
    CypherTemplate:
      stat.type === "number"
        ? " AND ps.{stat.key} {condition} {value}"
        : " AND {value} {condition} ps.{stat.key} ",
    QueryType: QueryType.FILTER_EXTEND,
    Requires: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
    Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
    Slots: [
      {
        Name: "stat",
        Value: stat.type === "number" ? stat.key : "teams",
        SlotValueTypes:
          stat.type === "number"
            ? [SlotType.SelectFlexStatsSeason]
            : [SlotType.Filter],
      },
      {
        Name: "condition",
        Value: stat.type === "number" ? ">" : "in",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      {
        Name: "value",
        Value: stat.type === "number" ? 1000 : "MIN",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: "rush rushed received caught ran"
  },
  // game
  {
    English:
      stat.type === "number"
        ? `Games with [${stat.key}]`
        : `had game for [${stat.key}]`,
    Cypher: "",
    EnglishTemplate: "games with {condition} {value} {stat.key}",
    CypherTemplate:
      stat.type === "number"
        ? "MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE pg.{stat.key} {condition} {value}"
        : "MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE {value} {condition} pg.{stat.key}}",
    QueryType: QueryType.FILTER_START,
    Requires: [
      {
        Name: "p",
        AliasType: AliasType.Player,
      },
    ],
    Provides: [
      {
        Name: "pg",
        AliasType: AliasType.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "stat",
        Value: stat.key,
        SlotValueTypes: [SlotType.SelectFlexStatsGame],
      },
      {
        Name: "condition",
        Value: stat.type === "number" ? ">" : "in",
        SlotValueTypes: [SlotType.FilterCondition],
      },
      {
        Name: "value",
        Value: stat.type === "number" ? 1000 : "player name, team name, etc",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: "rush rushed received caught ran"
  },
  {
    English:
      stat.type === "number"
        ? `...and had [${stat.key}] that game`
        : `...and had game for [${stat.key}]`,
    Cypher: "",
    EnglishTemplate:
      stat.type === "number"
        ? "and with {condition} {value} {stat.key} that Game"
        : "and who played for {value} that game",
    CypherTemplate: " AND pg.{stat.key} {condition} {value}",
    QueryType: QueryType.FILTER_EXTEND,
    Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    Provides: [
      {
        Name: "pg",
        AliasType: AliasType.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "stat",
        Value: stat.type === "number" ? stat.key : "recent_team", // right now, team info is the only string-filterable stat...
        SlotValueTypes: [SlotType.SelectFlexStatsGame],
      },
      {
        Name: "condition",
        Value: stat.type === "number" ? ">" : "=", // ...since we know that we are checking the team string, we just use = for now
        SlotValueTypes: [SlotType.FilterCondition],
      },
      {
        Name: "value",
        Value: stat.type === "number" ? 1000 : "MIN", // ... example: Minnesota
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
    SuggestionKeywords: "rush rushed received caught ran"
  },
]).flat();
