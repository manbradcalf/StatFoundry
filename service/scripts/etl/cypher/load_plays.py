import sys
from src.neo4j_client import driver

create_constraint = """
CREATE CONSTRAINT play_unique IF NOT EXISTS
FOR (p:Play) REQUIRE p.id IS UNIQUE
"""

load_2025_plays = """
// LOAD and Merge Plays from NFLVerse PBP CSV
LOAD CSV WITH HEADERS FROM 'https://github.com/nflverse/nflverse-data/releases/download/pbp/play_by_play_2025.csv' AS line

// IMPORTANT: Filter BEFORE the CALL block (WHERE not allowed inside importing WITH)
WITH line
WHERE toInteger(line.season) = 2025
  AND line.game_id IS NOT NULL AND line.game_id <> ''
  AND line.play_id IS NOT NULL AND line.play_id <> ''

// Batch the writes in transactions of 500 rows
CALL {
  WITH line

  // Match parent Game node
  MATCH (g:Game {game_id: line.game_id})

  // MERGE on composite id (space separator matches existing Play nodes)
  MERGE (p:Play {id: line.game_id + ' ' + line.play_id})
  MERGE (p)-[:IN]->(g)

  // Build property map with safe type casting
  WITH p, line, g, {
  // Identifiers
  game_id: line.game_id,
  play_id: toIntegerOrNull(line.play_id),
  old_game_id: line.old_game_id,
  nfl_api_id: line.nfl_api_id,

  // Teams
  home_team: line.home_team,
  away_team: line.away_team,
  posteam: line.posteam,
  posteam_type: line.posteam_type,
  defteam: line.defteam,
  td_team: line.td_team,
  timeout_team: line.timeout_team,
  return_team: line.return_team,
  penalty_team: line.penalty_team,

  // Game Context
  season: toIntegerOrNull(line.season),
  season_type: line.season_type,
  week: toIntegerOrNull(line.week),
  game_half: line.game_half,
  qtr: toIntegerOrNull(line.qtr),
  down: toIntegerOrNull(line.down),
  ydstogo: toIntegerOrNull(line.ydstogo),
  ydsnet: toIntegerOrNull(line.ydsnet),
  goal_to_go: toBooleanOrNull(line.goal_to_go),
  time: line.time,
  quarter_end: toBooleanOrNull(line.quarter_end),

  // Field Position
  yrdln: line.yrdln,
  side_of_field: line.side_of_field,
  yardline_100: toIntegerOrNull(line.yardline_100),
  end_yard_line: line.end_yard_line,

  // Time Remaining
  quarter_seconds_remaining: toIntegerOrNull(line.quarter_seconds_remaining),
  half_seconds_remaining: toIntegerOrNull(line.half_seconds_remaining),
  game_seconds_remaining: toIntegerOrNull(line.game_seconds_remaining),

  // Play Description & Type
  desc: line.desc,
  play_type: line.play_type,
  play_type_nfl: line.play_type_nfl,
  yards_gained: toIntegerOrNull(line.yards_gained),
  sp: toBooleanOrNull(line.sp),
  play: toBooleanOrNull(line.play),
  special: toBooleanOrNull(line.special),
  special_teams_play: toBooleanOrNull(line.special_teams_play),
  st_play_type: line.st_play_type,
  aborted_play: toBooleanOrNull(line.aborted_play),
  success: toBooleanOrNull(line.success),
  play_clock: line.play_clock,
  play_deleted: toBooleanOrNull(line.play_deleted),

  // Formation
  shotgun: toBooleanOrNull(line.shotgun),
  no_huddle: toBooleanOrNull(line.no_huddle),
  qb_dropback: toBooleanOrNull(line.qb_dropback),
  qb_kneel: toBooleanOrNull(line.qb_kneel),
  qb_spike: toBooleanOrNull(line.qb_spike),
  qb_scramble: toBooleanOrNull(line.qb_scramble),

  // Rushing
  rush: toBooleanOrNull(line.rush),
  rush_attempt: toBooleanOrNull(line.rush_attempt),
  rushing_yards: toIntegerOrNull(line.rushing_yards),
  run_location: line.run_location,
  run_gap: line.run_gap,
  rusher_player_id: line.rusher_player_id,
  rusher_player_name: line.rusher_player_name,
  rusher: line.rusher,
  rusher_id: line.rusher_id,
  rusher_jersey_number: toIntegerOrNull(line.rusher_jersey_number),
  lateral_rush: toBooleanOrNull(line.lateral_rush),
  lateral_rusher_player_id: line.lateral_rusher_player_id,
  lateral_rusher_player_name: line.lateral_rusher_player_name,
  lateral_rushing_yards: toIntegerOrNull(line.lateral_rushing_yards),
  first_down_rush: toBooleanOrNull(line.first_down_rush),
  rush_touchdown: toBooleanOrNull(line.rush_touchdown),

  // Passing
  pass: toBooleanOrNull(line.pass),
  pass_attempt: toBooleanOrNull(line.pass_attempt),
  complete_pass: toBooleanOrNull(line.complete_pass),
  incomplete_pass: toBooleanOrNull(line.incomplete_pass),
  passing_yards: toIntegerOrNull(line.passing_yards),
  pass_length: line.pass_length,
  pass_location: line.pass_location,
  air_yards: toIntegerOrNull(line.air_yards),
  yards_after_catch: toIntegerOrNull(line.yards_after_catch),
  passer_player_id: line.passer_player_id,
  passer_player_name: line.passer_player_name,
  passer: line.passer,
  passer_id: line.passer_id,
  passer_jersey_number: toIntegerOrNull(line.passer_jersey_number),
  first_down_pass: toBooleanOrNull(line.first_down_pass),
  pass_touchdown: toBooleanOrNull(line.pass_touchdown),

  // Receiving
  receiver_player_id: line.receiver_player_id,
  receiver_player_name: line.receiver_player_name,
  receiver: line.receiver,
  receiver_id: line.receiver_id,
  receiver_jersey_number: toIntegerOrNull(line.receiver_jersey_number),
  receiving_yards: toIntegerOrNull(line.receiving_yards),
  lateral_reception: toBooleanOrNull(line.lateral_reception),
  lateral_receiver_player_id: line.lateral_receiver_player_id,
  lateral_receiver_player_name: line.lateral_receiver_player_name,
  lateral_receiving_yards: toIntegerOrNull(line.lateral_receiving_yards),

  // Scoring
  touchdown: toBooleanOrNull(line.touchdown),
  return_touchdown: toBooleanOrNull(line.return_touchdown),
  td_player_name: line.td_player_name,
  td_player_id: line.td_player_id,

  // Field Goals
  field_goal_attempt: toBooleanOrNull(line.field_goal_attempt),
  field_goal_result: line.field_goal_result,
  kick_distance: toIntegerOrNull(line.kick_distance),

  // Extra Points & Two Point
  extra_point_attempt: toBooleanOrNull(line.extra_point_attempt),
  extra_point_result: line.extra_point_result,
  two_point_attempt: toBooleanOrNull(line.two_point_attempt),
  two_point_conv_result: line.two_point_conv_result,
  defensive_two_point_attempt: toBooleanOrNull(line.defensive_two_point_attempt),
  defensive_two_point_conv: toBooleanOrNull(line.defensive_two_point_conv),
  defensive_extra_point_attempt: toBooleanOrNull(line.defensive_extra_point_attempt),
  defensive_extra_point_conv: toBooleanOrNull(line.defensive_extra_point_conv),

  // Punting
  punt_attempt: toBooleanOrNull(line.punt_attempt),
  punt_blocked: toBooleanOrNull(line.punt_blocked),
  punt_inside_twenty: toBooleanOrNull(line.punt_inside_twenty),
  punt_in_endzone: toBooleanOrNull(line.punt_in_endzone),
  punt_out_of_bounds: toBooleanOrNull(line.punt_out_of_bounds),
  punt_downed: toBooleanOrNull(line.punt_downed),
  punt_fair_catch: toBooleanOrNull(line.punt_fair_catch),
  punter_player_id: line.punter_player_id,
  punter_player_name: line.punter_player_name,
  punt_returner_player_id: line.punt_returner_player_id,
  punt_returner_player_name: line.punt_returner_player_name,
  lateral_punt_returner_player_id: line.lateral_punt_returner_player_id,
  lateral_punt_returner_player_name: line.lateral_punt_returner_player_name,

  // Kickoffs
  kickoff_attempt: toBooleanOrNull(line.kickoff_attempt),
  kickoff_inside_twenty: toBooleanOrNull(line.kickoff_inside_twenty),
  kickoff_in_endzone: toBooleanOrNull(line.kickoff_in_endzone),
  kickoff_out_of_bounds: toBooleanOrNull(line.kickoff_out_of_bounds),
  kickoff_downed: toBooleanOrNull(line.kickoff_downed),
  kickoff_fair_catch: toBooleanOrNull(line.kickoff_fair_catch),
  kicker_player_name: line.kicker_player_name,
  kicker_player_id: line.kicker_player_id,
  kickoff_returner_player_name: line.kickoff_returner_player_name,
  kickoff_returner_player_id: line.kickoff_returner_player_id,
  lateral_kickoff_returner_player_id: line.lateral_kickoff_returner_player_id,
  lateral_kickoff_returner_player_name: line.lateral_kickoff_returner_player_name,
  own_kickoff_recovery: toBooleanOrNull(line.own_kickoff_recovery),
  own_kickoff_recovery_td: toBooleanOrNull(line.own_kickoff_recovery_td),
  own_kickoff_recovery_player_id: line.own_kickoff_recovery_player_id,
  own_kickoff_recovery_player_name: line.own_kickoff_recovery_player_name,
  home_opening_kickoff: toBooleanOrNull(line.home_opening_kickoff),

  // Return Yards
  return_yards: toIntegerOrNull(line.return_yards),
  lateral_return: toBooleanOrNull(line.lateral_return),
  touchback: toBooleanOrNull(line.touchback),
  out_of_bounds: toBooleanOrNull(line.out_of_bounds),

  // Turnovers - Fumbles
  fumble: toBooleanOrNull(line.fumble),
  fumble_forced: toBooleanOrNull(line.fumble_forced),
  fumble_not_forced: toBooleanOrNull(line.fumble_not_forced),
  fumble_out_of_bounds: toBooleanOrNull(line.fumble_out_of_bounds),
  fumble_lost: toBooleanOrNull(line.fumble_lost),
  fumbled_1_team: line.fumbled_1_team,
  fumbled_1_player_id: line.fumbled_1_player_id,
  fumbled_1_player_name: line.fumbled_1_player_name,
  fumbled_2_player_id: line.fumbled_2_player_id,
  fumbled_2_player_name: line.fumbled_2_player_name,
  fumbled_2_team: line.fumbled_2_team,
  fumble_recovery_1_team: line.fumble_recovery_1_team,
  fumble_recovery_1_yards: toIntegerOrNull(line.fumble_recovery_1_yards),
  fumble_recovery_1_player_id: line.fumble_recovery_1_player_id,
  fumble_recovery_1_player_name: line.fumble_recovery_1_player_name,
  fumble_recovery_2_team: line.fumble_recovery_2_team,
  fumble_recovery_2_yards: toIntegerOrNull(line.fumble_recovery_2_yards),
  fumble_recovery_2_player_id: line.fumble_recovery_2_player_id,
  fumble_recovery_2_player_name: line.fumble_recovery_2_player_name,
  forced_fumble_player_1_team: line.forced_fumble_player_1_team,
  forced_fumble_player_1_player_id: line.forced_fumble_player_1_player_id,
  forced_fumble_player_1_player_name: line.forced_fumble_player_1_player_name,
  forced_fumble_player_2_team: line.forced_fumble_player_2_team,
  forced_fumble_player_2_player_id: line.forced_fumble_player_2_player_id,
  forced_fumble_player_2_player_name: line.forced_fumble_player_2_player_name,
  lateral_recovery: toBooleanOrNull(line.lateral_recovery),

  // Turnovers - Interceptions
  interception: toBooleanOrNull(line.interception),
  interception_player_id: line.interception_player_id,
  interception_player_name: line.interception_player_name,
  lateral_interception_player_id: line.lateral_interception_player_id,
  lateral_interception_player_name: line.lateral_interception_player_name,

  // Defense - Tackles
  solo_tackle: toBooleanOrNull(line.solo_tackle),
  solo_tackle_1_team: line.solo_tackle_1_team,
  solo_tackle_2_team: line.solo_tackle_2_team,
  solo_tackle_1_player_id: line.solo_tackle_1_player_id,
  solo_tackle_2_player_id: line.solo_tackle_2_player_id,
  solo_tackle_1_player_name: line.solo_tackle_1_player_name,
  solo_tackle_2_player_name: line.solo_tackle_2_player_name,
  assist_tackle: toBooleanOrNull(line.assist_tackle),
  assist_tackle_1_player_id: line.assist_tackle_1_player_id,
  assist_tackle_1_player_name: line.assist_tackle_1_player_name,
  assist_tackle_1_team: line.assist_tackle_1_team,
  assist_tackle_2_player_id: line.assist_tackle_2_player_id,
  assist_tackle_2_player_name: line.assist_tackle_2_player_name,
  assist_tackle_2_team: line.assist_tackle_2_team,
  assist_tackle_3_player_id: line.assist_tackle_3_player_id,
  assist_tackle_3_player_name: line.assist_tackle_3_player_name,
  assist_tackle_3_team: line.assist_tackle_3_team,
  assist_tackle_4_player_id: line.assist_tackle_4_player_id,
  assist_tackle_4_player_name: line.assist_tackle_4_player_name,
  assist_tackle_4_team: line.assist_tackle_4_team,
  tackle_with_assist: toBooleanOrNull(line.tackle_with_assist),
  tackle_with_assist_1_player_id: line.tackle_with_assist_1_player_id,
  tackle_with_assist_1_player_name: line.tackle_with_assist_1_player_name,
  tackle_with_assist_1_team: line.tackle_with_assist_1_team,
  tackle_with_assist_2_player_id: line.tackle_with_assist_2_player_id,
  tackle_with_assist_2_player_name: line.tackle_with_assist_2_player_name,
  tackle_with_assist_2_team: line.tackle_with_assist_2_team,
  tackled_for_loss: toBooleanOrNull(line.tackled_for_loss),
  tackle_for_loss_1_player_id: line.tackle_for_loss_1_player_id,
  tackle_for_loss_1_player_name: line.tackle_for_loss_1_player_name,
  tackle_for_loss_2_player_id: line.tackle_for_loss_2_player_id,
  tackle_for_loss_2_player_name: line.tackle_for_loss_2_player_name,

  // Defense - Sacks & QB Hits
  sack: toBooleanOrNull(line.sack),
  sack_player_id: line.sack_player_id,
  sack_player_name: line.sack_player_name,
  half_sack_1_player_id: line.half_sack_1_player_id,
  half_sack_1_player_name: line.half_sack_1_player_name,
  half_sack_2_player_id: line.half_sack_2_player_id,
  half_sack_2_player_name: line.half_sack_2_player_name,
  lateral_sack_player_id: line.lateral_sack_player_id,
  lateral_sack_player_name: line.lateral_sack_player_name,
  qb_hit: toBooleanOrNull(line.qb_hit),
  qb_hit_1_player_id: line.qb_hit_1_player_id,
  qb_hit_1_player_name: line.qb_hit_1_player_name,
  qb_hit_2_player_id: line.qb_hit_2_player_id,
  qb_hit_2_player_name: line.qb_hit_2_player_name,

  // Defense - Pass Defense
  pass_defense_1_player_id: line.pass_defense_1_player_id,
  pass_defense_1_player_name: line.pass_defense_1_player_name,
  pass_defense_2_player_id: line.pass_defense_2_player_id,
  pass_defense_2_player_name: line.pass_defense_2_player_name,

  // Defense - Blocked & Safety
  blocked_player_id: line.blocked_player_id,
  blocked_player_name: line.blocked_player_name,
  safety: toBooleanOrNull(line.safety),
  safety_player_name: line.safety_player_name,
  safety_player_id: line.safety_player_id,

  // Penalties
  penalty: toBooleanOrNull(line.penalty),
  penalty_player_id: line.penalty_player_id,
  penalty_player_name: line.penalty_player_name,
  penalty_yards: toIntegerOrNull(line.penalty_yards),
  penalty_type: line.penalty_type,
  first_down_penalty: toBooleanOrNull(line.first_down_penalty),
  replay_or_challenge: line.replay_or_challenge,
  replay_or_challenge_result: line.replay_or_challenge_result,

  // First Downs & Conversions
  first_down: toBooleanOrNull(line.first_down),
  third_down_converted: toBooleanOrNull(line.third_down_converted),
  third_down_failed: toBooleanOrNull(line.third_down_failed),
  fourth_down_converted: toBooleanOrNull(line.fourth_down_converted),
  fourth_down_failed: toBooleanOrNull(line.fourth_down_failed),

  // Timeouts
  timeout: toBooleanOrNull(line.timeout),
  home_timeouts_remaining: toIntegerOrNull(line.home_timeouts_remaining),
  away_timeouts_remaining: toIntegerOrNull(line.away_timeouts_remaining),
  posteam_timeouts_remaining: toIntegerOrNull(line.posteam_timeouts_remaining),
  defteam_timeouts_remaining: toIntegerOrNull(line.defteam_timeouts_remaining),

  // Scores
  home_score: toIntegerOrNull(line.home_score),
  away_score: toIntegerOrNull(line.away_score),
  total_home_score: toIntegerOrNull(line.total_home_score),
  total_away_score: toIntegerOrNull(line.total_away_score),
  posteam_score: toIntegerOrNull(line.posteam_score),
  defteam_score: toIntegerOrNull(line.defteam_score),
  score_differential: toIntegerOrNull(line.score_differential),
  posteam_score_post: toIntegerOrNull(line.posteam_score_post),
  defteam_score_post: toIntegerOrNull(line.defteam_score_post),
  score_differential_post: toIntegerOrNull(line.score_differential_post),

  // Expected Points (EP)
  no_score_prob: toFloatOrNull(line.no_score_prob),
  opp_fg_prob: toFloatOrNull(line.opp_fg_prob),
  opp_safety_prob: toFloatOrNull(line.opp_safety_prob),
  opp_td_prob: toFloatOrNull(line.opp_td_prob),
  fg_prob: toFloatOrNull(line.fg_prob),
  safety_prob: toFloatOrNull(line.safety_prob),
  td_prob: toFloatOrNull(line.td_prob),
  extra_point_prob: toFloatOrNull(line.extra_point_prob),
  two_point_conversion_prob: toFloatOrNull(line.two_point_conversion_prob),
  ep: toFloatOrNull(line.ep),
  epa: toFloatOrNull(line.epa),
  total_home_epa: toFloatOrNull(line.total_home_epa),
  total_away_epa: toFloatOrNull(line.total_away_epa),
  total_home_rush_epa: toFloatOrNull(line.total_home_rush_epa),
  total_away_rush_epa: toFloatOrNull(line.total_away_rush_epa),
  total_home_pass_epa: toFloatOrNull(line.total_home_pass_epa),
  total_away_pass_epa: toFloatOrNull(line.total_away_pass_epa),
  air_epa: toFloatOrNull(line.air_epa),
  yac_epa: toFloatOrNull(line.yac_epa),
  comp_air_epa: toFloatOrNull(line.comp_air_epa),
  comp_yac_epa: toFloatOrNull(line.comp_yac_epa),
  total_home_comp_air_epa: toFloatOrNull(line.total_home_comp_air_epa),
  total_away_comp_air_epa: toFloatOrNull(line.total_away_comp_air_epa),
  total_home_comp_yac_epa: toFloatOrNull(line.total_home_comp_yac_epa),
  total_away_comp_yac_epa: toFloatOrNull(line.total_away_comp_yac_epa),
  total_home_raw_air_epa: toFloatOrNull(line.total_home_raw_air_epa),
  total_away_raw_air_epa: toFloatOrNull(line.total_away_raw_air_epa),
  total_home_raw_yac_epa: toFloatOrNull(line.total_home_raw_yac_epa),
  total_away_raw_yac_epa: toFloatOrNull(line.total_away_raw_yac_epa),
  qb_epa: toFloatOrNull(line.qb_epa),

  // Win Probability (WP)
  wp: toFloatOrNull(line.wp),
  def_wp: toFloatOrNull(line.def_wp),
  home_wp: toFloatOrNull(line.home_wp),
  away_wp: toFloatOrNull(line.away_wp),
  wpa: toFloatOrNull(line.wpa),
  vegas_wpa: toFloatOrNull(line.vegas_wpa),
  vegas_home_wpa: toFloatOrNull(line.vegas_home_wpa),
  home_wp_post: toFloatOrNull(line.home_wp_post),
  away_wp_post: toFloatOrNull(line.away_wp_post),
  vegas_wp: toFloatOrNull(line.vegas_wp),
  vegas_home_wp: toFloatOrNull(line.vegas_home_wp),
  total_home_rush_wpa: toFloatOrNull(line.total_home_rush_wpa),
  total_away_rush_wpa: toFloatOrNull(line.total_away_rush_wpa),
  total_home_pass_wpa: toFloatOrNull(line.total_home_pass_wpa),
  total_away_pass_wpa: toFloatOrNull(line.total_away_pass_wpa),
  air_wpa: toFloatOrNull(line.air_wpa),
  yac_wpa: toFloatOrNull(line.yac_wpa),
  comp_air_wpa: toFloatOrNull(line.comp_air_wpa),
  comp_yac_wpa: toFloatOrNull(line.comp_yac_wpa),
  total_home_comp_air_wpa: toFloatOrNull(line.total_home_comp_air_wpa),
  total_away_comp_air_wpa: toFloatOrNull(line.total_away_comp_air_wpa),
  total_home_comp_yac_wpa: toFloatOrNull(line.total_home_comp_yac_wpa),
  total_away_comp_yac_wpa: toFloatOrNull(line.total_away_comp_yac_wpa),
  total_home_raw_air_wpa: toFloatOrNull(line.total_home_raw_air_wpa),
  total_away_raw_air_wpa: toFloatOrNull(line.total_away_raw_air_wpa),
  total_home_raw_yac_wpa: toFloatOrNull(line.total_home_raw_yac_wpa),
  total_away_raw_yac_wpa: toFloatOrNull(line.total_away_raw_yac_wpa),

  // Completion Probability & Pass Analytics
  cp: toFloatOrNull(line.cp),
  cpoe: toFloatOrNull(line.cpoe),
  xpass: toFloatOrNull(line.xpass),
  pass_oe: toFloatOrNull(line.pass_oe),

  // Expected Yards After Catch (xYAC)
  xyac_epa: toFloatOrNull(line.xyac_epa),
  xyac_mean_yardage: toFloatOrNull(line.xyac_mean_yardage),
  xyac_median_yardage: toFloatOrNull(line.xyac_median_yardage),
  xyac_success: toFloatOrNull(line.xyac_success),
  xyac_fd: toFloatOrNull(line.xyac_fd),

  // Series Info
  series: toIntegerOrNull(line.series),
  series_success: toBooleanOrNull(line.series_success),
  series_result: line.series_result,
  order_sequence: toFloatOrNull(line.order_sequence),

  // Drive Info
  drive: toIntegerOrNull(line.drive),
  fixed_drive: toIntegerOrNull(line.fixed_drive),
  fixed_drive_result: line.fixed_drive_result,
  drive_play_count: toIntegerOrNull(line.drive_play_count),
  drive_time_of_possession: line.drive_time_of_possession,
  drive_first_downs: toIntegerOrNull(line.drive_first_downs),
  drive_inside20: toBooleanOrNull(line.drive_inside20),
  drive_ended_with_score: toBooleanOrNull(line.drive_ended_with_score),
  drive_quarter_start: toIntegerOrNull(line.drive_quarter_start),
  drive_quarter_end: toIntegerOrNull(line.drive_quarter_end),
  drive_yards_penalized: toIntegerOrNull(line.drive_yards_penalized),
  drive_start_transition: line.drive_start_transition,
  drive_end_transition: line.drive_end_transition,
  drive_game_clock_start: line.drive_game_clock_start,
  drive_game_clock_end: line.drive_game_clock_end,
  drive_start_yard_line: line.drive_start_yard_line,
  drive_end_yard_line: line.drive_end_yard_line,
  drive_play_id_started: toIntegerOrNull(line.drive_play_id_started),
  drive_play_id_ended: toIntegerOrNull(line.drive_play_id_ended),

  // Venue & Conditions
  stadium: line.stadium,
  game_stadium: line.game_stadium,
  stadium_id: line.stadium_id,
  location: line.location,
  weather: line.weather,
  roof: line.roof,
  surface: line.surface,
  temp: toFloatOrNull(line.temp),
  wind: toFloatOrNull(line.wind),
  home_coach: line.home_coach,
  away_coach: line.away_coach,

  // Vegas Lines
  result: toFloatOrNull(line.result),
  total: toFloatOrNull(line.total),
  spread_line: toFloatOrNull(line.spread_line),
  total_line: toFloatOrNull(line.total_line),
  div_game: toBooleanOrNull(line.div_game),

  // Fantasy
  name: line.name,
  jersey_number: toIntegerOrNull(line.jersey_number),
  name_player_gsis_id: line.id,
  fantasy_player_name: line.fantasy_player_name,
  fantasy_player_id: line.fantasy_player_id,
  fantasy: line.fantasy,
  fantasy_id: line.fantasy_id,

  // Datetime fields with CASE guards
  game_date: CASE
    WHEN line.game_date IS NOT NULL AND line.game_date <> ''
    THEN date(line.game_date)
  END,
  start_time: line.start_time,
  time_of_day: line.time_of_day,
  end_clock_time: line.end_clock_time,
  drive_real_start_time: line.drive_real_start_time

} AS raw

  // Remove null/empty properties (requires APOC)
  WITH p, apoc.map.clean(raw, [], [null, '']) AS cleaned
  SET p += cleaned

} IN TRANSACTIONS OF 500 ROWS
"""

try:
    # First, create the constraint
    constraint_result = driver.execute_query(create_constraint)
    print("Constraint creation completed")

    # Load plays using session.run() for implicit transaction
    # CALL { } IN TRANSACTIONS requires auto-commit, not managed transactions
    # See: https://neo4j.com/docs/python-manual/current/query-advanced/
    with driver.session() as session:
        result = session.run(load_2025_plays)
        summary = result.consume()  # Must consume to commit
        print("Successfully loaded plays")
        print(f"Nodes created: {summary.counters.nodes_created}")
        print(f"Relationships created: {summary.counters.relationships_created}")
        print(f"Properties set: {summary.counters.properties_set}")
except Exception as e:
    print(f"ERROR: Failed to load plays: {e}")
    sys.exit(1)
