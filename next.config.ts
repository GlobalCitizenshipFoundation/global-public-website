import type { NextConfig } from 'next';
const path = require('path');

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.ts$/,
        include: path.resolve(__dirname, 'cms'),
        loader: 'ignore-loader',
      });
    }
    return config;
  },
};

export default nextConfig;
