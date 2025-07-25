"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Header from "@/layout/Header/Page";
import Image from "next/image";
import { AdSenseTestAd } from "../AdSense/AdSenseTestAd";
import { useRecentGames } from "@/contexts/RecentGamesContext";

export const BlueAd = () => (
  <div className={styles.adWrapper}>
    <AdSenseTestAd />
  </div>
);

export const TallAd = () => (
  <div className={styles.tallAdWrapper}>
    <AdSenseTestAd />
  </div>
);

const sizePattern = new Array(50).fill({ colSpan: 1, rowSpan: 1 });
const MAX_ROWS = 100;

function findNextFreePos(occupied, colSpan, rowSpan, gridCols) {
  for (let row = 1; row < MAX_ROWS; row++) {
    for (let col = 1; col <= gridCols - colSpan + 1; col++) {
      let fits = true;
      for (let dRow = 0; dRow < rowSpan; dRow++) {
        for (let dCol = 0; dCol < colSpan; dCol++) {
          if (occupied[`${row + dRow},${col + dCol}`]) {
            fits = false;
            break;
          }
        }
        if (!fits) break;
      }
      if (fits) return { row, col };
    }
  }
  return { row: 1, col: 1 };
}

export default function GamePlay({ game }) {
  const router = useRouter();
  const [extraGames, setExtraGames] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [gridCols, setGridCols] = useState(14);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSidebar, setHoveredSidebar] = useState(null);
  const { addToRecentGames } = useRecentGames();
  const handleGameClick = (gameToPlay) => {
    addToRecentGames({
      title: gameToPlay.title,
      slug: gameToPlay.slug,
      image: gameToPlay.thumbnail,
      video: gameToPlay.video,
      thumbnail: gameToPlay.thumbnail
    });
    router.push(`/home/${gameToPlay.slug}`);
  };
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w <= 480) setGridCols(2);
      else if (w <= 768) setGridCols(4);
      else if (w <= 1024) setGridCols(8);
      else if (w <= 1366) setGridCols(12);
      else if (w <= 1700) setGridCols(14);
      else setGridCols(17);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/data/games.json");
        const data = await res.json();
        setExtraGames(data.filter((g) => g.slug !== game.slug));
      } catch (e) {
        console.error("Cannot fetch games", e);
      }
    })();
  }, [game.slug]);

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>Loading…</div>
      </div>
    );
  }

  const occupied = {};
  const elements = [];
  const isTablet = gridCols <= 8;
  const isBig = gridCols >= 14;

  const staticElements = [
    {
      type: "header",
      col: 1,
      row: 1,
      colSpan: isTablet ? gridCols : 2,
      rowSpan: 1,
      content: <Header />,
    },

    {
      type: "iframe",
      col: isTablet ? 1 : 3,
      row: isTablet ? 2 : 1,
      colSpan: isTablet
        ? gridCols
        : isBig
          ? Math.min(8, gridCols - 5)
          : Math.min(10, gridCols - 4),
      rowSpan: isTablet ? 5 : 6,
      content: (
        <div className={styles.player}>
          <iframe
            src={game.iframe}
            title={game.title}
            allowFullScreen
            className={styles.desktopIframe}
            frameBorder="0"
            scrolling="no"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ),
    },
    {
      type: "after-iframe-ad",
      col: isTablet ? 1 : 3,
      row: isTablet ? 7 : 7,
      colSpan: isTablet
        ? gridCols
        : isBig
          ? Math.min(8, gridCols - 5)
          : Math.min(10, gridCols - 4),
      rowSpan: 2,
      content: <BlueAd />,
    },
    ...(gridCols > 8
      ? [
        {
          type: "left-sidebar",
          col: 1,
          row: 2,
          colSpan: 2,
          rowSpan: 8,
          content: (
            <div className={styles.leftSidebar}>
              {extraGames.slice(0, 6).map((g, idx) => (
                <div
                  key={idx}
                  className={styles.sidebarGameCard}
                  onMouseEnter={() => setHoveredSidebar(idx)}
                  onMouseLeave={() => setHoveredSidebar(null)}
                  onClick={() => handleGameClick(g)}
                >
                  {hoveredSidebar === idx && g.video ? (
                    <video
                      src={game.video}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className={styles.videoPreview}
                    />
                  ) : (
                    <Image
                      src={g.thumbnail}
                      alt={g.title}
                      fill
                      className={styles.sidebarImage}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
              ))}
            </div>
          ),
        },
      ]
      : []),
    ...(isBig
      ? [
        {
          type: "tall-ad",
          col: 11,
          row: 1,
          colSpan: 2,
          rowSpan: 6,
          content: <TallAd />,
        },
      ]
      : []),
  ];

  staticElements.forEach((item) => {
    for (let r = 0; r < item.rowSpan; r++) {
      for (let c = 0; c < item.colSpan; c++) {
        occupied[`${item.row + r},${item.col + c}`] = true;
      }
    }
    elements.push(item);
  });

  const startIndex = gridCols > 8 ? 6 : 0;
  extraGames.slice(startIndex).forEach((g, i) => {
    const pat = sizePattern[i % sizePattern.length];
    const colSpan = Math.min(pat.colSpan, Math.floor(gridCols / 4));
    const rowSpan = pat.rowSpan;
    const pos = findNextFreePos(occupied, colSpan, rowSpan, gridCols);

    for (let r = 0; r < rowSpan; r++)
      for (let c = 0; c < colSpan; c++)
        occupied[`${pos.row + r},${pos.col + c}`] = true;

    elements.push({ type: "game", game: g, colSpan, rowSpan, ...pos });
  });

  return (
    <div className={styles.responsiveContainer}>
      <div className={styles.mobileLayout}>
        <div className={styles.mobileHeader}>
          <Header />
        </div>

        <div className={styles.mobilePlayer}>
          <iframe
            src={game.iframe}
            title={game.title}
            allowFullScreen
            className={styles.mobileIframe}
            frameBorder="0"
            scrolling="no"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        <div className={styles.mobileAfterIframeAd}>
          <BlueAd />
        </div>

        <div
          className={styles.mobileGrid}
          style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        >
          {extraGames.map((g, idx) => (
            <div
              key={idx}
              className={styles.mobileGameCard}
              onClick={() => handleGameClick(g)}
            >
              <Image
                src={g.thumbnail}
                alt={g.title}
                fill
                className={styles.gameImage}
                style={{ objectFit: "cover" }}
              />
              <div className={styles.gameTitle}>{g.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.desktopLayout}>
        <div
          className={styles.grid}
          style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        >
          {elements.map((el, idx) => (
            <div
              key={`${el.type}-${idx}`}
              className={
                el.type === "header"
                  ? styles.headerGridItem
                  : el.type === "left-sidebar"
                    ? styles.leftSidebarContainer
                    : el.type === "after-iframe-ad"
                      ? styles.afterIframeAdCard
                      : el.type === "tall-ad"
                        ? styles.tallAdCard
                        : styles.card
              }
              style={{
                gridColumn: `${el.col} / span ${el.colSpan}`,
                gridRow: `${el.row} / span ${el.rowSpan}`,
                aspectRatio: el.type === "game" ? "1 / 1" : "auto",
              }}
              onMouseEnter={() =>
                el.type === "game" ? setHoveredIndex(idx) : null
              }
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                if (el.type === "game") {
                  // router.push(`/home/${el.game.slug}`);
                  handleGameClick(el.game);
                }
              }}
            >
              {el.type === "game" ? (
                hoveredIndex === idx && el.game.video ? (
                  <video
                    src={el.game.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className={styles.videoPreview}
                  />
                ) : (
                  <Image
                    src={el.game.thumbnail}
                    alt={el.game.title}
                    fill
                    className={styles.gameImage}
                    style={{ objectFit: "cover" }}
                  />
                )
              ) : (
                el.content
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}