import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        destination: '/editor',
        permanent: false,
        source: '/',
      },
    ];
  },

  webpack(config) {
    config.resolve.alias['@'] = path.resolve('./src');
    return config;
  },
};

export default nextConfig;