import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore TypeScript build errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // (Optional) Ignore SWC minify errors (if using SWC)
  // swcMinify: false,
};

export default nextConfig;
