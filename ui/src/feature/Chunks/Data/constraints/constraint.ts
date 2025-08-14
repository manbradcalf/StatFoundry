// constraint definitions
import { QueryType } from "../../Enums/QueryType";
import { SlotType } from "../../Enums/SlotType";

// TODO: this is just Chunk without Requires and Provides and Inputs. why?
export interface ConstraintDefinition {
  english: string;
  englishTemplate: string;
  cypherTemplate: string;
  queryType: QueryType;
  slots: Array<{
    name: string;
    defaultValue: string | number;
    slotType: SlotType;
  }>;
  keywords: string[];
}
