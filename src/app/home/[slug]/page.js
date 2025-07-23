import games from "../../../data/games";
import Link from "next/link";
import styles from "../styles.module.scss";

export default function GameDetail({ params }) {
  const game = games.find((g) => g.slug === params.slug);

  if (!game) return <div>Game not found</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <h2>{game.title}</h2>
        <iframe
          src={game.iframe}
          allowFullScreen
          title={game.title}
          width="100%"
          height="600"
        ></iframe>
      </div>

      <div className={styles.sidebar}>
        <h4>Other Games</h4>
        <div className={styles.grid}>
          {games
            .filter((g) => g.slug !== game.slug)
            .map((g) => (
              <Link key={g.slug} href={`/home/${g.slug}`} className={styles.card}>
                <img src={g.thumbnail} alt={g.title} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
