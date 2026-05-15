/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.externals.push({
      canvas: 'canvas',
    });
    return config;
  },
}

module.exports = nextConfig;
