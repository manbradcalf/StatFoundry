import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

import { FLEX_STATS } from '../Views/RushingStats'; // adjust path as needed

export const RUSHING_STATS_CHUNKS = FLEX_STATS.map(stat => ([{
  English: stat.type === "number" ? `who had [${stat.key}] in a Season` : `who played for [${stat.key}]`,
  Cypher: "",
  EnglishTemplate: "who had {condition} {value} {stat.key} in a Season",
  CypherTemplate: stat.type === "number" ?
    "CALL (p) { MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE ps.{stat.key} {condition} {value} RETURN ps }" :
    "CALL (p) { MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE {value} {condition} ps.{stat.key} RETURN ps }",
  QueryType: QueryType.FILTER,
  Requires: [{ Name: "p", AliasType: AliasType.Player }],
  Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
  Slots: [
    {
      Name: "stat",
      Value: stat.key,
      SlotValueTypes: [SlotType.Filter],
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
  CypherTemplate:
    "MATCH (ps) WHERE ps.{stat.key} {condition} {value}",
  QueryType: QueryType.FILTER,
  Requires: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
  Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
  Slots: [
    {
      Name: "stat",
      Value: "rushing_yards",
      SlotValueTypes: [SlotType.Filter],
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
}])).flat();


