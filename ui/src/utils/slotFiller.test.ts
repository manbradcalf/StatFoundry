import { fillTemplate } from "./slotFiller";
import { SlotType } from "../feature/Chunks/Enums/SlotType";

describe("fillTemplate", () => {
  it("replaces single placeholder with provided value", () => {
    const template = "Player position is {position}";
    const slots = [{ Name: "position", Value: "QB" }];
    const result = fillTemplate(template, slots);
    expect(result).toBe('Player position is "QB"');
  });

  it("replaces multiple placeholders with provided values", () => {
    const template = "WHERE p.{property} {operator} $value";
    const slots = [
      { Name: "property", Value: "weight" },
      { Name: "operator", Value: ">=" },
    ];
    const result = fillTemplate(template, slots);
    expect(result).toBe("WHERE p.weight >= $value");
  });

  it("handles repeated placeholders", () => {
    const template = "Between {min} and {max} and again {min}";
    const slots = [
      { Name: "min", Value: 1 },
      { Name: "max", Value: 10 },
    ];
    const result = fillTemplate(template, slots);
    expect(result).toBe("Between 1 and 10 and again 1");
  });

  it("renders array slot values as Cypher list literals", () => {
    const template = "WHERE p.team IN {value}";
    const slots = [{ Name: "value", Value: ["KC", "SF"] }];
    const result = fillTemplate(template, slots);
    expect(result).toBe('WHERE p.team IN ["KC", "SF"]');
  });

  it("renders numeric-field list elements as numbers", () => {
    const template = "WHERE g.{stat} IN {value}";
    const slots = [
      {
        Name: "stat",
        Value: "season",
        SlotValueTypes: [SlotType.Filter],
        FieldKind: "numeric" as const,
      },
      {
        Name: "value",
        Value: ["2025", "2026"],
        SlotValueTypes: [SlotType.FilterValue],
      },
    ];
    const result = fillTemplate(template, slots);
    expect(result).toBe("WHERE g.season IN [2025, 2026]");
  });

  it("keeps string-field list elements quoted even when numeric-looking", () => {
    const template = "WHERE p.{stat} IN {value}";
    const slots = [
      {
        Name: "stat",
        Value: "jersey_number",
        SlotValueTypes: [SlotType.Filter],
        FieldKind: "string" as const,
      },
      { Name: "value", Value: ["12"], SlotValueTypes: [SlotType.FilterValue] },
    ];
    const result = fillTemplate(template, slots);
    expect(result).toBe('WHERE p.jersey_number IN ["12"]');
  });
});
