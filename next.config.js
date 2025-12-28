/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for simple hosting
  // output: 'export',

  // Webpack config for Ink JSON files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ink\.json$/,
      type: 'json',
    });
    return config;
  },
};

module.exports = nextConfig;
