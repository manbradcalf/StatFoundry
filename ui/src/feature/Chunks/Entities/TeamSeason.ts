import { Entity } from "./Entity";
import { Label } from "../Enums/Label";

export interface TeamSeason extends Entity {
  label: Label.TeamSeason;
  properties: {
    // Team identification
    team_id: string;

    // Season information
    season: number;
  };
}
