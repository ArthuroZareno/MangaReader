import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  images: {
    domains: ["uploads.mangadex.org"], // Add Mangadex as an allowed domain
  },
};

