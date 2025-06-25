import { Chunk } from "./feature/Chunks/Types/Chunk";
import { QueryType } from "./feature/Chunks/Enums/QueryType";
import { Label } from "./feature/Chunks/Enums/Label";
import { SlotType } from "./feature/Chunks/Enums/SlotType";

const PLAYER_PROPERTIES = [
  "weight",
  "years_of_experience",
  "current_team_id",
  "display_name",
  "team_abbr",
  "position_group",
  "position",
  "jersey_number",
  "first_name",
  "status",
  "height",
];

const PLAYER_GAME_PROPERTIES = [
  "opponent_team",
  "game_id",
  "week",
  "season",
  "opponent_team",
  "recent_team",
];

const RECEIVING_STATS = [
  "receiving_yards",
  "receptions",
  "receiving_tds",
  "receiving_air_yards",
  "receiving_first_downs",
  "receiving_epa",
  "receiving_2pt_conversions",
  "receiving_fumbles",
  "receiving_fumbles_lost",
  "receiving_fumbles_recovered",
  "receiving_fumbles_recovered_yards",
  "receiving_fumbles_recovered_tds",
];

const PASSING_STATS = [
  "passing_yards",
  "passing_tds",
  "passing_air_yards",
  "passing_first_downs",
  "passing_epa",
  "passing_2pt_conversions",
  "passing_fumbles",
  "passing_fumbles_lost",
  "passing_fumbles_recovered",
  "passing_fumbles_recovered_yards",
  "passing_fumbles_recovered_tds",
];

const RUSHING_STATS = [
  "rushing_yards",
  "rushing_tds",
  "rushing_air_yards",
  "rushing_first_downs",
  "rushing_epa",
  "rushing_2pt_conversions",
  "rushing_fumbles",
  "rushing_fumbles_lost",
  "rushing_fumbles_recovered",
  "rushing_fumbles_recovered_yards",
  "rushing_fumbles_recovered_tds",
];

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
          SlotType: SlotType.SelectPlayerProperty,
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
          SlotType: SlotType.SelectPlayerGameProperty,
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
          SlotType: SlotType.SelectPlayerProperty,
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
          SlotType: SlotType.SelectPlayerProperty,
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
          SlotType: SlotType.SelectPlayerProperty,
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
          SlotType: SlotType.SelectPlayerProperty,
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
          SlotType: SlotType.SelectPlayerProperty,
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
          SlotType: SlotType.SelectPlayerProperty,
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
          SlotType: SlotType.SelectPlayerPosition,
        },
      ],
    },
    {
      English: "who played between {s1} and {s2}",
      Cypher:
        "MATCH (p:Player)-[:HAD]->(ps:PlayerSeason) WHERE ps.season >= {s1} AND ps.season <= {s2}",
      QueryType: QueryType.FILTER,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [
        { Name: "p", Label: Label.Player },
        { Name: "ps", Label: Label.PlayerSeason },
      ],
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
      Cypher: "RETURN p.first_name + ' ' + p.last_name as name LIMIT 10",
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "p", Label: Label.Player }],
      Outputs: [{ Name: "p", Label: Label.Player }],
      Slots: [],
    },
    {
      English: "return passing stats by game",
      Cypher: `RETURN pg.${[...PLAYER_GAME_PROPERTIES, ...PASSING_STATS].join(", pg.")} LIMIT 10`,
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Outputs: [{ Name: "pg", Label: Label.PlayerGame }],
      Slots: [],
    },
    {
      English: "return receiving stats by game with name",
      Cypher: `RETURN p.display_name, pg.${[...PLAYER_GAME_PROPERTIES].join(", pg.")}, ${[...RECEIVING_STATS].join(", pg.")} LIMIT 10`,
      QueryType: QueryType.RETURN,
      Inputs: [
        { Name: "pg", Label: Label.PlayerGame },
        { Name: "p", Label: Label.Player },
      ],
      Outputs: [
        { Name: "pg", Label: Label.PlayerGame },
        { Name: "p", Label: Label.Player },
      ],
      Slots: [],
    },
    {
      English: "return passing stats by game with player name",
      Cypher:
        "RETURN pg.passing_yards, pg.passing_tds, p.first_name + ' ' + p.last_name as name LIMIT 10",
      QueryType: QueryType.RETURN,
      Inputs: [
        { Name: "pg", Label: Label.PlayerGame },
        { Name: "p", Label: Label.Player },
      ],
      Outputs: [
        { Name: "pg", Label: Label.PlayerGame },
        { Name: "p", Label: Label.Player },
      ],
      Slots: [],
    },
    {
      English: "return team names",
      Cypher: "RETURN t.name LIMIT 10",
      QueryType: QueryType.RETURN,
      Inputs: [{ Name: "t", Label: Label.Team }],
      Outputs: [{ Name: "t", Label: Label.Team }],
      Slots: [],
    },
    {
      English: "return player names and team names",
      Cypher: "RETURN p.name, t.name LIMIT 10",
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
