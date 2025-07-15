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
  },
  {
    English: "QB",
    Cypher: "MATCH (p:Player) WHERE p.position = 'QB'",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [],
  },
  {
    English: "RB",
    Cypher: "MATCH (p:Player) WHERE p.position = 'RB'",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [],
  },
  {
    English: "WR",
    Cypher: "MATCH (p:Player) WHERE p.position = 'WR'",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [],
  },
  {
    English: "TE",
    Cypher: "MATCH (p:Player) WHERE p.position = 'TE'",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "p", AliasType: AliasType.Player }],
    Slots: [],
  },
  {
    English: "Teams",
    Cypher: "MATCH (t:Team)",
    QueryType: QueryType.MATCH_START,
    Requires: [],
    Provides: [{ Name: "t", AliasType: AliasType.Team }],
    Slots: [],
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
  },
];
