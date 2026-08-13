import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["52pairing-admin.kro.kr", "54.116.7.74"],
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];

    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_PROXY_TARGET ?? "http://localhost:8081"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
