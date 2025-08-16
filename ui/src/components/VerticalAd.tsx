import React, { useEffect, useRef } from "react";

export const VerticalAd: React.FC = () => {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    const timer = setTimeout(() => {
      try {
        console.log("Trying to load vertical ad...");
        console.log("adsbygoogle available:", !!window.adsbygoogle);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
        console.log("loaded vertical ad");
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ margin: "20px 0" }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: "inline-block", 
          width: "160px", 
          height: "600px",
          backgroundColor: "#4a4a4a",
          border: "1px solid #666",
          borderRadius: "4px"
        }}
        data-ad-client="ca-pub-9761689709275841"
        data-ad-slot="3178156007"
      />
    </div>
  );
};

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}