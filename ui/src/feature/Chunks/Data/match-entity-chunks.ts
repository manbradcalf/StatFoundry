import { Label } from "../Enums/Label";
import { QueryType } from "../Enums/QueryType";
import { Chunk } from "../Types/Chunk";

// MATCH - Base entities and position shortcuts
export const MATCH_ENTITY_CHUNKS: Chunk[] = [
  {
    English: "Players",
    Cypher: "MATCH (p:Player)",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [{ Name: "p", Label: Label.Player }],
    Slots: [],
  },
  {
    English: "Quarterbacks",
    Cypher: "MATCH (p:Player) WHERE p.position = 'QB'",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [{ Name: "p", Label: Label.Player }],
    Slots: [],
  },
  {
    English: "Running backs",
    Cypher: "MATCH (p:Player) WHERE p.position = 'RB'",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [{ Name: "p", Label: Label.Player }],
    Slots: [],
  },
  {
    English: "Wide receivers",
    Cypher: "MATCH (p:Player) WHERE p.position = 'WR'",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [{ Name: "p", Label: Label.Player }],
    Slots: [],
  },
  {
    English: "Tight ends",
    Cypher: "MATCH (p:Player) WHERE p.position = 'TE'",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [{ Name: "p", Label: Label.Player }],
    Slots: [],
  },
  {
    English: "Teams",
    Cypher: "MATCH (t:Team)",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [{ Name: "t", Label: Label.Team }],
    Slots: [],
  },
  {
    English: "Player Games",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame)",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [
      { Name: "p", Label: Label.Player },
      { Name: "pg", Label: Label.PlayerGame },
    ],
    Slots: [],
  },
  {
    English: "Player Seasons",
    Cypher: "MATCH (p:Player)-[:HAD]->(ps:PlayerSeason)",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [
      { Name: "p", Label: Label.Player },
      { Name: "ps", Label: Label.PlayerSeason },
    ],
    Slots: [],
  },
  {
    English: "Team Seasons",
    Cypher: "MATCH (t:Team)-[:HAD]->(ts:TeamSeason)",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [
      { Name: "t", Label: Label.Team },
      { Name: "ts", Label: Label.TeamSeason },
    ],
    Slots: [],
  },
  {
    English: "Team Games",
    Cypher: "MATCH (t:Team)-[:HAD]->(tg:TeamGame)",
    QueryType: QueryType.MATCH_START,
    Inputs: [],
    Outputs: [
      { Name: "t", Label: Label.Team },
      { Name: "tg", Label: Label.TeamGame },
    ],
    Slots: [],
  },
];
