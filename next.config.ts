import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jaime-alcaraz.es",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
