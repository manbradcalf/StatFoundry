import { Entity } from "./Entity";
import { AliasType } from "../Enums/AliasType";

export interface TeamGame extends Entity {
  label: AliasType.TeamGame;
  properties: {
    // Team and game identification
    team_id: string;

    // Game timing
    season: number;
    week: number;
  };
}
