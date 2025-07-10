import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3zng8i6n7.ufh.sh",
      },
    ],
  },
};

export default nextConfig;
