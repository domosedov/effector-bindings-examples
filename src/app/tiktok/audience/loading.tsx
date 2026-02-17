import { Card, Skeleton, Stack } from '@mantine/core'

export default function AudienceLoading() {
  return (
    <Stack gap='lg'>
      <Skeleton height={36} width='40%' />
      <Card withBorder p='lg'>
        <Skeleton height={300} />
      </Card>
    </Stack>
  )
}
