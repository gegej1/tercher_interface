/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  // Vercel部署优化
  output: 'standalone',
  trailingSlash: true,
  // 静态资源优化
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
