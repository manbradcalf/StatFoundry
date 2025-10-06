export const TEAMGAME_LABEL_PROPERTIES = [  { key: "season", type: "Long" },
  { key: "week", type: "Long" },
  { key: "season_type", type: "String" },
  { key: "opponent_team", type: "String" },
  { key: "completions", type: "Long" },
  { key: "attempts", type: "Long" },
  { key: "passing_yards", type: "Double" },
  { key: "passing_tds", type: "Long" },
  { key: "sack_fumbles", type: "Long" },
  { key: "sack_fumbles_lost", type: "Long" },
  { key: "passing_air_yards", type: "Double" },
  { key: "passing_yards_after_catch", type: "Double" },
  { key: "passing_first_downs", type: "Double" },
  { key: "passing_2pt_conversions", type: "Long" },
  { key: "carries", type: "Long" },
  { key: "rushing_yards", type: "Double" },
  { key: "rushing_tds", type: "Long" },
  { key: "rushing_fumbles", type: "Long" },
  { key: "rushing_fumbles_lost", type: "Long" },
  { key: "rushing_first_downs", type: "Double" },
  { key: "rushing_epa", type: "Double" },
  { key: "rushing_2pt_conversions", type: "Long" },
  { key: "receptions", type: "Long" },
  { key: "receiving_fumbles", type: "Long" },
  { key: "def_tds", type: "Long" },
  { key: "fumble_recovery_tds", type: "Long" },
  { key: "receiving_yards", type: "Double" },
  { key: "receiving_tds", type: "Long" },
  { key: "fg_made_30_39", type: "Long" },
  { key: "fg_missed_50_59", type: "Long" },
  { key: "fg_missed_distance", type: "Double" },
  { key: "receiving_2pt_conversions", type: "Long" },
  { key: "def_pass_defended", type: "Long" },
  { key: "fg_missed_list", type: "String" },
  { key: "fg_pct", type: "Double" },
  { key: "misc_yards", type: "Double" },
  { key: "fg_missed", type: "Long" },
  { key: "timeouts", type: "Long" },
  { key: "def_tackles_for_loss_yards", type: "Double" },
  { key: "fg_made_list", type: "String" },
  { key: "kickoff_returns", type: "Long" },
  { key: "receiving_first_downs", type: "Double" },
  { key: "kickoff_return_yards", type: "Double" },
  { key: "fg_missed_40_49", type: "Long" },
  { key: "receiving_air_yards", type: "Double" },
  { key: "fg_made_20_29", type: "Long" },
  { key: "fg_missed_0_19", type: "Long" },
  { key: "pat_made", type: "Long" },
  { key: "def_tackles_solo", type: "Long" },
  { key: "fg_missed_60_", type: "Long" },
  { key: "fumble_recovery_yards_opp", type: "Double" },
  { key: "penalty_yards", type: "Double" },
  { key: "gwfg_distance", type: "Double" },
  { key: "def_interceptions", type: "Long" },
  { key: "def_interception_yards", type: "Double" },
  { key: "def_sacks", type: "Long" },
  { key: "fumble_recovery_own", type: "Long" },
  { key: "def_sack_yards", type: "Double" },
  { key: "fg_blocked_list", type: "String" },
  { key: "fg_missed_30_39", type: "Long" },
  { key: "fg_missed_20_29", type: "Long" },
  { key: "fumble_recovery_yards_own", type: "Double" },
  { key: "game_id", type: "String" },
  { key: "receiving_yards_after_catch", type: "Double" },
  { key: "receiving_epa", type: "Double" },
  { key: "fg_made_60_", type: "Long" },
  { key: "penalties", type: "Long" },
  { key: "punt_returns", type: "Long" },
  { key: "def_safeties", type: "Long" },
  { key: "receiving_fumbles_lost", type: "Long" },
  { key: "passing_interceptions", type: "Long" },
  { key: "def_qb_hits", type: "Long" },
  { key: "fg_made_40_49", type: "Long" },
  { key: "fg_made", type: "Long" },
  { key: "sack_yards_lost", type: "Double" },
  { key: "def_tackles_with_assist", type: "Long" },
  { key: "passing_cpoe", type: "Double" },
  { key: "fg_blocked_distance", type: "Double" },
  { key: "punt_return_yards", type: "Double" },
  { key: "pat_att", type: "Long" },
  { key: "def_fumbles", type: "Long" },
  { key: "gwfg_made", type: "Long" },
  { key: "def_tackle_assists", type: "Long" },
  { key: "pat_blocked", type: "Long" },
  { key: "def_fumbles_forced", type: "Long" },
  { key: "team_game_id", type: "String" },
  { key: "fg_long", type: "Long" },
  { key: "gwfg_blocked", type: "Long" },
  { key: "fg_att", type: "Long" },
  { key: "pat_pct", type: "Double" },
  { key: "gwfg_missed", type: "Long" },
  { key: "passing_epa", type: "Double" },
  { key: "fg_made_50_59", type: "Long" },
  { key: "gwfg_att", type: "Long" },
  { key: "def_tackles_for_loss", type: "Long" },
  { key: "special_teams_tds", type: "Long" },
  { key: "sacks_suffered", type: "Long" },
  { key: "fumble_recovery_opp", type: "Long" },
  { key: "targets", type: "Long" },
  { key: "fg_blocked", type: "Long" },
  { key: "fg_made_distance", type: "Double" },
  { key: "fg_made_0_19", type: "Long" },
  { key: "pat_missed", type: "Long" },
  { key: "team", type: "String" },];
