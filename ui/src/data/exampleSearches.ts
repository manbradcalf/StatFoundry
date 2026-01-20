import { Chunk } from "../feature/Chunks/Types/Chunk";
import { Alias } from "../feature/Chunks/Types/Alias";
import { QueryType } from "../feature/Chunks/Enums/QueryType";
import { AliasType } from "../feature/Chunks/Enums/AliasType";
import { SlotType } from "../feature/Chunks/Enums/SlotType";

/**
 * Pre-built example searches for the Cool Searches Library
 * These showcase interesting queries users can run to explore NFL data
 */
export interface ExampleSearch {
  id: string;
  title: string;
  description: string;
  category: "rushing" | "passing" | "receiving" | "general" | "advanced";
  chunks: Chunk[];
  cypher: string;
  english: string;
  aliases: Alias[];
  selectedProperties?: string[];
}

// Helper to create a RETURN chunk
const createReturnChunk = (selectedProperties: string[]): Chunk => ({
  English: `Return ${selectedProperties.length} columns`,
  EnglishTemplate: "Select columns to return",
  Cypher: "",
  CypherTemplate: "",
  QueryType: QueryType.RETURN,
  Requires: [],
  Provides: [],
  Slots: [
    {
      Name: "properties",
      Value: selectedProperties.join(", "),
      SlotValueTypes: [SlotType.SelectReturnProperties],
    },
  ],
});

// Default columns for PlayerGame searches
const RUSHING_GAME_COLUMNS = [
  "pg.player_display_name",
  "pg.position",
  "pg.recent_team",
  "pg.season",
  "pg.week",
  "pg.carries",
  "pg.rushing_yards",
  "pg.rushing_tds",
  "pg.yards_per_carry",
];

const PASSING_GAME_COLUMNS = [
  "pg.player_display_name",
  "pg.position",
  "pg.recent_team",
  "pg.season",
  "pg.week",
  "pg.completions",
  "pg.attempts",
  "pg.passing_yards",
  "pg.passing_tds",
  "pg.interceptions",
];

const RECEIVING_GAME_COLUMNS = [
  "pg.player_display_name",
  "pg.position",
  "pg.recent_team",
  "pg.season",
  "pg.week",
  "pg.targets",
  "pg.receptions",
  "pg.receiving_yards",
  "pg.receiving_tds",
];

// Default columns for PlayerSeason searches
const RUSHING_SEASON_COLUMNS = [
  "ps.player_name",
  "ps.position",
  "ps.season",
  "ps.teams",
  "ps.games",
  "ps.carries",
  "ps.rushing_yards",
  "ps.rushing_tds",
  "ps.yards_per_carry",
];

const PASSING_SEASON_COLUMNS = [
  "ps.player_name",
  "ps.position",
  "ps.season",
  "ps.teams",
  "ps.games",
  "ps.completions",
  "ps.attempts",
  "ps.passing_yards",
  "ps.passing_tds",
  "ps.interceptions",
];

