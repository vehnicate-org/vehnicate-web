import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS, LINKS } from '../../utils/constants'

const ALL_LINKS = [{ name: 'Home', href: '/' }, ...NAV_LINKS]

const Nav = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ background: 'color-mix(in srgb, var(--bg) 85%, transparent)', borderColor: 'var(--border)' }}
    >
      <nav className="container-x flex h-[60px] items-center gap-6">
        <Link to="/" className="flex items-center">
          <img src="/hn-logo_light.png" alt="vehnicate" className="h-8 w-auto" />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {ALL_LINKS.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              end={l.href === '/'}
              className={({ isActive }) =>
                `relative pb-0.5 text-[0.9375rem] ${isActive ? 'font-semibold text-ink' : 'text-body hover:text-ink'}`
              }
            >
              {({ isActive }) => (
                <>
                  {l.name}
                  {isActive && (
                    <span className="absolute -bottom-[13px] left-0 h-0.5 w-full" style={{ background: 'var(--text)' }} />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <a
            href={LINKS.app}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden overflow-hidden rounded-full px-4 py-2 text-[0.875rem] font-semibold sm:block"
            style={{ backgroundImage: 'var(--gradient-cta)', color: 'var(--on-brand)' }}
          >
            Get the app
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="menu"
            aria-expanded={open}
            className="rounded-md border px-3 py-1.5 text-[0.875rem] lg:hidden"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            {open ? 'close' : 'menu'}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-t px-6 py-4 lg:hidden" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <div className="flex flex-col gap-1">
            {ALL_LINKS.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                end={l.href === '/'}
                className={({ isActive }) =>
                  `py-2 text-[1.25rem] ${isActive ? 'font-semibold text-ink' : 'text-body'}`
                }
              >
                {l.name}
              </NavLink>
            ))}
            <a
              href={LINKS.app}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 overflow-hidden rounded-full px-4 py-3 text-center text-[0.9375rem] font-semibold"
              style={{ backgroundImage: 'var(--gradient-cta)', color: 'var(--on-brand)' }}
            >
              Get the app
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Nav
