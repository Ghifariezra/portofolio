import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fegnkzxvhxnbvqkhuzfo.supabase.co",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
