'use client'

import { Card, Stack, Table, Text, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useUnit } from 'effector-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { fetchVideos, tiktokKeys } from '../../_shared/api'
import { $selectedVideoId, selectVideo } from './model'

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return n.toString()
}

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString('ru-RU')
}

export function VideosContent() {
  const { data } = useQuery({
    queryKey: tiktokKeys.videos,
    queryFn: fetchVideos,
  })

  const [selectedId, onSelectVideo] = useUnit([$selectedVideoId, selectVideo])

  if (!data) return null

  const chartData = data.videos.map((v) => ({
    title: v.title.length > 20 ? `${v.title.slice(0, 20)}...` : v.title,
    views: v.viewCount,
    likes: v.likeCount,
    comments: v.commentCount,
    shares: v.shareCount,
  }))

  const selectedVideo = selectedId ? data.videos.find((v) => v.id === selectedId) : null

  return (
    <Stack gap='lg'>
      <Card withBorder p='lg'>
        <Title order={4} mb='md'>
          Engagement by Video
        </Title>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='title' fontSize={10} angle={-20} textAnchor='end' />
            <YAxis tickFormatter={(v: number) => formatNumber(v)} fontSize={12} />

            <Tooltip formatter={(v, name) => [formatNumber(v as number), name]} />
            <Bar dataKey='views' fill='var(--mantine-color-blue-6)' />
            <Bar dataKey='likes' fill='var(--mantine-color-pink-6)' />
            <Bar dataKey='comments' fill='var(--mantine-color-green-6)' />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {selectedVideo && (
        <Card withBorder p='md'>
          <Title order={5} mb='xs'>
            {selectedVideo.title}
          </Title>
          <Text size='sm' c='dimmed'>
            Views: {formatNumber(selectedVideo.viewCount)} | Likes:{' '}
            {formatNumber(selectedVideo.likeCount)} | Comments:{' '}
            {formatNumber(selectedVideo.commentCount)} | Shares:{' '}
            {formatNumber(selectedVideo.shareCount)}
          </Text>
        </Card>
      )}

      <Card withBorder p='lg'>
        <Title order={4} mb='md'>
          Video List
        </Title>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Views</Table.Th>
              <Table.Th>Likes</Table.Th>
              <Table.Th>Comments</Table.Th>
              <Table.Th>Shares</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.videos.map((video) => (
              <Table.Tr
                key={video.id}
                onClick={() => onSelectVideo(selectedId === video.id ? null : video.id)}
                style={{
                  cursor: 'pointer',
                  backgroundColor:
                    selectedId === video.id ? 'var(--mantine-color-blue-light)' : undefined,
                }}
              >
                <Table.Td>{video.title}</Table.Td>
                <Table.Td>{formatDate(video.createTime)}</Table.Td>
                <Table.Td>{formatNumber(video.viewCount)}</Table.Td>
                <Table.Td>{formatNumber(video.likeCount)}</Table.Td>
                <Table.Td>{formatNumber(video.commentCount)}</Table.Td>
                <Table.Td>{formatNumber(video.shareCount)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Stack>
  )
}
