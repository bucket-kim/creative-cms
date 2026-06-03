import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["shaders"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allows all domains
      },
    ],
  },
};

export default nextConfig;
