import { Link } from 'react-router-dom'
import { Linkedin, Youtube, Instagram } from 'lucide-react'
import { LINKS, NAV_LINKS } from '../../utils/constants'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
      <div className="container-x py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-bold text-ink">vehnicate</p>
            <p className="mt-2 text-[0.9375rem]" style={{ color: 'var(--text-body)' }}>
              Building a gamified ecosystem that rewards being a good road mate.
            </p>
          </div>

          <div>
            <p className="label">pages</p>
            <ul className="space-y-1.5 text-[0.9375rem]">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-body hover:text-ink">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">social</p>
            <ul className="space-y-1.5 text-[0.9375rem]">
              {[
                { icon: Linkedin, href: LINKS.linkedin, label: 'LinkedIn' },
                { icon: Youtube, href: LINKS.youtube, label: 'YouTube' },
                { icon: Instagram, href: LINKS.instagram, label: 'Instagram' },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-body hover:text-ink"
                  >
                    <s.icon size={14} /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label">contact</p>
            <ul className="space-y-1.5 text-[0.9375rem]" style={{ color: 'var(--text-body)' }}>
              <li><a href={`mailto:${LINKS.email}`} className="hover:text-ink">{LINKS.email}</a></li>
              <li><a href={`tel:${LINKS.phone.replace(/\s/g, '')}`} className="hover:text-ink">{LINKS.phone}</a></li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-2 border-t pt-4 font-mono text-[12px] sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
          <span>© {year} vehnicate. Safe &amp; happy driving, with 🩷</span>
          <span>● all systems normal</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
