"use client";

import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./filter.module.scss";
import Header from "@/layout/Header/Page";
import Image from "next/image";
import { useRecentGames } from "@/contexts/RecentGamesContext";

export const categories = [
  { img: "/images/playboy.png", title: "2 PLAYER GAMES", slug: "puzzle-games" },
  { img: "/images/playboy.png", title: "GAMES FOR GIRLS", slug: "shooting-games" },
  { img: "/images/playboy.png", title: "PUZZLE GAMES", slug: "puzzle-games" },
  { img: "/images/playboy.png", title: "MULTIPLAYER GAMES", slug: "shooting-games" },
  { img: "/images/playboy.png", title: "SHOOTING GAMES", slug: "shooting-games" },
  { img: "/images/playboy.png", title: "CAR GAMES", slug: "puzzle-games" },
];

const sizePattern = [
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 2, rowSpan: 2 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
  { colSpan: 1, rowSpan: 1 },
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

export default function FilteredGames({ games, categoryTitle }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [gridCols, setGridCols] = useState(null);
  const router = useRouter();
  const { addToRecentGames } = useRecentGames();

  useLayoutEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width <= 480) setGridCols(2);
      else if (width <= 768) setGridCols(4);
      else if (width <= 1024) setGridCols(8);
      else if (width <= 1366) setGridCols(12);
      else if (width <= 1700) setGridCols(14);
      else setGridCols(17);
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  if (gridCols === null) return null; // Prevent early render until client screen width is known

  const occupied = {};
  const positions = [];
  const headerColSpan = 2;

  for (let c = 1; c <= headerColSpan; c++) {
    occupied[`1,${c}`] = true;
  }

  const helloCardIndex = 0;

  games.forEach((_, index) => {
    const raw =
      index === helloCardIndex
        ? { colSpan: gridCols >= 12 ? 4 : gridCols >= 6 ? 3 : 2, rowSpan: 1 }
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

  const handleGameClick = (game) => {
    addToRecentGames({
      title: game.title,
      slug: game.slug,
      image: game.thumbnail,
      video: game.video,
    });
    router.push(`/home/${game.slug}`);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.grid}
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
      >
        {/* Header */}
        <div
          className={styles.headerGridItem}
          style={{
            gridColumn: `1 / span ${headerColSpan}`,
            gridRow: `1 / span 1`,
          }}
        >
          <Header />
        </div>

        {/* Games */}
        {games.map((game, idx) => {
          const pos = positions[idx];
          const isHovered = hoveredIndex === idx;

          if (idx === helloCardIndex) {
            return (
              <div
                key="hello-card"
                className={styles.helloGridItem}
                style={{
                  gridColumn: `${pos.colStart} / span ${pos.colSpan}`,
                  gridRow: `${pos.rowStart} / span ${pos.rowSpan}`,
                }}
              >
                <p className={styles.helloText}>{categoryTitle}</p>
              </div>
            );
          }

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
              onClick={() => handleGameClick(game)}
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
                />
              )}
            </div>
          );
        })}

        {/* Categories */}
        {categories.map((cat, index) => {
          const { row, col } = findNextFreePos(occupied, 2, 1, gridCols);

          for (let r = 0; r < 1; r++) {
            for (let c = 0; c < 2; c++) {
              occupied[`${row + r},${col + c}`] = true;
            }
          }

          return (
            <div
              key={`category-${index}`}
              className={styles.categoryCard}
              style={{
                gridColumn: `${col} / span 2`,
                gridRow: `${row}`,
              }}
              onClick={() => router.push(`/categories/${cat.slug}`)}
            >
              <Image
                src={cat.img}
                alt={cat.title}
                width={40}
                height={40}
                className={styles.categoryIcon}
              />
              <span className={styles.categoryTitle}>{cat.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
