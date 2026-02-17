'use client'

import { Anchor, AppShell, Group, Text } from '@mantine/core'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/examples/rhf', label: 'RHF' },
  { href: '/examples/rq', label: 'React Query' },
  { href: '/tiktok', label: 'TikTok' },
] as const

const footerLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
] as const

export function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 50 }} padding='md'>
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
      <AppShell.Footer>
        <Group h='100%' px='md' justify='center' gap='lg'>
          {footerLinks.map(({ href, label }) => (
            <Anchor key={href} href={href} size='sm' c='dimmed'>
              {label}
            </Anchor>
          ))}
          <Text size='sm' c='dimmed'>
            &copy; {new Date().getFullYear()}
          </Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  )
}
