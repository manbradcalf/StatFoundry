import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { Slot } from "../feature/Chunks/Types/Slot";
import { SlotModal } from "../components/SlotModal";
import { buildFilledChunk } from "../utils/slotFiller";
import { useChainContext } from "./ChainContext";

interface ModalContextType {
  // State
  isSlotModalOpen: boolean;
  pendingChunk: Chunk | null;
  pendingSlots: Slot[];
  editingChunkIndex: number | null;
  insertingAtIndex: number | null;

  // Actions
  openSlotModal: (chunk: Chunk, slots: Slot[], editingIndex?: number, insertAtIndex?: number) => void;
  closeSlotModal: () => void;
  handleSlotModalSave: (updatedSlots: Slot[]) => void;
  handleSlotModalCancel: () => void;
  setInsertingAtIndex: (index: number | null) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const chainContext = useChainContext();
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [pendingChunk, setPendingChunk] = useState<Chunk | null>(null);
  const [pendingSlots, setPendingSlots] = useState<Slot[]>([]);
  const [editingChunkIndex, setEditingChunkIndex] = useState<number | null>(null);
  const [insertingAtIndex, setInsertingAtIndex] = useState<number | null>(null);

  const openSlotModal = useCallback((
    chunk: Chunk, 
    slots: Slot[], 
    editingIndex?: number,
    insertAtIndex?: number
  ) => {
    setPendingChunk(chunk);
    setPendingSlots(slots);
    setEditingChunkIndex(editingIndex ?? null);
    setInsertingAtIndex(insertAtIndex ?? null);
    setIsSlotModalOpen(true);
  }, []);

  const closeSlotModal = useCallback(() => {
    setIsSlotModalOpen(false);
    setPendingChunk(null);
    setPendingSlots([]);
    setEditingChunkIndex(null);
    setInsertingAtIndex(null);
  }, []);

  const handleSlotModalSave = useCallback((updatedSlots: Slot[]) => {
    if (!pendingChunk) {
      closeSlotModal();
      return;
    }

    // Build the chunk with filled slots
    const chunkWithSlots = { ...pendingChunk, Slots: updatedSlots } as Chunk;
    const filled = buildFilledChunk(chunkWithSlots);

    // Directly handle the three cases using chainContext
    if (editingChunkIndex !== null) {
      // Editing existing chunk
      chainContext.updateChunkAtIndex(editingChunkIndex, filled);
    } else if (insertingAtIndex !== null) {
      // Inserting at specific index
      chainContext.insertChunk(insertingAtIndex, filled);
      setInsertingAtIndex(null);
    } else {
      // Adding new chunk
      chainContext.appendChunk(filled);
    }

    closeSlotModal();
  }, [pendingChunk, editingChunkIndex, insertingAtIndex, chainContext, closeSlotModal]);

  const handleSlotModalCancel = useCallback(() => {
    closeSlotModal();
  }, [closeSlotModal]);

  const value: ModalContextType = {
    // State
    isSlotModalOpen,
    pendingChunk,
    pendingSlots,
    editingChunkIndex,
    insertingAtIndex,

    // Actions
    openSlotModal,
    closeSlotModal,
    handleSlotModalSave,
    handleSlotModalCancel,
    setInsertingAtIndex,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <SlotModal
        isOpen={isSlotModalOpen}
        slots={pendingSlots}
        onSave={handleSlotModalSave}
        onCancel={handleSlotModalCancel}
        title={editingChunkIndex !== null ? "Edit chunk" : "Fill in values"}
      />
    </ModalContext.Provider>
  );
};