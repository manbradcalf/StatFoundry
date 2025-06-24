import { Entity } from "./Entity";
import { Label } from "../Enums/Label";

export interface TeamSeason extends Entity {
  label: Label.TeamSeason;
  properties: {
    team_id: string;
    season: number;
  };
}
