import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
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
      {
        protocol: "https",
        hostname: "cdn1.iconfinder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn2.iconfinder.com",
        port: "",
        pathname: "/**",
      },
    ],
    // unoptimized: false
  }
};

export default nextConfig;
