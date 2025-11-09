import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Webpack fallback for production builds
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

export default nextConfig;
