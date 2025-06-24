import { Entity } from "./Entity";
import { Label } from "../Enums/Label";

export interface Team extends Entity {
  label: Label.Team;
  properties: {
    team_id: string;
    team_name: string;
  };
}
