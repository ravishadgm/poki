export async function getGames() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    return [];
  }

  const timestamp = Date.now();
  const url = `${baseUrl}/data/games.json?t=${timestamp}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data;

  } catch (err) {
    console.error('❌ Exception while fetching games:', err);
    return [];
  }
}
