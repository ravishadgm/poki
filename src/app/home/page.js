import AboutPoki from "@/components/AboutPoki/AboutPoki";
import GameShowcase from "@/components/GameShowcase/GameShowcase";
import SmallGameGrid from "@/components/GameCategories/GameCategories";
import { getGames } from "@/services/gameService";

export default async function HomePage() {
  const games = await getGames();

  return (
    <div style={{ padding: '20px' }}>
      <GameShowcase games={games} />
      <SmallGameGrid />
      <AboutPoki />
    </div>
  );
}
