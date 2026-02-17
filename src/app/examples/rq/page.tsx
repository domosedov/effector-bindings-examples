import { createQueryClient } from '@/shared/lib/react-query/client'
import { Container, Title } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import type { Todo } from './_page/types'

import { TodoList } from './_page/ui'

export default async function ReactQueryExamplePage() {
  const queryClient = createQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=5').then(
        (res) => res.json() as Promise<Todo[]>,
      ),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container size='md' py='xl'>
        <Title order={1} mb='lg'>
          React Query Example
        </Title>
        <TodoList />
      </Container>
    </HydrationBoundary>
  )
}
