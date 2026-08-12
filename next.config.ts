import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js expects hostnames here (without protocol or port).
  allowedDevOrigins: ["192.168.1.49"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
