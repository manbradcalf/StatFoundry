import { Chunk } from "./feature/Chunks/Types/Chunk";
import { QueryType } from "./feature/Chunks/Enums/QueryType";
import { Label } from "./feature/Chunks/Enums/Label";

export function getAvailableChunks(): Chunk[] {
  return [
    // MATCH
    {
      English: "Players",
      Cypher: "MATCH (p:Player)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [["p", Label.Player]],
      Slots: [],
    },
    {
      English: "Teams",
      Cypher: "MATCH (t:Team)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [["t", Label.Team]],
      Slots: [],
    },
    {
      English: "Player Games",
      Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        ["p", Label.Player],
        ["pg", Label.PlayerGame],
      ],
      Slots: [],
    },
    {
      English: "Player Seasons",
      Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        ["p", Label.Player],
        ["pg", Label.PlayerGame],
      ],
      Slots: [],
    },
    {
      English: "Team Seasons",
      Cypher: "MATCH (t:Team)-[:HAD]->(ts:TeamSeason)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        ["t", Label.Team],
        ["ts", Label.TeamSeason],
      ],
      Slots: [],
    },
    {
      English: "Team Games",
      Cypher: "MATCH (t:Team)-[:HAD]->(tg:TeamGame)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        ["t", Label.Team],
        ["tg", Label.TeamGame],
      ],
      Slots: [],
    },

    // Generic Filter Chunks
    {
      English: "where player {property} {operator} {value}",
      Cypher: "WHERE p.{property} {operator} {value}",
      QueryType: QueryType.FILTER,
      Inputs: [["p", Label.Player]],
      Outputs: [["p", Label.Player]],
      Slots: [
        {
          Name: "property",
          Value: "position",
        },
        {
          Name: "operator",
          Value: "=",
        },
        {
          Name: "value",
          Value: "QB",
        },
      ],
    },
    {
      English: "where player game {property} {operator} {value}",
      Cypher: "WHERE pg.{property} {operator} {value}",
      QueryType: QueryType.FILTER,
      Inputs: [["pg", Label.PlayerGame]],
      Outputs: [["pg", Label.PlayerGame]],
      Slots: [
        {
          Name: "property",
          Value: "season",
        },
        {
          Name: "operator",
          Value: "=",
        },
        {
          Name: "value",
          Value: 2024,
        },
      ],
    },
    {
      English: "where team {property} {operator} {value}",
      Cypher: "WHERE t.{property} {operator} {value}",
      QueryType: QueryType.FILTER,
      Inputs: [["t", Label.Team]],
      Outputs: [["t", Label.Team]],
      Slots: [
        {
          Name: "property",
          Value: "name",
        },
        {
          Name: "operator",
          Value: "=",
        },
        {
          Name: "value",
          Value: "Bills",
        },
      ],
    },
    {
      English: "where player {property} is between {min} and {max}",
      Cypher: "WHERE p.{property} >= {min} AND p.{property} <= {max}",
      QueryType: QueryType.FILTER,
      Inputs: [["p", Label.Player]],
      Outputs: [["p", Label.Player]],
      Slots: [
        {
          Name: "property",
          Value: "weight",
        },
        {
          Name: "min",
          Value: 200,
        },
        {
          Name: "max",
          Value: 250,
        },
      ],
    },
    {
      English: "where player game {property} is between {min} and {max}",
      Cypher: "WHERE pg.{property} >= {min} AND pg.{property} <= {max}",
      QueryType: QueryType.FILTER,
      Inputs: [["pg", Label.PlayerGame]],
      Outputs: [["pg", Label.PlayerGame]],
      Slots: [
        {
          Name: "property",
          Value: "season",
        },
        {
          Name: "min",
          Value: 2023,
        },
        {
          Name: "max",
          Value: 2024,
        },
      ],
    },
    {
      English: "where player {property} contains {value}",
      Cypher: "WHERE p.{property} CONTAINS {value}",
      QueryType: QueryType.FILTER,
      Inputs: [["p", Label.Player]],
      Outputs: [["p", Label.Player]],
      Slots: [
        {
          Name: "property",
          Value: "display_name",
        },
        {
          Name: "value",
          Value: "Allen",
        },
      ],
    },
    {
      English: "where player {property} is null",
      Cypher: "WHERE p.{property} IS NULL",
      QueryType: QueryType.FILTER,
      Inputs: [["p", Label.Player]],
      Outputs: [["p", Label.Player]],
      Slots: [
        {
          Name: "property",
          Value: "team_abbr",
        },
      ],
    },
    {
      English: "where player {property} is not null",
      Cypher: "WHERE p.{property} IS NOT NULL",
      QueryType: QueryType.FILTER,
      Inputs: [["p", Label.Player]],
      Outputs: [["p", Label.Player]],
      Slots: [
        {
          Name: "property",
          Value: "team_abbr",
        },
      ],
    },

    // Legacy specific filters (keeping for backward compatibility)
    {
      English: "who play {position}",
      Cypher: "WHERE p.position = {position}",
      QueryType: QueryType.FILTER,
      Inputs: [["p", Label.Player]],
      Outputs: [["p", Label.Player]],
      Slots: [
        {
          Name: "position",
          Value: "RB",
        },
      ],
    },
    {
      English: "between the {s1} and {s2} seasons",
      Cypher: "WHERE pg.season >= {s1} AND pg.season <= {s2}",
      QueryType: QueryType.FILTER,
      Inputs: [["pg", Label.PlayerGame]],
      Outputs: [["pg", Label.PlayerGame]],
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
      Cypher: "WHERE tg.season >= {s1} AND tg.season <= {s2}",
      QueryType: QueryType.FILTER,
      Inputs: [["tg", Label.TeamGame]],
      Outputs: [["tg", Label.TeamGame]],
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
      Inputs: [["p", Label.Player]],
      Outputs: [["p", Label.Player]],
      Slots: [],
    },
    {
      English: "return passing stats by game",
      Cypher: "RETURN pg.passing_yards, pg.passing_touchdowns",
      QueryType: QueryType.RETURN,
      Inputs: [["pg", Label.PlayerGame]],
      Outputs: [["pg", Label.PlayerGame]],
      Slots: [],
    },
    {
      English: "return team names",
      Cypher: "RETURN t.name",
      QueryType: QueryType.RETURN,
      Inputs: [["t", Label.Team]],
      Outputs: [["t", Label.Team]],
      Slots: [],
    },
    {
      English: "return player names and team names",
      Cypher: "RETURN p.name, t.name",
      QueryType: QueryType.RETURN,
      Inputs: [
        ["p", Label.Player],
        ["t", Label.Team],
      ],
      Outputs: [
        ["p", Label.Player],
        ["t", Label.Team],
      ],
      Slots: [],
    },
  ];
}
