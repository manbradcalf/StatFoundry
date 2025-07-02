import { SlotType } from "../Enums/SlotType";

export type Slot = {
  Name: string;
  Value: any;
  SlotValueTypes: SlotType[];
};
