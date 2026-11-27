import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '../styles/globals.css'
import '../styles/client-design.css'

function PageMotion({ asPath }: { asPath: string }) {
  useEffect(() => {
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const root = document.documentElement
    const items = Array.from(document.querySelectorAll<HTMLElement>(
      'main > *, main article, main .brand-panel, main .world-card, main .work-card, main .service-card, main .benefit-card, main .workspace-tile, main .brief-panel, main .access-card, main .news-empty'
    ))
    const parallaxImages = Array.from(document.querySelectorAll<HTMLElement>('.brand-panel-backdrop'))

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('scroll-reveal-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    items.forEach((element, index) => {
      element.classList.add('scroll-reveal-item')
      element.style.setProperty('--scroll-reveal-delay', `${Math.min(index % 4, 3) * 65}ms`)
      observer.observe(element)
    })
    root.dataset.scrollReveal = 'active'

    let frame = 0
    const updateParallax = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        parallaxImages.forEach(image => {
          const bounds = image.parentElement?.getBoundingClientRect()
          if (!bounds) return
          const progress = (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / window.innerHeight
          const offset = Math.max(-16, Math.min(16, progress * 24))
          image.style.setProperty('--parallax-offset', `${offset.toFixed(1)}px`)
        })
      })
    }

    updateParallax()
    window.addEventListener('scroll', updateParallax, { passive: true })
    window.addEventListener('resize', updateParallax)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateParallax)
      window.removeEventListener('resize', updateParallax)
      delete root.dataset.scrollReveal
      items.forEach(element => {
        element.classList.remove('scroll-reveal-item', 'scroll-reveal-visible')
        element.style.removeProperty('--scroll-reveal-delay')
      })
      parallaxImages.forEach(image => image.style.removeProperty('--parallax-offset'))
    }
  }, [asPath])

  return null
}

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <PageMotion asPath={router.asPath} />
      <Component {...pageProps} />
    </>
  )
}
