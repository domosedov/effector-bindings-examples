import { createQueryClient } from '@/shared/lib/react-query/client'
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
      <div className='container-base py-8'>
        <h1 className='mb-6'>React Query Example</h1>
        <TodoList />
      </div>
    </HydrationBoundary>
  )
}
