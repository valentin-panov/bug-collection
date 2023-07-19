/** @type {import("next").NextConfig} */
require("dotenv").config();

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  env: {
    ATLAS_URL: process.env.ATLAS_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "*",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
