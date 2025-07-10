import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

import { RUSHING_STATS } from '../Views/RushingStats'; // adjust path as needed

export const RUSHING_STATS_CHUNKS = RUSHING_STATS.map(stat => ({
  English: `who had [${stat}] in a Season`,
  Cypher: "",
  EnglishTemplate: "who had {condition} {value} {stat} in a Season",
  CypherTemplate:
    "CALL (p) { MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE ps.{stat} {condition} {value} RETURN ps as rbSeason_{stat} }",
  QueryType: QueryType.FILTER,
  Requires: [{ Name: "p", AliasType: AliasType.Player }],
  Provides: [{ Name: `rbSeason_${stat}`, AliasType: AliasType.RBSeason }],
  Slots: [
    {
      Name: "stat",
      Value: stat,
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
}));

