

import GamePlay from "@/components/GamePlay/GamePlay";
import { getGames } from "@/services/gameService";
import { notFound } from "next/navigation";
import { generateGameMetadata } from "@/utils/metadata";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const games = await getGames();
  const game = games.find((g) => g.slug === slug);

  return generateGameMetadata(game);
}

export default async function GamePage({ params }) {
  const { slug } = await params;
  const games = await getGames();
  const game = games.find((g) => g.slug === slug);

  if (!game) return notFound();

  return (
    <div style={{ padding: "20px" }}>
      <GamePlay game={game} />
    </div>
  );
}
