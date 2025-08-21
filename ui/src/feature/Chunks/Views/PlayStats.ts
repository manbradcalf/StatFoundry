export const PLAY_STATS = [
  // posteam needs to be sticky so it needs to be first
  // TODO: i know theres a better way
  { key: "posteam", type: "string", defaultValue: "" },

  // Basic identifiers
  { key: "play_id", type: "string", defaultValue: "" },
  { key: "play_game_id", type: "string", defaultValue: "" },
  { key: "player_id", type: "string", defaultValue: "" },
  { key: "player_display_name", type: "string", defaultValue: "" },
  { key: "game_id", type: "string", defaultValue: "" },

  // Basic play context
  { key: "drive_id", type: "string", defaultValue: "" },
  { key: "play_type", type: "string", defaultValue: "" },
  { key: "play_type_nfl", type: "string", defaultValue: "" },
  { key: "down", type: "number", defaultValue: 0 },
  { key: "yards_to_go", type: "number", defaultValue: 0 },
  { key: "yard_line", type: "number", defaultValue: 0 },
  { key: "quarter", type: "number", defaultValue: 0 },
  { key: "time_remaining", type: "string", defaultValue: "" },
  { key: "game_seconds_remaining", type: "number", defaultValue: 0 },
  { key: "quarter_seconds_remaining", type: "number", defaultValue: 0 },
  { key: "half_seconds_remaining", type: "number", defaultValue: 0 },

  // Formation and situation
  { key: "offense_formation", type: "string", defaultValue: "" },
  { key: "shotgun", type: "boolean", defaultValue: false },
  { key: "no_huddle", type: "boolean", defaultValue: false },
  { key: "success", type: "boolean", defaultValue: false },
  { key: "ydsnet", type: "number", defaultValue: 0 },

  // Game context
  { key: "home_team", type: "string", defaultValue: "" },
  { key: "away_team", type: "string", defaultValue: "" },
  { key: "defteam", type: "string", defaultValue: "" },
  { key: "side_of_field", type: "string", defaultValue: "" },

  // Play description
  { key: "desc", type: "string", defaultValue: "" },

  // Core stats
  { key: "yards_gained", type: "number", defaultValue: 0 },
  { key: "first_down", type: "boolean", defaultValue: false },
  { key: "touchdown", type: "boolean", defaultValue: false },

  // Passing-specific properties
  { key: "passing.passer", type: "string", defaultValue: "" },
  { key: "passing.passer_id", type: "string", defaultValue: "" },
  { key: "passing.passer_jersey_number", type: "number", defaultValue: 0 },
  { key: "passing.passer_player_name", type: "string", defaultValue: "" },
  { key: "passing.receiver", type: "string", defaultValue: "" },
  { key: "passing.receiver_id", type: "string", defaultValue: "" },
  { key: "passing.receiver_player_id", type: "string", defaultValue: "" },
  { key: "passing.air_yards", type: "number", defaultValue: 0 },
  { key: "passing.yards_after_catch", type: "number", defaultValue: 0 },
  { key: "passing.complete_pass", type: "boolean", defaultValue: false },
  { key: "passing.incomplete_pass", type: "boolean", defaultValue: false },
  { key: "passing.interception", type: "boolean", defaultValue: false },
  { key: "passing.pass_location", type: "string", defaultValue: "" },
  { key: "passing.pass_length", type: "string", defaultValue: "" },
  { key: "passing.air_epa", type: "number", defaultValue: 0 },
  { key: "passing.comp_air_epa", type: "number", defaultValue: 0 },
  { key: "passing.comp_yac_epa", type: "number", defaultValue: 0 },
  { key: "passing.qb_epa", type: "number", defaultValue: 0 },
  { key: "passing.air_wpa", type: "number", defaultValue: 0 },
  { key: "passing.comp_yac_wpa", type: "number", defaultValue: 0 },
  { key: "passing.yac_wpa", type: "number", defaultValue: 0 },
  { key: "passing.sack", type: "boolean", defaultValue: false },
  { key: "passing.qb_hit", type: "boolean", defaultValue: false },
  { key: "passing.time_to_throw", type: "number", defaultValue: 0 },
  { key: "passing.xpass", type: "number", defaultValue: 0 },
  { key: "passing.cp", type: "number", defaultValue: 0 },
  { key: "passing.xyac_mean_yardage", type: "number", defaultValue: 0 },
  { key: "passing.xyac_success", type: "number", defaultValue: 0 },

  // Receiving-specific properties
  { key: "receiving.receiver", type: "string", defaultValue: "" },
  { key: "receiving.receiver_id", type: "string", defaultValue: "" },
  { key: "receiving.target", type: "boolean", defaultValue: false },
  { key: "receiving.reception", type: "boolean", defaultValue: false },
  { key: "receiving.receiving_yards", type: "number", defaultValue: 0 },
  { key: "receiving.yards_after_catch", type: "number", defaultValue: 0 },
  {
    key: "receiving.receiving_touchdown",
    type: "boolean",
    defaultValue: false,
  },
  { key: "receiving.receiving_fumble", type: "boolean", defaultValue: false },

  // Rushing-specific properties
  { key: "rushing.rusher", type: "string", defaultValue: "" },
  { key: "rushing.rusher_id", type: "string", defaultValue: "" },
  { key: "rushing.rushing_yards", type: "number", defaultValue: 0 },
  { key: "rushing.rushing_touchdown", type: "boolean", defaultValue: false },
  { key: "rushing.rushing_fumble", type: "boolean", defaultValue: false },
  { key: "rushing.lateral_rush", type: "boolean", defaultValue: false },

  // Advanced metrics
  { key: "epa", type: "number", defaultValue: 0 },
  { key: "wpa", type: "number", defaultValue: 0 },
  { key: "win_probability", type: "number", defaultValue: 0 },
  { key: "home_wp", type: "number", defaultValue: 0 },
  { key: "away_wp", type: "number", defaultValue: 0 },

  // Situational context
  { key: "personnel.offense_personnel", type: "string", defaultValue: "" },
  { key: "personnel.defense_personnel", type: "string", defaultValue: "" },
  { key: "personnel.defenders_in_box", type: "number", defaultValue: 0 },
  { key: "personnel.n_offense", type: "number", defaultValue: 0 },
  { key: "personnel.n_defense", type: "number", defaultValue: 0 },

  // Coverage and scheme
  { key: "defense_coverage_type", type: "string", defaultValue: "" },

  // Field position and scoring
  { key: "goal_to_go", type: "boolean", defaultValue: false },
  { key: "red_zone", type: "boolean", defaultValue: false },
  { key: "two_minute_warning", type: "boolean", defaultValue: false },

  // Score context
  { key: "score_differential", type: "number", defaultValue: 0 },
  { key: "score_differential_post", type: "number", defaultValue: 0 },
  { key: "posteam_score", type: "number", defaultValue: 0 },
  { key: "defteam_score", type: "number", defaultValue: 0 },
  { key: "posteam_score_post", type: "number", defaultValue: 0 },
  { key: "defteam_score_post", type: "number", defaultValue: 0 },

  // Special situations (penalties)
  { key: "penalty", type: "boolean", defaultValue: false },
  { key: "penalty_team", type: "string", defaultValue: "" },
  { key: "penalty_player_id", type: "string", defaultValue: "" },
  { key: "penalty_yards", type: "number", defaultValue: 0 },

  // Fumbles and turnovers
  { key: "fumble", type: "boolean", defaultValue: false },
  { key: "fumble_forced", type: "boolean", defaultValue: false },
  { key: "fumble_not_forced", type: "boolean", defaultValue: false },
  { key: "fumble_lost", type: "boolean", defaultValue: false },
  { key: "fumble_out_of_bounds", type: "boolean", defaultValue: false },

  // Special teams flags
  { key: "punt", type: "boolean", defaultValue: false },
  { key: "kickoff", type: "boolean", defaultValue: false },
  { key: "extra_point_attempt", type: "boolean", defaultValue: false },
  { key: "two_point_attempt", type: "boolean", defaultValue: false },
  { key: "field_goal_attempt", type: "boolean", defaultValue: false },

  // Weather and stadium
  { key: "stadium", type: "string", defaultValue: "" },
  { key: "stadium_id", type: "string", defaultValue: "" },
  { key: "game_stadium", type: "string", defaultValue: "" },
  { key: "weather", type: "string", defaultValue: "" },
  { key: "temp", type: "number", defaultValue: 0 },
  { key: "wind", type: "number", defaultValue: 0 },
  { key: "roof", type: "string", defaultValue: "" },

  // Probability metrics
  { key: "td_prob", type: "number", defaultValue: 0 },
  { key: "safety_prob", type: "number", defaultValue: 0 },
  { key: "extra_point_prob", type: "number", defaultValue: 0 },
  { key: "two_point_conversion_prob", type: "number", defaultValue: 0 },

  // Player involvement
  { key: "players_on_play", type: "string", defaultValue: "" },
  { key: "tackle_1_player_id", type: "string", defaultValue: "" },
  { key: "tackle_2_player_id", type: "string", defaultValue: "" },
  { key: "assist_tackle_1_player_id", type: "string", defaultValue: "" },
  { key: "assist_tackle_2_player_id", type: "string", defaultValue: "" },

  // Time context (time_of_day)
  { key: "time_of_day.year", type: "number", defaultValue: 0 },
  { key: "time_of_day.month", type: "number", defaultValue: 0 },
  { key: "time_of_day.day", type: "number", defaultValue: 0 },
  { key: "time_of_day.hour", type: "number", defaultValue: 0 },
  { key: "time_of_day.minute", type: "number", defaultValue: 0 },
  { key: "time_of_day.second", type: "number", defaultValue: 0 },

  // Drive context
  { key: "drive", type: "number", defaultValue: 0 },
  { key: "drive_first_downs", type: "number", defaultValue: 0 },
  { key: "drive_yards_penalized", type: "number", defaultValue: 0 },
  { key: "drive_end_transition", type: "string", defaultValue: "" },
  { key: "drive_end_yard_line", type: "string", defaultValue: "" },
  { key: "drive_time_of_possession", type: "string", defaultValue: "" },
  { key: "drive_real_start_time.year", type: "number", defaultValue: 0 },
  { key: "drive_real_start_time.month", type: "number", defaultValue: 0 },
  { key: "drive_real_start_time.day", type: "number", defaultValue: 0 },
  { key: "drive_real_start_time.hour", type: "number", defaultValue: 0 },
  { key: "drive_real_start_time.minute", type: "number", defaultValue: 0 },
  { key: "drive_real_start_time.second", type: "number", defaultValue: 0 },
  { key: "drive_game_clock_start", type: "string", defaultValue: "" },
  { key: "drive_quarter_start", type: "number", defaultValue: 0 },
  { key: "drive_start_transition", type: "string", defaultValue: "" },
  { key: "drive_ended_with_score", type: "boolean", defaultValue: false },
  { key: "drive_inside20", type: "boolean", defaultValue: false },
  { key: "fixed_drive", type: "number", defaultValue: 0 },
  { key: "fixed_drive_result", type: "string", defaultValue: "" },
  { key: "drive_play_id_ended", type: "number", defaultValue: 0 },

  // Advanced EPA breakdowns (team totals)
  { key: "total_home_epa", type: "number", defaultValue: 0 },
  { key: "total_away_epa", type: "number", defaultValue: 0 },
  { key: "total_home_comp_air_epa", type: "number", defaultValue: 0 },
  { key: "total_away_comp_air_epa", type: "number", defaultValue: 0 },
  { key: "total_home_comp_yac_epa", type: "number", defaultValue: 0 },
  { key: "total_away_comp_yac_epa", type: "number", defaultValue: 0 },
  { key: "total_home_raw_air_epa", type: "number", defaultValue: 0 },
  { key: "total_away_raw_air_epa", type: "number", defaultValue: 0 },
  { key: "total_home_raw_yac_epa", type: "number", defaultValue: 0 },
  { key: "total_away_raw_yac_epa", type: "number", defaultValue: 0 },
  { key: "total_home_pass_wpa", type: "number", defaultValue: 0 },
  { key: "total_away_pass_wpa", type: "number", defaultValue: 0 },
  { key: "total_home_rush_wpa", type: "number", defaultValue: 0 },
  { key: "total_away_rush_wpa", type: "number", defaultValue: 0 },
  { key: "total_home_raw_air_wpa", type: "number", defaultValue: 0 },
  { key: "total_away_raw_air_wpa", type: "number", defaultValue: 0 },
  { key: "total_home_raw_yac_wpa", type: "number", defaultValue: 0 },
  { key: "total_away_raw_yac_wpa", type: "number", defaultValue: 0 },
  { key: "total_home_rush_epa", type: "number", defaultValue: 0 },
  { key: "total_away_rush_epa", type: "number", defaultValue: 0 },
  { key: "total_home_score", type: "number", defaultValue: 0 },
  { key: "total_away_score", type: "number", defaultValue: 0 },

  // Betting and game flow
  { key: "spread_line", type: "number", defaultValue: 0 },
  { key: "vegas_home_wp", type: "number", defaultValue: 0 },
  { key: "vegas_wpa", type: "number", defaultValue: 0 },
  { key: "vegas_home_wpa", type: "number", defaultValue: 0 },
  { key: "div_game", type: "boolean", defaultValue: false },

  // Special situations and outcomes
  { key: "replay_or_challenge", type: "boolean", defaultValue: false },
  { key: "quarter_end", type: "boolean", defaultValue: false },
  { key: "first_down_pass", type: "boolean", defaultValue: false },
  { key: "first_down_rush", type: "boolean", defaultValue: false },
  { key: "third_down_converted", type: "boolean", defaultValue: false },
  { key: "fourth_down_converted", type: "boolean", defaultValue: false },
  { key: "rush_touchdown", type: "boolean", defaultValue: false },
  { key: "lateral_return", type: "boolean", defaultValue: false },

  // Game metadata
  { key: "nfl_api_id", type: "string", defaultValue: "" },
  { key: "nflverse_game_id", type: "string", defaultValue: "" },
  { key: "old_game_id_x", type: "number", defaultValue: 0 },
  { key: "old_game_id_y", type: "number", defaultValue: 0 },

  // Probability details
  { key: "opp_safety_prob", type: "number", defaultValue: 0 },
  { key: "opp_fg_prob", type: "number", defaultValue: 0 },
  { key: "no_score_prob", type: "number", defaultValue: 0 },
  { key: "fg_prob", type: "number", defaultValue: 0 },

  // Player involvement details (fantasy)
  { key: "fantasy", type: "string", defaultValue: "" },
  { key: "fantasy_player_name", type: "string", defaultValue: "" },
  { key: "fantasy_id", type: "string", defaultValue: "" },
  { key: "name", type: "string", defaultValue: "" },

  // Game state
  { key: "result", type: "number", defaultValue: 0 },
  { key: "sp", type: "number", defaultValue: 0 },
  { key: "ep", type: "number", defaultValue: 0 },

  // Timeouts
  { key: "posteam_timeouts_remaining", type: "number", defaultValue: 0 },
  { key: "defteam_timeouts_remaining", type: "number", defaultValue: 0 },
];
