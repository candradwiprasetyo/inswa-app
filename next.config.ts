import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "static.promediateknologi.id",
      "spike-vue-horizontal.netlify.app",
      "202.10.35.124",
    ],
  },
  experimental: {
    typedRoutes: false,
  },
  // output: 'standalone',
};

export default nextConfig;
