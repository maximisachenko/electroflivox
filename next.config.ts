/* eslint-disable */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Полностью отключаем ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Можешь также отключить TypeScript если хочешь
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // The 'staticWorkerRequestDeduping' property does not exist in the 'ExperimentalConfig' type.
  // Therefore, it has been removed from the 'experimental' object.
  experimental: {},
};

export default nextConfig;
