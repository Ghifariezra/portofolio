import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL?.split("://")[1] || "",
        port: "",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
