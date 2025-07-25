"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Header from "@/layout/Header/Page";
import Image from "next/image";

const sizePattern = [
  { colSpan: 2, rowSpan: 1 },
  { colSpan: 3, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 2 },
];

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

export default function GameGrid({ games }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [gridCols, setGridCols] = useState(17);
  const router = useRouter();

  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;

      if (width <= 480) setGridCols(2); // Mobile
      else if (width <= 768) setGridCols(4); // Tablet
      else if (width <= 1024) setGridCols(8);
      else if (width <= 1366) setGridCols(12); // Medium Laptop
      else if (width <= 1700) setGridCols(14); // Large Laptop
      else setGridCols(17); // Desktop or ultrawide
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const occupied = {};
  const positions = [];

  const headerColSpan = Math.min(2, gridCols);
  const headerRowSpan = 1;

  for (let r = 0; r < headerRowSpan; r++) {
    for (let c = 0; c < headerColSpan; c++) {
      occupied[`${1 + r},${1 + c}`] = true;
    }
  }

  const bottomRowCount = gridCols;
  const topGamesCount = games.length - bottomRowCount;

  games.forEach((_, index) => {
    const isBottomRow = index >= topGamesCount;
    const raw = isBottomRow
      ? { colSpan: 1, rowSpan: 1 }
      : sizePattern[index % sizePattern.length];

    const colSpan = Math.min(raw.colSpan, gridCols);
    const rowSpan = raw.rowSpan;

    const { row, col } = findNextFreePos(occupied, colSpan, rowSpan, gridCols);

    for (let r = 0; r < rowSpan; r++) {
      for (let c = 0; c < colSpan; c++) {
        occupied[`${row + r},${col + c}`] = true;
      }
    }

    positions.push({ colStart: col, rowStart: row, colSpan, rowSpan });
  });

  return (
    <div className={styles.container}>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
      >
        <div
          className={styles.headerGridItem}
          style={{
            gridColumn: `1 / span ${headerColSpan}`,
            gridRow: `1 / span ${headerRowSpan}`,
          }}
        >
          <Header />
        </div>

        {games.map((game, idx) => {
          const pos = positions[idx];
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={`${game.title}-${idx}`}
              className={styles.card}
              style={{
                gridColumn: `${pos.colStart} / span ${pos.colSpan}`,
                gridRow: `${pos.rowStart} / span ${pos.rowSpan}`,
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => router.push(`/home/${game.slug}`)}
            >
              {isHovered && game.video ? (
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
                  src={game.thumbnail}
                  alt={game.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className={styles.cardImage}
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
