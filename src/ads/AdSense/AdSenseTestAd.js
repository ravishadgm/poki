"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AdSenseTestAd
 *
 * This component is temporarily **disabled for AdSense**.
 * After Google approval, you can uncomment the code inside
 * the useEffect to re-enable real ads.
 */

export function AdSenseTestAd() {
  const adRef = useRef(null);
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // ✅ Wait for container to have a valid width
  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 0) setIsReady(true);
      }
    };

    const observer = new ResizeObserver(checkSize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
      checkSize();
    }

    return () => observer.disconnect();
  }, []);

  // ⚠️ Temporarily disabled AdSense
  useEffect(() => {
    if (isReady && !hasLoaded && adRef.current) {
      console.log("AdSense is temporarily disabled.");

      // === Uncomment this section after approval to enable ads ===
      /*
      try {
        // Clear any previous ad content
        adRef.current.innerHTML = "";
        delete adRef.current.dataset.adStatus;

        // Push ad to load
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setHasLoaded(true);
      } catch (err) {
        console.error("AdSense push failed:", err);
      }
      */
    }
  }, [isReady, hasLoaded]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        background: "#f5f5f5",
      }}
    >
      {/* Placeholder shown while ads are disabled */}
      <div style={{ padding: "10px", fontSize: "12px", color: "#999" }}>
        🚧 AdSense temporarily disabled
      </div>

      {/*
        Once ready to enable:
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "auto" }}
          data-ad-client="ca-pub-3940256099942544" // Replace with your real ID
          data-ad-slot="1234567890"                // Replace with your real slot
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
    </div>
  );
}
