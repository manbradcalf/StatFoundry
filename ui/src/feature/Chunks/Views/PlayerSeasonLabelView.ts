export const PLAYERSEASON_LABEL_PROPERTIES = [  { key: "player_id", type: "String" },
  { key: "position", type: "String" },
  { key: "season", type: "Long" },
  { key: "season_type", type: "String" },
  { key: "completions", type: "Long" },
  { key: "attempts", type: "Long" },
  { key: "passing_yards", type: "Double" },
  { key: "passing_tds", type: "Long" },
  { key: "interceptions", type: "Double" },
  { key: "sacks", type: "Double" },
  { key: "sack_yards", type: "Double" },
  { key: "sack_fumbles", type: "Long" },
  { key: "sack_fumbles_lost", type: "Long" },
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
  { key: "rushing_2pt_conversions", type: "Long" },
  { key: "receptions", type: "Long" },
  { key: "receiving_fumbles", type: "Double" },
  { key: "fantasy_points_ppr", type: "Double" },
  { key: "receiving_fumbles_lost", type: "Double" },
  { key: "player_name", type: "String" },
  { key: "ay_sh", type: "Double" },
  { key: "target_share", type: "Double" },
  { key: "wopr_y", type: "Double" },
  { key: "receiving_yards", type: "Double" },
  { key: "receiving_tds", type: "Long" },
  { key: "player_season_id", type: "String" },
  { key: "teams", type: "StringArray" },
  { key: "receiving_2pt_conversions", type: "Long" },
  { key: "yards_per_carry", type: "Double" },
  { key: "dom", type: "Double" },
  { key: "receiving_first_downs", type: "Double" },
  { key: "dakota", type: "Double" },
  { key: "ppr_sh", type: "Double" },
  { key: "rtd_sh", type: "Double" },
  { key: "receiving_air_yards", type: "Double" },
  { key: "air_yards_share", type: "Double" },
  { key: "wopr_x", type: "Double" },
  { key: "yac_sh", type: "String" },
  { key: "games", type: "Long" },
  { key: "racr", type: "Double" },
  { key: "w8dom", type: "Double" },
  { key: "passing_epa", type: "Double" },
  { key: "tgt_sh", type: "Double" },
  { key: "ry_sh", type: "Double" },
  { key: "rfd_sh", type: "Double" },
  { key: "special_teams_tds", type: "Double" },
  { key: "rtdfd_sh", type: "Double" },
  { key: "targets", type: "Long" },
  { key: "pacr", type: "Double" },
  { key: "receiving_yards_after_catch", type: "Double" },
  { key: "receiving_epa", type: "Double" },
  { key: "scrimmage_yards", type: "Double" },
  { key: "yptmpa", type: "Double" },
  { key: "fantasy_points", type: "Double" },];
export interface PlayerSeasonProperties {
  player_id: string;
  position: string;
  season: number;
  season_type: string;
  completions: number;
  attempts: number;
  passing_yards: number;
  passing_tds: number;
  interceptions: number;
  sacks: number;
  sack_yards: number;
  sack_fumbles: number;
  sack_fumbles_lost: number;
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
  rushing_2pt_conversions: number;
  receptions: number;
  receiving_fumbles: number;
  fantasy_points_ppr: number;
  receiving_fumbles_lost: number;
  player_name: string;
  ay_sh: number;
  target_share: number;
  wopr_y: number;
  receiving_yards: number;
  receiving_tds: number;
  player_season_id: string;
  teams: string;
  receiving_2pt_conversions: number;
  yards_per_carry: number;
  dom: number;
  receiving_first_downs: number;
  dakota: number;
  ppr_sh: number;
  rtd_sh: number;
  receiving_air_yards: number;
  air_yards_share: number;
  wopr_x: number;
  yac_sh: string;
  games: number;
  racr: number;
  w8dom: number;
  passing_epa: number;
  tgt_sh: number;
  ry_sh: number;
  rfd_sh: number;
  special_teams_tds: number;
  rtdfd_sh: number;
  targets: number;
  pacr: number;
  receiving_yards_after_catch: number;
  receiving_epa: number;
  scrimmage_yards: number;
  yptmpa: number;
  fantasy_points: number;
}