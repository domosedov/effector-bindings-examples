'use client'

import { Anchor, Stack } from '@mantine/core'
import Link from 'next/link'

const examples = [
  { href: '/examples/rhf', label: 'React Hook Form' },
  { href: '/examples/rq', label: 'React Query' },
] as const

export function ExamplesList() {
  return (
    <Stack gap='sm'>
      {examples.map(({ href, label }) => (
        <Anchor key={href} component={Link} href={href}>
          {label}
        </Anchor>
      ))}
    </Stack>
  )
}
