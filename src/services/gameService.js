export async function getGames() {
 const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 console.log('🔍 Base URL:', baseUrl);
 
 if (!baseUrl) {
   console.error('❌ NEXT_PUBLIC_BASE_URL is not defined');
   return [];
 }
 
 const timestamp = Date.now();
 const url = `${baseUrl}/data/games.json?t=${timestamp}`;
 console.log('🔍 Fetching URL:', url);

 try {
   const res = await fetch(url, { cache: 'no-store' });

   if (!res.ok) {
     console.error(`❌ HTTP error! status: ${res.status}`);
     return [];
   }

   const data = await res.json();
   console.log('✅ Data fetched successfully');
   return data;

 } catch (err) {
   console.error('❌ Exception while fetching games:', err);
   return [];
 }
}