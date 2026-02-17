import type { NextRequest } from 'next/server'

import { getTiktokConfig, TIKTOK_API_BASE } from '@/shared/lib/tiktok/config'
import { setTokens } from '@/shared/lib/tiktok/token'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/tiktok?error=no_code', request.url))
  }

  const { clientKey, clientSecret, redirectUri } = getTiktokConfig()

  if (!clientKey || !clientSecret) {
    return NextResponse.redirect(new URL('/tiktok?error=not_configured', request.url))
  }

  const tokenRes = await fetch(`${TIKTOK_API_BASE}/oauth/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri!,
    }),
  })

  const tokenData = await tokenRes.json()

  if (!tokenRes.ok || tokenData.error) {
    return NextResponse.redirect(new URL('/tiktok?error=token_exchange_failed', request.url))
  }

  await setTokens(tokenData.access_token, tokenData.refresh_token)

  return NextResponse.redirect(new URL('/tiktok', request.url))
}
