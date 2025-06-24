import { Entity } from "./Entity";
import { Label } from "../Enums/Label";

export interface TeamGame extends Entity {
  label: Label.TeamGame;
  properties: {
    team_id: string;
    season: number;
    week: number;
  };
}
