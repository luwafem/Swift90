/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Required for static export if using next/image
  },
};

module.exports = {
    output: 'export',
  };

