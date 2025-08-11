import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

// Game constraint definitions
export interface GameConstraintDefinition {
  english: string;
  englishTemplate: string;
  cypherTemplate: string;
  queryType: QueryType;
  slots: Array<{
    name: string;
    defaultValue: string | number;
    slotType: SlotType;
  }>;
  keywords: string[];
}

export const PLAYER_GAME_CONSTRAINTS: GameConstraintDefinition[] = [
  {
    english: "games for [team]",
    englishTemplate: "games for {team}",
    cypherTemplate:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.recent_team = {team}",
    queryType: QueryType.FILTER_START,
    slots: [
      { name: "team", defaultValue: "MIN", slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game"],
  },
  {
    english: "games against [team]",
    englishTemplate: "games against {team}",
    cypherTemplate:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.opponent_team = {team}",
    queryType: QueryType.FILTER_START,
    slots: [
      { name: "team", defaultValue: "GB", slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game"],
  },
  {
    english: "during the [2024] season",
    englishTemplate: "during the {season} season",
    cypherTemplate:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.season = {season}",
    queryType: QueryType.FILTER_START,
    slots: [
      { name: "season", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game", "during"],
  },
  {
    english: "between the [2020] and [2024] season",
    englishTemplate: "between the {seasonStart} and {seasonEnd} seasons",
    cypherTemplate:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.season >= {seasonStart} AND pg.season <= {seasonEnd}",
    queryType: QueryType.FILTER_START,
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

export const PLAYER_GAME_CONSTRAINT_EXTENSIONS: GameConstraintDefinition[] = [
  {
    english: "for [team]",
    englishTemplate: "and played for {team}",
    cypherTemplate: "AND pg.recent_team = {team}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      { name: "team", defaultValue: "MIN", slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game"],
  },
  {
    english: "against [team]",
    englishTemplate: "and played against {team}",
    cypherTemplate: "AND pg.opponent_team = {team}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      { name: "team", defaultValue: "GB", slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game", "versus", "vs", "against"],
  },
  // //TODO: Division
  // {
  //   english: "against [division]",
  //   englishTemplate: "and played against {division}",
  //   cypherTemplate: "AND pg.opponent_team = {team}",
  //   queryType: QueryType.FILTER_EXTEND,
  //   slots: [
  //     { name: "team", defaultValue: "GB", slotType: SlotType.FilterValue },
  //   ],
  //   keywords: ["games", "game", "versus", "vs", "against"],
  // },
  {
    english: "during the [2024] season",
    englishTemplate: "during the {season} season",
    cypherTemplate:
      "MATCH (p:Player)-[:HAD]->(pg:PlayerGame) WHERE pg.season = {season}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      { name: "season", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game", "during"],
  },
  {
    english: "in games between [2020] and [2024]",
    englishTemplate:
      "in games between the {seasonStart} and {seasonEnd} seasons",
    cypherTemplate:
      "AND pg.season >= {seasonStart} AND pg.season <= {seasonEnd}",
    queryType: QueryType.FILTER_EXTEND,
    slots: [
      {
        name: "seasonStart",
        defaultValue: 2020,
        slotType: SlotType.FilterValue,
      },
      { name: "seasonEnd", defaultValue: 2024, slotType: SlotType.FilterValue },
    ],
    keywords: ["games", "game", "between"],
  },
];

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
export function generatePlayerGameConstraints(): Chunk[] {
  const chunks: Chunk[] = [];

  // Generate FILTER_START chunks
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

  // Generate FILTER_EXTEND chunks
  for (const extension of PLAYER_GAME_CONSTRAINT_EXTENSIONS) {
    chunks.push({
      English: extension.english,
      Cypher: "",
      EnglishTemplate: extension.englishTemplate,
      CypherTemplate: extension.cypherTemplate,
      QueryType: extension.queryType,
      Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Slots: extension.slots.map((slot) => ({
        Name: slot.name,
        Value: slot.defaultValue,
        SlotValueTypes: [slot.slotType],
      })),
      SuggestionKeywords: extension.keywords,
    });
  }

  // Generate boolean constraint chunks
  for (const constraint of PLAYER_GAME_BOOLEAN_CONSTRAINTS) {
    chunks.push({
      English: constraint.english,
      Cypher: constraint.cypher,
      QueryType: QueryType.FILTER_EXTEND,
      Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
      Slots: [],
      SuggestionKeywords: constraint.keywords,
    });
  }

  return chunks;
}

// Player season constraint definitions
export const PLAYER_SEASON_CONSTRAINTS: GameConstraintDefinition[] = [
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

export const PLAYER_SEASON_CONSTRAINT_EXTENSIONS: GameConstraintDefinition[] = [
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

/**
 * Generates player season constraint chunks
 */
export function generatePlayerSeasonConstraints(): Chunk[] {
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