export const exampleSearches: ExampleSearch[] = [
  {
    id: "rushing-yards-100-2024",
    title: "100+ Yard Rushing Games (2024)",
    description:
      "Find all player games with 100 or more rushing yards in the 2024 season",
    category: "rushing",
    chunks: [
      {
        English: "Player Games",
        Cypher: "MATCH (pg:PlayerGame)",
        QueryType: QueryType.MATCH_START,
        Requires: [],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [],
      },
      {
        English: "rushing_yards >= 100",
        Cypher: "pg.rushing_yards >= 100",
        EnglishTemplate: "rushing_yards {condition} {value}",
        CypherTemplate: "pg.rushing_yards {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "rushing_yards", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: ">=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 100, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      {
        English: "season = 2024",
        Cypher: "pg.season = 2024",
        EnglishTemplate: "season {condition} {value}",
        CypherTemplate: "pg.season {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "season", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: "=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 2024, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      createReturnChunk(RUSHING_GAME_COLUMNS),
    ],
    cypher:
      "MATCH (pg:PlayerGame) WHERE pg.rushing_yards >= 100 WITH * WHERE pg.season = 2024 WITH *",
    english: "Player Games rushing_yards >= 100 season = 2024",
    aliases: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    selectedProperties: RUSHING_GAME_COLUMNS,
  },
  {
    id: "passing-yards-300-2024",
    title: "300+ Yard Passing Games (2024)",
    description:
      "Find all quarterback performances with 300 or more passing yards in 2024",
    category: "passing",
    chunks: [
      {
        English: "Player Games",
        Cypher: "MATCH (pg:PlayerGame)",
        QueryType: QueryType.MATCH_START,
        Requires: [],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [],
      },
      {
        English: "passing_yards >= 300",
        Cypher: "pg.passing_yards >= 300",
        EnglishTemplate: "passing_yards {condition} {value}",
        CypherTemplate: "pg.passing_yards {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "passing_yards", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: ">=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 300, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      {
        English: "season = 2024",
        Cypher: "pg.season = 2024",
        EnglishTemplate: "season {condition} {value}",
        CypherTemplate: "pg.season {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "season", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: "=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 2024, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      createReturnChunk(PASSING_GAME_COLUMNS),
    ],
    cypher:
      "MATCH (pg:PlayerGame) WHERE pg.passing_yards >= 300 WITH * WHERE pg.season = 2024 WITH *",
    english: "Player Games passing_yards >= 300 season = 2024",
    aliases: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    selectedProperties: PASSING_GAME_COLUMNS,
  },
  {
    id: "receiving-yards-150-2024",
    title: "150+ Yard Receiving Games (2024)",
    description:
      "Find explosive receiving performances with 150+ yards in the 2024 season",
    category: "receiving",
    chunks: [
      {
        English: "Player Games",
        Cypher: "MATCH (pg:PlayerGame)",
        QueryType: QueryType.MATCH_START,
        Requires: [],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [],
      },
      {
        English: "receiving_yards >= 150",
        Cypher: "pg.receiving_yards >= 150",
        EnglishTemplate: "receiving_yards {condition} {value}",
        CypherTemplate: "pg.receiving_yards {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "receiving_yards", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: ">=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 150, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      {
        English: "season = 2024",
        Cypher: "pg.season = 2024",
        EnglishTemplate: "season {condition} {value}",
        CypherTemplate: "pg.season {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "season", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: "=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 2024, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      createReturnChunk(RECEIVING_GAME_COLUMNS),
    ],
    cypher:
      "MATCH (pg:PlayerGame) WHERE pg.receiving_yards >= 150 WITH * WHERE pg.season = 2024 WITH *",
    english: "Player Games receiving_yards >= 150 season = 2024",
    aliases: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    selectedProperties: RECEIVING_GAME_COLUMNS,
  },
  {
    id: "target-share-monsters",
    title: "Target Share Monsters (10+ Targets)",
    description:
      "Players who received 10 or more targets in a single game during 2024",
    category: "receiving",
    chunks: [
      {
        English: "Player Games",
        Cypher: "MATCH (pg:PlayerGame)",
        QueryType: QueryType.MATCH_START,
        Requires: [],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [],
      },
      {
        English: "targets >= 10",
        Cypher: "pg.targets >= 10",
        EnglishTemplate: "targets {condition} {value}",
        CypherTemplate: "pg.targets {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "targets", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: ">=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 10, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      {
        English: "season = 2024",
        Cypher: "pg.season = 2024",
        EnglishTemplate: "season {condition} {value}",
        CypherTemplate: "pg.season {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "season", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: "=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 2024, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      createReturnChunk([...RECEIVING_GAME_COLUMNS, "pg.target_share"]),
    ],
    cypher:
      "MATCH (pg:PlayerGame) WHERE pg.targets >= 10 WITH * WHERE pg.season = 2024 WITH *",
    english: "Player Games targets >= 10 season = 2024",
    aliases: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    selectedProperties: [...RECEIVING_GAME_COLUMNS, "pg.target_share"],
  },
  {
    id: "rushing-touchdowns-multi",
    title: "Multi-TD Rushing Games (2+ TDs)",
    description:
      "Find games where a player scored 2 or more rushing touchdowns in 2024",
    category: "rushing",
    chunks: [
      {
        English: "Player Games",
        Cypher: "MATCH (pg:PlayerGame)",
        QueryType: QueryType.MATCH_START,
        Requires: [],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [],
      },
      {
        English: "rushing_tds >= 2",
        Cypher: "pg.rushing_tds >= 2",
        EnglishTemplate: "rushing_tds {condition} {value}",
        CypherTemplate: "pg.rushing_tds {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "rushing_tds", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: ">=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 2, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      {
        English: "season = 2024",
        Cypher: "pg.season = 2024",
        EnglishTemplate: "season {condition} {value}",
        CypherTemplate: "pg.season {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Provides: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
        Slots: [
          { Name: "stat", Value: "season", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: "=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 2024, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      createReturnChunk(RUSHING_GAME_COLUMNS),
    ],
    cypher:
      "MATCH (pg:PlayerGame) WHERE pg.rushing_tds >= 2 WITH * WHERE pg.season = 2024 WITH *",
    english: "Player Games rushing_tds >= 2 season = 2024",
    aliases: [{ Name: "pg", AliasType: AliasType.PlayerGame }],
    selectedProperties: RUSHING_GAME_COLUMNS,
  },
  {
    id: "1000-yard-rushing-season",
    title: "1000+ Yard Rushing Seasons",
    description: "Find all player seasons with 1000 or more rushing yards",
    category: "rushing",
    chunks: [
      {
        English: "Player Seasons",
        Cypher: "MATCH (ps:PlayerSeason)",
        QueryType: QueryType.MATCH_START,
        Requires: [],
        Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
        Slots: [],
      },
      {
        English: "rushing_yards >= 1000",
        Cypher: "ps.rushing_yards >= 1000",
        EnglishTemplate: "rushing_yards {condition} {value}",
        CypherTemplate: "ps.rushing_yards {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
        Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
        Slots: [
          { Name: "stat", Value: "rushing_yards", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: ">=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 1000, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      createReturnChunk(RUSHING_SEASON_COLUMNS),
    ],
    cypher: "MATCH (ps:PlayerSeason) WHERE ps.rushing_yards >= 1000 WITH *",
    english: "Player Seasons rushing_yards >= 1000",
    aliases: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
    selectedProperties: RUSHING_SEASON_COLUMNS,
  },
  {
    id: "4000-yard-passing-season",
    title: "4000+ Yard Passing Seasons",
    description:
      "Elite quarterback seasons with 4000 or more passing yards",
    category: "passing",
    chunks: [
      {
        English: "Player Seasons",
        Cypher: "MATCH (ps:PlayerSeason)",
        QueryType: QueryType.MATCH_START,
        Requires: [],
        Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
        Slots: [],
      },
      {
        English: "passing_yards >= 4000",
        Cypher: "ps.passing_yards >= 4000",
        EnglishTemplate: "passing_yards {condition} {value}",
        CypherTemplate: "ps.passing_yards {condition} {value}",
        QueryType: QueryType.FILTER,
        Requires: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
        Provides: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
        Slots: [
          { Name: "stat", Value: "passing_yards", SlotValueTypes: [SlotType.Filter] },
          { Name: "condition", Value: ">=", SlotValueTypes: [SlotType.FilterCondition] },
          { Name: "value", Value: 4000, SlotValueTypes: [SlotType.FilterValue] },
        ],
      },
      createReturnChunk(PASSING_SEASON_COLUMNS),
    ],
    cypher: "MATCH (ps:PlayerSeason) WHERE ps.passing_yards >= 4000 WITH *",
    english: "Player Seasons passing_yards >= 4000",
    aliases: [{ Name: "ps", AliasType: AliasType.PlayerSeason }],
    selectedProperties: PASSING_SEASON_COLUMNS,
  },
];

export const searchCategories = [
  { id: "all", label: "All Searches" },
  { id: "rushing", label: "Rushing" },
  { id: "passing", label: "Passing" },
  { id: "receiving", label: "Receiving" },
  { id: "general", label: "General" },
  { id: "advanced", label: "Advanced" },
] as const;

export type SearchCategory = (typeof searchCategories)[number]["id"];
