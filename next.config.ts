import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cubbyproduct.s3.us-east-2.amazonaws.com",
        pathname: "/**", // Match all paths under this domain
      },
    ],
  },
};

export default nextConfig;
