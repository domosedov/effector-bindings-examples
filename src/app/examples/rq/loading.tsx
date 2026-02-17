import { Container, Skeleton, Stack } from '@mantine/core'

export default function ReactQueryExampleLoading() {
  return (
    <Container size='md' py='xl'>
      <Skeleton height={36} w={256} mb='lg' radius='sm' />
      <Stack gap='sm'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={20} w={`${60 + (i % 3) * 15}%`} radius='sm' />
        ))}
      </Stack>
    </Container>
  )
}
