import { SlotType } from "../feature/Chunks/Enums/SlotType";
import { Slot } from "../feature/Chunks/Types/Slot";

export function getFilterConditionValue(slots: Slot[]): string {
  return String(
    slots.find((s) => s.SlotValueTypes.includes(SlotType.FilterCondition))
      ?.Value ?? "",
  ).toLowerCase();
}

export function getFilterStatFieldKind(
  slots: Slot[],
): Slot["FieldKind"] | undefined {
  return slots.find((s) => s.SlotValueTypes.includes(SlotType.Filter))?.FieldKind;
}

export function inConditionExpectsArray(
  conditionValue: string,
  fieldKind: Slot["FieldKind"] | undefined,
): boolean {
  return conditionValue === "in" && fieldKind !== "string-array";
}

export function normalizeFilterValueSlotsForSave(
  slots: Slot[],
  inExpectsArray: boolean,
): Slot[] {
  return slots.map((s) => {
    if (!s.SlotValueTypes.includes(SlotType.FilterValue)) return s;
    if (inExpectsArray) {
      const arr = Array.isArray(s.Value)
        ? s.Value
        : s.Value
          ? [String(s.Value)]
          : [];
      return { ...s, Value: arr };
    }
    return { ...s, Value: Array.isArray(s.Value) ? s.Value[0] ?? "" : s.Value };
  });
}

