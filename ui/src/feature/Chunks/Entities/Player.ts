import { Entity } from "./Entity";

export interface Player extends Entity {
  name: "Player";
  properties: {
    smart_id: string;
    birth_date: Date;
    birth_date_time: Date;
    last_name: string;
    weight: number;
    years_of_experience: number;
    current_team_id: number;
    display_name: string;
    team_abbr: string;
    position_group: string;
    gsis_id: string;
    esb_id: string;
    position: string;
    jersey_number: number;
    first_name: string;
    status: string;
    height: number;
  };
}
