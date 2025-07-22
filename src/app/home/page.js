// app/home/page.js
import ClientGameGrid from './ClientGameGrid';
import styles from './styles.module.css';

export default async function HomePage() {
  const res = await fetch('https://api.gamezop.com/v3/games', {
    headers: { Authorization: 'Bearer YOUR_API_KEY' }
  });
  const json = await res.json();
  const games = json.data || [];

  return (
    <div className={styles.container}>
      <h1>Gamezop HTML5 Games</h1>
      <ClientGameGrid games={games} />
    </div>
  );
}
