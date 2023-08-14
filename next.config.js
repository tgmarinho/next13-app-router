/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  experimental: {
    serverActions: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['i.dummyjson.com', 'demo.vercel.store', 'firebasestorage.googleapis.com']
  },
  typescript: {
    ignoreBuildErrors: true //remove it latter
  }
};
