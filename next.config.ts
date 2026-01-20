import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGithubActions ? '/poeppel-workwear-landingpage' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
