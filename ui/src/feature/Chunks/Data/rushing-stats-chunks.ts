import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

import { RUSHING_STATS } from '../Views/RushingStats'; // adjust path as needed
import { Chunk } from "../Types/Chunk";

export const RUSHING_STATS_CHUNKS = RUSHING_STATS.map(stat => ({
  English: stat.type === "number" ? `who had [${stat.key}] in a Season` : `who played for [${stat.key}]`,
  Cypher: "",
  EnglishTemplate: "who had {condition} {value} {stat.key} in a Season",
  CypherTemplate: stat.type === "number" ?
    "CALL (p) { MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE ps.{stat.key} {condition} {value} RETURN ps as rbSeason }" :
    "CALL (p) { MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE {value} {condition} ps.{stat.key} RETURN ps as rbSeason }",
  QueryType: QueryType.FILTER,
  Requires: [{ Name: "p", AliasType: AliasType.Player }],
  Provides: [{ Name: `rbSeason`, AliasType: AliasType.RBSeason }],
  Slots: [
    {
      Name: "stat",
      Value: stat.key,
      SlotValueTypes: [SlotType.SelectRushingStats],
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
}));

export const RUSHING_STATS_AND: Chunk = {
  English: `and ...`,
  Cypher: "",
  EnglishTemplate: "and who had {condition} {value} {stat.key} in a Season",
  CypherTemplate:
    "MATCH (rbSeason) WHERE rbSeason.{stat.key} {condition} {value}",
  QueryType: QueryType.FILTER,
  Requires: [{ Name: "rbSeason", AliasType: AliasType.RBSeason }],
  Provides: [{ Name: `rbSeason`, AliasType: AliasType.RBSeason }],
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
}

