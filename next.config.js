/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14 中 appDir 已经是默认的，不需要在 experimental 中设置
  env: {
    MONGODB_URI: process.env.MONGODB_URI || '',
  },
  // Vercel部署优化
  trailingSlash: true,
  // 静态资源优化
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
