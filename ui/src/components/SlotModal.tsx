import React, { useState } from "react";
import { Slot } from "../feature/Chunks/Types/Chunk";

interface SlotModalProps {
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
  slots,
  onSave,
  onCancel,
  title = "Fill in values",
}) => {
  // we keep local copy so that edits don't mutate the parent state until save
  const [localSlots, setLocalSlots] = useState<Slot[]>(() =>
    slots.map((s) => ({ ...s }))
  );

  const handleChange = (index: number, newValue: string) => {
    setLocalSlots((prev) => {
      const updated = [...prev];
      const original = prev[index];
      const parsedValue = typeof original.Value === "number" ? Number(newValue) : newValue;
      updated[index] = { ...original, Value: parsedValue };
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localSlots);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "1.5rem",
          borderRadius: 8,
          minWidth: 300,
          maxWidth: "90vw",
        }}
      >
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        <form onSubmit={handleSubmit}>
          {localSlots.map((slot, idx) => (
            <div key={slot.Name} style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: 4 }}>
                {slot.Name}
              </label>
              <input
                type={typeof slot.Value === "number" ? "number" : "text"}
                value={slot.Value}
                onChange={(e) => handleChange(idx, e.target.value)}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
            <button type="button" onClick={onCancel} style={{ padding: "0.5rem 1rem" }}>
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
      </div>
    </div>
  );
};