import { Entity } from "./Entity";
import { Label } from "../Enums/Label";

export interface Team extends Entity {
  label: Label.Team;
  properties: {
    // Team identification
    team_id: string;
    team_name: string;
  };
}
