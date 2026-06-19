import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.31.127"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
