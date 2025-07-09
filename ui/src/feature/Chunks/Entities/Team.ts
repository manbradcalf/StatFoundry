import { Entity } from "./Entity";
import { AliasType } from "../Enums/AliasType";

export interface Team extends Entity {
  label: AliasType.Team;
  properties: {
    // Team identification
    team_id: string;
    team_name: string;
  };
}
