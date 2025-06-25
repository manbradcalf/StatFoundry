import React, { useState } from "react";
import { Slot } from "../feature/Chunks/Types/Slot";
import { SlotType } from "../feature/Chunks/Enums/SlotType";

interface SlotModalProps {
  slots: Slot[];
  onSave: (updatedSlots: Slot[]) => void;
  onCancel: () => void;
  title?: string;
}

// Modular property definitions for each entity type
const ENTITY_PROPERTIES: Record<SlotType, string[]> = {
  [SlotType.SelectPlayerProperty]: [
    'smart_id',
    'birth_date',
    'birth_date_time',
    'last_name',
    'weight',
    'years_of_experience',
    'current_team_id',
    'display_name',
    'team_abbr',
    'position_group',
    'gsis_id',
    'esb_id',
    'position',
    'jersey_number',
    'first_name',
    'status',
    'height'
  ],
  [SlotType.SelectPlayerGameProperty]: [
    'opponent_team',
    'rushing_first_downs',
    'week',
    'passing_yards_after_catch',
    'rushing_yards',
    'fantasy_points',
    'receiving_2pt_conversions',
    'targets',
    'rushing_tds',
    'player_id',
    'season_type',
    'rushing_fumbles_lost',
    'receptions',
    'fantasy_points_ppr',
    'passing_air_yards',
    'receiving_tds',
    'season',
    'receiving_air_yards',
    'player_display_name',
    'rushing_2pt_conversions',
    'receiving_yards',
    'sack_yards',
    'receiving_fumbles_lost',
    'attempts',
    'rushing_fumbles',
    'game_id',
    'special_teams_tds',
    'passing_2pt_conversions',
    'receiving_fumbles',
    'receiving_first_downs',
    'completions',
    'passing_first_downs',
    'recent_team',
    'interceptions',
    'passing_yards',
    'position_group',
    'sack_fumbles_lost',
    'carries',
    'passing_tds',
    'rushing_epa',
    'player_game_id',
    'position',
    'sack_fumbles',
    'sacks',
    'receiving_yards_after_catch'
  ],
  [SlotType.SelectPlayerSeasonProperty]: [
    'rushing_first_downs',
    'passing_yards_after_catch',
    'receiving_epa',
    'rushing_yards',
    'rfd_sh',
    'fantasy_points_ppr',
    'pacr',
    'receiving_tds',
    'games',
    'season',
    'yptmpa',
    'rushing_2pt_conversions',
    'sack_yards',
    'attempts',
    'target_share',
    'tgt_sh',
    'special_teams_tds',
    'w8dom',
    'receiving_fumbles',
    'receiving_first_downs',
    'passing_first_downs',
    'passing_yards',
    'sack_fumbles_lost',
    'wopr_x',
    'ry_sh',
    'passing_tds',
    'ppr_sh',
    'dom',
    'rtd_sh',
    'fantasy_points',
    'passing_epa',
    'receiving_2pt_conversions',
    'targets',
    'rushing_tds',
    'player_id',
    'season_type',
    'rushing_fumbles_lost',
    'receptions',
    'passing_air_yards',
    'receiving_air_yards',
    'receiving_yards',
    'rtdfd_sh',
    'receiving_fumbles_lost',
    'rushing_fumbles',
    'dakota',
    'passing_2pt_conversions',
    'completions',
    'racr',
    'air_yards_share',
    'interceptions',
    'carries',
    'rushing_epa',
    'sack_fumbles',
    'sacks',
    'receiving_yards_after_catch',
    'player_season_id'
  ],
  [SlotType.SelectPlayerPosition]: [
    'QB',
    'RB',
    'WR',
    'TE',
    'K',
  ],
  // Placeholder for future entity types - will be extended as needed
  [SlotType.SelectTeamProperty]: [],
  [SlotType.SelectGameProperty]: [],
  [SlotType.SelectSeasonProperty]: [],
  [SlotType.SelectTeamGameProperty]: [],
  [SlotType.SelectTeamSeasonProperty]: [],
  [SlotType.Filter]: [],
  [SlotType.FilterOperator]: [],
  [SlotType.FilterValue]: [],
};

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

  const renderSlotInput = (slot: Slot, idx: number) => {
    // Check if this slot type has property options available
    const properties = ENTITY_PROPERTIES[slot.SlotType];
    
    if (properties && properties.length > 0) {
      return (
        <select
          value={slot.Value || ''}
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

    // Default to text/number input for other slot types
    return (
      <input
        type={typeof slot.Value === "number" ? "number" : "text"}
        value={slot.Value}
        onChange={(e) => handleChange(idx, e.target.value)}
        style={{ width: "100%", padding: "0.5rem" }}
      />
    );
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
                {slot.SlotType}
              </label>
              {renderSlotInput(slot, idx)}
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