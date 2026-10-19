import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { Slot } from "../feature/Chunks/Types/Slot";
import { ENTITY_PROPERTIES } from "../feature/Chunks/SlotsTypesToEntityPropsMap";
import { SlotType } from "../feature/Chunks/Enums/SlotType";
import generatedEnums from "../feature/Chunks/Data/generated-enums.json";
import {
  getFilterConditionValue,
  getFilterStatFieldKind,
  inConditionExpectsArray,
  normalizeFilterValueSlotsForSave,
} from "./slotModalFilterUtils";

// Build-time catalog of enumerable property values, keyed by `Label.property`
// (see ui/scripts/generateEnums.js). Used to turn free-text filter values into
// dropdowns for categorical properties (e.g. team abbreviations, positions).
const ENUM_CATALOG = generatedEnums as Record<string, string[]>;

interface SlotModalProps {
  isOpen: boolean;
  slots: Slot[];
  onSave: (updatedSlots: Slot[]) => void;
  onCancel: () => void;
  title?: string;
  /** Entity label of the pending chunk (e.g. "PlayerGame"), used to resolve
   * enumerable value lists for FilterValue slots. */
  entityLabel?: string;
}

/**
 * For a FilterValue slot, returns the list of allowed values if the property it
 * filters (the sibling `stat` slot's value) is a known categorical property for
 * this entity. Returns undefined when the value should stay free-text.
 */
const getFilterFieldEnum = (
  allSlots: Slot[],
  entityLabel?: string,
): string[] | undefined => {
  if (!entityLabel) return undefined;
  const property = allSlots.find((s) => s.Name === "stat")?.Value;
  if (!property) return undefined;
  return ENUM_CATALOG[`${entityLabel}.${property}`];
};

const getEnumValuesForSlot = (
  slot: Slot,
  allSlots: Slot[],
  entityLabel?: string,
): string[] | undefined => {
  if (!slot.SlotValueTypes.includes(SlotType.FilterValue)) return undefined;
  return getFilterFieldEnum(allSlots, entityLabel);
};

// Operators offered per field kind:
// - categorical (enum) scalar fields support membership against a multi-value list
// - free-text strings support equality and substring match
// - numeric fields support comparisons, plus `in` when an enum list exists
//   (e.g. season, week)
// - string-array fields represent list properties, so `in` is a scalar membership
//   check ({value} IN property) and must *not* wrap FilterValue as a list.
const CATEGORICAL_OPERATORS = ["=", "<>", "in"];
const STRING_OPERATORS = ["=", "<>", "contains"];
const STRING_ARRAY_OPERATORS = ["in"];
const SCALAR_OPERATORS = [">", ">=", "=", "<", "<=", "<>"];

const getOperatorsForFilter = (
  allSlots: Slot[],
  entityLabel?: string,
): string[] => {
  const statSlot = allSlots.find((s) =>
    s.SlotValueTypes.includes(SlotType.Filter),
  );
  const hasEnum = Boolean(getFilterFieldEnum(allSlots, entityLabel));
  if (statSlot?.FieldKind === "string-array") return STRING_ARRAY_OPERATORS;
  if (statSlot?.FieldKind === "numeric")
    return hasEnum ? [...SCALAR_OPERATORS, "in"] : SCALAR_OPERATORS;
  if (hasEnum) return CATEGORICAL_OPERATORS;
  return statSlot?.FieldKind === "string" ? STRING_OPERATORS : SCALAR_OPERATORS;
};

/**
 * Renders a simple full-screen overlay modal that allows the user to edit
 * values for each Slot in a Chunk. All slots are shown simultaneously so the
 * user can fill them in one go.
 */
