import React from "react";

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
  title?: string;
}

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  isExpanded,
  onClick,
  title = "Expand",
}) => {
  return (
    <button className="expand-button" onClick={onClick} title={title}>
      {isExpanded ? "▼" : "▶"}
    </button>
  );
};
