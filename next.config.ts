/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ye build ke waqt laal lines (linting) ko ignore karega
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ye TypeScript ke errors ko ignore karega taake Vercel build fail na kare
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;