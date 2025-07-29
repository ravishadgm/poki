/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `
      @use "src/styles/variables" as *;
    `,
  },
  env: {
    CUSTOM_BASE_URL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL || 'https://poki-tan.vercel.app'
  }

}

export default nextConfig