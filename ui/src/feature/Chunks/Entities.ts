/**
 * Represents the types that can be found on a node in Neo4j graph
 */
export interface Entity {
  name: string; // ex: player
  properties: Record<string, Neo4jPropertyValue>; // ex: <"player_display_name": "Josh Allen">
}

export type Neo4jPropertyValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | number[]
  | boolean[];

// examples
export const Player: Entity = {
  name: "Player",
  properties: {
    player_display_name: "Josh Allen",
    player_id: "1234567890",
    player_position: "QB",
    player_team: "Buffalo Bills",
    player_game_date: new Date("2024-09-08"),
  },
};

export const Team: Entity = {
  name: "Team",
  properties: {
    team_name: "Buffalo Bills",
    team_id: "1234567890",
  },
};

export const Game: Entity = {
  name: "Game",
  properties: {
    game_id: "1234567890",
    game_date: new Date("2024-09-08"),
    home_team: "Buffalo Bills",
    away_team: "New York Jets",
    home_team_score: 20,
    away_team_score: 10,
    home_team_yards: 400,
    away_team_yards: 300,
    home_team_points: 20,
    away_team_points: 10,
    home_team_yards_gained: 400,
    away_team_yards_gained: 300,
    home_team_turnovers: 1,
    away_team_turnovers: 1,
    home_team_interceptions: 1,
  },
};

export const Season: Entity = {
  name: "Season",
  properties: {
    season_id: "1234567890",
    season_year: 2024,
  },
};

export const PlayerGame: Entity = {
  name: "PlayerGame",
  properties: {
    player_game_id: "1234567890",
    game_date: new Date("2024-09-08"),
    passing_yards: 400,
    rushing_yards: 100,
    receiving_yards: 100,
    receiving_touchdowns: 1,
    rushing_touchdowns: 1,
    receiving_receptions: 1,
    receiving_targets: 1,
    receiving_yards_after_catch: 100,
    receiving_air_yards: 100,
  },
};

export const PlayerSeason: Entity = {
  name: "PlayerSeason",
  properties: {
    season: 2024,
    passing_yards: 4000,
    rushing_yards: 1000,
    receiving_yards: 1000,
    receiving_touchdowns: 10,
    rushing_touchdowns: 10,
    receiving_receptions: 10,
    receiving_targets: 1,
    receiving_yards_after_catch: 100,
    receiving_air_yards: 100,
  },
};

export const TeamGame: Entity = {
  name: "TeamGame",
  properties: {
    team_name: "Buffalo Bills",
    team_yards_gained: 400,
    team_yards_allowed: 300,
    team_points_scored: 20,
    team_points_allowed: 10,
    team_turnovers: 1,
    team_interceptions: 1,
    team_fumbles: 1,
    team_game_id: "1234567890",
    team_game_date: new Date("2024-09-08"),
  },
};
