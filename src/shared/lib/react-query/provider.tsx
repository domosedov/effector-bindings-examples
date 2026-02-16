'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { useUnit } from 'effector-react'

import { $queryClient } from './model'

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useUnit($queryClient)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
