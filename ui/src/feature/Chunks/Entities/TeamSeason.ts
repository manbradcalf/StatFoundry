import { Entity } from "./Entity";
import { AliasType } from "../Enums/AliasType";

export interface TeamSeason extends Entity {
  label: AliasType.TeamSeason;
  properties: {
    // Team identification
    team_id: string;

    // Season information
    season: number;
  };
}
