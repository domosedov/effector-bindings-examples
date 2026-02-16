import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    swcPlugins: [['@effector/swc-plugin', {}]],
  },
}

export default nextConfig
