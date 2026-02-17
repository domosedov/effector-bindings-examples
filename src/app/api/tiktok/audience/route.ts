import { mockAudience } from '@/app/tiktok/_shared/mock-data'
import { useMocks } from '@/shared/lib/tiktok/config'
import { NextResponse } from 'next/server'

export async function GET() {
  if (useMocks()) {
    return NextResponse.json(mockAudience)
  }

  return NextResponse.json(
    {
      error:
        'Audience analytics requires TikTok Business API access. Enable TIKTOK_USE_MOCKS=true for development.',
    },
    { status: 501 },
  )
}
