import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";
import { ConstraintDefinition } from "./constraints/constraint";

export const PLAYER_GAME_CONSTRAINTS: ConstraintDefinition[] = [
  {
    english: "for [team]",
    englishTemplate: "for {team}",
    cypherTemplate: "toLower(pg.recent_team) = toLower({team})",
    queryType: QueryType.FILTER,
    slots: [
      { name: "team", defaultValue: "MIN", slotType: SlotType.FilterValue },
    ],
    keywords: ["for", "team"],
  },
  {
    english: "against [team]",
    englishTemplate: "against {team}",
    cypherTemplate: "toLower(pg.opponent_team) = toLower({team})",
    queryType: QueryType.FILTER,
    slots: [
      { name: "team", defaultValue: "GB", slotType: SlotType.FilterValue },
    ],
    keywords: ["against", "versus", "vs"],
  },
  {
    english: "in [2024]",
    englishTemplate: "in {season}",
    cypherTemplate: "pg.season = {season}",
    queryType: QueryType.FILTER,
    slots: [
      { name: "season", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["season", "year", "in"],
  },
  {
    english: "between [2020] and [2024]",
    englishTemplate: "between {seasonStart} and {seasonEnd}",
    cypherTemplate: "pg.season >= {seasonStart} AND pg.season <= {seasonEnd}",
    queryType: QueryType.FILTER,
    slots: [
      {
        name: "seasonStart",
        defaultValue: 2020,
        slotType: SlotType.FilterValue,
      },
      { name: "seasonEnd", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: [
      "games",
      "game",
      "during",
      "seasons",
      "between",
      "between seasons",
    ],
  },
];

// Removed duplicate PLAYER_GAME_CONSTRAINT_EXTENSIONS - now using unified PLAYER_GAME_CONSTRAINTS

// Simple boolean constraints
export const PLAYER_GAME_BOOLEAN_CONSTRAINTS = [
  {
    english: "and won",
    cypher: "AND pg.won = true",
    keywords: ["won", "lost"],
  },
  {
    english: "and lost",
    cypher: "AND pg.won <> true",
    keywords: ["won", "lost"],
  },
];

/**
 * Generates player game constraint chunks
 */
export function generatePlayerGameConstraintChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  // Generate FILTER chunks
  for (const constraint of PLAYER_GAME_CONSTRAINTS) {
    chunks.push({
      English: constraint.english,
      Cypher: "",
      EnglishTemplate: constraint.englishTemplate,
      CypherTemplate: constraint.cypherTemplate,
      QueryType: constraint.queryType,
      Requires: [
        { Name: "p", AliasType: AliasType.Player },
        { Name: "pg", AliasType: AliasType.PlayerGame },
      ],
      Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Slots: constraint.slots.map((slot) => ({
        Name: slot.name,
        Value: slot.defaultValue,
        SlotValueTypes: [slot.slotType],
      })),
      SuggestionKeywords: constraint.keywords,
    });
  }

  // No longer generating duplicate extension chunks

  // Generate boolean constraint chunks
  for (const constraint of PLAYER_GAME_BOOLEAN_CONSTRAINTS) {
    chunks.push({
      English: constraint.english,
      Cypher: constraint.cypher,
      QueryType: QueryType.FILTER,
      Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Slots: [],
      SuggestionKeywords: constraint.keywords,
    });
  }

  return chunks;
}

export const PLAYER_SEASON_CONSTRAINT_EXTENSIONS: ConstraintDefinition[] = [
  {
    english: "for [team]",
    englishTemplate: "who played for {team} in those seasons",
    cypherTemplate: "{team} IN ps.teams",
    queryType: QueryType.FILTER,
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
    queryType: QueryType.FILTER,
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
    queryType: QueryType.FILTER,
    slots: [
      { name: "season", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["seasons", "season", "during"],
  },
];
