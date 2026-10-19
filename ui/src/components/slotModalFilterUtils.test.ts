import { fillTemplate } from "../utils/slotFiller";
import { SlotType } from "../feature/Chunks/Enums/SlotType";
import {
  getFilterConditionValue,
  getFilterStatFieldKind,
  inConditionExpectsArray,
  normalizeFilterValueSlotsForSave,
} from "./slotModalFilterUtils";

describe("slotModalFilterUtils", () => {
  it("treats `in` on string-array properties as scalar membership (no array wrapping)", () => {
    const slots = [
      { Name: "value", Value: "BAL", SlotValueTypes: [SlotType.FilterValue] },
      { Name: "condition", Value: "in", SlotValueTypes: [SlotType.FilterCondition] },
      {
        Name: "stat",
        Value: "teams",
        SlotValueTypes: [SlotType.Filter],
        FieldKind: "string-array" as const,
      },
    ];

    const conditionValue = getFilterConditionValue(slots as any);
    const fieldKind = getFilterStatFieldKind(slots as any);
    const inExpectsArray = inConditionExpectsArray(conditionValue, fieldKind);
    const normalized = normalizeFilterValueSlotsForSave(slots as any, inExpectsArray);

    expect(fillTemplate("{value} IN ps.teams", normalized as any)).toBe('"BAL" IN ps.teams');
  });

  it("treats `in` on scalar properties as multi-value list membership (wraps FilterValue as array)", () => {
    const slots = [
      { Name: "stat", Value: "team", SlotValueTypes: [SlotType.Filter], FieldKind: "string" as const },
      { Name: "condition", Value: "in", SlotValueTypes: [SlotType.FilterCondition] },
      { Name: "value", Value: "KC", SlotValueTypes: [SlotType.FilterValue] },
    ];

    const inExpectsArray = inConditionExpectsArray(
      getFilterConditionValue(slots as any),
      getFilterStatFieldKind(slots as any),
    );
    const normalized = normalizeFilterValueSlotsForSave(slots as any, inExpectsArray);

    expect(fillTemplate("p.team IN {value}", normalized as any)).toBe('p.team IN ["KC"]');
  });
});

