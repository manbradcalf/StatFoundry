/**
 * Common styling patterns used across components
 */

export const commonStyles = {
  // Empty state styling
  emptyState: {
    color: "#888",
    textAlign: "center" as const,
  },

  // Error message styling
  errorMessage: {
    color: "red",
  },

  // Info text styling
  infoText: {
    color: "#64748b",
    fontSize: "14px",
    marginTop: "12px",
    textAlign: "center" as const,
  },
} as const;
