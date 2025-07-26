import React, { useState } from 'react';
import Modal from 'react-modal';

interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description?: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const SaveSearchModal: React.FC<SaveSearchModalProps> = ({
  isOpen,
  onClose,
  onSave,
  loading,
  error
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    try {
      await onSave(name.trim(), description.trim() || undefined);
      // Reset form and close modal on success
      setName('');
      setDescription('');
      onClose();
    } catch (err) {
      // Error is handled by the parent component
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Save Search"
      className="slot-modal-content"
      overlayClassName="slot-modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onAfterOpen={() => {
        // Focus name input after modal opens
        const nameInput = document.getElementById('search-name') as HTMLInputElement;
        if (nameInput) {
          nameInput.focus();
        }
      }}
    >
      <h3 style={{ marginTop: 0 }}>Save Search</h3>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: 4 }}>
            Name *
          </label>
          <input
            id="search-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., SEC RBs in Snow Games"
            required
            disabled={loading}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: 4 }}>
            Description (optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description to help you remember this search..."
            rows={3}
            disabled={loading}
            style={{ width: "100%", padding: "0.5rem", resize: "vertical" }}
          />
        </div>

        {error && (
          <div style={{ 
            color: "red", 
            marginBottom: "1rem", 
            padding: "0.5rem",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "4px"
          }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
          <button 
            type="button" 
            onClick={handleClose}
            disabled={loading}
            style={{ padding: "0.5rem 1rem" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !name.trim()}
            style={{ padding: "0.5rem 1rem" }}
          >
            {loading ? 'Saving...' : 'Save Search'}
          </button>
        </div>
      </form>
    </Modal>
  );
};