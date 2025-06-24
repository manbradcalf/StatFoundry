import { Entity } from "./Entity";
import { DataType } from "./LabelsEnum";

export interface Game extends Entity {
  label: DataType.Game;
  properties: {
    home_coach: string;
    week: number;
    espn: number;
    away_coach: string;
    away_rest: number;
    weekday: string;
    div_game: boolean;
    game_type: string;
    away_qb_name: string;
    referee: string;
    stadium_id: string;
    away_team: string;
    result: number;
    total: number;
    home_qb_id: string;
    season: number;
    stadium: string;
    game_id: string;
    roof: string;
    gametime: string;
    surface: string;
    home_score: number;
    away_score: number;
    gsis: number;
    home_qb_name: string;
    away_qb_id: string;
    home_rest: number;
    old_game_id: number;
    overtime: number;
    location: string;
    home_team: string;
    spread_line: number;
    gameday: Date;
    pfr: string;
    total_line: number;
  };
}
