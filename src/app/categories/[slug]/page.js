import GamePlay from "@/components/GamePlay/GamePlay";
import { getGames } from "@/services/gameService";
import { notFound } from "next/navigation";
import { generateGameMetadata } from "@/utils/metadata";
import FilteredGames from "@/components/FilteredGames/FilteredGames";

export default async function GamePage({ params }) {
  const games = await getGames();
  const currentGame = games.find((game) => game.category === params.slug);
  if (!currentGame) {
    return notFound();
  }

  const filteredGames = games.filter(
    (game) =>
      game.category === currentGame.category && game.slug !== currentGame.slug
  );
  console.log(currentGame,"currentGame")
  return (
    <div style={{ padding: "20px" }}>
      <FilteredGames
        games={filteredGames}
        categoryTitle={currentGame.category || ""}
      />
    </div>
  );
}
