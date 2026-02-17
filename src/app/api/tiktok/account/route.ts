import { mockAccount, mockFollowerTrend } from '@/app/tiktok/_shared/mock-data'
import { TIKTOK_API_BASE, useMocks } from '@/shared/lib/tiktok/config'
import { getAccessToken } from '@/shared/lib/tiktok/token'
import { NextResponse } from 'next/server'

export async function GET() {
  if (useMocks()) {
    return NextResponse.json({
      account: mockAccount,
      followerTrend: mockFollowerTrend,
    })
  }

  const token = await getAccessToken()
  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const res = await fetch(
    `${TIKTOK_API_BASE}/user/info/?fields=display_name,avatar_url,follower_count,following_count,likes_count,video_count,bio_description`,
    { headers: { Authorization: `Bearer ${token}` } },
  )

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch account' }, { status: res.status })
  }

  const data = await res.json()
  const user = data.data?.user

  return NextResponse.json({
    account: {
      displayName: user.display_name,
      avatarUrl: user.avatar_url,
      followerCount: user.follower_count,
      followingCount: user.following_count,
      likesCount: user.likes_count,
      videoCount: user.video_count,
      bio: user.bio_description,
    },
    followerTrend: [],
  })
}
