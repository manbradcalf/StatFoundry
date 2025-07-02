import { Chunk } from "../Types/Chunk";
import { QueryType } from "../Enums/QueryType";
import { Label } from "../Enums/Label";
import { SlotType } from "../Enums/SlotType";

export const dynamicallyGeneratedChunks: Chunk[] = [
  {
    English: "Players",
    Cypher: "MATCH (p:Player)",
    QueryType: QueryType.MATCH,
    Inputs: [],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [],
  },
  {
    English: "Player Seasons",
    Cypher: "MATCH (ps:PlayerSeason)",
    QueryType: QueryType.MATCH,
    Inputs: [],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [],
  },
  {
    English: "Games",
    Cypher: "MATCH (g:Game)",
    QueryType: QueryType.MATCH,
    Inputs: [],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [],
  },
  {
    English: "Seasons",
    Cypher: "MATCH (s:Season)",
    QueryType: QueryType.MATCH,
    Inputs: [],
    Outputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Slots: [],
  },
  {
    English: "Player Games",
    Cypher: "MATCH (pg:PlayerGame)",
    QueryType: QueryType.MATCH,
    Inputs: [],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [],
  },
  {
    English: "with height greater than 72",
    Cypher: "WHERE p.height > 72",
    EnglishTemplate: "with height greater than {value}",
    CypherTemplate: "WHERE p.height > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 72,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with height less than 72",
    Cypher: "WHERE p.height < 72",
    EnglishTemplate: "with height less than {value}",
    CypherTemplate: "WHERE p.height < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 72,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with height greater than or equal to 72",
    Cypher: "WHERE p.height >= 72",
    EnglishTemplate: "with height greater than or equal to {value}",
    CypherTemplate: "WHERE p.height >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 72,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with height less than or equal to 72",
    Cypher: "WHERE p.height <= 72",
    EnglishTemplate: "with height less than or equal to {value}",
    CypherTemplate: "WHERE p.height <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 72,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with height equal to 72",
    Cypher: "WHERE p.height = 72",
    EnglishTemplate: "with height equal to {value}",
    CypherTemplate: "WHERE p.height = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 72,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weight greater than 200",
    Cypher: "WHERE p.weight > 200",
    EnglishTemplate: "with weight greater than {value}",
    CypherTemplate: "WHERE p.weight > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 200,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weight less than 200",
    Cypher: "WHERE p.weight < 200",
    EnglishTemplate: "with weight less than {value}",
    CypherTemplate: "WHERE p.weight < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 200,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weight greater than or equal to 200",
    Cypher: "WHERE p.weight >= 200",
    EnglishTemplate: "with weight greater than or equal to {value}",
    CypherTemplate: "WHERE p.weight >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 200,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weight less than or equal to 200",
    Cypher: "WHERE p.weight <= 200",
    EnglishTemplate: "with weight less than or equal to {value}",
    CypherTemplate: "WHERE p.weight <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 200,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weight equal to 200",
    Cypher: "WHERE p.weight = 200",
    EnglishTemplate: "with weight equal to {value}",
    CypherTemplate: "WHERE p.weight = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 200,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with position equal to "example"',
    Cypher: 'WHERE p.position = "example"',
    EnglishTemplate: 'with position equal to "{value}"',
    CypherTemplate: 'WHERE p.position = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with position group equal to "example"',
    Cypher: 'WHERE p.position_group = "example"',
    EnglishTemplate: 'with position group equal to "{value}"',
    CypherTemplate: 'WHERE p.position_group = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with name equal to "example"',
    Cypher: 'WHERE p.display_name = "example"',
    EnglishTemplate: 'with name equal to "{value}"',
    CypherTemplate: 'WHERE p.display_name = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with last name equal to "example"',
    Cypher: 'WHERE p.last_name = "example"',
    EnglishTemplate: 'with last name equal to "{value}"',
    CypherTemplate: 'WHERE p.last_name = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with football name equal to "example"',
    Cypher: 'WHERE p.football_name = "example"',
    EnglishTemplate: 'with football name equal to "{value}"',
    CypherTemplate: 'WHERE p.football_name = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with short name equal to "example"',
    Cypher: 'WHERE p.short_name = "example"',
    EnglishTemplate: 'with short name equal to "{value}"',
    CypherTemplate: 'WHERE p.short_name = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with team equal to "example"',
    Cypher: 'WHERE p.team_abbr = "example"',
    EnglishTemplate: 'with team equal to "{value}"',
    CypherTemplate: 'WHERE p.team_abbr = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with college name equal to "example"',
    Cypher: 'WHERE p.college_name = "example"',
    EnglishTemplate: 'with college name equal to "{value}"',
    CypherTemplate: "WHERE p.college_name = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with first name equal to "example"',
    Cypher: 'WHERE p.first_name = "example"',
    EnglishTemplate: 'with first name equal to "{value}"',
    CypherTemplate: 'WHERE p.first_name = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season greater than 2023",
    Cypher: "WHERE ps.season > 2023",
    EnglishTemplate: "with season greater than {value}",
    CypherTemplate: "WHERE ps.season > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season less than 2023",
    Cypher: "WHERE ps.season < 2023",
    EnglishTemplate: "with season less than {value}",
    CypherTemplate: "WHERE ps.season < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season greater than or equal to 2023",
    Cypher: "WHERE ps.season >= 2023",
    EnglishTemplate: "with season greater than or equal to {value}",
    CypherTemplate: "WHERE ps.season >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season less than or equal to 2023",
    Cypher: "WHERE ps.season <= 2023",
    EnglishTemplate: "with season less than or equal to {value}",
    CypherTemplate: "WHERE ps.season <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season equal to 2023",
    Cypher: "WHERE ps.season = 2023",
    EnglishTemplate: "with season equal to {value}",
    CypherTemplate: "WHERE ps.season = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type greater than 2023",
    Cypher: "WHERE ps.season_type > 2023",
    EnglishTemplate: "with season type greater than {value}",
    CypherTemplate: "WHERE ps.season_type > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type less than 2023",
    Cypher: "WHERE ps.season_type < 2023",
    EnglishTemplate: "with season type less than {value}",
    CypherTemplate: "WHERE ps.season_type < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type greater than or equal to 2023",
    Cypher: "WHERE ps.season_type >= 2023",
    EnglishTemplate: "with season type greater than or equal to {value}",
    CypherTemplate: "WHERE ps.season_type >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type less than or equal to 2023",
    Cypher: "WHERE ps.season_type <= 2023",
    EnglishTemplate: "with season type less than or equal to {value}",
    CypherTemplate: "WHERE ps.season_type <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type equal to 2023",
    Cypher: "WHERE ps.season_type = 2023",
    EnglishTemplate: "with season type equal to {value}",
    CypherTemplate: "WHERE ps.season_type = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions greater than 100",
    Cypher: "WHERE ps.completions > 100",
    EnglishTemplate: "with completions greater than {value}",
    CypherTemplate: "WHERE ps.completions > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions less than 100",
    Cypher: "WHERE ps.completions < 100",
    EnglishTemplate: "with completions less than {value}",
    CypherTemplate: "WHERE ps.completions < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions greater than or equal to 100",
    Cypher: "WHERE ps.completions >= 100",
    EnglishTemplate: "with completions greater than or equal to {value}",
    CypherTemplate: "WHERE ps.completions >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions less than or equal to 100",
    Cypher: "WHERE ps.completions <= 100",
    EnglishTemplate: "with completions less than or equal to {value}",
    CypherTemplate: "WHERE ps.completions <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions equal to 100",
    Cypher: "WHERE ps.completions = 100",
    EnglishTemplate: "with completions equal to {value}",
    CypherTemplate: "WHERE ps.completions = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts greater than 10",
    Cypher: "WHERE ps.attempts > 10",
    EnglishTemplate: "with attempts greater than {value}",
    CypherTemplate: "WHERE ps.attempts > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts less than 10",
    Cypher: "WHERE ps.attempts < 10",
    EnglishTemplate: "with attempts less than {value}",
    CypherTemplate: "WHERE ps.attempts < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts greater than or equal to 10",
    Cypher: "WHERE ps.attempts >= 10",
    EnglishTemplate: "with attempts greater than or equal to {value}",
    CypherTemplate: "WHERE ps.attempts >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts less than or equal to 10",
    Cypher: "WHERE ps.attempts <= 10",
    EnglishTemplate: "with attempts less than or equal to {value}",
    CypherTemplate: "WHERE ps.attempts <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts equal to 10",
    Cypher: "WHERE ps.attempts = 10",
    EnglishTemplate: "with attempts equal to {value}",
    CypherTemplate: "WHERE ps.attempts = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards greater than 100",
    Cypher: "WHERE ps.passing_yards > 100",
    EnglishTemplate: "with passing yards greater than {value}",
    CypherTemplate: "WHERE ps.passing_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards less than 100",
    Cypher: "WHERE ps.passing_yards < 100",
    EnglishTemplate: "with passing yards less than {value}",
    CypherTemplate: "WHERE ps.passing_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards greater than or equal to 100",
    Cypher: "WHERE ps.passing_yards >= 100",
    EnglishTemplate: "with passing yards greater than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards less than or equal to 100",
    Cypher: "WHERE ps.passing_yards <= 100",
    EnglishTemplate: "with passing yards less than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards equal to 100",
    Cypher: "WHERE ps.passing_yards = 100",
    EnglishTemplate: "with passing yards equal to {value}",
    CypherTemplate: "WHERE ps.passing_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns greater than 2",
    Cypher: "WHERE ps.passing_tds > 2",
    EnglishTemplate: "with passing touchdowns greater than {value}",
    CypherTemplate: "WHERE ps.passing_tds > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns less than 2",
    Cypher: "WHERE ps.passing_tds < 2",
    EnglishTemplate: "with passing touchdowns less than {value}",
    CypherTemplate: "WHERE ps.passing_tds < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns greater than or equal to 2",
    Cypher: "WHERE ps.passing_tds >= 2",
    EnglishTemplate: "with passing touchdowns greater than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_tds >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns less than or equal to 2",
    Cypher: "WHERE ps.passing_tds <= 2",
    EnglishTemplate: "with passing touchdowns less than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_tds <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns equal to 2",
    Cypher: "WHERE ps.passing_tds = 2",
    EnglishTemplate: "with passing touchdowns equal to {value}",
    CypherTemplate: "WHERE ps.passing_tds = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions greater than 100",
    Cypher: "WHERE ps.interceptions > 100",
    EnglishTemplate: "with interceptions greater than {value}",
    CypherTemplate: "WHERE ps.interceptions > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions less than 100",
    Cypher: "WHERE ps.interceptions < 100",
    EnglishTemplate: "with interceptions less than {value}",
    CypherTemplate: "WHERE ps.interceptions < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions greater than or equal to 100",
    Cypher: "WHERE ps.interceptions >= 100",
    EnglishTemplate: "with interceptions greater than or equal to {value}",
    CypherTemplate: "WHERE ps.interceptions >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions less than or equal to 100",
    Cypher: "WHERE ps.interceptions <= 100",
    EnglishTemplate: "with interceptions less than or equal to {value}",
    CypherTemplate: "WHERE ps.interceptions <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions equal to 100",
    Cypher: "WHERE ps.interceptions = 100",
    EnglishTemplate: "with interceptions equal to {value}",
    CypherTemplate: "WHERE ps.interceptions = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards greater than 100",
    Cypher: "WHERE ps.sack_yards > 100",
    EnglishTemplate: "with sack yards greater than {value}",
    CypherTemplate: "WHERE ps.sack_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards less than 100",
    Cypher: "WHERE ps.sack_yards < 100",
    EnglishTemplate: "with sack yards less than {value}",
    CypherTemplate: "WHERE ps.sack_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards greater than or equal to 100",
    Cypher: "WHERE ps.sack_yards >= 100",
    EnglishTemplate: "with sack yards greater than or equal to {value}",
    CypherTemplate: "WHERE ps.sack_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards less than or equal to 100",
    Cypher: "WHERE ps.sack_yards <= 100",
    EnglishTemplate: "with sack yards less than or equal to {value}",
    CypherTemplate: "WHERE ps.sack_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards equal to 100",
    Cypher: "WHERE ps.sack_yards = 100",
    EnglishTemplate: "with sack yards equal to {value}",
    CypherTemplate: "WHERE ps.sack_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles greater than 100",
    Cypher: "WHERE ps.sack_fumbles > 100",
    EnglishTemplate: "with sack fumbles greater than {value}",
    CypherTemplate: "WHERE ps.sack_fumbles > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles less than 100",
    Cypher: "WHERE ps.sack_fumbles < 100",
    EnglishTemplate: "with sack fumbles less than {value}",
    CypherTemplate: "WHERE ps.sack_fumbles < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles greater than or equal to 100",
    Cypher: "WHERE ps.sack_fumbles >= 100",
    EnglishTemplate: "with sack fumbles greater than or equal to {value}",
    CypherTemplate: "WHERE ps.sack_fumbles >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles less than or equal to 100",
    Cypher: "WHERE ps.sack_fumbles <= 100",
    EnglishTemplate: "with sack fumbles less than or equal to {value}",
    CypherTemplate: "WHERE ps.sack_fumbles <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles equal to 100",
    Cypher: "WHERE ps.sack_fumbles = 100",
    EnglishTemplate: "with sack fumbles equal to {value}",
    CypherTemplate: "WHERE ps.sack_fumbles = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost greater than 100",
    Cypher: "WHERE ps.sack_fumbles_lost > 100",
    EnglishTemplate: "with sack fumbles lost greater than {value}",
    CypherTemplate: "WHERE ps.sack_fumbles_lost > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost less than 100",
    Cypher: "WHERE ps.sack_fumbles_lost < 100",
    EnglishTemplate: "with sack fumbles lost less than {value}",
    CypherTemplate: "WHERE ps.sack_fumbles_lost < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost greater than or equal to 100",
    Cypher: "WHERE ps.sack_fumbles_lost >= 100",
    EnglishTemplate: "with sack fumbles lost greater than or equal to {value}",
    CypherTemplate: "WHERE ps.sack_fumbles_lost >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost less than or equal to 100",
    Cypher: "WHERE ps.sack_fumbles_lost <= 100",
    EnglishTemplate: "with sack fumbles lost less than or equal to {value}",
    CypherTemplate: "WHERE ps.sack_fumbles_lost <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost equal to 100",
    Cypher: "WHERE ps.sack_fumbles_lost = 100",
    EnglishTemplate: "with sack fumbles lost equal to {value}",
    CypherTemplate: "WHERE ps.sack_fumbles_lost = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards greater than 100",
    Cypher: "WHERE ps.passing_air_yards > 100",
    EnglishTemplate: "with passing air yards greater than {value}",
    CypherTemplate: "WHERE ps.passing_air_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards less than 100",
    Cypher: "WHERE ps.passing_air_yards < 100",
    EnglishTemplate: "with passing air yards less than {value}",
    CypherTemplate: "WHERE ps.passing_air_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards greater than or equal to 100",
    Cypher: "WHERE ps.passing_air_yards >= 100",
    EnglishTemplate: "with passing air yards greater than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_air_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards less than or equal to 100",
    Cypher: "WHERE ps.passing_air_yards <= 100",
    EnglishTemplate: "with passing air yards less than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_air_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards equal to 100",
    Cypher: "WHERE ps.passing_air_yards = 100",
    EnglishTemplate: "with passing air yards equal to {value}",
    CypherTemplate: "WHERE ps.passing_air_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch greater than 100",
    Cypher: "WHERE ps.passing_yards_after_catch > 100",
    EnglishTemplate: "with passing yards after catch greater than {value}",
    CypherTemplate: "WHERE ps.passing_yards_after_catch > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch less than 100",
    Cypher: "WHERE ps.passing_yards_after_catch < 100",
    EnglishTemplate: "with passing yards after catch less than {value}",
    CypherTemplate: "WHERE ps.passing_yards_after_catch < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch greater than or equal to 100",
    Cypher: "WHERE ps.passing_yards_after_catch >= 100",
    EnglishTemplate:
      "with passing yards after catch greater than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_yards_after_catch >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch less than or equal to 100",
    Cypher: "WHERE ps.passing_yards_after_catch <= 100",
    EnglishTemplate:
      "with passing yards after catch less than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_yards_after_catch <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch equal to 100",
    Cypher: "WHERE ps.passing_yards_after_catch = 100",
    EnglishTemplate: "with passing yards after catch equal to {value}",
    CypherTemplate: "WHERE ps.passing_yards_after_catch = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries greater than 10",
    Cypher: "WHERE ps.carries > 10",
    EnglishTemplate: "with carries greater than {value}",
    CypherTemplate: "WHERE ps.carries > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries less than 10",
    Cypher: "WHERE ps.carries < 10",
    EnglishTemplate: "with carries less than {value}",
    CypherTemplate: "WHERE ps.carries < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries greater than or equal to 10",
    Cypher: "WHERE ps.carries >= 10",
    EnglishTemplate: "with carries greater than or equal to {value}",
    CypherTemplate: "WHERE ps.carries >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries less than or equal to 10",
    Cypher: "WHERE ps.carries <= 10",
    EnglishTemplate: "with carries less than or equal to {value}",
    CypherTemplate: "WHERE ps.carries <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries equal to 10",
    Cypher: "WHERE ps.carries = 10",
    EnglishTemplate: "with carries equal to {value}",
    CypherTemplate: "WHERE ps.carries = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards greater than 100",
    Cypher: "WHERE ps.rushing_yards > 100",
    EnglishTemplate: "with rushing yards greater than {value}",
    CypherTemplate: "WHERE ps.rushing_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards less than 100",
    Cypher: "WHERE ps.rushing_yards < 100",
    EnglishTemplate: "with rushing yards less than {value}",
    CypherTemplate: "WHERE ps.rushing_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards greater than or equal to 100",
    Cypher: "WHERE ps.rushing_yards >= 100",
    EnglishTemplate: "with rushing yards greater than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards less than or equal to 100",
    Cypher: "WHERE ps.rushing_yards <= 100",
    EnglishTemplate: "with rushing yards less than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards equal to 100",
    Cypher: "WHERE ps.rushing_yards = 100",
    EnglishTemplate: "with rushing yards equal to {value}",
    CypherTemplate: "WHERE ps.rushing_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns greater than 2",
    Cypher: "WHERE ps.rushing_tds > 2",
    EnglishTemplate: "with rushing touchdowns greater than {value}",
    CypherTemplate: "WHERE ps.rushing_tds > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns less than 2",
    Cypher: "WHERE ps.rushing_tds < 2",
    EnglishTemplate: "with rushing touchdowns less than {value}",
    CypherTemplate: "WHERE ps.rushing_tds < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns greater than or equal to 2",
    Cypher: "WHERE ps.rushing_tds >= 2",
    EnglishTemplate: "with rushing touchdowns greater than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_tds >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns less than or equal to 2",
    Cypher: "WHERE ps.rushing_tds <= 2",
    EnglishTemplate: "with rushing touchdowns less than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_tds <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns equal to 2",
    Cypher: "WHERE ps.rushing_tds = 2",
    EnglishTemplate: "with rushing touchdowns equal to {value}",
    CypherTemplate: "WHERE ps.rushing_tds = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles greater than 100",
    Cypher: "WHERE ps.rushing_fumbles > 100",
    EnglishTemplate: "with rushing fumbles greater than {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles less than 100",
    Cypher: "WHERE ps.rushing_fumbles < 100",
    EnglishTemplate: "with rushing fumbles less than {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles greater than or equal to 100",
    Cypher: "WHERE ps.rushing_fumbles >= 100",
    EnglishTemplate: "with rushing fumbles greater than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles less than or equal to 100",
    Cypher: "WHERE ps.rushing_fumbles <= 100",
    EnglishTemplate: "with rushing fumbles less than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles equal to 100",
    Cypher: "WHERE ps.rushing_fumbles = 100",
    EnglishTemplate: "with rushing fumbles equal to {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost greater than 100",
    Cypher: "WHERE ps.rushing_fumbles_lost > 100",
    EnglishTemplate: "with rushing fumbles lost greater than {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles_lost > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost less than 100",
    Cypher: "WHERE ps.rushing_fumbles_lost < 100",
    EnglishTemplate: "with rushing fumbles lost less than {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles_lost < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost greater than or equal to 100",
    Cypher: "WHERE ps.rushing_fumbles_lost >= 100",
    EnglishTemplate:
      "with rushing fumbles lost greater than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles_lost >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost less than or equal to 100",
    Cypher: "WHERE ps.rushing_fumbles_lost <= 100",
    EnglishTemplate: "with rushing fumbles lost less than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles_lost <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost equal to 100",
    Cypher: "WHERE ps.rushing_fumbles_lost = 100",
    EnglishTemplate: "with rushing fumbles lost equal to {value}",
    CypherTemplate: "WHERE ps.rushing_fumbles_lost = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa greater than 100",
    Cypher: "WHERE ps.rushing_epa > 100",
    EnglishTemplate: "with rushing epa greater than {value}",
    CypherTemplate: "WHERE ps.rushing_epa > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa less than 100",
    Cypher: "WHERE ps.rushing_epa < 100",
    EnglishTemplate: "with rushing epa less than {value}",
    CypherTemplate: "WHERE ps.rushing_epa < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa greater than or equal to 100",
    Cypher: "WHERE ps.rushing_epa >= 100",
    EnglishTemplate: "with rushing epa greater than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_epa >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa less than or equal to 100",
    Cypher: "WHERE ps.rushing_epa <= 100",
    EnglishTemplate: "with rushing epa less than or equal to {value}",
    CypherTemplate: "WHERE ps.rushing_epa <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa equal to 100",
    Cypher: "WHERE ps.rushing_epa = 100",
    EnglishTemplate: "with rushing epa equal to {value}",
    CypherTemplate: "WHERE ps.rushing_epa = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions greater than 5",
    Cypher: "WHERE ps.receptions > 5",
    EnglishTemplate: "with receptions greater than {value}",
    CypherTemplate: "WHERE ps.receptions > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions less than 5",
    Cypher: "WHERE ps.receptions < 5",
    EnglishTemplate: "with receptions less than {value}",
    CypherTemplate: "WHERE ps.receptions < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions greater than or equal to 5",
    Cypher: "WHERE ps.receptions >= 5",
    EnglishTemplate: "with receptions greater than or equal to {value}",
    CypherTemplate: "WHERE ps.receptions >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions less than or equal to 5",
    Cypher: "WHERE ps.receptions <= 5",
    EnglishTemplate: "with receptions less than or equal to {value}",
    CypherTemplate: "WHERE ps.receptions <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions equal to 5",
    Cypher: "WHERE ps.receptions = 5",
    EnglishTemplate: "with receptions equal to {value}",
    CypherTemplate: "WHERE ps.receptions = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles greater than 100",
    Cypher: "WHERE ps.receiving_fumbles > 100",
    EnglishTemplate: "with receiving fumbles greater than {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles less than 100",
    Cypher: "WHERE ps.receiving_fumbles < 100",
    EnglishTemplate: "with receiving fumbles less than {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles greater than or equal to 100",
    Cypher: "WHERE ps.receiving_fumbles >= 100",
    EnglishTemplate: "with receiving fumbles greater than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles less than or equal to 100",
    Cypher: "WHERE ps.receiving_fumbles <= 100",
    EnglishTemplate: "with receiving fumbles less than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles equal to 100",
    Cypher: "WHERE ps.receiving_fumbles = 100",
    EnglishTemplate: "with receiving fumbles equal to {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr greater than 100",
    Cypher: "WHERE ps.fantasy_points_ppr > 100",
    EnglishTemplate: "with fantasy points ppr greater than {value}",
    CypherTemplate: "WHERE ps.fantasy_points_ppr > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr less than 100",
    Cypher: "WHERE ps.fantasy_points_ppr < 100",
    EnglishTemplate: "with fantasy points ppr less than {value}",
    CypherTemplate: "WHERE ps.fantasy_points_ppr < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr greater than or equal to 100",
    Cypher: "WHERE ps.fantasy_points_ppr >= 100",
    EnglishTemplate: "with fantasy points ppr greater than or equal to {value}",
    CypherTemplate: "WHERE ps.fantasy_points_ppr >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr less than or equal to 100",
    Cypher: "WHERE ps.fantasy_points_ppr <= 100",
    EnglishTemplate: "with fantasy points ppr less than or equal to {value}",
    CypherTemplate: "WHERE ps.fantasy_points_ppr <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr equal to 100",
    Cypher: "WHERE ps.fantasy_points_ppr = 100",
    EnglishTemplate: "with fantasy points ppr equal to {value}",
    CypherTemplate: "WHERE ps.fantasy_points_ppr = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost greater than 100",
    Cypher: "WHERE ps.receiving_fumbles_lost > 100",
    EnglishTemplate: "with receiving fumbles lost greater than {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles_lost > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost less than 100",
    Cypher: "WHERE ps.receiving_fumbles_lost < 100",
    EnglishTemplate: "with receiving fumbles lost less than {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles_lost < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost greater than or equal to 100",
    Cypher: "WHERE ps.receiving_fumbles_lost >= 100",
    EnglishTemplate:
      "with receiving fumbles lost greater than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles_lost >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost less than or equal to 100",
    Cypher: "WHERE ps.receiving_fumbles_lost <= 100",
    EnglishTemplate:
      "with receiving fumbles lost less than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles_lost <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost equal to 100",
    Cypher: "WHERE ps.receiving_fumbles_lost = 100",
    EnglishTemplate: "with receiving fumbles lost equal to {value}",
    CypherTemplate: "WHERE ps.receiving_fumbles_lost = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards greater than 100",
    Cypher: "WHERE ps.receiving_yards > 100",
    EnglishTemplate: "with receiving yards greater than {value}",
    CypherTemplate: "WHERE ps.receiving_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards less than 100",
    Cypher: "WHERE ps.receiving_yards < 100",
    EnglishTemplate: "with receiving yards less than {value}",
    CypherTemplate: "WHERE ps.receiving_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards greater than or equal to 100",
    Cypher: "WHERE ps.receiving_yards >= 100",
    EnglishTemplate: "with receiving yards greater than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards less than or equal to 100",
    Cypher: "WHERE ps.receiving_yards <= 100",
    EnglishTemplate: "with receiving yards less than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards equal to 100",
    Cypher: "WHERE ps.receiving_yards = 100",
    EnglishTemplate: "with receiving yards equal to {value}",
    CypherTemplate: "WHERE ps.receiving_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns greater than 2",
    Cypher: "WHERE ps.receiving_tds > 2",
    EnglishTemplate: "with receiving touchdowns greater than {value}",
    CypherTemplate: "WHERE ps.receiving_tds > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns less than 2",
    Cypher: "WHERE ps.receiving_tds < 2",
    EnglishTemplate: "with receiving touchdowns less than {value}",
    CypherTemplate: "WHERE ps.receiving_tds < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns greater than or equal to 2",
    Cypher: "WHERE ps.receiving_tds >= 2",
    EnglishTemplate:
      "with receiving touchdowns greater than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_tds >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns less than or equal to 2",
    Cypher: "WHERE ps.receiving_tds <= 2",
    EnglishTemplate: "with receiving touchdowns less than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_tds <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns equal to 2",
    Cypher: "WHERE ps.receiving_tds = 2",
    EnglishTemplate: "with receiving touchdowns equal to {value}",
    CypherTemplate: "WHERE ps.receiving_tds = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards greater than 100",
    Cypher: "WHERE ps.receiving_air_yards > 100",
    EnglishTemplate: "with receiving air yards greater than {value}",
    CypherTemplate: "WHERE ps.receiving_air_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards less than 100",
    Cypher: "WHERE ps.receiving_air_yards < 100",
    EnglishTemplate: "with receiving air yards less than {value}",
    CypherTemplate: "WHERE ps.receiving_air_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards greater than or equal to 100",
    Cypher: "WHERE ps.receiving_air_yards >= 100",
    EnglishTemplate:
      "with receiving air yards greater than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_air_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards less than or equal to 100",
    Cypher: "WHERE ps.receiving_air_yards <= 100",
    EnglishTemplate: "with receiving air yards less than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_air_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards equal to 100",
    Cypher: "WHERE ps.receiving_air_yards = 100",
    EnglishTemplate: "with receiving air yards equal to {value}",
    CypherTemplate: "WHERE ps.receiving_air_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share greater than 100",
    Cypher: "WHERE ps.air_yards_share > 100",
    EnglishTemplate: "with air yards share greater than {value}",
    CypherTemplate: "WHERE ps.air_yards_share > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share less than 100",
    Cypher: "WHERE ps.air_yards_share < 100",
    EnglishTemplate: "with air yards share less than {value}",
    CypherTemplate: "WHERE ps.air_yards_share < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share greater than or equal to 100",
    Cypher: "WHERE ps.air_yards_share >= 100",
    EnglishTemplate: "with air yards share greater than or equal to {value}",
    CypherTemplate: "WHERE ps.air_yards_share >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share less than or equal to 100",
    Cypher: "WHERE ps.air_yards_share <= 100",
    EnglishTemplate: "with air yards share less than or equal to {value}",
    CypherTemplate: "WHERE ps.air_yards_share <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share equal to 100",
    Cypher: "WHERE ps.air_yards_share = 100",
    EnglishTemplate: "with air yards share equal to {value}",
    CypherTemplate: "WHERE ps.air_yards_share = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa greater than 100",
    Cypher: "WHERE ps.passing_epa > 100",
    EnglishTemplate: "with passing epa greater than {value}",
    CypherTemplate: "WHERE ps.passing_epa > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa less than 100",
    Cypher: "WHERE ps.passing_epa < 100",
    EnglishTemplate: "with passing epa less than {value}",
    CypherTemplate: "WHERE ps.passing_epa < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa greater than or equal to 100",
    Cypher: "WHERE ps.passing_epa >= 100",
    EnglishTemplate: "with passing epa greater than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_epa >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa less than or equal to 100",
    Cypher: "WHERE ps.passing_epa <= 100",
    EnglishTemplate: "with passing epa less than or equal to {value}",
    CypherTemplate: "WHERE ps.passing_epa <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa equal to 100",
    Cypher: "WHERE ps.passing_epa = 100",
    EnglishTemplate: "with passing epa equal to {value}",
    CypherTemplate: "WHERE ps.passing_epa = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds greater than 2",
    Cypher: "WHERE ps.special_teams_tds > 2",
    EnglishTemplate: "with special teams tds greater than {value}",
    CypherTemplate: "WHERE ps.special_teams_tds > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds less than 2",
    Cypher: "WHERE ps.special_teams_tds < 2",
    EnglishTemplate: "with special teams tds less than {value}",
    CypherTemplate: "WHERE ps.special_teams_tds < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds greater than or equal to 2",
    Cypher: "WHERE ps.special_teams_tds >= 2",
    EnglishTemplate: "with special teams tds greater than or equal to {value}",
    CypherTemplate: "WHERE ps.special_teams_tds >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds less than or equal to 2",
    Cypher: "WHERE ps.special_teams_tds <= 2",
    EnglishTemplate: "with special teams tds less than or equal to {value}",
    CypherTemplate: "WHERE ps.special_teams_tds <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds equal to 2",
    Cypher: "WHERE ps.special_teams_tds = 2",
    EnglishTemplate: "with special teams tds equal to {value}",
    CypherTemplate: "WHERE ps.special_teams_tds = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets greater than 5",
    Cypher: "WHERE ps.targets > 5",
    EnglishTemplate: "with targets greater than {value}",
    CypherTemplate: "WHERE ps.targets > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets less than 5",
    Cypher: "WHERE ps.targets < 5",
    EnglishTemplate: "with targets less than {value}",
    CypherTemplate: "WHERE ps.targets < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets greater than or equal to 5",
    Cypher: "WHERE ps.targets >= 5",
    EnglishTemplate: "with targets greater than or equal to {value}",
    CypherTemplate: "WHERE ps.targets >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets less than or equal to 5",
    Cypher: "WHERE ps.targets <= 5",
    EnglishTemplate: "with targets less than or equal to {value}",
    CypherTemplate: "WHERE ps.targets <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets equal to 5",
    Cypher: "WHERE ps.targets = 5",
    EnglishTemplate: "with targets equal to {value}",
    CypherTemplate: "WHERE ps.targets = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch greater than 100",
    Cypher: "WHERE ps.receiving_yards_after_catch > 100",
    EnglishTemplate: "with receiving yards after catch greater than {value}",
    CypherTemplate: "WHERE ps.receiving_yards_after_catch > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch less than 100",
    Cypher: "WHERE ps.receiving_yards_after_catch < 100",
    EnglishTemplate: "with receiving yards after catch less than {value}",
    CypherTemplate: "WHERE ps.receiving_yards_after_catch < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch greater than or equal to 100",
    Cypher: "WHERE ps.receiving_yards_after_catch >= 100",
    EnglishTemplate:
      "with receiving yards after catch greater than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_yards_after_catch >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch less than or equal to 100",
    Cypher: "WHERE ps.receiving_yards_after_catch <= 100",
    EnglishTemplate:
      "with receiving yards after catch less than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_yards_after_catch <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch equal to 100",
    Cypher: "WHERE ps.receiving_yards_after_catch = 100",
    EnglishTemplate: "with receiving yards after catch equal to {value}",
    CypherTemplate: "WHERE ps.receiving_yards_after_catch = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa greater than 100",
    Cypher: "WHERE ps.receiving_epa > 100",
    EnglishTemplate: "with receiving epa greater than {value}",
    CypherTemplate: "WHERE ps.receiving_epa > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa less than 100",
    Cypher: "WHERE ps.receiving_epa < 100",
    EnglishTemplate: "with receiving epa less than {value}",
    CypherTemplate: "WHERE ps.receiving_epa < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa greater than or equal to 100",
    Cypher: "WHERE ps.receiving_epa >= 100",
    EnglishTemplate: "with receiving epa greater than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_epa >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa less than or equal to 100",
    Cypher: "WHERE ps.receiving_epa <= 100",
    EnglishTemplate: "with receiving epa less than or equal to {value}",
    CypherTemplate: "WHERE ps.receiving_epa <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa equal to 100",
    Cypher: "WHERE ps.receiving_epa = 100",
    EnglishTemplate: "with receiving epa equal to {value}",
    CypherTemplate: "WHERE ps.receiving_epa = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points greater than 100",
    Cypher: "WHERE ps.fantasy_points > 100",
    EnglishTemplate: "with fantasy points greater than {value}",
    CypherTemplate: "WHERE ps.fantasy_points > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points less than 100",
    Cypher: "WHERE ps.fantasy_points < 100",
    EnglishTemplate: "with fantasy points less than {value}",
    CypherTemplate: "WHERE ps.fantasy_points < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points greater than or equal to 100",
    Cypher: "WHERE ps.fantasy_points >= 100",
    EnglishTemplate: "with fantasy points greater than or equal to {value}",
    CypherTemplate: "WHERE ps.fantasy_points >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points less than or equal to 100",
    Cypher: "WHERE ps.fantasy_points <= 100",
    EnglishTemplate: "with fantasy points less than or equal to {value}",
    CypherTemplate: "WHERE ps.fantasy_points <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points equal to 100",
    Cypher: "WHERE ps.fantasy_points = 100",
    EnglishTemplate: "with fantasy points equal to {value}",
    CypherTemplate: "WHERE ps.fantasy_points = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with special teams tds equal to "example"',
    Cypher: 'WHERE ps.special_teams_tds = "example"',
    EnglishTemplate: 'with special teams tds equal to "{value}"',
    CypherTemplate: 'WHERE ps.special_teams_tds = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season greater than 2023",
    Cypher: "WHERE g.season > 2023",
    EnglishTemplate: "with season greater than {value}",
    CypherTemplate: "WHERE g.season > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season less than 2023",
    Cypher: "WHERE g.season < 2023",
    EnglishTemplate: "with season less than {value}",
    CypherTemplate: "WHERE g.season < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season greater than or equal to 2023",
    Cypher: "WHERE g.season >= 2023",
    EnglishTemplate: "with season greater than or equal to {value}",
    CypherTemplate: "WHERE g.season >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season less than or equal to 2023",
    Cypher: "WHERE g.season <= 2023",
    EnglishTemplate: "with season less than or equal to {value}",
    CypherTemplate: "WHERE g.season <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season equal to 2023",
    Cypher: "WHERE g.season = 2023",
    EnglishTemplate: "with season equal to {value}",
    CypherTemplate: "WHERE g.season = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week greater than 5",
    Cypher: "WHERE g.week > 5",
    EnglishTemplate: "with week greater than {value}",
    CypherTemplate: "WHERE g.week > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week less than 5",
    Cypher: "WHERE g.week < 5",
    EnglishTemplate: "with week less than {value}",
    CypherTemplate: "WHERE g.week < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week greater than or equal to 5",
    Cypher: "WHERE g.week >= 5",
    EnglishTemplate: "with week greater than or equal to {value}",
    CypherTemplate: "WHERE g.week >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week less than or equal to 5",
    Cypher: "WHERE g.week <= 5",
    EnglishTemplate: "with week less than or equal to {value}",
    CypherTemplate: "WHERE g.week <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week equal to 5",
    Cypher: "WHERE g.week = 5",
    EnglishTemplate: "with week equal to {value}",
    CypherTemplate: "WHERE g.week = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with away score greater than 100",
    Cypher: "WHERE g.away_score > 100",
    EnglishTemplate: "with away score greater than {value}",
    CypherTemplate: "WHERE g.away_score > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with away score less than 100",
    Cypher: "WHERE g.away_score < 100",
    EnglishTemplate: "with away score less than {value}",
    CypherTemplate: "WHERE g.away_score < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with away score greater than or equal to 100",
    Cypher: "WHERE g.away_score >= 100",
    EnglishTemplate: "with away score greater than or equal to {value}",
    CypherTemplate: "WHERE g.away_score >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with away score less than or equal to 100",
    Cypher: "WHERE g.away_score <= 100",
    EnglishTemplate: "with away score less than or equal to {value}",
    CypherTemplate: "WHERE g.away_score <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with away score equal to 100",
    Cypher: "WHERE g.away_score = 100",
    EnglishTemplate: "with away score equal to {value}",
    CypherTemplate: "WHERE g.away_score = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with home score greater than 100",
    Cypher: "WHERE g.home_score > 100",
    EnglishTemplate: "with home score greater than {value}",
    CypherTemplate: "WHERE g.home_score > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with home score less than 100",
    Cypher: "WHERE g.home_score < 100",
    EnglishTemplate: "with home score less than {value}",
    CypherTemplate: "WHERE g.home_score < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with home score greater than or equal to 100",
    Cypher: "WHERE g.home_score >= 100",
    EnglishTemplate: "with home score greater than or equal to {value}",
    CypherTemplate: "WHERE g.home_score >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with home score less than or equal to 100",
    Cypher: "WHERE g.home_score <= 100",
    EnglishTemplate: "with home score less than or equal to {value}",
    CypherTemplate: "WHERE g.home_score <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with home score equal to 100",
    Cypher: "WHERE g.home_score = 100",
    EnglishTemplate: "with home score equal to {value}",
    CypherTemplate: "WHERE g.home_score = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weekday greater than 5",
    Cypher: "WHERE g.weekday > 5",
    EnglishTemplate: "with weekday greater than {value}",
    CypherTemplate: "WHERE g.weekday > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weekday less than 5",
    Cypher: "WHERE g.weekday < 5",
    EnglishTemplate: "with weekday less than {value}",
    CypherTemplate: "WHERE g.weekday < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weekday greater than or equal to 5",
    Cypher: "WHERE g.weekday >= 5",
    EnglishTemplate: "with weekday greater than or equal to {value}",
    CypherTemplate: "WHERE g.weekday >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weekday less than or equal to 5",
    Cypher: "WHERE g.weekday <= 5",
    EnglishTemplate: "with weekday less than or equal to {value}",
    CypherTemplate: "WHERE g.weekday <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with weekday equal to 5",
    Cypher: "WHERE g.weekday = 5",
    EnglishTemplate: "with weekday equal to {value}",
    CypherTemplate: "WHERE g.weekday = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with away qb name equal to "example"',
    Cypher: 'WHERE g.away_qb_name = "example"',
    EnglishTemplate: 'with away qb name equal to "{value}"',
    CypherTemplate: 'WHERE g.away_qb_name = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with location equal to "example"',
    Cypher: 'WHERE g.location = "example"',
    EnglishTemplate: 'with location equal to "{value}"',
    CypherTemplate: 'WHERE g.location = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with home qb name equal to "example"',
    Cypher: 'WHERE g.home_qb_name = "example"',
    EnglishTemplate: 'with home qb name equal to "{value}"',
    CypherTemplate: 'WHERE g.home_qb_name = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with surface equal to "example"',
    Cypher: 'WHERE g.surface = "example"',
    EnglishTemplate: 'with surface equal to "{value}"',
    CypherTemplate: 'WHERE g.surface = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with away team equal to "example"',
    Cypher: 'WHERE g.away_team = "example"',
    EnglishTemplate: 'with away team equal to "{value}"',
    CypherTemplate: 'WHERE g.away_team = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with roof equal to "example"',
    Cypher: 'WHERE g.roof = "example"',
    EnglishTemplate: 'with roof equal to "{value}"',
    CypherTemplate: 'WHERE g.roof = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with home team equal to "example"',
    Cypher: 'WHERE g.home_team = "example"',
    EnglishTemplate: 'with home team equal to "{value}"',
    CypherTemplate: 'WHERE g.home_team = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with div game equal to "example"',
    Cypher: 'WHERE g.div_game = "example"',
    EnglishTemplate: 'with div game equal to "{value}"',
    CypherTemplate: 'WHERE g.div_game = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with result equal to "example"',
    Cypher: 'WHERE g.result = "example"',
    EnglishTemplate: 'with result equal to "{value}"',
    CypherTemplate: 'WHERE g.result = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season greater than 2023",
    Cypher: "WHERE s.season > 2023",
    EnglishTemplate: "with season greater than {value}",
    CypherTemplate: "WHERE s.season > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Outputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season less than 2023",
    Cypher: "WHERE s.season < 2023",
    EnglishTemplate: "with season less than {value}",
    CypherTemplate: "WHERE s.season < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Outputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season greater than or equal to 2023",
    Cypher: "WHERE s.season >= 2023",
    EnglishTemplate: "with season greater than or equal to {value}",
    CypherTemplate: "WHERE s.season >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Outputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season less than or equal to 2023",
    Cypher: "WHERE s.season <= 2023",
    EnglishTemplate: "with season less than or equal to {value}",
    CypherTemplate: "WHERE s.season <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Outputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season equal to 2023",
    Cypher: "WHERE s.season = 2023",
    EnglishTemplate: "with season equal to {value}",
    CypherTemplate: "WHERE s.season = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Outputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season greater than 2023",
    Cypher: "WHERE pg.season > 2023",
    EnglishTemplate: "with season greater than {value}",
    CypherTemplate: "WHERE pg.season > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season less than 2023",
    Cypher: "WHERE pg.season < 2023",
    EnglishTemplate: "with season less than {value}",
    CypherTemplate: "WHERE pg.season < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season greater than or equal to 2023",
    Cypher: "WHERE pg.season >= 2023",
    EnglishTemplate: "with season greater than or equal to {value}",
    CypherTemplate: "WHERE pg.season >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season less than or equal to 2023",
    Cypher: "WHERE pg.season <= 2023",
    EnglishTemplate: "with season less than or equal to {value}",
    CypherTemplate: "WHERE pg.season <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season equal to 2023",
    Cypher: "WHERE pg.season = 2023",
    EnglishTemplate: "with season equal to {value}",
    CypherTemplate: "WHERE pg.season = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week greater than 5",
    Cypher: "WHERE pg.week > 5",
    EnglishTemplate: "with week greater than {value}",
    CypherTemplate: "WHERE pg.week > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week less than 5",
    Cypher: "WHERE pg.week < 5",
    EnglishTemplate: "with week less than {value}",
    CypherTemplate: "WHERE pg.week < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week greater than or equal to 5",
    Cypher: "WHERE pg.week >= 5",
    EnglishTemplate: "with week greater than or equal to {value}",
    CypherTemplate: "WHERE pg.week >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week less than or equal to 5",
    Cypher: "WHERE pg.week <= 5",
    EnglishTemplate: "with week less than or equal to {value}",
    CypherTemplate: "WHERE pg.week <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with week equal to 5",
    Cypher: "WHERE pg.week = 5",
    EnglishTemplate: "with week equal to {value}",
    CypherTemplate: "WHERE pg.week = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type greater than 2023",
    Cypher: "WHERE pg.season_type > 2023",
    EnglishTemplate: "with season type greater than {value}",
    CypherTemplate: "WHERE pg.season_type > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type less than 2023",
    Cypher: "WHERE pg.season_type < 2023",
    EnglishTemplate: "with season type less than {value}",
    CypherTemplate: "WHERE pg.season_type < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type greater than or equal to 2023",
    Cypher: "WHERE pg.season_type >= 2023",
    EnglishTemplate: "with season type greater than or equal to {value}",
    CypherTemplate: "WHERE pg.season_type >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type less than or equal to 2023",
    Cypher: "WHERE pg.season_type <= 2023",
    EnglishTemplate: "with season type less than or equal to {value}",
    CypherTemplate: "WHERE pg.season_type <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with season type equal to 2023",
    Cypher: "WHERE pg.season_type = 2023",
    EnglishTemplate: "with season type equal to {value}",
    CypherTemplate: "WHERE pg.season_type = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2023,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions greater than 100",
    Cypher: "WHERE pg.completions > 100",
    EnglishTemplate: "with completions greater than {value}",
    CypherTemplate: "WHERE pg.completions > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions less than 100",
    Cypher: "WHERE pg.completions < 100",
    EnglishTemplate: "with completions less than {value}",
    CypherTemplate: "WHERE pg.completions < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions greater than or equal to 100",
    Cypher: "WHERE pg.completions >= 100",
    EnglishTemplate: "with completions greater than or equal to {value}",
    CypherTemplate: "WHERE pg.completions >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions less than or equal to 100",
    Cypher: "WHERE pg.completions <= 100",
    EnglishTemplate: "with completions less than or equal to {value}",
    CypherTemplate: "WHERE pg.completions <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with completions equal to 100",
    Cypher: "WHERE pg.completions = 100",
    EnglishTemplate: "with completions equal to {value}",
    CypherTemplate: "WHERE pg.completions = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts greater than 10",
    Cypher: "WHERE pg.attempts > 10",
    EnglishTemplate: "with attempts greater than {value}",
    CypherTemplate: "WHERE pg.attempts > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts less than 10",
    Cypher: "WHERE pg.attempts < 10",
    EnglishTemplate: "with attempts less than {value}",
    CypherTemplate: "WHERE pg.attempts < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts greater than or equal to 10",
    Cypher: "WHERE pg.attempts >= 10",
    EnglishTemplate: "with attempts greater than or equal to {value}",
    CypherTemplate: "WHERE pg.attempts >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts less than or equal to 10",
    Cypher: "WHERE pg.attempts <= 10",
    EnglishTemplate: "with attempts less than or equal to {value}",
    CypherTemplate: "WHERE pg.attempts <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with attempts equal to 10",
    Cypher: "WHERE pg.attempts = 10",
    EnglishTemplate: "with attempts equal to {value}",
    CypherTemplate: "WHERE pg.attempts = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards greater than 100",
    Cypher: "WHERE pg.passing_yards > 100",
    EnglishTemplate: "with passing yards greater than {value}",
    CypherTemplate: "WHERE pg.passing_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards less than 100",
    Cypher: "WHERE pg.passing_yards < 100",
    EnglishTemplate: "with passing yards less than {value}",
    CypherTemplate: "WHERE pg.passing_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards greater than or equal to 100",
    Cypher: "WHERE pg.passing_yards >= 100",
    EnglishTemplate: "with passing yards greater than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards less than or equal to 100",
    Cypher: "WHERE pg.passing_yards <= 100",
    EnglishTemplate: "with passing yards less than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards equal to 100",
    Cypher: "WHERE pg.passing_yards = 100",
    EnglishTemplate: "with passing yards equal to {value}",
    CypherTemplate: "WHERE pg.passing_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns greater than 2",
    Cypher: "WHERE pg.passing_tds > 2",
    EnglishTemplate: "with passing touchdowns greater than {value}",
    CypherTemplate: "WHERE pg.passing_tds > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns less than 2",
    Cypher: "WHERE pg.passing_tds < 2",
    EnglishTemplate: "with passing touchdowns less than {value}",
    CypherTemplate: "WHERE pg.passing_tds < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns greater than or equal to 2",
    Cypher: "WHERE pg.passing_tds >= 2",
    EnglishTemplate: "with passing touchdowns greater than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_tds >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns less than or equal to 2",
    Cypher: "WHERE pg.passing_tds <= 2",
    EnglishTemplate: "with passing touchdowns less than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_tds <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing touchdowns equal to 2",
    Cypher: "WHERE pg.passing_tds = 2",
    EnglishTemplate: "with passing touchdowns equal to {value}",
    CypherTemplate: "WHERE pg.passing_tds = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions greater than 100",
    Cypher: "WHERE pg.interceptions > 100",
    EnglishTemplate: "with interceptions greater than {value}",
    CypherTemplate: "WHERE pg.interceptions > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions less than 100",
    Cypher: "WHERE pg.interceptions < 100",
    EnglishTemplate: "with interceptions less than {value}",
    CypherTemplate: "WHERE pg.interceptions < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions greater than or equal to 100",
    Cypher: "WHERE pg.interceptions >= 100",
    EnglishTemplate: "with interceptions greater than or equal to {value}",
    CypherTemplate: "WHERE pg.interceptions >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions less than or equal to 100",
    Cypher: "WHERE pg.interceptions <= 100",
    EnglishTemplate: "with interceptions less than or equal to {value}",
    CypherTemplate: "WHERE pg.interceptions <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with interceptions equal to 100",
    Cypher: "WHERE pg.interceptions = 100",
    EnglishTemplate: "with interceptions equal to {value}",
    CypherTemplate: "WHERE pg.interceptions = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards greater than 100",
    Cypher: "WHERE pg.sack_yards > 100",
    EnglishTemplate: "with sack yards greater than {value}",
    CypherTemplate: "WHERE pg.sack_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards less than 100",
    Cypher: "WHERE pg.sack_yards < 100",
    EnglishTemplate: "with sack yards less than {value}",
    CypherTemplate: "WHERE pg.sack_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards greater than or equal to 100",
    Cypher: "WHERE pg.sack_yards >= 100",
    EnglishTemplate: "with sack yards greater than or equal to {value}",
    CypherTemplate: "WHERE pg.sack_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards less than or equal to 100",
    Cypher: "WHERE pg.sack_yards <= 100",
    EnglishTemplate: "with sack yards less than or equal to {value}",
    CypherTemplate: "WHERE pg.sack_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack yards equal to 100",
    Cypher: "WHERE pg.sack_yards = 100",
    EnglishTemplate: "with sack yards equal to {value}",
    CypherTemplate: "WHERE pg.sack_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles greater than 100",
    Cypher: "WHERE pg.sack_fumbles > 100",
    EnglishTemplate: "with sack fumbles greater than {value}",
    CypherTemplate: "WHERE pg.sack_fumbles > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles less than 100",
    Cypher: "WHERE pg.sack_fumbles < 100",
    EnglishTemplate: "with sack fumbles less than {value}",
    CypherTemplate: "WHERE pg.sack_fumbles < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles greater than or equal to 100",
    Cypher: "WHERE pg.sack_fumbles >= 100",
    EnglishTemplate: "with sack fumbles greater than or equal to {value}",
    CypherTemplate: "WHERE pg.sack_fumbles >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles less than or equal to 100",
    Cypher: "WHERE pg.sack_fumbles <= 100",
    EnglishTemplate: "with sack fumbles less than or equal to {value}",
    CypherTemplate: "WHERE pg.sack_fumbles <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles equal to 100",
    Cypher: "WHERE pg.sack_fumbles = 100",
    EnglishTemplate: "with sack fumbles equal to {value}",
    CypherTemplate: "WHERE pg.sack_fumbles = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost greater than 100",
    Cypher: "WHERE pg.sack_fumbles_lost > 100",
    EnglishTemplate: "with sack fumbles lost greater than {value}",
    CypherTemplate: "WHERE pg.sack_fumbles_lost > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost less than 100",
    Cypher: "WHERE pg.sack_fumbles_lost < 100",
    EnglishTemplate: "with sack fumbles lost less than {value}",
    CypherTemplate: "WHERE pg.sack_fumbles_lost < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost greater than or equal to 100",
    Cypher: "WHERE pg.sack_fumbles_lost >= 100",
    EnglishTemplate: "with sack fumbles lost greater than or equal to {value}",
    CypherTemplate: "WHERE pg.sack_fumbles_lost >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost less than or equal to 100",
    Cypher: "WHERE pg.sack_fumbles_lost <= 100",
    EnglishTemplate: "with sack fumbles lost less than or equal to {value}",
    CypherTemplate: "WHERE pg.sack_fumbles_lost <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with sack fumbles lost equal to 100",
    Cypher: "WHERE pg.sack_fumbles_lost = 100",
    EnglishTemplate: "with sack fumbles lost equal to {value}",
    CypherTemplate: "WHERE pg.sack_fumbles_lost = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards greater than 100",
    Cypher: "WHERE pg.passing_air_yards > 100",
    EnglishTemplate: "with passing air yards greater than {value}",
    CypherTemplate: "WHERE pg.passing_air_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards less than 100",
    Cypher: "WHERE pg.passing_air_yards < 100",
    EnglishTemplate: "with passing air yards less than {value}",
    CypherTemplate: "WHERE pg.passing_air_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards greater than or equal to 100",
    Cypher: "WHERE pg.passing_air_yards >= 100",
    EnglishTemplate: "with passing air yards greater than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_air_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards less than or equal to 100",
    Cypher: "WHERE pg.passing_air_yards <= 100",
    EnglishTemplate: "with passing air yards less than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_air_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing air yards equal to 100",
    Cypher: "WHERE pg.passing_air_yards = 100",
    EnglishTemplate: "with passing air yards equal to {value}",
    CypherTemplate: "WHERE pg.passing_air_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch greater than 100",
    Cypher: "WHERE pg.passing_yards_after_catch > 100",
    EnglishTemplate: "with passing yards after catch greater than {value}",
    CypherTemplate: "WHERE pg.passing_yards_after_catch > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch less than 100",
    Cypher: "WHERE pg.passing_yards_after_catch < 100",
    EnglishTemplate: "with passing yards after catch less than {value}",
    CypherTemplate: "WHERE pg.passing_yards_after_catch < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch greater than or equal to 100",
    Cypher: "WHERE pg.passing_yards_after_catch >= 100",
    EnglishTemplate:
      "with passing yards after catch greater than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_yards_after_catch >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch less than or equal to 100",
    Cypher: "WHERE pg.passing_yards_after_catch <= 100",
    EnglishTemplate:
      "with passing yards after catch less than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_yards_after_catch <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing yards after catch equal to 100",
    Cypher: "WHERE pg.passing_yards_after_catch = 100",
    EnglishTemplate: "with passing yards after catch equal to {value}",
    CypherTemplate: "WHERE pg.passing_yards_after_catch = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries greater than 10",
    Cypher: "WHERE pg.carries > 10",
    EnglishTemplate: "with carries greater than {value}",
    CypherTemplate: "WHERE pg.carries > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries less than 10",
    Cypher: "WHERE pg.carries < 10",
    EnglishTemplate: "with carries less than {value}",
    CypherTemplate: "WHERE pg.carries < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries greater than or equal to 10",
    Cypher: "WHERE pg.carries >= 10",
    EnglishTemplate: "with carries greater than or equal to {value}",
    CypherTemplate: "WHERE pg.carries >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries less than or equal to 10",
    Cypher: "WHERE pg.carries <= 10",
    EnglishTemplate: "with carries less than or equal to {value}",
    CypherTemplate: "WHERE pg.carries <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with carries equal to 10",
    Cypher: "WHERE pg.carries = 10",
    EnglishTemplate: "with carries equal to {value}",
    CypherTemplate: "WHERE pg.carries = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 10,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards greater than 100",
    Cypher: "WHERE pg.rushing_yards > 100",
    EnglishTemplate: "with rushing yards greater than {value}",
    CypherTemplate: "WHERE pg.rushing_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards less than 100",
    Cypher: "WHERE pg.rushing_yards < 100",
    EnglishTemplate: "with rushing yards less than {value}",
    CypherTemplate: "WHERE pg.rushing_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards greater than or equal to 100",
    Cypher: "WHERE pg.rushing_yards >= 100",
    EnglishTemplate: "with rushing yards greater than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards less than or equal to 100",
    Cypher: "WHERE pg.rushing_yards <= 100",
    EnglishTemplate: "with rushing yards less than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing yards equal to 100",
    Cypher: "WHERE pg.rushing_yards = 100",
    EnglishTemplate: "with rushing yards equal to {value}",
    CypherTemplate: "WHERE pg.rushing_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns greater than 2",
    Cypher: "WHERE pg.rushing_tds > 2",
    EnglishTemplate: "with rushing touchdowns greater than {value}",
    CypherTemplate: "WHERE pg.rushing_tds > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns less than 2",
    Cypher: "WHERE pg.rushing_tds < 2",
    EnglishTemplate: "with rushing touchdowns less than {value}",
    CypherTemplate: "WHERE pg.rushing_tds < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns greater than or equal to 2",
    Cypher: "WHERE pg.rushing_tds >= 2",
    EnglishTemplate: "with rushing touchdowns greater than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_tds >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns less than or equal to 2",
    Cypher: "WHERE pg.rushing_tds <= 2",
    EnglishTemplate: "with rushing touchdowns less than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_tds <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing touchdowns equal to 2",
    Cypher: "WHERE pg.rushing_tds = 2",
    EnglishTemplate: "with rushing touchdowns equal to {value}",
    CypherTemplate: "WHERE pg.rushing_tds = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles greater than 100",
    Cypher: "WHERE pg.rushing_fumbles > 100",
    EnglishTemplate: "with rushing fumbles greater than {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles less than 100",
    Cypher: "WHERE pg.rushing_fumbles < 100",
    EnglishTemplate: "with rushing fumbles less than {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles greater than or equal to 100",
    Cypher: "WHERE pg.rushing_fumbles >= 100",
    EnglishTemplate: "with rushing fumbles greater than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles less than or equal to 100",
    Cypher: "WHERE pg.rushing_fumbles <= 100",
    EnglishTemplate: "with rushing fumbles less than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles equal to 100",
    Cypher: "WHERE pg.rushing_fumbles = 100",
    EnglishTemplate: "with rushing fumbles equal to {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost greater than 100",
    Cypher: "WHERE pg.rushing_fumbles_lost > 100",
    EnglishTemplate: "with rushing fumbles lost greater than {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles_lost > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost less than 100",
    Cypher: "WHERE pg.rushing_fumbles_lost < 100",
    EnglishTemplate: "with rushing fumbles lost less than {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles_lost < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost greater than or equal to 100",
    Cypher: "WHERE pg.rushing_fumbles_lost >= 100",
    EnglishTemplate:
      "with rushing fumbles lost greater than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles_lost >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost less than or equal to 100",
    Cypher: "WHERE pg.rushing_fumbles_lost <= 100",
    EnglishTemplate: "with rushing fumbles lost less than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles_lost <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing fumbles lost equal to 100",
    Cypher: "WHERE pg.rushing_fumbles_lost = 100",
    EnglishTemplate: "with rushing fumbles lost equal to {value}",
    CypherTemplate: "WHERE pg.rushing_fumbles_lost = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa greater than 100",
    Cypher: "WHERE pg.rushing_epa > 100",
    EnglishTemplate: "with rushing epa greater than {value}",
    CypherTemplate: "WHERE pg.rushing_epa > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa less than 100",
    Cypher: "WHERE pg.rushing_epa < 100",
    EnglishTemplate: "with rushing epa less than {value}",
    CypherTemplate: "WHERE pg.rushing_epa < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa greater than or equal to 100",
    Cypher: "WHERE pg.rushing_epa >= 100",
    EnglishTemplate: "with rushing epa greater than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_epa >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa less than or equal to 100",
    Cypher: "WHERE pg.rushing_epa <= 100",
    EnglishTemplate: "with rushing epa less than or equal to {value}",
    CypherTemplate: "WHERE pg.rushing_epa <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with rushing epa equal to 100",
    Cypher: "WHERE pg.rushing_epa = 100",
    EnglishTemplate: "with rushing epa equal to {value}",
    CypherTemplate: "WHERE pg.rushing_epa = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions greater than 5",
    Cypher: "WHERE pg.receptions > 5",
    EnglishTemplate: "with receptions greater than {value}",
    CypherTemplate: "WHERE pg.receptions > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions less than 5",
    Cypher: "WHERE pg.receptions < 5",
    EnglishTemplate: "with receptions less than {value}",
    CypherTemplate: "WHERE pg.receptions < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions greater than or equal to 5",
    Cypher: "WHERE pg.receptions >= 5",
    EnglishTemplate: "with receptions greater than or equal to {value}",
    CypherTemplate: "WHERE pg.receptions >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions less than or equal to 5",
    Cypher: "WHERE pg.receptions <= 5",
    EnglishTemplate: "with receptions less than or equal to {value}",
    CypherTemplate: "WHERE pg.receptions <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receptions equal to 5",
    Cypher: "WHERE pg.receptions = 5",
    EnglishTemplate: "with receptions equal to {value}",
    CypherTemplate: "WHERE pg.receptions = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles greater than 100",
    Cypher: "WHERE pg.receiving_fumbles > 100",
    EnglishTemplate: "with receiving fumbles greater than {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles less than 100",
    Cypher: "WHERE pg.receiving_fumbles < 100",
    EnglishTemplate: "with receiving fumbles less than {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles greater than or equal to 100",
    Cypher: "WHERE pg.receiving_fumbles >= 100",
    EnglishTemplate: "with receiving fumbles greater than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles less than or equal to 100",
    Cypher: "WHERE pg.receiving_fumbles <= 100",
    EnglishTemplate: "with receiving fumbles less than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles equal to 100",
    Cypher: "WHERE pg.receiving_fumbles = 100",
    EnglishTemplate: "with receiving fumbles equal to {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr greater than 100",
    Cypher: "WHERE pg.fantasy_points_ppr > 100",
    EnglishTemplate: "with fantasy points ppr greater than {value}",
    CypherTemplate: "WHERE pg.fantasy_points_ppr > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr less than 100",
    Cypher: "WHERE pg.fantasy_points_ppr < 100",
    EnglishTemplate: "with fantasy points ppr less than {value}",
    CypherTemplate: "WHERE pg.fantasy_points_ppr < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr greater than or equal to 100",
    Cypher: "WHERE pg.fantasy_points_ppr >= 100",
    EnglishTemplate: "with fantasy points ppr greater than or equal to {value}",
    CypherTemplate: "WHERE pg.fantasy_points_ppr >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr less than or equal to 100",
    Cypher: "WHERE pg.fantasy_points_ppr <= 100",
    EnglishTemplate: "with fantasy points ppr less than or equal to {value}",
    CypherTemplate: "WHERE pg.fantasy_points_ppr <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points ppr equal to 100",
    Cypher: "WHERE pg.fantasy_points_ppr = 100",
    EnglishTemplate: "with fantasy points ppr equal to {value}",
    CypherTemplate: "WHERE pg.fantasy_points_ppr = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost greater than 100",
    Cypher: "WHERE pg.receiving_fumbles_lost > 100",
    EnglishTemplate: "with receiving fumbles lost greater than {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles_lost > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost less than 100",
    Cypher: "WHERE pg.receiving_fumbles_lost < 100",
    EnglishTemplate: "with receiving fumbles lost less than {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles_lost < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost greater than or equal to 100",
    Cypher: "WHERE pg.receiving_fumbles_lost >= 100",
    EnglishTemplate:
      "with receiving fumbles lost greater than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles_lost >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost less than or equal to 100",
    Cypher: "WHERE pg.receiving_fumbles_lost <= 100",
    EnglishTemplate:
      "with receiving fumbles lost less than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles_lost <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving fumbles lost equal to 100",
    Cypher: "WHERE pg.receiving_fumbles_lost = 100",
    EnglishTemplate: "with receiving fumbles lost equal to {value}",
    CypherTemplate: "WHERE pg.receiving_fumbles_lost = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa greater than 100",
    Cypher: "WHERE pg.passing_epa > 100",
    EnglishTemplate: "with passing epa greater than {value}",
    CypherTemplate: "WHERE pg.passing_epa > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa less than 100",
    Cypher: "WHERE pg.passing_epa < 100",
    EnglishTemplate: "with passing epa less than {value}",
    CypherTemplate: "WHERE pg.passing_epa < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa greater than or equal to 100",
    Cypher: "WHERE pg.passing_epa >= 100",
    EnglishTemplate: "with passing epa greater than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_epa >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa less than or equal to 100",
    Cypher: "WHERE pg.passing_epa <= 100",
    EnglishTemplate: "with passing epa less than or equal to {value}",
    CypherTemplate: "WHERE pg.passing_epa <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with passing epa equal to 100",
    Cypher: "WHERE pg.passing_epa = 100",
    EnglishTemplate: "with passing epa equal to {value}",
    CypherTemplate: "WHERE pg.passing_epa = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards greater than 100",
    Cypher: "WHERE pg.receiving_yards > 100",
    EnglishTemplate: "with receiving yards greater than {value}",
    CypherTemplate: "WHERE pg.receiving_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards less than 100",
    Cypher: "WHERE pg.receiving_yards < 100",
    EnglishTemplate: "with receiving yards less than {value}",
    CypherTemplate: "WHERE pg.receiving_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards greater than or equal to 100",
    Cypher: "WHERE pg.receiving_yards >= 100",
    EnglishTemplate: "with receiving yards greater than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards less than or equal to 100",
    Cypher: "WHERE pg.receiving_yards <= 100",
    EnglishTemplate: "with receiving yards less than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards equal to 100",
    Cypher: "WHERE pg.receiving_yards = 100",
    EnglishTemplate: "with receiving yards equal to {value}",
    CypherTemplate: "WHERE pg.receiving_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns greater than 2",
    Cypher: "WHERE pg.receiving_tds > 2",
    EnglishTemplate: "with receiving touchdowns greater than {value}",
    CypherTemplate: "WHERE pg.receiving_tds > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns less than 2",
    Cypher: "WHERE pg.receiving_tds < 2",
    EnglishTemplate: "with receiving touchdowns less than {value}",
    CypherTemplate: "WHERE pg.receiving_tds < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns greater than or equal to 2",
    Cypher: "WHERE pg.receiving_tds >= 2",
    EnglishTemplate:
      "with receiving touchdowns greater than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_tds >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns less than or equal to 2",
    Cypher: "WHERE pg.receiving_tds <= 2",
    EnglishTemplate: "with receiving touchdowns less than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_tds <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving touchdowns equal to 2",
    Cypher: "WHERE pg.receiving_tds = 2",
    EnglishTemplate: "with receiving touchdowns equal to {value}",
    CypherTemplate: "WHERE pg.receiving_tds = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds greater than 2",
    Cypher: "WHERE pg.special_teams_tds > 2",
    EnglishTemplate: "with special teams tds greater than {value}",
    CypherTemplate: "WHERE pg.special_teams_tds > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds less than 2",
    Cypher: "WHERE pg.special_teams_tds < 2",
    EnglishTemplate: "with special teams tds less than {value}",
    CypherTemplate: "WHERE pg.special_teams_tds < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds greater than or equal to 2",
    Cypher: "WHERE pg.special_teams_tds >= 2",
    EnglishTemplate: "with special teams tds greater than or equal to {value}",
    CypherTemplate: "WHERE pg.special_teams_tds >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds less than or equal to 2",
    Cypher: "WHERE pg.special_teams_tds <= 2",
    EnglishTemplate: "with special teams tds less than or equal to {value}",
    CypherTemplate: "WHERE pg.special_teams_tds <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with special teams tds equal to 2",
    Cypher: "WHERE pg.special_teams_tds = 2",
    EnglishTemplate: "with special teams tds equal to {value}",
    CypherTemplate: "WHERE pg.special_teams_tds = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 2,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets greater than 5",
    Cypher: "WHERE pg.targets > 5",
    EnglishTemplate: "with targets greater than {value}",
    CypherTemplate: "WHERE pg.targets > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets less than 5",
    Cypher: "WHERE pg.targets < 5",
    EnglishTemplate: "with targets less than {value}",
    CypherTemplate: "WHERE pg.targets < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets greater than or equal to 5",
    Cypher: "WHERE pg.targets >= 5",
    EnglishTemplate: "with targets greater than or equal to {value}",
    CypherTemplate: "WHERE pg.targets >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets less than or equal to 5",
    Cypher: "WHERE pg.targets <= 5",
    EnglishTemplate: "with targets less than or equal to {value}",
    CypherTemplate: "WHERE pg.targets <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with targets equal to 5",
    Cypher: "WHERE pg.targets = 5",
    EnglishTemplate: "with targets equal to {value}",
    CypherTemplate: "WHERE pg.targets = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 5,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch greater than 100",
    Cypher: "WHERE pg.receiving_yards_after_catch > 100",
    EnglishTemplate: "with receiving yards after catch greater than {value}",
    CypherTemplate: "WHERE pg.receiving_yards_after_catch > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch less than 100",
    Cypher: "WHERE pg.receiving_yards_after_catch < 100",
    EnglishTemplate: "with receiving yards after catch less than {value}",
    CypherTemplate: "WHERE pg.receiving_yards_after_catch < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch greater than or equal to 100",
    Cypher: "WHERE pg.receiving_yards_after_catch >= 100",
    EnglishTemplate:
      "with receiving yards after catch greater than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_yards_after_catch >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch less than or equal to 100",
    Cypher: "WHERE pg.receiving_yards_after_catch <= 100",
    EnglishTemplate:
      "with receiving yards after catch less than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_yards_after_catch <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving yards after catch equal to 100",
    Cypher: "WHERE pg.receiving_yards_after_catch = 100",
    EnglishTemplate: "with receiving yards after catch equal to {value}",
    CypherTemplate: "WHERE pg.receiving_yards_after_catch = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa greater than 100",
    Cypher: "WHERE pg.receiving_epa > 100",
    EnglishTemplate: "with receiving epa greater than {value}",
    CypherTemplate: "WHERE pg.receiving_epa > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa less than 100",
    Cypher: "WHERE pg.receiving_epa < 100",
    EnglishTemplate: "with receiving epa less than {value}",
    CypherTemplate: "WHERE pg.receiving_epa < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa greater than or equal to 100",
    Cypher: "WHERE pg.receiving_epa >= 100",
    EnglishTemplate: "with receiving epa greater than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_epa >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa less than or equal to 100",
    Cypher: "WHERE pg.receiving_epa <= 100",
    EnglishTemplate: "with receiving epa less than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_epa <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving epa equal to 100",
    Cypher: "WHERE pg.receiving_epa = 100",
    EnglishTemplate: "with receiving epa equal to {value}",
    CypherTemplate: "WHERE pg.receiving_epa = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards greater than 100",
    Cypher: "WHERE pg.receiving_air_yards > 100",
    EnglishTemplate: "with receiving air yards greater than {value}",
    CypherTemplate: "WHERE pg.receiving_air_yards > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards less than 100",
    Cypher: "WHERE pg.receiving_air_yards < 100",
    EnglishTemplate: "with receiving air yards less than {value}",
    CypherTemplate: "WHERE pg.receiving_air_yards < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards greater than or equal to 100",
    Cypher: "WHERE pg.receiving_air_yards >= 100",
    EnglishTemplate:
      "with receiving air yards greater than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_air_yards >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards less than or equal to 100",
    Cypher: "WHERE pg.receiving_air_yards <= 100",
    EnglishTemplate: "with receiving air yards less than or equal to {value}",
    CypherTemplate: "WHERE pg.receiving_air_yards <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with receiving air yards equal to 100",
    Cypher: "WHERE pg.receiving_air_yards = 100",
    EnglishTemplate: "with receiving air yards equal to {value}",
    CypherTemplate: "WHERE pg.receiving_air_yards = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share greater than 100",
    Cypher: "WHERE pg.air_yards_share > 100",
    EnglishTemplate: "with air yards share greater than {value}",
    CypherTemplate: "WHERE pg.air_yards_share > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share less than 100",
    Cypher: "WHERE pg.air_yards_share < 100",
    EnglishTemplate: "with air yards share less than {value}",
    CypherTemplate: "WHERE pg.air_yards_share < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share greater than or equal to 100",
    Cypher: "WHERE pg.air_yards_share >= 100",
    EnglishTemplate: "with air yards share greater than or equal to {value}",
    CypherTemplate: "WHERE pg.air_yards_share >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share less than or equal to 100",
    Cypher: "WHERE pg.air_yards_share <= 100",
    EnglishTemplate: "with air yards share less than or equal to {value}",
    CypherTemplate: "WHERE pg.air_yards_share <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with air yards share equal to 100",
    Cypher: "WHERE pg.air_yards_share = 100",
    EnglishTemplate: "with air yards share equal to {value}",
    CypherTemplate: "WHERE pg.air_yards_share = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points greater than 100",
    Cypher: "WHERE pg.fantasy_points > 100",
    EnglishTemplate: "with fantasy points greater than {value}",
    CypherTemplate: "WHERE pg.fantasy_points > {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points less than 100",
    Cypher: "WHERE pg.fantasy_points < 100",
    EnglishTemplate: "with fantasy points less than {value}",
    CypherTemplate: "WHERE pg.fantasy_points < {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points greater than or equal to 100",
    Cypher: "WHERE pg.fantasy_points >= 100",
    EnglishTemplate: "with fantasy points greater than or equal to {value}",
    CypherTemplate: "WHERE pg.fantasy_points >= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points less than or equal to 100",
    Cypher: "WHERE pg.fantasy_points <= 100",
    EnglishTemplate: "with fantasy points less than or equal to {value}",
    CypherTemplate: "WHERE pg.fantasy_points <= {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "with fantasy points equal to 100",
    Cypher: "WHERE pg.fantasy_points = 100",
    EnglishTemplate: "with fantasy points equal to {value}",
    CypherTemplate: "WHERE pg.fantasy_points = {value}",
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: 100,
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with player name equal to "example"',
    Cypher: 'WHERE pg.player_display_name = "example"',
    EnglishTemplate: 'with player name equal to "{value}"',
    CypherTemplate: 'WHERE pg.player_display_name = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with position equal to "example"',
    Cypher: 'WHERE pg.position = "example"',
    EnglishTemplate: 'with position equal to "{value}"',
    CypherTemplate: 'WHERE pg.position = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with position group equal to "example"',
    Cypher: 'WHERE pg.position_group = "example"',
    EnglishTemplate: 'with position group equal to "{value}"',
    CypherTemplate: 'WHERE pg.position_group = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with recent team equal to "example"',
    Cypher: 'WHERE pg.recent_team = "example"',
    EnglishTemplate: 'with recent team equal to "{value}"',
    CypherTemplate: 'WHERE pg.recent_team = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with opponent team equal to "example"',
    Cypher: 'WHERE pg.opponent_team = "example"',
    EnglishTemplate: 'with opponent team equal to "{value}"',
    CypherTemplate: 'WHERE pg.opponent_team = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with player name equal to "example"',
    Cypher: 'WHERE pg.player_name = "example"',
    EnglishTemplate: 'with player name equal to "{value}"',
    CypherTemplate: 'WHERE pg.player_name = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: 'with special teams tds equal to "example"',
    Cypher: 'WHERE pg.special_teams_tds = "example"',
    EnglishTemplate: 'with special teams tds equal to "{value}"',
    CypherTemplate: 'WHERE pg.special_teams_tds = "{value}"',
    QueryType: QueryType.FILTER,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [
      {
        Name: "value",
        Value: "example",
        SlotValueTypes: [SlotType.FilterValue],
      },
    ],
  },
  {
    English: "who had playergame",
    Cypher: "MATCH (p:Player)-[:HAD]->(pg:PlayerGame)",
    QueryType: QueryType.MATCH_PATH,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Slots: [],
  },
  {
    English: "who had playerseason",
    Cypher: "MATCH (p:Player)-[:HAD]->(ps:PlayerSeason)",
    QueryType: QueryType.MATCH_PATH,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Slots: [],
  },
  {
    English: "who of game",
    Cypher: "MATCH (pg:PlayerGame)-[:OF]->(g:Game)",
    QueryType: QueryType.MATCH_PATH,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Slots: [],
  },
  {
    English: "who of season",
    Cypher: "MATCH (ps:PlayerSeason)-[:OF]->(s:Season)",
    QueryType: QueryType.MATCH_PATH,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Slots: [],
  },
  {
    English: "who of season",
    Cypher: "MATCH (g:Game)-[:OF]->(s:Season)",
    QueryType: QueryType.MATCH_PATH,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Slots: [],
  },
  {
    English: "return player information",
    Cypher: "RETURN p",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return position",
    Cypher: "RETURN p.position",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return position_group",
    Cypher: "RETURN p.position_group",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return display_name",
    Cypher: "RETURN p.display_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return gsis_id",
    Cypher: "RETURN p.gsis_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return status_description_abbr",
    Cypher: "RETURN p.status_description_abbr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return suffix",
    Cypher: "RETURN p.suffix",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return headshot",
    Cypher: "RETURN p.headshot",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return status_short_description",
    Cypher: "RETURN p.status_short_description",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return last_name",
    Cypher: "RETURN p.last_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return football_name",
    Cypher: "RETURN p.football_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return draft_club",
    Cypher: "RETURN p.draft_club",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return short_name",
    Cypher: "RETURN p.short_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rookie_year",
    Cypher: "RETURN p.rookie_year",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return college_conference",
    Cypher: "RETURN p.college_conference",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return status",
    Cypher: "RETURN p.status",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return team_abbr",
    Cypher: "RETURN p.team_abbr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return college_name",
    Cypher: "RETURN p.college_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return esb_id",
    Cypher: "RETURN p.esb_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return uniform_number",
    Cypher: "RETURN p.uniform_number",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return current_team_id",
    Cypher: "RETURN p.current_team_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return first_name",
    Cypher: "RETURN p.first_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return smart_id",
    Cypher: "RETURN p.smart_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return entry_year",
    Cypher: "RETURN p.entry_year",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return jersey_number",
    Cypher: "RETURN p.jersey_number",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return team_seq",
    Cypher: "RETURN p.team_seq",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return years_of_experience",
    Cypher: "RETURN p.years_of_experience",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return birth_date",
    Cypher: "RETURN p.birth_date",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return draftround",
    Cypher: "RETURN p.draftround",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return height",
    Cypher: "RETURN p.height",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return weight",
    Cypher: "RETURN p.weight",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return draft_number",
    Cypher: "RETURN p.draft_number",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return gsis_it_id",
    Cypher: "RETURN p.gsis_it_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "p",
        Label: Label.Player,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return playerseason information",
    Cypher: "RETURN ps",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return player_id",
    Cypher: "RETURN ps.player_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return season",
    Cypher: "RETURN ps.season",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return season_type",
    Cypher: "RETURN ps.season_type",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return completions",
    Cypher: "RETURN ps.completions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return attempts",
    Cypher: "RETURN ps.attempts",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_yards",
    Cypher: "RETURN ps.passing_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_tds",
    Cypher: "RETURN ps.passing_tds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return interceptions",
    Cypher: "RETURN ps.interceptions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return sacks",
    Cypher: "RETURN ps.sacks",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return sack_yards",
    Cypher: "RETURN ps.sack_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return sack_fumbles",
    Cypher: "RETURN ps.sack_fumbles",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return sack_fumbles_lost",
    Cypher: "RETURN ps.sack_fumbles_lost",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_air_yards",
    Cypher: "RETURN ps.passing_air_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_yards_after_catch",
    Cypher: "RETURN ps.passing_yards_after_catch",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_first_downs",
    Cypher: "RETURN ps.passing_first_downs",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_2pt_conversions",
    Cypher: "RETURN ps.passing_2pt_conversions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return carries",
    Cypher: "RETURN ps.carries",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_yards",
    Cypher: "RETURN ps.rushing_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_tds",
    Cypher: "RETURN ps.rushing_tds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_fumbles",
    Cypher: "RETURN ps.rushing_fumbles",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_fumbles_lost",
    Cypher: "RETURN ps.rushing_fumbles_lost",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_first_downs",
    Cypher: "RETURN ps.rushing_first_downs",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_epa",
    Cypher: "RETURN ps.rushing_epa",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_2pt_conversions",
    Cypher: "RETURN ps.rushing_2pt_conversions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receptions",
    Cypher: "RETURN ps.receptions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_fumbles",
    Cypher: "RETURN ps.receiving_fumbles",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return fantasy_points_ppr",
    Cypher: "RETURN ps.fantasy_points_ppr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_fumbles_lost",
    Cypher: "RETURN ps.receiving_fumbles_lost",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return ay_sh",
    Cypher: "RETURN ps.ay_sh",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return target_share",
    Cypher: "RETURN ps.target_share",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return wopr_y",
    Cypher: "RETURN ps.wopr_y",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_yards",
    Cypher: "RETURN ps.receiving_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_tds",
    Cypher: "RETURN ps.receiving_tds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return player_season_id",
    Cypher: "RETURN ps.player_season_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_2pt_conversions",
    Cypher: "RETURN ps.receiving_2pt_conversions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return dom",
    Cypher: "RETURN ps.dom",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_first_downs",
    Cypher: "RETURN ps.receiving_first_downs",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return dakota",
    Cypher: "RETURN ps.dakota",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return ppr_sh",
    Cypher: "RETURN ps.ppr_sh",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rtd_sh",
    Cypher: "RETURN ps.rtd_sh",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_air_yards",
    Cypher: "RETURN ps.receiving_air_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return air_yards_share",
    Cypher: "RETURN ps.air_yards_share",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return wopr_x",
    Cypher: "RETURN ps.wopr_x",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return yac_sh",
    Cypher: "RETURN ps.yac_sh",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return games",
    Cypher: "RETURN ps.games",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return racr",
    Cypher: "RETURN ps.racr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return w8dom",
    Cypher: "RETURN ps.w8dom",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_epa",
    Cypher: "RETURN ps.passing_epa",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return tgt_sh",
    Cypher: "RETURN ps.tgt_sh",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return ry_sh",
    Cypher: "RETURN ps.ry_sh",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rfd_sh",
    Cypher: "RETURN ps.rfd_sh",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return special_teams_tds",
    Cypher: "RETURN ps.special_teams_tds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rtdfd_sh",
    Cypher: "RETURN ps.rtdfd_sh",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return targets",
    Cypher: "RETURN ps.targets",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return pacr",
    Cypher: "RETURN ps.pacr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_yards_after_catch",
    Cypher: "RETURN ps.receiving_yards_after_catch",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_epa",
    Cypher: "RETURN ps.receiving_epa",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return yptmpa",
    Cypher: "RETURN ps.yptmpa",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return fantasy_points",
    Cypher: "RETURN ps.fantasy_points",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "ps",
        Label: Label.PlayerSeason,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return game information",
    Cypher: "RETURN g",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return season",
    Cypher: "RETURN g.season",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return week",
    Cypher: "RETURN g.week",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return away_qb_id",
    Cypher: "RETURN g.away_qb_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return away_qb_name",
    Cypher: "RETURN g.away_qb_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return location",
    Cypher: "RETURN g.location",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return pff",
    Cypher: "RETURN g.pff",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return overtime",
    Cypher: "RETURN g.overtime",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return referee",
    Cypher: "RETURN g.referee",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return home_rest",
    Cypher: "RETURN g.home_rest",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return away_moneyline",
    Cypher: "RETURN g.away_moneyline",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return home_qb_name",
    Cypher: "RETURN g.home_qb_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return away_score",
    Cypher: "RETURN g.away_score",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return under_odds",
    Cypher: "RETURN g.under_odds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return total_line",
    Cypher: "RETURN g.total_line",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return home_moneyline",
    Cypher: "RETURN g.home_moneyline",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return surface",
    Cypher: "RETURN g.surface",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return wind",
    Cypher: "RETURN g.wind",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return game_type",
    Cypher: "RETURN g.game_type",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return away_team",
    Cypher: "RETURN g.away_team",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return temp",
    Cypher: "RETURN g.temp",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return spread_line",
    Cypher: "RETURN g.spread_line",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return away_rest",
    Cypher: "RETURN g.away_rest",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return gsis",
    Cypher: "RETURN g.gsis",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return home_qb_id",
    Cypher: "RETURN g.home_qb_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return home_coach",
    Cypher: "RETURN g.home_coach",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return ftn",
    Cypher: "RETURN g.ftn",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return roof",
    Cypher: "RETURN g.roof",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return home_team",
    Cypher: "RETURN g.home_team",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return div_game",
    Cypher: "RETURN g.div_game",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return total",
    Cypher: "RETURN g.total",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return gametime",
    Cypher: "RETURN g.gametime",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return home_score",
    Cypher: "RETURN g.home_score",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return gameday",
    Cypher: "RETURN g.gameday",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return stadium_id",
    Cypher: "RETURN g.stadium_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return over_odds",
    Cypher: "RETURN g.over_odds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return weekday",
    Cypher: "RETURN g.weekday",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return away_spread_odds",
    Cypher: "RETURN g.away_spread_odds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return espn",
    Cypher: "RETURN g.espn",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return away_coach",
    Cypher: "RETURN g.away_coach",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return home_spread_odds",
    Cypher: "RETURN g.home_spread_odds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return pfr",
    Cypher: "RETURN g.pfr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return result",
    Cypher: "RETURN g.result",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return game_id",
    Cypher: "RETURN g.game_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return stadium",
    Cypher: "RETURN g.stadium",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return old_game_id",
    Cypher: "RETURN g.old_game_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return nfl_detail_id",
    Cypher: "RETURN g.nfl_detail_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "g",
        Label: Label.Game,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return season information",
    Cypher: "RETURN s",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return season",
    Cypher: "RETURN s.season",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "s",
        Label: Label.Season,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return playergame information",
    Cypher: "RETURN pg",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return player_game_id",
    Cypher: "RETURN pg.player_game_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return player_id",
    Cypher: "RETURN pg.player_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return player_display_name",
    Cypher: "RETURN pg.player_display_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return position",
    Cypher: "RETURN pg.position",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return position_group",
    Cypher: "RETURN pg.position_group",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return recent_team",
    Cypher: "RETURN pg.recent_team",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return season",
    Cypher: "RETURN pg.season",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return week",
    Cypher: "RETURN pg.week",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return season_type",
    Cypher: "RETURN pg.season_type",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return opponent_team",
    Cypher: "RETURN pg.opponent_team",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return completions",
    Cypher: "RETURN pg.completions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return attempts",
    Cypher: "RETURN pg.attempts",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_yards",
    Cypher: "RETURN pg.passing_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_tds",
    Cypher: "RETURN pg.passing_tds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return interceptions",
    Cypher: "RETURN pg.interceptions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return sacks",
    Cypher: "RETURN pg.sacks",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return sack_yards",
    Cypher: "RETURN pg.sack_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return sack_fumbles",
    Cypher: "RETURN pg.sack_fumbles",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return sack_fumbles_lost",
    Cypher: "RETURN pg.sack_fumbles_lost",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_air_yards",
    Cypher: "RETURN pg.passing_air_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_yards_after_catch",
    Cypher: "RETURN pg.passing_yards_after_catch",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_first_downs",
    Cypher: "RETURN pg.passing_first_downs",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_2pt_conversions",
    Cypher: "RETURN pg.passing_2pt_conversions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return carries",
    Cypher: "RETURN pg.carries",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_yards",
    Cypher: "RETURN pg.rushing_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_tds",
    Cypher: "RETURN pg.rushing_tds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_fumbles",
    Cypher: "RETURN pg.rushing_fumbles",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_fumbles_lost",
    Cypher: "RETURN pg.rushing_fumbles_lost",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_first_downs",
    Cypher: "RETURN pg.rushing_first_downs",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_epa",
    Cypher: "RETURN pg.rushing_epa",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return rushing_2pt_conversions",
    Cypher: "RETURN pg.rushing_2pt_conversions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receptions",
    Cypher: "RETURN pg.receptions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_fumbles",
    Cypher: "RETURN pg.receiving_fumbles",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return fantasy_points_ppr",
    Cypher: "RETURN pg.fantasy_points_ppr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_fumbles_lost",
    Cypher: "RETURN pg.receiving_fumbles_lost",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return player_name",
    Cypher: "RETURN pg.player_name",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return racr",
    Cypher: "RETURN pg.racr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return passing_epa",
    Cypher: "RETURN pg.passing_epa",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return target_share",
    Cypher: "RETURN pg.target_share",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_yards",
    Cypher: "RETURN pg.receiving_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_tds",
    Cypher: "RETURN pg.receiving_tds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return special_teams_tds",
    Cypher: "RETURN pg.special_teams_tds",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_2pt_conversions",
    Cypher: "RETURN pg.receiving_2pt_conversions",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return wopr",
    Cypher: "RETURN pg.wopr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return targets",
    Cypher: "RETURN pg.targets",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return pacr",
    Cypher: "RETURN pg.pacr",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_first_downs",
    Cypher: "RETURN pg.receiving_first_downs",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return dakota",
    Cypher: "RETURN pg.dakota",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return headshot_url",
    Cypher: "RETURN pg.headshot_url",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return game_id",
    Cypher: "RETURN pg.game_id",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_yards_after_catch",
    Cypher: "RETURN pg.receiving_yards_after_catch",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_epa",
    Cypher: "RETURN pg.receiving_epa",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return won",
    Cypher: "RETURN pg.won",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return receiving_air_yards",
    Cypher: "RETURN pg.receiving_air_yards",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return air_yards_share",
    Cypher: "RETURN pg.air_yards_share",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
  {
    English: "return fantasy_points",
    Cypher: "RETURN pg.fantasy_points",
    QueryType: QueryType.RETURN,
    Inputs: [
      {
        Name: "pg",
        Label: Label.PlayerGame,
      },
    ],
    Outputs: [],
    Slots: [],
  },
];
