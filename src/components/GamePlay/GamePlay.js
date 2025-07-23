"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Header from "@/layout/Header/Page";
import Image from "next/image";

// Reusable Blue Ad Component
const BlueAd = () => (
  <div className={styles.blueDiv}>
    Right Side Ad (Visible on all devices)
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
  const [extraGames, setExtraGames] = useState([]);
  const [gridCols, setGridCols] = useState(14);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setGridCols(2);
        setIsMobile(true);
      } else if (width <= 768) {
        setGridCols(4);
        setIsMobile(true);
      } else if (width <= 1024) {
        setGridCols(8);
        setIsMobile(false);
      } else if (width <= 1366) {
        setGridCols(12);
        setIsMobile(false);
      } else if (width <= 1700) {
        setGridCols(14);
        setIsMobile(false);
      } else {
        setGridCols(17);
        setIsMobile(false);
      }
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/data/games.json");
        const data = await res.json();
        const filtered = data.filter((g) => g.slug !== game.slug);
        setExtraGames(filtered.slice(0, 100));
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    }
    fetchGames();
  }, [game.slug]);

  const occupied = {};
  const elements = [];

  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <Header />
        </div>

        <div className={styles.mobilePlayer}>
          <iframe
            src={game.iframe}
            title={game.title}
            allowFullScreen
            className={styles.mobileIframe}
          />
        </div>

        {/* Blue Ad below iframe on mobile */}
        <div className={styles.mobileAd}>
          <BlueAd />
        </div>

        <div className={styles.mobileAd}>
          <div className={styles.adContainer}>
            <span className={styles.adLabel}>Advertisement</span>
            <div className={styles.adContent}>Bottom Banner Ad</div>
          </div>
        </div>

        <div
          className={styles.mobileGrid}
          style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
        >
          {extraGames.map((g, index) => (
            <div
              key={`mobile-game-${g.slug}-${index}`}
              className={styles.mobileGameCard}
              onClick={() => router.push(`/home/${g.slug}`)}
            >
              <Image
                src={g.thumbnail}
                alt={g.title}
                fill
                style={{ objectFit: "cover" }}
                className={styles.gameImage}
              />
              <div className={styles.gameTitle}>{g.title}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const staticElements = [
    {
      type: "header",
      col: 1,
      row: 1,
      colSpan: gridCols <= 8 ? gridCols : 2,
      rowSpan: 1,
      content: <Header />,
    },
    {
      type: "iframe",
      col: gridCols <= 8 ? 1 : 3,
      row: gridCols <= 8 ? 2 : 1,
      colSpan: gridCols <= 8 ? gridCols : Math.min(10, gridCols - 4),
      rowSpan: gridCols <= 8 ? 4 : 5,
      content: (
        <div className={styles.player}>
          <iframe
            src={game.iframe}
            title={game.title}
            allowFullScreen
            className={styles.desktopIframe}
          />
        </div>
      ),
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
                {extraGames.slice(0, 6).map((sideGame, idx) => (
                  <div
                    key={`sidebar-${sideGame.slug}-${idx}`}
                    className={styles.sidebarGameCard}
                    onClick={() => router.push(`/home/${sideGame.slug}`)}
                  >
                    <Image
                      src={sideGame.thumbnail}
                      alt={sideGame.title}
                      fill
                      className={styles.sidebarImage}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),

    // ✅ Blue Ad always included
    {
      type: "blue-div",
      col: gridCols - 1,
      row: 1,
      colSpan: 2,
      rowSpan: 6,
      content: <BlueAd />,
    },

    {
      type: "bottom-ad",
      col: gridCols <= 8 ? 1 : 3,
      row: gridCols <= 8 ? 6 : 6,
      colSpan: gridCols <= 8 ? gridCols : Math.min(10, gridCols - 4),
      rowSpan: 1,
      content: (
        <div className={styles.adContainer}>
          <span className={styles.adLabel}>Advertisement</span>
          <div className={styles.adContent}>Bottom Banner Ad</div>
        </div>
      ),
    },
  ];

  staticElements.forEach((item) => {
    const { row, col, rowSpan, colSpan } = item;
    for (let r = 0; r < rowSpan; r++) {
      for (let c = 0; c < colSpan; c++) {
        occupied[`${row + r},${col + c}`] = true;
      }
    }
    elements.push(item);
  });

  const startIndex = gridCols > 8 ? 6 : 0;
  extraGames.slice(startIndex).forEach((g, index) => {
    const pattern = sizePattern[index % sizePattern.length];
    const colSpan = Math.min(pattern.colSpan, Math.floor(gridCols / 4));
    const rowSpan = pattern.rowSpan;
    const pos = findNextFreePos(occupied, colSpan, rowSpan, gridCols);

    for (let r = 0; r < rowSpan; r++) {
      for (let c = 0; c < colSpan; c++) {
        occupied[`${pos.row + r},${pos.col + c}`] = true;
      }
    }

    elements.push({
      type: "game",
      game: g,
      colSpan,
      rowSpan,
      ...pos,
    });
  });

  return (
    <div className={styles.container}>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
      >
        {elements.map((el, idx) => (
          <div
            key={`${el.type}-${idx}`}
            className={
              el.type === "left-sidebar"
                ? styles.leftSidebarContainer
                : styles.card
            }
            style={{
              gridColumn: `${el.col} / span ${el.colSpan}`,
              gridRow: `${el.row} / span ${el.rowSpan}`,
              aspectRatio: el.type === "game" ? "1 / 1" : "auto",
            }}
            onClick={() => {
              if (el.type === "game") {
                router.push(`/home/${el.game.slug}`);
              }
            }}
          >
            {el.type === "game" ? (
              <Image
                src={el.game.thumbnail}
                alt={el.game.title}
                fill
                style={{ objectFit: "cover" }}
                className={styles.gameImage}
              />
            ) : el.type === "header" ? (
              <div className={styles.headerGridItem}>{el.content}</div>
            ) : (
              el.content
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
