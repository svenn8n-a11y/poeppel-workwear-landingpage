import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/poeppel-workwear-landingpage',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
