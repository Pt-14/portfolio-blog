import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Turbopack config
  turbopack: {},

  images: {
    // Vercel supports image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
    ],
  },

  webpack: (config, { dir }) => {
    // Restrict module resolution to project directory only
    // This prevents webpack from looking in parent directories
    const projectRoot = path.resolve(dir);
    config.resolve.modules = [
      path.resolve(projectRoot, "node_modules"),
    ];

    return config;
  },
};

export default nextConfig;
