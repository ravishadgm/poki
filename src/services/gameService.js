export async function getGames() {
  const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      const port = typeof window !== 'undefined'
        ? window.location.port
        : process.env.PORT || '3000';
      return `http://localhost:${port}`;
    }
    return 'https://gameworlds.vercel.app';
  };

  try {
    const res = await fetch(`${getBaseUrl()}/data/games.json`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`❌ Failed to fetch games: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}