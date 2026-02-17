import { getTiktokConfig, TIKTOK_AUTH_URL, TIKTOK_SCOPES } from '@/shared/lib/tiktok/config'
import { NextResponse } from 'next/server'

export function GET() {
  const { clientKey, redirectUri } = getTiktokConfig()

  if (!clientKey || !redirectUri) {
    return NextResponse.json({ error: 'TikTok client not configured' }, { status: 500 })
  }

  const state = crypto.randomUUID()
  const params = new URLSearchParams({
    client_key: clientKey,
    redirect_uri: redirectUri,
    scope: TIKTOK_SCOPES.join(','),
    response_type: 'code',
    state,
  })

  return NextResponse.redirect(`${TIKTOK_AUTH_URL}?${params.toString()}`)
}
