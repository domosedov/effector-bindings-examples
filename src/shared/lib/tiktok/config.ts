export const TIKTOK_API_BASE = 'https://open.tiktokapis.com/v2'
export const TIKTOK_AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize'

export const TIKTOK_SCOPES = ['user.info.basic', 'user.info.stats', 'video.list'] as const

export function getTiktokConfig() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET
  const redirectUri = process.env.TIKTOK_REDIRECT_URI ?? 'http://localhost:3000/api/tiktok/callback'

  return { clientKey, clientSecret, redirectUri }
}

export function useMocks() {
  return process.env.TIKTOK_USE_MOCKS === 'true'
}
