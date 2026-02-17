'use client'

import { Stack, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import type { Todo } from './types'

export function TodoList() {
  const { data } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then((res) => res.json()),
  })

  return (
    <Stack gap='xs'>
      {data?.map((todo) => (
        <Text key={todo.id}>{todo.title}</Text>
      ))}
    </Stack>
  )
}
