/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    additionalData: `
      @use "src/assets/fonts/index.scss" as *;
      @use "src/styles/variables" as *;
    `,
  },
}

export default nextConfig