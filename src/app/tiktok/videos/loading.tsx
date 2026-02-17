import { Card, Skeleton, Stack } from '@mantine/core'

export default function VideosLoading() {
  return (
    <Stack gap='lg'>
      <Card withBorder p='lg'>
        <Skeleton height={300} />
      </Card>
      <Card withBorder p='lg'>
        <Skeleton height={400} />
      </Card>
    </Stack>
  )
}
