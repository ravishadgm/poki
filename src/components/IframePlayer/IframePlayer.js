"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import styles from "./IframePlayer.module.scss";

const IframePlayer = ({ src, title, className = "", isMobile = false }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef(null);
  const iframeRef = useRef(null);


  const toggleFullscreen = useCallback(async () => {
    if (!playerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }, []);


  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (isFullscreen && iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({ type: "END_GAME" }, "*");
    }
  }, [isFullscreen]);

  return (
    <div className={`${styles.iframePlayerWrapper} ${className}`}>
      <div
        ref={playerRef}
        className={`${styles.iframePlayer} ${isMobile ? styles.mobile : styles.desktop
          } ${isFullscreen ? styles.fullscreen : ""}`}
      >
        <iframe
          ref={iframeRef}
          src={src}
          title={title}
          className={styles.gameIframe}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />


        {isFullscreen && (
          <div className={styles.fullscreenBottomControls}>
            <div className={styles.gameTitle}>{title}</div>
            <button
              onClick={toggleFullscreen}
              className={`${styles.controlBtn} ${styles.minimizeBtn}`}
              title="Exit Fullscreen"
            >
              <X size={24} />
            </button>
          </div>
        )}
      </div>


      {!isFullscreen && (
        <div className={styles.externalControls}>
          <div className={styles.controlsContainer}>
            <div className={styles.gameTitle}>{title}</div>
            <button
              onClick={toggleFullscreen}
              className={`${styles.controlBtn} ${styles.fullscreen}`}
              title="Fullscreen"
            >
              <span className={styles.controlIcon}>⛶</span>
              <span className={styles.controlLabel}>Fullscreen</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IframePlayer;
