import { Entity } from "./Entity";
import { Label } from "../Enums/Label";

export interface PlayerGame extends Entity {
  label: Label.PlayerGame;
  properties: {
    player: {
      player_id: string;
      player_display_name: string;
      player_game_id: string;
      position: string;
      position_group: string;
    };
    game: {
      // Basic game information
      opponent_team: string;
      game_id: string;
      week: number;
      season: number;
      recent_team: string;
      season_type: string;
    };

    // Passing statistics
    passing: {
      passing_yards: number;
      passing_tds: number;
      passing_air_yards: number;
      passing_first_downs: number;
      passing_epa: number;
      passing_2pt_conversions: boolean;
      passing_fumbles: number;
      passing_fumbles_lost: number;
      passing_fumbles_recovered: number;
      passing_fumbles_recovered_yards: number;
      passing_fumbles_recovered_tds: number;
      completions: number;
      attempts: number;
      interceptions: number;
      sacks: number;
      sack_yards: number;
      sack_fumbles: boolean;
      sack_fumbles_lost: boolean;
    };

    // Receiving statistics
    receiving: {
      receiving_yards: number;
      receptions: number;
      receiving_tds: number;
      receiving_air_yards: number;
      receiving_first_downs: number;
      receiving_epa: number;
      receiving_2pt_conversions: boolean;
      receiving_fumbles: number;
      receiving_fumbles_lost: number;
      receiving_fumbles_recovered: number;
      receiving_fumbles_recovered_yards: number;
      receiving_fumbles_recovered_tds: number;
      targets: number;
      receiving_yards_after_catch: number;
    };

    // Rushing statistics
    rushing: {
      rushing_yards: number;
      rushing_tds: number;
      rushing_air_yards: number;
      rushing_first_downs: number;
      rushing_epa: number;
      rushing_2pt_conversions: boolean;
      rushing_fumbles: number;
      rushing_fumbles_lost: number;
      rushing_fumbles_recovered: number;
      rushing_fumbles_recovered_yards: number;
      rushing_fumbles_recovered_tds: number;
      carries: number;
    };

    // Fantasy and special teams
    fantasy: {
      fantasy_points: number;
      fantasy_points_ppr: number;
    };

    special_teams: {
      special_teams_tds: number;
    };
  };
}
