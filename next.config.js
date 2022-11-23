/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["jsx", "js"],
  images: {
    unoptimized: true,
    domains: ["robohash.org", "photos.angel.co", "angel.co"],
  },
};

module.exports = nextConfig;
