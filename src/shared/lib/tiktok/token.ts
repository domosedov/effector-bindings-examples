import { cookies } from 'next/headers'

const TOKEN_COOKIE = 'tiktok_token'
const REFRESH_COOKIE = 'tiktok_refresh'

export async function setTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()

  cookieStore.set(TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  cookieStore.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(TOKEN_COOKIE)?.value ?? null
}

export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(REFRESH_COOKIE)?.value ?? null
}

export async function hasToken(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.has(TOKEN_COOKIE)
}

export async function clearTokens() {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_COOKIE)
  cookieStore.delete(REFRESH_COOKIE)
}
