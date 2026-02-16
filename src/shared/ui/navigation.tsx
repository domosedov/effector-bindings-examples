'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/examples/rhf', label: 'RHF' },
  { href: '/examples/rq', label: 'React Query' },
] as const

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className='container-base flex items-center gap-6 py-4'>
      {navItems.map(({ href, label }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            className={
              isActive
                ? 'text-foreground no-underline hover:underline'
                : 'text-muted-foreground no-underline hover:text-foreground hover:underline'
            }
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
