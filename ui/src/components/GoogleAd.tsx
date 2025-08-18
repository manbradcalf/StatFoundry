import React from "react";
import { Adsense } from "@ctrl/react-adsense";
import { config } from "../config";

export const GoogleAd: React.FC = () => {
  // Don't render ads if disabled in config
  if (!config.showAds) {
    return null;
  }

  return (
    <div style={{ margin: "20px 0" }}>
      <Adsense
        client="ca-pub-9761689709275841"
        slot="3595838843"
        style={{
          display: "inline-block",
          width: "728px",
          height: "90px"
        }}
        format=""
      />
    </div>
  );
};

