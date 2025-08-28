import React from "react";
import { config } from "../config";

export const GoogleAd: React.FC = () => {
  // Don't render ads if disabled in config
  if (!config.showAds) {
    return null;
  }

  // Placeholder for ads - can be re-enabled later
  return (
    <div style={{ 
      margin: "20px 0", 
      width: "728px", 
      height: "90px",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      color: "#666"
    }}>
      Banner Ad Space
    </div>
  );
};

