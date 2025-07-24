import GamePlay from "@/components/GamePlay/GamePlay";
import { notFound } from "next/navigation";

async function getGames() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;
  const res = await fetch(`${baseUrl}/data/games.json`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed to fetch games data');

  return res.json();
}

export default async function GamePage({ params }) {
  const games = await getGames();
  const game = games.find((g) => g.slug === params.slug);

  if (!game) return notFound(); 

  return <GamePlay game={game} />;
}
