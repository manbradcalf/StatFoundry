import { Entity } from "./Entity";
import { AliasType } from "../Enums/AliasType";

export interface PlayerSeason extends Entity {
  label: AliasType.PlayerSeason;
  properties: PlayerSeasonProperties;
}

export type PlayerSeasonProperties = {
    // Basic season information
    player_id: string;
    player_name: string;
    player_season_id: string;
    season: number;
    season_type: string;
    games: number;

    // Passing statistics
    passing: {
      passing_yards: number;
      passing_tds: number;
      passing_air_yards: number;
      passing_first_downs: number;
      passing_epa: number;
      passing_2pt_conversions: boolean;
      passing_yards_after_catch: number;
      completions: number;
      attempts: number;
      interceptions: number;
      sacks: number;
      sack_yards: number;
      sack_fumbles: boolean;
      sack_fumbles_lost: number;
      yptmpa: number; // Yards per team pass attempt
      dakota: number; // Dakota rating
    };

    // Receiving statistics
    receiving: {
      receiving_yards: number;
      receptions: number;
      receiving_tds: number;
      receiving_air_yards: number;
      receiving_first_downs: number;
      receiving_epa: number;
      receiving_2pt_conversions: number;
      receiving_fumbles: number;
      receiving_fumbles_lost: number;
      receiving_yards_after_catch: number;
      targets: number;
      target_share: number;
      tgt_sh: number; // Target share
      air_yards_share: number;
      pacr: number; // Passer rating when targeted
      racr: number; // Receiver air conversion ratio
      wopr: number; // Weighted opportunity rating
      wopr_x: number; // Weighted opportunity rating
      wopr_y: number; // Weighted opportunity rating
      rtd_sh: number; // Red zone target share
      rtdfd_sh: number; // Red zone target first down share
    };

    // Rushing statistics
    rushing: {
      rushing_yards: number;
      rushing_tds: number;
      rushing_first_downs: number;
      rushing_epa: number;
      rushing_2pt_conversions: number;
      rushing_fumbles: number;
      rushing_fumbles_lost: number;
      carries: number;
      ry_sh: number; // Rushing yards share
      rfd_sh: number; // Rushing first downs share
    };

    // Fantasy statistics
    fantasy: {
      fantasy_points: number;
      fantasy_points_ppr: number;
      ppr_sh: number; // PPR share
    };

    // Advanced metrics
    advanced: {
      dom: number; // Dominator rating
      w8dom: number; // Weighted dominator rating
    };

    // Special teams
    special_teams_tds: number;
  };
