import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "static.promediateknologi.id",
      "spike-vue-horizontal.netlify.app",
    ],
  },
  experimental: {
    typedRoutes: false,
  },
  // output: 'standalone',
};

export default nextConfig;
