/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['zhzhtqcncdxoyclobrkj.supabase.co'],
  },
  // Optional: Add custom headers for PDF downloads
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig 