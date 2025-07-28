import AboutPoki from "@/components/AboutPoki/AboutPoki";
import GameGrid from "@/components/GameGrid/GameGrid";
import SmallGameGrid from "@/components/SmallGameGrid/SmallGameGrid";

async function getGames() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/data/games.json`, { cache: 'no-store' });
  return res.json();
}

export default async function HomePage() {
  const games = await getGames();

  return (
    <div style={{ padding: '20px' }}>
      <GameGrid games={games} />
      <SmallGameGrid />
      <AboutPoki />
    </div >
  );
}
