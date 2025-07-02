import { Entity } from "./Entity";
import { Label } from "../Enums/Label";

export interface Game extends Entity {
  label: Label.Game;
  properties: {
    // Basic game information
    game_id: string;
    old_game_id: number;
    gsis: number;
    pfr: string;
    espn: number;

    // Date and time
    gameday: Date;
    gametime: string;
    weekday: string;
    week: number;
    season: number;
    game_type: string;

    // Teams and results
    home_team: string;
    away_team: string;
    home_score: number;
    away_score: number;
    result: number;
    overtime: number;

    // Quarterbacks
    home_qb_id: string;
    home_qb_name: string;
    away_qb_id: string;
    away_qb_name: string;

    // Coaches
    home_coach: string;
    away_coach: string;

    // Rest and preparation
    home_rest: number;
    away_rest: number;

    // Venue and conditions
    stadium_id: string;
    stadium: string;
    location: string;
    surface: string;
    roof: string;

    // Officials
    referee: string;

    // Betting and analytics
    spread_line: number;
    total: number;
    total_line: number;

    // Game context
    div_game: boolean;
  };
}
