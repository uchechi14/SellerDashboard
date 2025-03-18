import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 60, // Cache images for 60 seconds to reduce unnecessary requests
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cubbyproduct.s3.us-east-2.amazonaws.com",
        pathname: "/uploads/**", // Allow all images inside /uploads/
      },
      {
        protocol: "https",
        hostname: "cubbyproduct.s3.amazonaws.com",
        pathname: "/uploads/**", // Allow all images inside /uploads/
      },
      {
        protocol: "https",
        hostname: "cubbyproduct.s3.us-east-2.amazonaws.com",
        pathname: "/**", // Allow specific image
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200], // Responsive sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Additional size options
    formats: ["image/avif", "image/webp"], // Optimize images for better performance
    dangerouslyAllowSVG: true, // Allow SVGs if needed
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Security policy
  },
};

export default nextConfig;
