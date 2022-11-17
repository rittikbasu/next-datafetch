/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["jsx", "js"],
  images: {
    domains: ["robohash.org"],
  },
};

module.exports = nextConfig;
