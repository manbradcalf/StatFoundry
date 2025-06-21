import { Chunk } from "./feature/Chunks/Chunk";
import { DataType } from "./feature/Chunks/EntityTypes/LabelsEnum";
import { QueryType } from "./feature/Chunks/QueryType";

export function getAvailableChunks(): Chunk[] {
  return [
    // MATCH
    {
      English: "Players",
      Cypher: "MATCH (p:Player)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [["p", DataType.Player]],
      Slots: [],
    },
    {
      English: "Teams",
      Cypher: "MATCH (t:Team)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [["t", DataType.Team]],
      Slots: [],
    },
    {
      English: "Player Games",
      Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        ["p", DataType.Player],
        ["pg", DataType.PlayerGame],
      ],
      Slots: [],
    },
    {
      English: "Player Seasons",
      Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        ["p", DataType.Player],
        ["pg", DataType.PlayerGame],
      ],
      Slots: [],
    },
    {
      English: "Team Seasons",
      Cypher: "MATCH (t:Team)-[:HAD]->(ts:TeamSeason)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        ["t", DataType.Team],
        ["ts", DataType.TeamSeason],
      ],
      Slots: [],
    },
    {
      English: "Team Games",
      Cypher: "MATCH (t:Team)-[:HAD]->(tg:TeamGame)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        ["t", DataType.Team],
        ["tg", DataType.TeamGame],
      ],
      Slots: [],
    },
    {
      // FILTER
      English: "who play {position}",
      Cypher: "WHERE p.position = $position",
      QueryType: QueryType.FILTER,
      Inputs: [["p", DataType.Player]],
      Outputs: [["p", DataType.Player]],
      Slots: [
        {
          Name: "position",
          Value: "RB",
        },
      ],
    },
    {
      English: "between the {s1} and {s2} seasons",
      Cypher: "WHERE pg.season >= $s1 AND pg.season <= $s2",
      QueryType: QueryType.FILTER,
      Inputs: [["pg", DataType.PlayerGame]],
      Outputs: [["pg", DataType.PlayerGame]],
      Slots: [
        {
          Name: "s1",
          Value: 2024,
        },
        {
          Name: "s2",
          Value: 2025,
        },
      ],
    },
    {
      English: "between the {s1} and {s2} seasons",
      Cypher: "WHERE tg.season >= $s1 AND tg.season <= $s2",
      QueryType: QueryType.FILTER,
      Inputs: [["tg", DataType.TeamGame]],
      Outputs: [["tg", DataType.TeamGame]],
      Slots: [
        {
          Name: "s1",
          Value: 2024,
        },
        {
          Name: "s2",
          Value: 2025,
        },
      ],
    },
    // RETURN
    {
      English: "return player names",
      Cypher: "RETURN p.name",
      QueryType: QueryType.RETURN,
      Inputs: [["p", DataType.Player]],
      Outputs: [["p", DataType.Player]],
      Slots: [],
    },
    {
      English: "return passing stats by game",
      Cypher: "RETURN pg.passing_yards, pg.passing_touchdowns",
      QueryType: QueryType.RETURN,
      Inputs: [["pg", DataType.PlayerGame]],
      Outputs: [["pg", DataType.PlayerGame]],
      Slots: [],
    },
    {
      English: "return team names",
      Cypher: "RETURN t.name",
      QueryType: QueryType.RETURN,
      Inputs: [["t", DataType.Team]],
      Outputs: [["t", DataType.Team]],
      Slots: [],
    },
    {
      English: "return player names and team names",
      Cypher: "RETURN p.name, t.name",
      QueryType: QueryType.RETURN,
      Inputs: [
        ["p", DataType.Player],
        ["t", DataType.Team],
      ],
      Outputs: [
        ["p", DataType.Player],
        ["t", DataType.Team],
      ],
      Slots: [],
    },
  ];
}
