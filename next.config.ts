import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // GitHub Pages configuration
  output: 'export',
  basePath: '/portfolio-blog',
  assetPrefix: '/portfolio-blog',
  trailingSlash: true,
  
  // Turbopack config (empty to silence warning, using webpack for module resolution fix)
  turbopack: {},
  
  images: {
    unoptimized: true, // Required for GitHub Pages
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
