import type { Account, Audience, FollowerTrendPoint, VideosResponse } from './types'

export const tiktokKeys = {
  account: ['tiktok', 'account'] as const,
  followerTrend: ['tiktok', 'followerTrend'] as const,
  videos: ['tiktok', 'videos'] as const,
  audience: ['tiktok', 'audience'] as const,
}

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`TikTok API error: ${res.status}`)
  return res.json() as Promise<T>
}

export function fetchAccount() {
  return fetchApi<{ account: Account; followerTrend: FollowerTrendPoint[] }>('/api/tiktok/account')
}

export function fetchVideos() {
  return fetchApi<VideosResponse>('/api/tiktok/videos')
}

export function fetchAudience() {
  return fetchApi<Audience>('/api/tiktok/audience')
}
