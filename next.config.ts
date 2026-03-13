import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000", "http://192.168.1.120:3000"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "*.spotify.com",
      },
    ],
  },
};

export default nextConfig;
