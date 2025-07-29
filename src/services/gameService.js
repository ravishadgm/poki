export async function getGames() {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://poki-tan.vercel.app'; // hardcoded for production

  try {
    const res = await fetch(`${baseUrl}/data/games.json`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`❌ Failed to fetch games: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('❌ Error fetching games:', error.message);
    return [];
  }
}
