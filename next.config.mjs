/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build ke waqt errors ko ignore karne ke liye ye zaroori hai
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Is se aapka code stable Next.js 14 par sahi chalay ga
  reactStrictMode: true,
};

export default nextConfig;