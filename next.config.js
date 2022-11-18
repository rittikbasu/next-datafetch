/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["jsx", "js"],
  images: {
    domains: ["robohash.org", "photos.angel.co", "angel.co"],
  },
};

module.exports = nextConfig;
