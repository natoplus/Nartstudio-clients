import type { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ParallaxAtmosphere from './ParallaxAtmosphere'

const publicNavigation = [
  { label: 'Studio', href: '/studio' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Brands', href: '/brands' },
  { label: 'News', href: '/news' },
]

const brandLinks = [
  { label: 'Nartstudio', href: 'https://nartstudio.com' },
  { label: 'NCU', href: 'https://ncunartstudio.vercel.app' },
  { label: 'Oubyt', href: 'https://oubyt.vercel.app' },
  { label: 'Pylothouse', href: 'https://pylothouse.com' },
]

type SiteLayoutProps = {
  children: ReactNode
  variant?: 'public' | 'portal'
}

export default function SiteLayout({ children, variant = 'public' }: SiteLayoutProps) {
  const { pathname } = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isPortal = variant === 'portal'

  return (
    <div className={`portal-site${isPortal ? ' portal-site--workspace' : ''}`}>
      <ParallaxAtmosphere />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="brand-switcher" aria-label="Nartstudio ecosystem">
        <span className="brand-switcher-label">THE STUDIO /</span>
        {brandLinks.map((brand) => (
          <a key={brand.label} href={brand.href} target="_blank" rel="noopener noreferrer">
            {brand.label}
          </a>
        ))}
      </div>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}${isPortal ? ' site-header--portal' : ''}`}>
        <Link className="wordmark" href="/" aria-label="Nartstudio client website home">
          <img src="/brand-mark.svg" alt="" />
          <span>NARTSTUDIO</span>
          <span className="wordmark-sub">{isPortal ? 'WORKSPACE' : 'CLIENTS'}</span>
        </Link>
        {isPortal ? (
          <nav className="portal-nav" aria-label="Workspace navigation">
            <Link href="/dashboard" aria-current={pathname === '/dashboard' ? 'page' : undefined}>Overview</Link>
            <Link href="/help" aria-current={pathname === '/help' ? 'page' : undefined}>Support</Link>
            <Link className="nav-cta" href="/start">New project <span aria-hidden="true">↗</span></Link>
          </nav>
        ) : (
          <>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
            <nav id="primary-navigation" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
              {publicNavigation.map((item) => (
                <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
                  {item.label}
                </Link>
              ))}
              <div className="nav-actions">
                <Link className="nav-search" href="/work" aria-label="Explore selected work">
                  <svg aria-hidden="true" viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4 4" /></svg>
                </Link>
                <Link className="nav-signin" href="/signin">Sign in</Link>
                <Link className="nav-cta" href="/start">Start a project <span aria-hidden="true">↗</span></Link>
              </div>
            </nav>
          </>
        )}
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-statement">
            <Link className="footer-wordmark" href="/">NARTSTUDIO <span>CLIENTS</span></Link>
            <p>Original worlds, thoughtful craft and a clearer path from first brief to final delivery.</p>
            <a className="footer-contact" href="mailto:hello@nartstudio.com?subject=Client%20website%20enquiry">
              Contact the studio <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="footer-column">
            <span>STUDIO</span>
            <Link href="/studio">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/work">Selected work</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div className="footer-column">
            <span>ECOSYSTEM</span>
            <Link href="/brands">Our brands</Link>
            <Link href="/artists/join">For artists</Link>
            <Link href="/news">Studio notes</Link>
            <Link href="/help">Client support</Link>
          </div>
          <div className="footer-column">
            <span>YOUR SPACE</span>
            <Link href="/signin">Sign in</Link>
            <Link href="/start">Start a project</Link>
            <Link href="/contact">Get in touch</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nartstudio · Independent creative studio</span>
          <span>Private project access · Secure by invitation</span>
        </div>
      </footer>
    </div>
  )
}
