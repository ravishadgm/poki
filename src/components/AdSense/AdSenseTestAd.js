"use client";

import { useEffect, useRef, useState } from "react";

export const AdSenseTestAd = () => {
  const adRef = useRef(null);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [adConfig, setAdConfig] = useState(null);

  // Define available ad sizes and their requirements
  const adSizes = [
    { width: 728, height: 90, name: "leaderboard", format: "auto", responsive: true },
    { width: 468, height: 60, name: "banner", format: "auto", responsive: true },
    { width: 320, height: 100, name: "large-mobile-banner", format: "auto", responsive: true },
    { width: 320, height: 50, name: "mobile-banner", format: "auto", responsive: true },
    { width: 300, height: 250, name: "medium-rectangle", format: "rectangle", responsive: false },
    { width: 250, height: 250, name: "square", format: "auto", responsive: false },
    { width: 200, height: 200, name: "small-square", format: "auto", responsive: false },
    { width: 180, height: 150, name: "small-rectangle", format: "auto", responsive: false },
  ];

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newSize = {
          width: Math.floor(rect.width),
          height: Math.floor(rect.height)
        };
        
        setContainerSize(newSize);
        
        // Find the best fitting ad size
        const bestFit = adSizes.find(size => 
          size.width <= newSize.width && size.height <= newSize.height
        );
        
        setAdConfig(bestFit || null);
      }
    };

    // Initial size check
    const timer = setTimeout(updateContainerSize, 100);

    // Create ResizeObserver to monitor container size changes
    const resizeObserver = new ResizeObserver(() => {
      updateContainerSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Fallback for older browsers
    const handleResize = () => {
      setTimeout(updateContainerSize, 100);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!adConfig || !adRef.current || !containerRef.current) {
      return;
    }

    try {
      const adElement = adRef.current;
      const container = containerRef.current;

      // Prevent pushing again if already loaded
      if (!adElement.dataset.adLoaded) {
        // Clear any existing ad content first
        adElement.innerHTML = '';
        
        // Remove the loaded flag to allow re-initialization
        delete adElement.dataset.adLoaded;
        delete adElement.dataset.adsbygoogleStatus;

        // Remove any existing attributes first
        adElement.removeAttribute('data-ad-format');
        adElement.removeAttribute('data-full-width-responsive');
        adElement.removeAttribute('data-ad-layout');
        
        // Set the ad size and format
        if (adConfig.responsive) {
          adElement.setAttribute('data-ad-format', adConfig.format);
          adElement.setAttribute('data-full-width-responsive', 'true');
          adElement.style.display = 'block';
          adElement.style.width = '100%';
          adElement.style.height = 'auto';
        } else {
          adElement.setAttribute('data-ad-format', adConfig.format);
          adElement.style.display = 'inline-block';
          adElement.style.width = `${adConfig.width}px`;
          adElement.style.height = `${adConfig.height}px`;
        }

        // Center the ad in the container
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';

        // Push to AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adElement.dataset.adLoaded = "true";

        // Set up container constraints after ad loads
        setTimeout(() => {
          if (container) {
            container.style.overflow = 'hidden';
            container.style.position = 'relative';
          }
        }, 200);
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [adConfig]);

  // Fallback content for containers that are too small
  if (!adConfig) {
    return (
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
          border: "2px dashed #6c757d",
          borderRadius: "8px",
          boxSizing: "border-box",
          minWidth: "150px",
          minHeight: "50px"
        }}
      >
        <div style={{
          color: "#6c757d",
          fontSize: "12px",
          textAlign: "center",
          padding: "8px"
        }}>
          {containerSize.width < 180 ? "Ad space too small" : "Loading ad..."}
          <br />
          <small style={{ fontSize: "10px" }}>
            {containerSize.width}×{containerSize.height}
          </small>
        </div>
      </div>
    );
  }

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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        minWidth: "150px",
        minHeight: "50px"
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          boxSizing: "border-box",
          position: "relative"
        }}
        data-ad-client="ca-pub-3940256099942544"
        data-ad-slot="1234567890"
      />
    </div>
  );
};