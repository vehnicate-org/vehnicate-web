import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import Announcement from './Announcement'
import Nav from './Nav'
import Footer from './Footer'
import SiteBackground from './SiteBackground'

const TITLES = {
  '/': 'vehnicate — get rewarded for every pothole you drive over',
  '/what': 'how it works — vehnicate',
  '/why': 'why we care — vehnicate',
  '/app': 'get the app — vehnicate',
  '/ellar': 'the Ellar — vehnicate',
  '/vmn': 'merchant network — vehnicate',
  '/map': 'road defect map — vehnicate',
  '/contact': 'contact — vehnicate',
  '/waitlist': 'waitlist — vehnicate',
}
TITLES['/vmn/how-it-works'] = 'how the vMN works - vehnicate'
TITLES['/products'] = 'products - vehnicate'

const Layout = () => {
  const location = useLocation()

  useEffect(() => {
    document.title = TITLES[location.pathname] || TITLES['/']
  }, [location.pathname])

  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    window.requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = '' })
  }, [location.pathname])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const targets = document.querySelectorAll([
      'main .display-heading',
      'main .impact-card',
      'main .platform-card',
      'main .compare-card',
      'main .app-permission-card',
      'main .product-bento-card',
      'main .product-story-visual',
      'main .merchant-feature',
      'main .growth-point',
      'main .vmn-flow-card',
    ].join(','))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('site-motion-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: .12, rootMargin: '0px 0px -5% 0px' })

    targets.forEach((target) => {
      // Framer Motion owns elements that already declare inline animation styles.
      if (target.hasAttribute('style') || target.parentElement?.closest('[style*="opacity"], [style*="transform"], [style*="translate"]')) return
      target.classList.add('site-motion-item')
      observer.observe(target)
    })
    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:px-4 focus:py-2"
        style={{ background: 'var(--btn-bg)', color: 'var(--on-accent)' }}
      >
        skip to content
      </a>
      <Announcement />
      <Nav />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      </div>
    </div>
  )
}

export default Layout
