

export function generateGameMetadata(game) {
  if (!game) {
    return {
      title: "Game Not Found - Poki",
      description: "Sorry, the game you're looking for was not found.",
    };
  }

  return {
    title: `${game.title} - Play Online | Poki`,
    description: `Play ${game.title} online for free on Poki. Enjoy hours of fun!`,
    openGraph: {
      title: `${game.title} - Play Online | Poki`,
      description: `Play ${game.title} online for free on Poki.`,
      images: game.image ? [game.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} - Play Online | Poki`,
      description: `Play ${game.title} online for free on Poki.`,
      images: game.image ? [game.image] : [],
    },
  };
}
