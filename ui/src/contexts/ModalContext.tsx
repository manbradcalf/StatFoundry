import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { Slot } from "../feature/Chunks/Types/Slot";
import { SlotModal } from "../components/SlotModal";
import { ReturnPropertySelector } from "../components/ReturnPropertySelector";
import { buildFilledChunk } from "../utils/slotFiller";
import { useChainContext } from "./ChainContext";
import { QueryType } from "../feature/Chunks/Enums/QueryType";

interface ModalContextType {
  // State
  isSlotModalOpen: boolean;
  isReturnPropertySelectorOpen: boolean;
  pendingChunk: Chunk | null;
  pendingSlots: Slot[];
  editingChunkIndex: number | null;
  insertingAtIndex: number | null;

  // Actions
  openSlotModal: (
    chunk: Chunk,
    slots: Slot[],
    editingIndex?: number,
    insertAtIndex?: number,
  ) => void;
  closeSlotModal: () => void;
  handleSlotModalSave: (updatedSlots: Slot[]) => void;
  handleSlotModalCancel: () => void;
  setInsertingAtIndex: (index: number | null) => void;
  openReturnSelectorForSearch: () => void;
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
  const [isReturnPropertySelectorOpen, setIsReturnPropertySelectorOpen] = useState(false);
  const [pendingChunk, setPendingChunk] = useState<Chunk | null>(null);
  const [pendingSlots, setPendingSlots] = useState<Slot[]>([]);
  const [editingChunkIndex, setEditingChunkIndex] = useState<number | null>(
    null,
  );
  const [insertingAtIndex, setInsertingAtIndex] = useState<number | null>(null);

  const openSlotModal = useCallback(
    (
      chunk: Chunk,
      slots: Slot[],
      editingIndex?: number,
      insertAtIndex?: number,
    ) => {
      setPendingChunk(chunk);
      setPendingSlots(slots);
      setEditingChunkIndex(editingIndex ?? null);
      setInsertingAtIndex(insertAtIndex ?? null);

      // Open ReturnPropertySelector for RETURN chunks
      if (chunk.QueryType === QueryType.RETURN) {
        setIsReturnPropertySelectorOpen(true);
      } else {
        setIsSlotModalOpen(true);
      }
    },
    [],
  );

  const closeSlotModal = useCallback(() => {
    setIsSlotModalOpen(false);
    setIsReturnPropertySelectorOpen(false);
    setPendingChunk(null);
    setPendingSlots([]);
    setEditingChunkIndex(null);
    setInsertingAtIndex(null);
  }, []);

  const openReturnSelectorForSearch = useCallback(() => {
    // Create a RETURN chunk to open the ReturnPropertySelector
    const returnChunk: Chunk = {
      QueryType: QueryType.RETURN,
      English: "Return",
      Cypher: "",
      Slots: [{ Name: "properties", Value: "", SlotValueTypes: [] }],
      Requires: [],
      Provides: [],
    };
    setPendingChunk(returnChunk);
    setPendingSlots(returnChunk.Slots);
    setIsReturnPropertySelectorOpen(true);
  }, []);

  const handleSlotModalSave = useCallback(
    (updatedSlots: Slot[]) => {
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
    },
    [
      pendingChunk,
      editingChunkIndex,
      insertingAtIndex,
      chainContext,
      closeSlotModal,
    ],
  );

  const handleSlotModalCancel = useCallback(() => {
    closeSlotModal();
  }, [closeSlotModal]);

  // Handler for saving selected properties from ReturnPropertySelector
  const handleReturnPropertiesSave = useCallback(
    (selectedProperties: string[]) => {
      if (!pendingChunk) {
        closeSlotModal();
        return;
      }

      // Build the chunk with selected properties stored in the slot value
      const updatedSlots: Slot[] = [
        {
          Name: "properties",
          Value: selectedProperties.join(", "),
          SlotValueTypes: pendingChunk.Slots?.[0]?.SlotValueTypes || [],
        },
      ];
      const chunkWithSlots = { ...pendingChunk, Slots: updatedSlots } as Chunk;

      // Update the English to show selected count
      const filledChunk: Chunk = {
        ...chunkWithSlots,
        English: `Return ${selectedProperties.length} columns`,
      };

      // Add the chunk to the chain
      if (editingChunkIndex !== null) {
        chainContext.updateChunkAtIndex(editingChunkIndex, filledChunk);
      } else if (insertingAtIndex !== null) {
        chainContext.insertChunk(insertingAtIndex, filledChunk);
        setInsertingAtIndex(null);
      } else {
        chainContext.appendChunk(filledChunk);
      }

      closeSlotModal();
    },
    [pendingChunk, editingChunkIndex, insertingAtIndex, chainContext, closeSlotModal]
  );

  const value: ModalContextType = {
    // State
    isSlotModalOpen,
    isReturnPropertySelectorOpen,
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
    openReturnSelectorForSearch,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <SlotModal
        isOpen={isSlotModalOpen}
        slots={pendingSlots}
        onSave={handleSlotModalSave}
        onCancel={handleSlotModalCancel}
        title={
          value.pendingChunk !== null
            ? `Edit ${value.pendingChunk?.English}`
            : "Fill in values"
        }
      />
      <ReturnPropertySelector
        isOpen={isReturnPropertySelectorOpen}
        aliases={chainContext.chain.Aliases}
        onSave={handleReturnPropertiesSave}
        onCancel={handleSlotModalCancel}
      />
    </ModalContext.Provider>
  );
};

