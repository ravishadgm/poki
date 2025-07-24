import { AdSenseTestAd } from "@/components/AdSense/AdSenseTestAd";
import GameGrid from "@/components/GameGrid/GameGrid";

async function getGames() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/data/games.json`, { cache: 'no-store' });
  return res.json();
}

export default async function HomePage() {
  const games = await getGames();

  return (
     <GameGrid games={games} />

  );
}
