import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', // Enables static site generation/export
  trailingSlash: true, // Adds trailing slashes to URLs
  images: {
    unoptimized: true, // Required for static exports
  },
  // Optional: Base path if deploying to subdirectory (e.g., /docs)
  // basePath: '/your-subdirectory',
  
  // Optional: Rewrites/redirects for static export
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ]
  },
  
  // Optional: Environment variables
  env: {
    API_URL: process.env.API_URL,
  },
  
  // Optional: Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side only configurations
      config.resolve.fallback = { fs: false }
    }
    return config
  },
}

export default nextConfig