import { Entity } from "./Entity";
import { Label } from "../Enums/Label";

export interface Player extends Entity {
  label: Label.Player;
  properties: {
    // Player identification
    smart_id: string;
    gsis_id: string;
    esb_id: string;

    // Personal information
    first_name: string;
    last_name: string;
    display_name: string;
    birth_date: Date;
    birth_date_time: Date;

    // Physical attributes
    height: number;
    weight: number;

    // Position and team
    position: string;
    position_group: string;
    jersey_number: number;
    current_team_id: number;
    team_abbr: string;

    // Career information
    years_of_experience: number;
    status: string;
  };
}
