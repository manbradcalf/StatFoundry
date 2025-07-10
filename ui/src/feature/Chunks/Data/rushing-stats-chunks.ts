import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

import { RUSHING_STATS } from '../Views/RushingStats';
import { Chunk } from "../Types/Chunk";

// Regenerate rushing stat filter chunks for every stat covering Season & Game levels
// For each stat we create:
// 1. A Season-level filter chunk
// 2. A Season-level "AND" filter chunk (allows additional rushing filters on same season alias)
// 3. A Game-level filter chunk
// 4. A Game-level "AND" filter chunk
//
// All chunks share the same slot schema: {stat, condition, value}
export const RUSHING_STATS_CHUNKS: Chunk[] = RUSHING_STATS.flatMap((stat) => {
  // Common slot definitions helper
  const baseSlots = (defaultCondition: string, defaultValue: string | number): any[] => [
    {
      Name: "stat",
      Value: stat.key,
      SlotValueTypes: [SlotType.SelectRushingStats],
    },
    {
      Name: "condition",
      Value: defaultCondition,
      SlotValueTypes: [SlotType.FilterCondition],
    },
    {
      Name: "value",
      Value: defaultValue,
      SlotValueTypes: [SlotType.FilterValue],
    },
  ];

  const numberStat = stat.type === "number";
  const defaultCondition = numberStat ? ">" : "in";
  const defaultValue = numberStat ? 100 : "value";

  // Season-level primary filter
  const seasonFilter: Chunk = {
    English: numberStat
      ? `who had [${stat.key}] in a Season`
      : `who played for [${stat.key}]`,
    Cypher: "", // Filled at runtime using CypherTemplate
    EnglishTemplate: `who had {condition} {value} {stat.key} in a Season`,
    CypherTemplate: numberStat
      ? `CALL (p) { MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE ps.{stat.key} {condition} {value} RETURN ps as rushingSeasonStats }`
      : `CALL (p) { MATCH (p)-[:HAD]->(ps:PlayerSeason) WHERE {value} {condition} ps.{stat.key} RETURN ps as rushingSeasonStats }`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "rushingSeasonStats", AliasType: AliasType.RBSeason }],
    Slots: baseSlots(defaultCondition, defaultValue),
  };

  // Season-level AND filter (operates on existing rushingSeasonStats alias)
  const seasonAnd: Chunk = {
    English: "and ...",
    Cypher: "",
    EnglishTemplate: `and who had {condition} {value} {stat.key} in that Season`,
    CypherTemplate: `MATCH (rushingSeasonStats) WHERE rushingSeasonStats.{stat.key} {condition} {value}`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "rushingSeasonStats", AliasType: AliasType.RBSeason }],
    Provides: [{ Name: "rushingSeasonStats", AliasType: AliasType.RBSeason }],
    Slots: baseSlots(defaultCondition, defaultValue),
  };

  // Game-level primary filter
  const gameFilter: Chunk = {
    English: numberStat
      ? `who had [${stat.key}] in a Game`
      : `who played for [${stat.key}] in a Game`,
    Cypher: "",
    EnglishTemplate: `who had {condition} {value} {stat.key} in a Game`,
    CypherTemplate: numberStat
      ? `CALL (p) { MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE pg.{stat.key} {condition} {value} RETURN pg as rushingGameStats }`
      : `CALL (p) { MATCH (p)-[:HAD]->(pg:PlayerGame) WHERE {value} {condition} pg.{stat.key} RETURN pg as rushingGameStats }`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "p", AliasType: AliasType.Player }],
    Provides: [{ Name: "rushingGameStats", AliasType: AliasType.RBGame }],
    Slots: baseSlots(defaultCondition, defaultValue),
  };

  // Game-level AND filter
  const gameAnd: Chunk = {
    English: "and ...",
    Cypher: "",
    EnglishTemplate: `and who had {condition} {value} {stat.key} in that Game`,
    CypherTemplate: `MATCH (rushingGameStats) WHERE rushingGameStats.{stat.key} {condition} {value}`,
    QueryType: QueryType.FILTER,
    Requires: [{ Name: "rushingGameStats", AliasType: AliasType.RBGame }],
    Provides: [{ Name: "rushingGameStats", AliasType: AliasType.RBGame }],
    Slots: baseSlots(defaultCondition, defaultValue),
  };

  return [seasonFilter, seasonAnd, gameFilter, gameAnd];
});

// Note: Return clauses for rushing stats by game/season are auto-constructed by buildSmartReturnClause
// so we do not include explicit RETURN chunks here.

