import type { NextConfig } from 'next';
import path from 'path';

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
  images: {
    domains: ['cdn.sanity.io'],
  },
};

export default nextConfig;
