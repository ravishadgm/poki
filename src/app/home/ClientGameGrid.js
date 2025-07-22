// app/home/ClientGameGrid.jsx
'use client';
import { useState } from 'react';
import styles from './styles.module.css';

export default function ClientGameGrid({ games }) {
  const [activeUrl, setActiveUrl] = useState(null);

  return (
    <>
      <div className={styles.grid}>
        {games.map((g) => (
          <div key={g.code} className={styles.card}>
            <img
              src={g.images.thumb}
              alt={g.name}
              onClick={() =>
                setActiveUrl(activeUrl === g.url ? null : g.url)
              }
            />
            <h3>{g.name}</h3>

            {activeUrl === g.url && (
              <iframe
                src={g.url}
                width="100%"
                height="500px"
                frameBorder="0"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