export interface TeamGameProperties {
  season: number;
  week: number;
  season_type: string;
  opponent_team: string;
  completions: number;
  attempts: number;
  passing_yards: number;
  passing_tds: number;
  sack_fumbles: number;
  sack_fumbles_lost: number;
  passing_air_yards: number;
  passing_yards_after_catch: number;
  passing_first_downs: number;
  passing_2pt_conversions: number;
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
  def_tds: number;
  fumble_recovery_tds: number;
  receiving_yards: number;
  receiving_tds: number;
  fg_made_30_39: number;
  fg_missed_50_59: number;
  fg_missed_distance: number;
  receiving_2pt_conversions: number;
  def_pass_defended: number;
  fg_missed_list: string;
  fg_pct: number;
  misc_yards: number;
  fg_missed: number;
  timeouts: number;
  def_tackles_for_loss_yards: number;
  fg_made_list: string;
  kickoff_returns: number;
  receiving_first_downs: number;
  kickoff_return_yards: number;
  fg_missed_40_49: number;
  receiving_air_yards: number;
  fg_made_20_29: number;
  fg_missed_0_19: number;
  pat_made: number;
  def_tackles_solo: number;
  fg_missed_60_: number;
  fumble_recovery_yards_opp: number;
  penalty_yards: number;
  gwfg_distance: number;
  def_interceptions: number;
  def_interception_yards: number;
  def_sacks: number;
  fumble_recovery_own: number;
  def_sack_yards: number;
  fg_blocked_list: string;
  fg_missed_30_39: number;
  fg_missed_20_29: number;
  fumble_recovery_yards_own: number;
  game_id: string;
  receiving_yards_after_catch: number;
  receiving_epa: number;
  fg_made_60_: number;
  penalties: number;
  punt_returns: number;
  def_safeties: number;
  receiving_fumbles_lost: number;
  passing_interceptions: number;
  def_qb_hits: number;
  fg_made_40_49: number;
  fg_made: number;
  sack_yards_lost: number;
  def_tackles_with_assist: number;
  passing_cpoe: number;
  fg_blocked_distance: number;
  punt_return_yards: number;
  pat_att: number;
  def_fumbles: number;
  gwfg_made: number;
  def_tackle_assists: number;
  pat_blocked: number;
  def_fumbles_forced: number;
  team_game_id: string;
  fg_long: number;
  gwfg_blocked: number;
  fg_att: number;
  pat_pct: number;
  gwfg_missed: number;
  passing_epa: number;
  fg_made_50_59: number;
  gwfg_att: number;
  def_tackles_for_loss: number;
  special_teams_tds: number;
  sacks_suffered: number;
  fumble_recovery_opp: number;
  targets: number;
  fg_blocked: number;
  fg_made_distance: number;
  fg_made_0_19: number;
  pat_missed: number;
  team: string;
}