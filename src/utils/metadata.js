import APP_CONFIG from "./config";


export function generateGameMetadata(game) {
  if (!game) {
    return {
    title: `Game Not Found - ${APP_CONFIG.appName}`, // ← This treats it as a plain string; no interpolation
      description: "Sorry, the game you're looking for was not found.",
    };
  }

  return {
    title: `${game.title} - Play Online | ${APP_CONFIG.appName}`,
    description: `Play ${game.title} online for free on ${APP_CONFIG.appName}. Enjoy hours of fun!`,
    openGraph: {
      title: `${game.title} - Play Online | ${APP_CONFIG.appName}`,
      description: `Play ${game.title} online for free on ${APP_CONFIG.appName}.`,
      images: game.image ? [game.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} - Play Online | ${APP_CONFIG.appName}`,
      description: `Play ${game.title} online for free on ${APP_CONFIG.appName}.`,
      images: game.image ? [game.image] : [],
    },
  };
}
