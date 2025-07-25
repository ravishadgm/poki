"use client";

import { useEffect, useRef } from "react";

export const AdSenseTestAd = () => {
  const adRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    try {
      if (adRef.current && containerRef.current) {
        const adElement = adRef.current;
        const container = containerRef.current;

        // Prevent pushing again if already loaded
        if (!adElement.dataset.adLoaded) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adElement.dataset.adLoaded = "true";

          // Force container constraints after ad loads
          setTimeout(() => {
            // Ensure container maintains its bounds
            container.style.overflow = 'hidden';
            container.style.position = 'relative';
            
            // Force all child elements to respect container bounds
            const allChildren = container.querySelectorAll('*');
            allChildren.forEach(child => {
              child.style.maxWidth = '100%';
              child.style.maxHeight = '100%';
              child.style.boxSizing = 'border-box';
            });
          }, 100);

          // Monitor for any DOM changes that might break containment
          const observer = new MutationObserver(() => {
            if (container) {
              container.style.overflow = 'hidden';
              const allChildren = container.querySelectorAll('*');
              allChildren.forEach(child => {
                child.style.maxWidth = '100%';
                child.style.maxHeight = '100%';
              });
            }
          });

          observer.observe(container, {
            attributes: true,
            childList: true,
            subtree: true
          });

          // Cleanup observer on unmount
          return () => observer.disconnect();
        }
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        position: "relative",
        display: "block",
        boxSizing: "border-box"
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          boxSizing: "border-box",
          position: "relative"
        }}
        data-ad-client="ca-pub-3940256099942544"
        data-ad-slot="1234567890"
        data-full-width-responsive="true"
        data-ad-format="auto"
      />
    </div>
  );
};