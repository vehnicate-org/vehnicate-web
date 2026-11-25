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
    if (location.hash) return
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
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
