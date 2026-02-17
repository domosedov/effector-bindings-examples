'use client'

import { Container, Tabs } from '@mantine/core'
import { usePathname, useRouter } from 'next/navigation'

const tabs = [
  { value: '/tiktok', label: 'Overview' },
  { value: '/tiktok/videos', label: 'Videos' },
  { value: '/tiktok/audience', label: 'Audience' },
] as const

export default function TiktokLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const activeTab =
    tabs.find((t) => t.value !== '/tiktok' && pathname.startsWith(t.value))?.value ?? '/tiktok'

  return (
    <Container size='lg' py='xl'>
      <Tabs
        value={activeTab}
        onChange={(value) => {
          if (value) router.push(value as '/')
        }}
        mb='lg'
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      {children}
    </Container>
  )
}
