import { SlotType } from "../Enums/SlotType";

export type Slot = {
  Name: string;
  Value: any;
  SlotValueTypes: SlotType[];
  /** For Filter (stat) slots: the underlying Neo4j type of the filtered
   * property, stamped at generation time by generateChunks.js. Drives which
   * condition operators the UI offers. Absent on non-filter slots. */
  FieldKind?: "numeric" | "string";
};
