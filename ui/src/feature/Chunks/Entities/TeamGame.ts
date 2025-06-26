import { Entity } from "./Entity";
import { Label } from "../Enums/Label";

export interface TeamGame extends Entity {
  label: Label.TeamGame;
  properties: {
    // Team and game identification
    team_id: string;

    // Game timing
    season: number;
    week: number;
  };
}
