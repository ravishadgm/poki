"use client";

import { useEffect, useRef, useState } from "react";

export  function AdSenseTestAd () {
  const adRef = useRef(null);
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // ✅ Wait for container to have a valid width
  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width > 0) {
          setIsReady(true);
        }
      }
    };

    const observer = new ResizeObserver(checkSize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
      checkSize();
    }

    return () => observer.disconnect();
  }, []);


  

  // useEffect(() => {
  //   if (process.env.NODE_ENV !== "production") {
  //     console.warn("AdSense skipped in development.");
  //     return;
  //   }

  //   if (isReady && !hasLoaded && adRef.current) {
  //     try {
  //       adRef.current.innerHTML = "";
  //       delete adRef.current.dataset.adStatus;

  //       (window.adsbygoogle = window.adsbygoogle || []).push({});
  //       setHasLoaded(true);
  //     } catch (err) {
  //       console.error("AdSense push failed:", err);
  //     }
  //   }
  // }, [isReady, hasLoaded]);

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
      }}
    >
      {/* {process.env.NODE_ENV !== "production" ? (
        <div style={{ padding: "10px", fontSize: "12px", color: "#999" }}>
          🚧 AdSense disabled in development
        </div>
      ) : isReady ? (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "auto" }}
          data-ad-client="ca-pub-3940256099942544"  // Replace with real ID
          data-ad-slot="1234567890"                // Replace with real slot
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div style={{ fontSize: "12px", color: "#999" }}>
          ⏳ Waiting for layout...
        </div>
      )} */}
    </div>
  );
}
