import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ParallaxAtmosphere from './ParallaxAtmosphere'

const navigation = [
  { label: 'Access', href: '/' },
  { label: 'Workspace', href: '/dashboard' },
  { label: 'Support', href: '/help' },
]

export default function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useRouter()

  return (
    <div className="portal-site">
      <ParallaxAtmosphere />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Nartstudio client portal home">
          <img src="/brand-mark.svg" alt="" />NARTSTUDIO <span>CLIENTS</span>
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <span>Private project access · Nartstudio</span>
        <a href="mailto:hello@nartstudio.com?subject=Client%20portal%20support">Contact the studio <span aria-hidden="true">↗</span></a>
      </footer>
    </div>
  )
}
