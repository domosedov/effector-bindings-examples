'use client'

import { useQuery } from '@tanstack/react-query'

import type { Todo } from './types'

export function TodoList() {
  const { data } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then((res) => res.json()),
  })

  return (
    <div>
      {data?.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  )
}
