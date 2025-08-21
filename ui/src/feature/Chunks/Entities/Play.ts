import { Entity } from "./Entity";
import { AliasType } from "../Enums/AliasType";

export interface Play extends Entity {
  label: AliasType.Play;
  properties: PlayProperties;
}

export type PlayProperties = {
  // Basic identifiers
  play_id: string;
  play_game_id: string; // unique identifier: game_id + play_id
  player_id: string;
  player_display_name: string;
  game_id: string;

  // Basic play context
  drive_id?: string;
  play_type: string; // "pass", "rush", "punt", "kickoff", etc.
  play_type_nfl: string; // "PASS", "RUSH", etc.
  down: number;
  yards_to_go: number; // ydstogo in data
  yard_line: number;
  quarter: number; // qtr in data
  time_remaining: string; // time field like "14:30"
  game_seconds_remaining: number;
  quarter_seconds_remaining: number;
  half_seconds_remaining: number;

  // Formation and situation
  offense_formation?: string; // "SHOTGUN", etc.
  shotgun: boolean;
  no_huddle: boolean;
  success: boolean; // successful play by EPA standards
  ydsnet: number; // net yards gained

  // Game context
  home_team: string;
  away_team: string;
  posteam: string; // possessing team
  defteam: string; // defending team
  side_of_field: string;

  // Play description
  desc: string; // full play description

  // Core stats
  yards_gained: number;
  first_down: boolean;
  touchdown: boolean;

  // Passing-specific properties
  passing?: {
    passer: string;
    passer_id: string;
    passer_jersey_number: number;
    passer_player_name: string;
    receiver?: string;
    receiver_id?: string;
    receiver_player_id?: string;
    air_yards: number;
    yards_after_catch: number;
    complete_pass: boolean;
    incomplete_pass: boolean;
    interception: boolean;
    pass_location: string; // "left", "right", "middle"
    pass_length: string; // "short", "deep"
    air_epa: number;
    comp_air_epa: number;
    comp_yac_epa: number;
    qb_epa: number;
    air_wpa: number;
    comp_yac_wpa: number;
    yac_wpa: number;
    sack: boolean;
    qb_hit: boolean;
    time_to_throw?: number;
    // Expected metrics
    xpass: number; // expected pass probability
    cp: number; // completion probability
    xyac_mean_yardage: number;
    xyac_success: number;
  };

  // Receiving-specific properties
  receiving?: {
    receiver: string;
    receiver_id: string;
    target: boolean;
    reception: boolean;
    receiving_yards: number;
    yards_after_catch: number;
    receiving_touchdown: boolean;
    receiving_fumble: boolean;
  };

  // Rushing-specific properties
  rushing?: {
    rusher: string;
    rusher_id: string;
    rushing_yards: number;
    rushing_touchdown: boolean;
    rushing_fumble: boolean;
    lateral_rush: boolean;
  };

  // Advanced metrics
  epa: number; // Expected Points Added
  wpa: number; // Win Probability Added
  win_probability: number;
  home_wp: number;
  away_wp: number;

  // Situational context
  personnel: {
    offense_personnel: string; // "1 RB, 1 TE, 3 WR"
    defense_personnel: string; // "2 DL, 4 LB, 5 DB"
    defenders_in_box: number;
    n_offense: number;
    n_defense: number;
  };

  // Coverage and scheme
  defense_coverage_type?: string; // "COVER_3", "COVER_2", etc.

  // Field position and scoring
  goal_to_go: boolean;
  red_zone: boolean;
  two_minute_warning: boolean;

  // Score context
  score_differential: number;
  score_differential_post: number;
  posteam_score: number;
  defteam_score: number;
  posteam_score_post: number;
  defteam_score_post: number;

  // Special situations
  penalty: boolean;
  penalty_team?: string;
  penalty_player_id?: string;
  penalty_yards?: number;

  // Fumbles and turnovers
  fumble: boolean;
  fumble_forced: boolean;
  fumble_not_forced: boolean;
  fumble_lost: boolean;
  fumble_out_of_bounds: boolean;

  // Special teams
  punt: boolean;
  kickoff: boolean;
  extra_point_attempt: boolean;
  two_point_attempt: boolean;
  field_goal_attempt: boolean;

  // Weather and stadium
  stadium?: string;
  stadium_id?: string;
  game_stadium?: string;
  weather?: string;
  temp?: number;
  wind?: number;
  roof?: string; // "outdoors", "dome", etc.

  // Probability metrics
  td_prob: number;
  safety_prob: number;
  extra_point_prob: number;
  two_point_conversion_prob: number;

  // Player involvement
  players_on_play: string; // semicolon-separated list of player IDs
  tackle_1_player_id?: string;
  tackle_2_player_id?: string;
  assist_tackle_1_player_id?: string;
  assist_tackle_2_player_id?: string;

  // Time context
  time_of_day?: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };

  // Drive context
  drive: number;
  drive_first_downs?: number;
  drive_yards_penalized?: number;
  drive_end_transition?: string; // "TOUCHDOWN", "PUNT", "TURNOVER", etc.
  drive_end_yard_line?: string;
  drive_time_of_possession?: string;
  drive_real_start_time?: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
  drive_game_clock_start?: string;
  drive_quarter_start?: number;
  drive_start_transition?: string;
  drive_ended_with_score?: boolean;
  drive_inside20?: boolean;
  fixed_drive?: number;
  fixed_drive_result?: string;
  drive_play_id_ended?: number;

  // Advanced EPA breakdowns (team totals)
  total_home_epa?: number;
  total_away_epa?: number;
  total_home_comp_air_epa?: number;
  total_away_comp_air_epa?: number;
  total_home_comp_yac_epa?: number;
  total_away_comp_yac_epa?: number;
  total_home_raw_air_epa?: number;
  total_away_raw_air_epa?: number;
  total_home_raw_yac_epa?: number;
  total_away_raw_yac_epa?: number;
  total_home_pass_wpa?: number;
  total_away_pass_wpa?: number;
  total_home_rush_wpa?: number;
  total_away_rush_wpa?: number;
  total_home_raw_air_wpa?: number;
  total_away_raw_air_wpa?: number;
  total_home_raw_yac_wpa?: number;
  total_away_raw_yac_wpa?: number;
  total_home_rush_epa?: number;
  total_away_rush_epa?: number;
  total_home_score?: number;
  total_away_score?: number;

  // Betting and game flow
  spread_line?: number;
  vegas_home_wp?: number;
  vegas_wpa?: number;
  vegas_home_wpa?: number;
  div_game?: boolean;

  // Special situations and outcomes
  replay_or_challenge?: boolean;
  quarter_end?: boolean;
  first_down_pass?: boolean;
  first_down_rush?: boolean;
  third_down_converted?: boolean;
  fourth_down_converted?: boolean;
  rush_touchdown?: boolean;
  lateral_return?: boolean;

  // Game metadata
  nfl_api_id?: string;
  nflverse_game_id?: string;
  old_game_id_x?: number;
  old_game_id_y?: number;

  // Probability details
  opp_safety_prob?: number;
  opp_fg_prob?: number;
  no_score_prob?: number;
  fg_prob?: number;

  // Player involvement details
  fantasy?: string; // fantasy relevant player name
  fantasy_player_name?: string;
  fantasy_id?: string;
  name?: string; // primary player name

  // Game state
  result?: number; // yards gained
  sp?: number; // special teams indicator
  ep?: number; // expected points

  // Timeouts
  posteam_timeouts_remaining?: number;
  defteam_timeouts_remaining?: number;
};
