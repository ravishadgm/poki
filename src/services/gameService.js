export async function getGames() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const timestamp = Date.now();

  const res = await fetch(`${baseUrl}/data/games.json?t=${timestamp}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch games');
  }

  return res.json();
}
