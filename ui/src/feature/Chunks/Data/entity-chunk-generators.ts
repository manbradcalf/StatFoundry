import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { AliasType } from "../Enums/AliasType";
import { SlotType } from "../Enums/SlotType";

// Position definitions
export interface PositionDefinition {
  code: string;
  fullName: string;
  keywords: string[];
}

export const POSITIONS: PositionDefinition[] = [
  { code: "QB", fullName: "quarterback", keywords: ["QB", "quarterback"] },
  { code: "RB", fullName: "running back", keywords: ["RB", "running back", "running backs"] },
  { code: "WR", fullName: "wide receiver", keywords: ["WR", "wide receiver", "wide receivers"] },
  { code: "TE", fullName: "tight end", keywords: ["TE", "tight end", "tight ends"] },
];

// Entity relationship definitions
export interface EntityRelationship {
  entityLabel: string;
  aliasName: string;
  aliasType: AliasType;
  english: string;
  keywords: string[];
}

export const ENTITY_RELATIONSHIPS: EntityRelationship[] = [
  {
    entityLabel: "PlayerGame",
    aliasName: "pg", 
    aliasType: AliasType.PlayerGame,
    english: "Player Games",
    keywords: ["player games", "player game"]
  },
  {
    entityLabel: "PlayerSeason",
    aliasName: "ps",
    aliasType: AliasType.PlayerSeason, 
    english: "Player Seasons",
    keywords: ["player seasons", "player season"]
  },
  // {
  //   entityLabel: "TeamSeason",
  //   aliasName: "ts",
  //   aliasType: AliasType.TeamSeason,
  //   english: "Team Seasons", 
  //   keywords: ["team seasons", "team season"]
  // },
  // {
  //   entityLabel: "TeamGame",
  //   aliasName: "tg",
  //   aliasType: AliasType.TeamGame,
  //   english: "Team Games",
  //   keywords: ["team games", "team game"]
  // },
];

// Player attribute filter definitions
export interface PlayerFilterDefinition {
  english: string;
  englishTemplate: string;
  cypherTemplate: string;
  queryType: QueryType;
  slotName: string;
  defaultValue: string;
  keywords: string[];
}

export const PLAYER_FILTERS: PlayerFilterDefinition[] = [
  {
    english: "Player named [name]",
    englishTemplate: "Player named {name}",
    cypherTemplate: "WHERE p.display_name = {name}",
    queryType: QueryType.MATCH_START,
    slotName: "name",
    defaultValue: "Josh Allen",
    keywords: ["name", "player name", "player"]
  },
  {
    english: "who are currently on [team]",
    englishTemplate: "who are currently on {team}",
    cypherTemplate: "WHERE p.team_abbr = {team} AND p.status='ACT'",
    queryType: QueryType.MATCH_START,
    slotName: "team",
    defaultValue: "SEA",
    keywords: ["team"]
  },
  // {
  //   english: "who went to [college]",
  //   englishTemplate: "who went to {college}",
  //   cypherTemplate: "WHERE p.college_name={college}",
  //   queryType: QueryType.MATCH_START,
  //   slotName: "college",
  //   defaultValue: "Ohio State",
  //   keywords: ["college", "school"]
  // },
];

/**
 * Generates match chunks for positions
 */
export function generatePositionChunks(): Chunk[] {
  const chunks: Chunk[] = [
    // Generic "Players" chunk
    // {
    //   English: "Players",
    //   Cypher: "MATCH (p:Player)",
    //   QueryType: QueryType.MATCH_START,
    //   Requires: [],
    //   Provides: [{ Name: "p", AliasType: AliasType.Player }],
    //   Slots: [],
    //   SuggestionKeywords: ["players", "player"]
    // }
  ];

  // Position-specific chunks
  for (const position of POSITIONS) {
    chunks.push({
      English: `${position.code}s`,
      Cypher: `MATCH (p:Player) WHERE p.position = '${position.code}'`,
      QueryType: QueryType.MATCH_START,
      Requires: [],
      Provides: [{ Name: "p", AliasType: AliasType.Player }],
      Slots: [],
      SuggestionKeywords: position.keywords
    });
  }

  return chunks;
}

/**
 * Generates match chunks for entity relationships
 */
export function generateEntityRelationshipChunks(): Chunk[] {
  const chunks: Chunk[] = []
  //   // Generic "Teams" chunk
  //   {
  //     English: "Teams",
  //     Cypher: "MATCH (t:Team)",
  //     QueryType: QueryType.MATCH_START,
  //     Requires: [],
  //     Provides: [{ Name: "t", AliasType: AliasType.Team }],
  //     Slots: [],
  //     SuggestionKeywords: ["teams", "team"]
  //   }
  // ];

  // Entity relationship chunks
  for (const entity of ENTITY_RELATIONSHIPS) {
    const parentAlias = entity.entityLabel.startsWith("Player") ? "p" : "t";
    const parentType = entity.entityLabel.startsWith("Player") ? AliasType.Player : AliasType.Team;
    
    chunks.push({
      English: entity.english,
      Cypher: `MATCH (${parentAlias}:${entity.entityLabel.startsWith("Player") ? "Player" : "Team"})-[:HAD]->(${entity.aliasName}:${entity.entityLabel}) LIMIT 1000`,
      QueryType: QueryType.MATCH_START,
      Requires: [],
      Provides: [
        { Name: parentAlias, AliasType: parentType },
        { Name: entity.aliasName, AliasType: entity.aliasType },
      ],
      Slots: [],
      SuggestionKeywords: entity.keywords
    });
  }

  return chunks;
}

/**
 * Generates player info filter chunks
 */
export function generatePlayerInfoChunks(): Chunk[] {
  const chunks: Chunk[] = [];
  
  for (const filter of PLAYER_FILTERS) {
    const queryType = filter.cypherTemplate.startsWith("MATCH (p:Player") 
      ? QueryType.MATCH_START 
      : QueryType.FILTER_START;
    
    chunks.push({
      English: filter.english,
      Cypher: "",
      EnglishTemplate: filter.englishTemplate,
      CypherTemplate: filter.cypherTemplate,
      QueryType: queryType,
      Requires: queryType === QueryType.MATCH_START ? [] : [{ Name: "p", AliasType: AliasType.Player }],
      Provides: [{ Name: "p", AliasType: AliasType.Player }],
      Slots: [
        {
          Name: filter.slotName,
          Value: filter.defaultValue,
          SlotValueTypes: [SlotType.FilterValue],
        },
      ],
      SuggestionKeywords: filter.keywords
    });
  }
  
  return chunks;
}