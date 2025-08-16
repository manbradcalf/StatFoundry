import React, { useEffect, useRef } from "react";

export const GoogleAd: React.FC = () => {
  const adRef = useRef<HTMLModElement>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    const timer = setTimeout(() => {
      try {
        console.log("Trying to load horizontal ad...");
        console.log("adsbygoogle available:", !!window.adsbygoogle);
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isLoaded.current = true;
        console.log("loaded horizontal ad");
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ margin: "20px 0" }}>
      {/* This is the <ins> tag from Google's snippet */}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: "inline-block", 
          width: "728px", 
          height: "90px",
          backgroundColor: "#4a4a4a",
          border: "1px solid #666",
          borderRadius: "4px"
        }}
        data-ad-client="ca-pub-9761689709275841"
        data-ad-slot="3595838843"
      />
    </div>
  );
};

