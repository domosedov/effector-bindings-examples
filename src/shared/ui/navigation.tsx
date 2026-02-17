'use client'

import { Anchor, AppShell, Group } from '@mantine/core'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/examples/rhf', label: 'RHF' },
  { href: '/examples/rq', label: 'React Query' },
] as const

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AppShell header={{ height: 60 }} padding='md'>
      <AppShell.Header>
        <Group h='100%' px='md' gap='lg'>
          {navItems.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Anchor
                key={href}
                href={href}
                fw={isActive ? 600 : 400}
                c={isActive ? undefined : 'dimmed'}
              >
                {label}
              </Anchor>
            )
          })}
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