export const SlotModal: React.FC<SlotModalProps> = ({
  isOpen,
  slots,
  onSave,
  onCancel,
  title = "Fill in values",
  entityLabel,
}) => {
  // we keep local copy so that edits don't mutate the parent state until save
  const [localSlots, setLocalSlots] = useState<Slot[]>([]);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const firstSelectRef = useRef<HTMLSelectElement>(null);

  // Update local slots when slots prop changes
  useEffect(() => {
    setLocalSlots(slots.map((s) => ({ ...s })));
  }, [slots]);

  const conditionValue = getFilterConditionValue(localSlots);
  const inExpectsArray = inConditionExpectsArray(
    conditionValue,
    getFilterStatFieldKind(localSlots),
  );

  const handleChange = (index: number, newValue: string | string[]) => {
    setLocalSlots((prev) => {
      const updated = [...prev];
      const original = prev[index];
      updated[index] = { ...original, Value: newValue };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Match each FilterValue's shape to its operator: list-valued `in` uses an
    // array, scalar membership `in` (for string-array properties) uses a scalar.
    const normalized = normalizeFilterValueSlotsForSave(localSlots, inExpectsArray);
    onSave(normalized);
  };

  const renderSlotInput = (slot: Slot, idx: number) => {
    const isFirstInput = idx === 0;

    // Check if this slot type has property options available
    const properties = slot.SlotValueTypes.flatMap(
      (type) => ENTITY_PROPERTIES[type],
    );

    // Special handling for Filter slots - they should be read-only when pre-filled
    const isFilterSlot = slot.SlotValueTypes.includes(SlotType.Filter);
    const isPreFilled = slot.Value && slot.Value !== "";

    // Condition operators depend on the filtered field's kind: categorical
    // fields offer membership (incl. `in`), numeric/other fields offer
    // comparisons (no `in`).
    if (slot.SlotValueTypes.includes(SlotType.FilterCondition)) {
      const operators = getOperatorsForFilter(localSlots, entityLabel);
      return (
        <select
          ref={isFirstInput ? firstSelectRef : undefined}
          value={String(slot.Value ?? "")}
          onChange={(e) => handleChange(idx, e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          {operators.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      );
    }

    // For a FilterValue slot whose filtered property is categorical, offer a
    // dropdown of the valid stored values instead of a free-text box.
    const enumValues = getEnumValuesForSlot(slot, localSlots, entityLabel);
    if (enumValues && enumValues.length > 0) {
      // For the `in` operator, allow selecting multiple values (stored as an
      // array, compiled to a Cypher list literal).
      if (inExpectsArray) {
        const selected: string[] = Array.isArray(slot.Value)
          ? slot.Value.map((v) => String(v))
          : slot.Value
            ? [String(slot.Value)]
            : [];
        const toggle = (v: string) =>
          handleChange(
            idx,
            selected.includes(v)
              ? selected.filter((x) => x !== v)
              : [...selected, v],
          );
        return (
          <div
            style={{
              maxHeight: "12rem",
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "0.5rem",
            }}
          >
            {enumValues.map((v) => (
              <label
                key={v}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(v)}
                  onChange={() => toggle(v)}
                />
                {v}
              </label>
            ))}
          </div>
        );
      }

      return (
        <select
          ref={isFirstInput ? firstSelectRef : undefined}
          value={Array.isArray(slot.Value) ? slot.Value[0] ?? "" : String(slot.Value ?? "")}
          onChange={(e) => handleChange(idx, e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">Select a value...</option>
          {enumValues.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      );
    }

    if (properties && properties.length > 0) {
      return (
        <select
          ref={isFirstInput ? firstSelectRef : undefined}
          value={slot.Value || ""}
          onChange={(e) => handleChange(idx, e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">Select a property...</option>
          {properties.map((property) => (
            <option key={property} value={property}>
              {property}
            </option>
          ))}
        </select>
      );
    }

    // Make Filter slots read-only when they have pre-filled values
    if (isFilterSlot && isPreFilled) {
      return (
        <input
          type="text"
          value={slot.Value}
          readOnly
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#f5f5f5",
            color: "#666",
          }}
        />
      );
    }

    // Default to text/number input for other slot types
    return (
      <input
        ref={isFirstInput ? firstInputRef : undefined}
        type="text"
        value={slot.Value}
        onChange={(e) => handleChange(idx, e.target.value)}
        style={{ width: "100%", padding: "0.5rem" }}
      />
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel={title}
      className="slot-modal-content"
      overlayClassName="slot-modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onAfterOpen={() => {
        // Focus first input after modal opens
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        } else if (firstSelectRef.current) {
          firstSelectRef.current.focus();
        }
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <form onSubmit={handleSubmit}>
        {localSlots.map((slot, idx) => {
          // Create more user-friendly labels
          const getSlotLabel = (slot: Slot) => {
            if (slot.SlotValueTypes.includes(SlotType.Filter)) {
              return "Property";
            }
            if (slot.SlotValueTypes.includes(SlotType.FilterCondition)) {
              return "Condition";
            }
            if (slot.SlotValueTypes.includes(SlotType.FilterValue)) {
              return "Value";
            }
            return slot.Name;
          };

          return (
            <div key={slot.Name} style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: 4 }}>
                {getSlotLabel(slot)}
              </label>
              {renderSlotInput(slot, idx)}
            </div>
          );
        })}

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: "0.5rem 1rem" }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            style={{ padding: "0.5rem 1rem" }}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};
