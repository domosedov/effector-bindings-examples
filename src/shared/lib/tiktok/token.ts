import { cookies } from 'next/headers'

import { getTiktokConfig } from './config'

const ALGORITHM = 'AES-GCM'
const IV_LENGTH = 12
const TOKEN_COOKIE = 'tiktok_token'
const REFRESH_COOKIE = 'tiktok_refresh'

async function getKey(): Promise<CryptoKey> {
  const { encryptionKey } = getTiktokConfig()
  if (!encryptionKey) throw new Error('TOKEN_ENCRYPTION_KEY is not set')

  const keyData = new Uint8Array(encryptionKey.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))

  return crypto.subtle.importKey('raw', keyData, { name: ALGORITHM }, false, ['encrypt', 'decrypt'])
}

export async function encrypt(text: string): Promise<string> {
  const key = await getKey()
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))
  const encoded = new TextEncoder().encode(text)

  const ciphertext = await crypto.subtle.encrypt({ name: ALGORITHM, iv }, key, encoded)

  const combined = new Uint8Array(iv.length + new Uint8Array(ciphertext).length)
  combined.set(iv)
  combined.set(new Uint8Array(ciphertext), iv.length)

  return btoa(String.fromCharCode(...combined))
}

export async function decrypt(encryptedText: string): Promise<string> {
  const key = await getKey()
  const combined = new Uint8Array(
    atob(encryptedText)
      .split('')
      .map((c) => c.charCodeAt(0)),
  )

  const iv = combined.slice(0, IV_LENGTH)
  const ciphertext = combined.slice(IV_LENGTH)

  const decrypted = await crypto.subtle.decrypt({ name: ALGORITHM, iv }, key, ciphertext)

  return new TextDecoder().decode(decrypted)
}

export async function setTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()
  const encryptedAccess = await encrypt(accessToken)
  const encryptedRefresh = await encrypt(refreshToken)

  cookieStore.set(TOKEN_COOKIE, encryptedAccess, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  cookieStore.set(REFRESH_COOKIE, encryptedRefresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const encrypted = cookieStore.get(TOKEN_COOKIE)?.value
  if (!encrypted) return null
  return decrypt(encrypted)
}

export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const encrypted = cookieStore.get(REFRESH_COOKIE)?.value
  if (!encrypted) return null
  return decrypt(encrypted)
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
