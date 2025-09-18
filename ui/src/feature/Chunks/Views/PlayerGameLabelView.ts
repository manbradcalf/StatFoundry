export const PLAYERGAME_LABEL_PROPERTIES = [  { key: "player_game_id", type: "String" },
  { key: "player_id", type: "String" },
  { key: "player_display_name", type: "String" },
  { key: "position", type: "String" },
  { key: "position_group", type: "String" },
  { key: "recent_team", type: "String" },
  { key: "season", type: "Long" },
  { key: "week", type: "Long" },
  { key: "season_type", type: "String" },
  { key: "opponent_team", type: "String" },
  { key: "completions", type: "Long" },
  { key: "attempts", type: "Long" },
  { key: "passing_yards", type: "Double" },
  { key: "passing_tds", type: "Long" },
  { key: "interceptions", type: "Double" },
  { key: "sacks", type: "Double" },
  { key: "sack_yards", type: "Double" },
  { key: "sack_fumbles", type: "Boolean" },
  { key: "sack_fumbles_lost", type: "Boolean" },
  { key: "passing_air_yards", type: "Double" },
  { key: "passing_yards_after_catch", type: "Double" },
  { key: "passing_first_downs", type: "Double" },
  { key: "passing_2pt_conversions", type: "Boolean" },
  { key: "carries", type: "Long" },
  { key: "rushing_yards", type: "Double" },
  { key: "rushing_tds", type: "Long" },
  { key: "rushing_fumbles", type: "Double" },
  { key: "rushing_fumbles_lost", type: "Double" },
  { key: "rushing_first_downs", type: "Double" },
  { key: "rushing_epa", type: "Double" },
  { key: "rushing_2pt_conversions", type: "Boolean" },
  { key: "receptions", type: "Long" },
  { key: "receiving_fumbles", type: "Double" },
  { key: "fantasy_points_ppr", type: "Double" },
  { key: "receiving_fumbles_lost", type: "Double" },
  { key: "display_name", type: "String" },
  { key: "player_name", type: "String" },
  { key: "passing_interceptions", type: "Long" },
  { key: "target_share", type: "Double" },
  { key: "receiving_yards", type: "Double" },
  { key: "receiving_tds", type: "Long" },
  { key: "yards_per_carry", type: "Double" },
  { key: "receiving_2pt_conversions", type: "Boolean" },
  { key: "wopr", type: "Double" },
  { key: "receiving_first_downs", type: "Double" },
  { key: "headshot_url", type: "String" },
  { key: "dakota", type: "Double" },
  { key: "receiving_air_yards", type: "Double" },
  { key: "air_yards_share", type: "Double" },
  { key: "def_interceptions", type: "Double" },
  { key: "racr", type: "Double" },
  { key: "def_interception_yards", type: "Double" },
  { key: "passing_epa", type: "Double" },
  { key: "def_sacks", type: "Double" },
  { key: "def_sack_yards", type: "Double" },
  { key: "special_teams_tds", type: "Double" },
  { key: "targets", type: "Long" },
  { key: "pacr", type: "Double" },
  { key: "game_id", type: "String" },
  { key: "receiving_yards_after_catch", type: "Double" },
  { key: "receiving_epa", type: "Double" },
  { key: "won", type: "Boolean" },
  { key: "scrimmage_yards", type: "Double" },
  { key: "fantasy_points", type: "Double" },
  { key: "team", type: "String" },];export interface PlayerGameProperties {
  player_game_id: string;
  player_id: string;
  player_display_name: string;
  position: string;
  position_group: string;
  recent_team: string;
  season: number;
  week: number;
  season_type: string;
  opponent_team: string;
  completions: number;
  attempts: number;
  passing_yards: number;
  passing_tds: number;
  interceptions: number;
  sacks: number;
  sack_yards: number;
  sack_fumbles: boolean;
  sack_fumbles_lost: boolean;
  passing_air_yards: number;
  passing_yards_after_catch: number;
  passing_first_downs: number;
  passing_2pt_conversions: boolean;
  carries: number;
  rushing_yards: number;
  rushing_tds: number;
  rushing_fumbles: number;
  rushing_fumbles_lost: number;
  rushing_first_downs: number;
  rushing_epa: number;
  rushing_2pt_conversions: boolean;
  receptions: number;
  receiving_fumbles: number;
  fantasy_points_ppr: number;
  receiving_fumbles_lost: number;
  display_name: string;
  player_name: string;
  passing_interceptions: number;
  target_share: number;
  receiving_yards: number;
  receiving_tds: number;
  yards_per_carry: number;
  receiving_2pt_conversions: boolean;
  wopr: number;
  receiving_first_downs: number;
  headshot_url: string;
  dakota: number;
  receiving_air_yards: number;
  air_yards_share: number;
  def_interceptions: number;
  racr: number;
  def_interception_yards: number;
  passing_epa: number;
  def_sacks: number;
  def_sack_yards: number;
  special_teams_tds: number;
  targets: number;
  pacr: number;
  game_id: string;
  receiving_yards_after_catch: number;
  receiving_epa: number;
  won: boolean;
  scrimmage_yards: number;
  fantasy_points: number;
  team: string;
}