import { Chunk } from "./feature/Chunks/Types/Chunk";
import { QueryType } from "./feature/Chunks/Enums/QueryType";
import { Label } from "./feature/Chunks/Enums/Label";
import { SlotType } from "./feature/Chunks/Enums/SlotType";

export function getAvailableChunks(): Chunk[] {
  return [
    // MATCH
    {
      English: "Players",
      Cypher: "MATCH (p:Player)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [{ Name: "p", Label: Label.Player }],
      Slots: [],
    },
    {
      English: "Teams",
      Cypher: "MATCH (t:Team)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [{ Name: "t", Label: Label.Team }],
      Slots: [],
    },
    {
      English: "Player Games",
      Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        { Name: "p", Label: Label.Player },
        { Name: "pg", Label: Label.PlayerGame },
      ],
      Slots: [],
    },
    {
      English: "Player Seasons",
      Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame)",
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        { Name: "p", Label: Label.Player },
        { Name: "pg", Label: Label.PlayerGame },
      ],
      Slots: [],
    },
    {
      English: "Team Seasons",
      Cypher: "MATCH (t:Team)-[:HAD]->(ts:TeamSeason)",
      QueryType: QueryType.MATCH,
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
      QueryType: QueryType.MATCH,
      Inputs: [],
      Outputs: [
        { Name: "t", Label: Label.Team },
        { Name: "tg", Label: Label.TeamGame },
      ],
      Slots: [],
    },

    // Generic Filter Chunks
    {
      English: "where player {property} {operator} {value}",
      Cypher: "WHERE p.{property} {operator} {value}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [{ Name: "p", Label: Label.Player }],
      Slots: [
        {
          Name: "property",
          Value: "position",
          SlotType: SlotType.EntityProperty,
        },
        {
          Name: "operator",
          Value: "=",
          SlotType: SlotType.FilterOperator,
        },
        {
          Name: "value",
          Value: "QB",
          SlotType: SlotType.FilterValue,
        },
      ],
    },
    {
      English: "where player game {property} {operator} {value}",
      Cypher: "WHERE pg.{property} {operator} {value}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Slots: [
        {
          Name: "property",
          Value: "season",
          SlotType: SlotType.EntityProperty,
        },
        {
          Name: "operator",
          Value: "=",
          SlotType: SlotType.FilterOperator,
        },
        {
          Name: "value",
          Value: 2024,
          SlotType: SlotType.FilterValue,
        },
      ],
    },
    {
      English: "where team {property} {operator} {value}",
      Cypher: "WHERE t.{property} {operator} {value}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "t", Label: Label.Team }],
      Outputs: [{ Name: "t", Label: Label.Team }],
      Slots: [
        {
          Name: "property",
          Value: "name",
          SlotType: SlotType.EntityProperty,
        },
        {
          Name: "operator",
          Value: "=",
          SlotType: SlotType.FilterOperator,
        },
        {
          Name: "value",
          Value: "Bills",
          SlotType: SlotType.FilterValue,
        },
      ],
    },
    {
      English: "where player {property} is between {min} and {max}",
      Cypher: "WHERE p.{property} >= {min} AND p.{property} <= {max}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [{ Name: "p", Label: Label.Player }],
      Slots: [
        {
          Name: "property",
          Value: "weight",
          SlotType: SlotType.EntityProperty,
        },
        {
          Name: "min",
          Value: 200,
          SlotType: SlotType.FilterValue,
        },
        {
          Name: "max",
          Value: 250,
          SlotType: SlotType.FilterValue,
        },
      ],
    },
    {
      English: "where player game {property} is between {min} and {max}",
      Cypher: "WHERE pg.{property} >= {min} AND pg.{property} <= {max}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Slots: [
        {
          Name: "property",
          Value: "season",
          SlotType: SlotType.EntityProperty,
        },
        {
          Name: "min",
          Value: 2023,
          SlotType: SlotType.FilterValue,
        },
        {
          Name: "max",
          Value: 2024,
          SlotType: SlotType.FilterValue,
        },
      ],
    },
    {
      English: "where player {property} contains {value}",
      Cypher: "WHERE p.{property} CONTAINS {value}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [{ Name: "p", Label: Label.Player }],
      Slots: [
        {
          Name: "property",
          Value: "display_name",
          SlotType: SlotType.EntityProperty,
        },
        {
          Name: "value",
          Value: "Allen",
          SlotType: SlotType.FilterValue,
        },
      ],
    },
    {
      English: "where player {property} is null",
      Cypher: "WHERE p.{property} IS NULL",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [{ Name: "p", Label: Label.Player }],
      Slots: [
        {
          Name: "property",
          Value: "team_abbr",
          SlotType: SlotType.EntityProperty,
        },
      ],
    },
    {
      English: "where player {property} is not null",
      Cypher: "WHERE p.{property} IS NOT NULL",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [{ Name: "p", Label: Label.Player }],
      Slots: [
        {
          Name: "property",
          Value: "team_abbr",
          SlotType: SlotType.EntityProperty,
        },
      ],
    },

    // Legacy specific filters (keeping for backward compatibility)
    {
      English: "who play {position}",
      Cypher: "WHERE p.position = {position}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [{ Name: "p", Label: Label.Player }],
      Slots: [
        {
          Name: "position",
          Value: "RB",
          SlotType: SlotType.FilterValue,
        },
      ],
    },
    {
      English: "between the {s1} and {s2} seasons",
      Cypher: "WHERE pg.season >= {s1} AND pg.season <= {s2}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Slots: [
        {
          Name: "s1",
          Value: 2024,
          SlotType: SlotType.FilterValue,
        },
        {
          Name: "s2",
          Value: 2025,
          SlotType: SlotType.FilterValue,
        },
      ],
    },
    {
      English: "between the {s1} and {s2} seasons",
      Cypher: "WHERE tg.season >= {s1} AND tg.season <= {s2}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "tg", Label: Label.TeamGame }],
      Outputs: [{ Name: "tg", Label: Label.TeamGame }],
      Slots: [
        {
          Name: "s1",
          Value: 2024,
          SlotType: SlotType.FilterValue,
        },
        {
          Name: "s2",
          Value: 2025,
          SlotType: SlotType.FilterValue,
        },
      ],
    },

    // RETURN
    {
      English: "return player names",
      Cypher: "RETURN p.name",
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [{ Name: "p", Label: Label.Player }],
      Slots: [],
    },
    {
      English: "return passing stats by game",
      Cypher: "RETURN pg.passing_yards, pg.passing_touchdowns",
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Slots: [],
    },
    {
      English: "return team names",
      Cypher: "RETURN t.name",
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "t", Label: Label.Team }],
      Outputs: [{ Name: "t", Label: Label.Team }],
      Slots: [],
    },
    {
      English: "return player names and team names",
      Cypher: "RETURN p.name, t.name",
      QueryType: QueryType.RETURN,
      Inputs: [
        { Name: "p", Label: Label.Player },
        { Name: "t", Label: Label.Team },
      ],
      Outputs: [
        { Name: "p", Label: Label.Player },
        { Name: "t", Label: Label.Team },
      ],
      Slots: [],
    },
  ];
}
