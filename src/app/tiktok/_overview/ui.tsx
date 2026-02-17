'use client'

import { Avatar, Card, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { fetchAccount, tiktokKeys } from '../_shared/api'

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return n.toString()
}

export function OverviewContent() {
  const { data } = useQuery({
    queryKey: tiktokKeys.account,
    queryFn: fetchAccount,
  })

  if (!data) return null

  const { account, followerTrend } = data

  const stats = [
    { label: 'Followers', value: account.followerCount },
    { label: 'Following', value: account.followingCount },
    { label: 'Likes', value: account.likesCount },
    { label: 'Videos', value: account.videoCount },
  ]

  return (
    <Stack gap='lg'>
      <Card withBorder p='lg'>
        <Group>
          <Avatar src={account.avatarUrl} size={80} radius='xl' />
          <div>
            <Title order={2}>{account.displayName}</Title>
            <Text c='dimmed' size='sm'>
              {account.bio}
            </Text>
          </div>
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 2, sm: 4 }}>
        {stats.map((stat) => (
          <Card key={stat.label} withBorder p='md'>
            <Text c='dimmed' size='xs' tt='uppercase' fw={600}>
              {stat.label}
            </Text>
            <Text size='xl' fw={700}>
              {formatNumber(stat.value)}
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      <Card withBorder p='lg'>
        <Title order={4} mb='md'>
          Follower Trend (30 days)
        </Title>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={followerTrend}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' tickFormatter={(v: string) => v.slice(5)} fontSize={12} />
            <YAxis tickFormatter={(v) => formatNumber(Number(v) || 0)} fontSize={12} />
            <Tooltip formatter={(v) => [formatNumber(Number(v ?? 0)), 'Followers']} />
            <Line
              type='monotone'
              dataKey='followers'
              stroke='var(--mantine-color-blue-6)'
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Stack>
  )
}
