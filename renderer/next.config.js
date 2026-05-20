/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')

const nextConfig = {
  // output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? '../app' : '.next',
  trailingSlash: true,

  images: {
    unoptimized: true, // keep static export images working
  },

  // Webpack configuration for other static assets
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|m4a)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    return config;
  },

  turbopack: {},
  i18n

  // Optional: allow external domains if fetching media from URLs
  // images: {
  //   domains: ['example.com'],
  // },
};

module.exports = nextConfig;