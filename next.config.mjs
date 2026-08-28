/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export — deploys to Vercel (or any static host) with zero server runtime.
  // Remove this line if you later want ISR / server actions / route handlers with dynamic data.
  output: "export",
  images: {
    // Required for `output: "export"`. The site ships no raster images by default anyway.
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
