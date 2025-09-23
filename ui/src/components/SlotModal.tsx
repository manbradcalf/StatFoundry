import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { Slot } from "../feature/Chunks/Types/Slot";
import { ENTITY_PROPERTIES } from "../feature/Chunks/SlotsTypesToEntityPropsMap";
import { SlotType } from "../feature/Chunks/Enums/SlotType";

interface SlotModalProps {
  isOpen: boolean;
  slots: Slot[];
  onSave: (updatedSlots: Slot[]) => void;
  onCancel: () => void;
  title?: string;
}

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
}) => {
  // we keep local copy so that edits don't mutate the parent state until save
  const [localSlots, setLocalSlots] = useState<Slot[]>([]);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const firstSelectRef = useRef<HTMLSelectElement>(null);

  // Update local slots when slots prop changes
  useEffect(() => {
    setLocalSlots(slots.map((s) => ({ ...s })));
  }, [slots]);

  const handleChange = (index: number, newValue: string) => {
    setLocalSlots((prev) => {
      const updated = [...prev];
      const original = prev[index];
      updated[index] = { ...original, Value: newValue };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localSlots);
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
