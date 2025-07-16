import { AliasType } from "../Enums/AliasType";
import { QueryType } from "../Enums/QueryType";
import { Chunk } from "../Types/Chunk";

// MATCH - Base entities and position shortcuts
export const MATCH_ENTITY_CHUNKS: Chunk[] = [
  {
    English: "Players",
    Cypher: "MATCH (p:Player)",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [],
    SuggestionKeywords: ["QB", "quarterback"]
  },
  {
    English: "QB",
    Cypher: "MATCH (p:Player) WHERE p.position = 'QB'",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [],
    SuggestionKeywords: ["QB", "quarterback"]
  },
  {
    English: "RB",
    Cypher: "MATCH (p:Player) WHERE p.position = 'RB'",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [],
    SuggestionKeywords: ["RB", "running back", "running backs"]
  },
  {
    English: "WR",
    Cypher: "MATCH (p:Player) WHERE p.position = 'WR'",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [],
    SuggestionKeywords: ["WR", "wide receiver", "wide receivers"]
  },
  {
    English: "TE",
    Cypher: "MATCH (p:Player) WHERE p.position = 'TE'",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [],
    SuggestionKeywords: ["TE", "tight end", "tight ends"]
  },
  {
    English: "Teams",
    Cypher: "MATCH (t:Team)",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "t", AliasType: AliasType.Team }],
    Slots: [],
    SuggestionKeywords: ["teams", "team"]
  },
  {
    English: "Player Games",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame)",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [
      { Name: "p", AliasType: AliasType.Player },
      { Name: "pg", AliasType: AliasType.PlayerGame },
    ],
    Slots: [],
    SuggestionKeywords: ["player games", "player game"]
  },
  {
    English: "Player Seasons",
    Cypher: "MATCH (p:Player)-[:HAD]->(ps:PlayerSeason)",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [
      { Name: "p", AliasType: AliasType.Player },
      { Name: "ps", AliasType: AliasType.PlayerSeason },
    ],
    Slots: [],
    SuggestionKeywords: ["player seasons", "player season"]
  },
  {
    English: "Team Seasons",
    Cypher: "MATCH (t:Team)-[:HAD]->(ts:TeamSeason)",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [
      { Name: "t", AliasType: AliasType.Team },
      { Name: "ts", AliasType: AliasType.TeamSeason },
    ],
    Slots: [],
    SuggestionKeywords: ["team seasons", "team season"]
  },
  {
    English: "Team Games",
    Cypher: "MATCH (t:Team)-[:HAD]->(tg:TeamGame)",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [
      { Name: "t", AliasType: AliasType.Team },
      { Name: "tg", AliasType: AliasType.TeamGame },
    ],
    Slots: [],
    SuggestionKeywords: ["team games", "team game"]
  },
];
