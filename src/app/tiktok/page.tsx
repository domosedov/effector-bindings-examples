import { createQueryClient } from '@/shared/lib/react-query/client'
import { useMocks } from '@/shared/lib/tiktok/config'
import { hasToken } from '@/shared/lib/tiktok/token'
import { Button, Card, Container, Stack, Text, Title } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { OverviewContent } from './_overview/ui'
import { tiktokKeys } from './_shared/api'
import { mockAccount, mockFollowerTrend } from './_shared/mock-data'

export default async function TiktokOverviewPage() {
  const isAuthenticated = useMocks() || (await hasToken())

  if (!isAuthenticated) {
    return (
      <Container size='xs' py='xl'>
        <Card withBorder p='xl'>
          <Stack align='center' gap='md'>
            <Title order={3}>TikTok Business Dashboard</Title>
            <Text c='dimmed' ta='center'>
              Sign in with your TikTok Business account to view analytics, video stats, and audience
              insights.
            </Text>
            <Button component='a' href='/api/tiktok/auth' size='lg'>
              Login with TikTok
            </Button>
          </Stack>
        </Card>
      </Container>
    )
  }

  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: tiktokKeys.account,
    queryFn: () =>
      Promise.resolve({
        account: mockAccount,
        followerTrend: mockFollowerTrend,
      }),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OverviewContent />
    </HydrationBoundary>
  )
}
