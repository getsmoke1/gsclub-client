import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // bypass Vercel image optimizer (Hobby plan quota); R2 images already optimized
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "getsmoke.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.getsmoke.com",
      },
      {
        protocol: "https",
        hostname: "pub-e2c8a53d84f146beb67cf9ee9a8f4961.r2.dev",
      },
    ],
  },
};

export default nextConfig;
