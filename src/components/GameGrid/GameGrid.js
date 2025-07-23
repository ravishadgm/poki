"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

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
  const [selectedGame, setSelectedGame] = useState(null);
  const [gridCols, setGridCols] = useState(17);


  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width <= 480) setGridCols(2);
      else if (width <= 768) setGridCols(4);
      else if (width <= 1024) setGridCols(8);
      else setGridCols(17);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const occupied = {};
  const positions = [];

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
    <>
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
        {games.map((game, idx) => {
          const pos = positions[idx];
          return (
            <div
              key={`${game.title}-${idx}`}
              className={styles.card}
              style={{
                gridColumn: `${pos.colStart} / span ${pos.colSpan}`,
                gridRow: `${pos.rowStart} / span ${pos.rowSpan}`,
              }}
              onClick={() => setSelectedGame(game)}
            >
              <img src={game.thumbnail} alt={game.title} />
            </div>
          );
        })}
      </div>

      {selectedGame && (
        <div className={styles.player}>
          <h2>{selectedGame.title}</h2>
          <iframe
            src={selectedGame.iframe}
            allowFullScreen
            title={selectedGame.title}
          ></iframe>
        </div>
      )}
    </>
  );
}
