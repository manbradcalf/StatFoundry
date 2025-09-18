import { AliasType } from "../Enums/AliasType";
import { Entity } from "./Entity";

// TODO: This should be generated during generaion
export interface Coach extends Entity {
  label: AliasType.Coach;
  properties: CoachProperties;
}

export type CoachProperties = {
  name: string;
};
