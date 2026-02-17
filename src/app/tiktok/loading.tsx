import { Card, SimpleGrid, Skeleton, Stack } from '@mantine/core'

export default function TiktokLoading() {
  return (
    <Stack gap='lg'>
      <Card withBorder p='lg'>
        <Skeleton height={80} circle mb='sm' />
        <Skeleton height={20} width='40%' mb='xs' />
        <Skeleton height={14} width='60%' />
      </Card>
      <SimpleGrid cols={{ base: 2, sm: 4 }}>
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} withBorder p='md'>
            <Skeleton height={12} width='50%' mb='xs' />
            <Skeleton height={28} width='70%' />
          </Card>
        ))}
      </SimpleGrid>
      <Card withBorder p='lg'>
        <Skeleton height={300} />
      </Card>
    </Stack>
  )
}
