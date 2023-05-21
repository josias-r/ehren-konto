const { InjectManifest } = require("workbox-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        new InjectManifest({
          swSrc: "./worker/index.ts",
          swDest: "../public/sw.js",
          include: ["__nothing__"],
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
