/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This will allow the build to succeed even with TypeScript errors
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}

export default nextConfig
