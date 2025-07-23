"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import Header from "@/layout/Header/Page";
import Image from "next/image";

const sizePattern = [
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

export default function GamePlay({ game }) {
  const [extraGames, setExtraGames] = useState([]);
  const [gridCols, setGridCols] = useState(17);
  const router = useRouter();

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

  useEffect(() => {
    async function fetchGames() {
      const res = await fetch("/data/games.json");
      const data = await res.json();
      const filtered = data.filter((g) => g.slug !== game.slug);
      setExtraGames(filtered.slice(0, 100));
    }
    fetchGames();
  }, [game.slug]);

  const occupied = {};
  const elements = [];

  // Static Elements
  const staticElements = [
    {
      type: "header",
      colSpan: 2,
      rowSpan: 1,
      content: <Header />,
    },
   {
  type: "iframe",
  colSpan: 9,
  rowSpan: 5,
  content: (
    <div className={styles.player}>
      <iframe src={game.iframe} title={game.title} allowFullScreen />
    </div>
  ),
},

    {
      type: "left-sidebar",
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
    {
      type: "blue-div-1",
      colSpan:4,
      rowSpan: 4,
      content: <div className={styles.blueDiv}></div>,
    },
    {
      type: "blue-div-2",
      colSpan: 2,
      rowSpan: 5,
      content: <div className={styles.blueDiv}></div>,
    },
  ];

  staticElements.forEach((item) => {
    const { colSpan, rowSpan } = item;
    const pos = findNextFreePos(occupied, colSpan, rowSpan, gridCols);

    for (let r = 0; r < rowSpan; r++) {
      for (let c = 0; c < colSpan; c++) {
        occupied[`${pos.row + r},${pos.col + c}`] = true;
      }
    }

    elements.push({ ...item, ...pos });
  });

  // Extra Games
  let extraGameCount = 0;
  extraGames.slice(6).forEach((g, index) => {
    if (extraGameCount === 10) {
      const pos = findNextFreePos(occupied, 8, 1, gridCols);
      for (let r = 0; r < 1; r++) {
        for (let c = 0; c < 8; c++) {
          occupied[`${pos.row + r},${pos.col + c}`] = true;
        }
      }
      elements.push({
        type: "horizontal-blue-div",
        colSpan: 8,
        rowSpan: 1,
        ...pos,
        content: <div className={styles.horizontalBlueDiv}></div>,
      });
    }

    if (extraGameCount === 15) {
      const pos = findNextFreePos(occupied, 2, 3, gridCols);
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 2; c++) {
          occupied[`${pos.row + r},${pos.col + c}`] = true;
        }
      }
      elements.push({
        type: `tall-blue-div`,
        colSpan: 2,
        rowSpan: 3,
        ...pos,
        content: <div className={styles.tallBlueDiv}></div>,
      });
    }

    const pattern = sizePattern[index % sizePattern.length];
    const colSpan = Math.min(pattern.colSpan, gridCols);
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

    extraGameCount++;
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
