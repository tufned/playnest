import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.extensions = [".ts", ".tsx", ".js", ".jsx"];
    config.resolve.mainFields = ["browser", "module", "main"];

    // Exclude test files from the build
    config.module.rules.push({
      test: /\.(spec|test)\.(js|jsx|ts|tsx)$/,
      loader: "ignore-loader"
    });

    return config;
  }
};

export default nextConfig;
