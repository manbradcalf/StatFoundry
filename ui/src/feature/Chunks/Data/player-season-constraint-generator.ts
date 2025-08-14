import { AliasType } from "../Enums/AliasType";
import { QueryType } from "../Enums/QueryType";
import { SlotType } from "../Enums/SlotType";
import { Chunk } from "../Types/Chunk";
import { ConstraintDefinition } from "./constraints/constraint";

// Player season constraint definitions
export const PLAYER_SEASON_CONSTRAINTS: ConstraintDefinition[] = [
  {
    english: "for [team]",
    englishTemplate: "who played for {team} in those seasons",
    cypherTemplate:
      "MATCH (p:Player)-[:HAD]->(ps:PlayerSeason) WHERE {team} IN ps.teams",
    queryType: QueryType.FILTER_START,
    slots: [
      { name: "team", defaultValue: "MIN", slotType: SlotType.FilterValue },
    ],
    keywords: ["seasons", "season"],
  },
  {
    english: "during the [2024] season",
    englishTemplate: "during the {season} season",
    cypherTemplate:
      "MATCH (p:Player)-[:HAD]->(ps:PlayerSeason) WHERE ps.season = {season}",
    queryType: QueryType.FILTER_START,
    slots: [
      { name: "season", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["seasons", "season", "during"],
  },
];

/**
 * Generates player season constraint chunks
 */
export function generatePlayerSeasonConstraintChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  // Generate FILTER_START chunks
  for (const constraint of PLAYER_SEASON_CONSTRAINTS) {
    chunks.push({
      English: constraint.english,
      Cypher: "",
      EnglishTemplate: constraint.englishTemplate,
      CypherTemplate: constraint.cypherTemplate,
      QueryType: constraint.queryType,
      Requires: [
        { Name: "p", AliasType: AliasType.Player },
        { Name: "ps", AliasType: AliasType.PlayerSeason },
      ],
      Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
      Slots: constraint.slots.map((slot) => ({
        Name: slot.name,
        Value: slot.defaultValue,
        SlotValueTypes: [slot.slotType],
      })),
      SuggestionKeywords: constraint.keywords,
    });
  }

  // Generate FILTER_EXTEND chunks
  for (const extension of PLAYER_SEASON_CONSTRAINT_EXTENSIONS) {
    chunks.push({
      English: extension.english,
      Cypher: "",
      EnglishTemplate: extension.englishTemplate,
      CypherTemplate: extension.cypherTemplate,
      QueryType: extension.queryType,
      Requires: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
      Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
      Slots: extension.slots.map((slot) => ({
        Name: slot.name,
        Value: slot.defaultValue,
        SlotValueTypes: [slot.slotType],
      })),
      SuggestionKeywords: extension.keywords,
    });
  }
  return chunks;
}

export const PLAYER_SEASON_CONSTRAINT_EXTENSIONS: ConstraintDefinition[] = [
  {
    english: "for [team]",
    englishTemplate: "who played for {team} in those seasons",
    cypherTemplate: "AND {team} IN ps.teams",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      { name: "team", defaultValue: "MIN", slotType: SlotType.FilterValue },
    ],
    keywords: ["seasons", "season"],
  },
  {
    english: "between the [2020] and [2024] seasons",
    englishTemplate: "between the {seasonStart} and {seasonEnd} seasons",
    cypherTemplate:
      "AND ps.season >= {seasonStart} AND ps.season <= {seasonEnd}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      {
        name: "seasonStart",
        defaultValue: 2020,
        slotType: SlotType.FilterValue,
      },
      { name: "seasonEnd", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["seasons", "season", "between"],
  },
  {
    english: "during the [2024] season",
    englishTemplate: "during the {season} season",
    cypherTemplate:
      "MATCH (p:Player)-[:HAD]->(ps:PlayerSeason) WHERE ps.season = {season}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      { name: "season", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["seasons", "season", "during"],
  },
];
