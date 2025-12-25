import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "scontent.fhan14-1.fna.fbcdn.net",
            },
        ],
    },
};

export default nextConfig;
