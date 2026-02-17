import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    swcPlugins: [['@effector/swc-plugin', {}]],
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
}

export default nextConfig
