import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

import { FLEX_STATS } from '../Views/FlexStats'; // adjust path as needed

export const FLEX_STATS_CHUNKS = FLEX_STATS.map(stat => ([{
  English: stat.type === "number" ? `who had [${stat.key}] in a Season` : `who played for [${stat.key}]`,
  Cypher: "",
  EnglishTemplate: "who had {condition} {value} {stat.key} in a Season",
  CypherTemplate: stat.type === "number" ?
    "MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE ps.{stat.key} {condition} {value}" :
    "MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE {value} {condition} ps.{stat.key}}",
  QueryType: QueryType.FILTER_START,
  Requires: [{ Name: "p", AliasType: AliasType.Player }],
  Provides: [{ Name: "ps", AliasType: AliasType.FlexSeason }],
  Slots: [
    {
      Name: "stat",
      Value: stat.key,
      SlotValueTypes: [SlotType.SelectFlexStats],
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
}, {
  English: stat.type === "number" ? `...and had [${stat.key}] that season` : `...and who played for [${stat.key}] that season`,
  Cypher: "",
  EnglishTemplate: "and who had {condition} {value} {stat.key} that Season",
  CypherTemplate: stat.type === "number" ?
    " AND ps.{stat.key} {condition} {value}" : " AND {value} {condition} ps.{stat.key} ",
  QueryType: QueryType.FILTER_EXTEND,
  Requires: [{ Name: "ps", AliasType: AliasType.FlexSeason }],
  Provides: [{ Name: "ps", AliasType: AliasType.FlexSeason }],
  Slots: [
    {
      Name: "stat",
      Value: stat.type === "number" ? "rushing_yards" : "teams",
      SlotValueTypes: stat.type === "number" ? [SlotType.SelectFlexStats] : [SlotType.Filter],
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
}])).flat();


