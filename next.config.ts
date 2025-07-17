import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["static.promediateknologi.id"],
  },
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
