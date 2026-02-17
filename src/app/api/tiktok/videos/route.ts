import { mockVideosResponse } from '@/app/tiktok/_shared/mock-data'
import { TIKTOK_API_BASE, useMocks } from '@/shared/lib/tiktok/config'
import { getAccessToken } from '@/shared/lib/tiktok/token'
import { NextResponse } from 'next/server'

export async function GET() {
  if (useMocks()) {
    return NextResponse.json(mockVideosResponse)
  }

  const token = await getAccessToken()
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const res = await fetch(`${TIKTOK_API_BASE}/video/list/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      max_count: 20,
      fields: [
        'id',
        'title',
        'cover_image_url',
        'create_time',
        'duration',
        'view_count',
        'like_count',
        'comment_count',
        'share_count',
      ],
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: res.status })
  }

  const data = await res.json()
  const videos = (data.data?.videos ?? []).map((v: Record<string, unknown>) => ({
    id: v.id,
    title: v.title ?? '',
    coverUrl: v.cover_image_url ?? '',
    createTime: v.create_time,
    duration: v.duration,
    viewCount: v.view_count ?? 0,
    likeCount: v.like_count ?? 0,
    commentCount: v.comment_count ?? 0,
    shareCount: v.share_count ?? 0,
  }))

  return NextResponse.json({
    videos,
    cursor: data.data?.cursor ?? 0,
    hasMore: data.data?.has_more ?? false,
  })
}
