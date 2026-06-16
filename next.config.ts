import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.31.127"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
