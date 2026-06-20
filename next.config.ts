import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/product-tag/:brand*',
        destination: '/brands/:brand',
        permanent: true,
      },
      {
        source: '/product-category/vapes:path*',
        destination: '/vapes',
        permanent: true,
      },
      {
        source: '/product-category/hookah:path*',
        destination: '/hookah',
        permanent: true,
      },
      {
        source: '/shop:path*',
        destination: '/vapes',
        permanent: true,
      },
      {
        source: '/category/:brand*',
        destination: '/brands/:brand',
        permanent: true,
      },
    ];
  },
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
