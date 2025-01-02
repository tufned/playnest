import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];
    config.resolve.mainFields = ['browser', 'module', 'main'];
    return config;
  }
};

export default nextConfig;
