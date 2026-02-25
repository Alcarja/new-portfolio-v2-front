import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["j10y235gwq.ufs.sh"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "116.203.109.157",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};
export default nextConfig;
