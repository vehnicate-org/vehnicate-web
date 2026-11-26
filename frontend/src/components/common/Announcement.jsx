import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LINKS } from '../../utils/constants'

const MESSAGES = [
  { text: 'maps is now live.', link: 'explore →', href: '/map', external: false },
  { text: 'vehnWay is on the Play Store.', link: 'drive & earn Ellars! →', href: LINKS.app, external: true },
  { text: 'detailed user analytics is now live.', link: 'explore →', href: LINKS.dashboard, external: true },
]

const Announcement = () => {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 5000)
    return () => clearInterval(t)
  }, [])

  const m = MESSAGES[i]
  return (
    <div
      className="w-full px-6 py-2 text-center font-mono text-[12px] uppercase tracking-[0.06em]"
      style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
    >
      <span key={i} className="inline-flex items-center gap-2">
        <span>new · {m.text}</span>
        {m.external ? (
          <a href={m.href} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2" style={{ color: 'var(--text)' }}>
            {m.link}
          </a>
        ) : (
          <Link to={m.href} className="font-semibold underline underline-offset-2" style={{ color: 'var(--text)' }}>
            {m.link}
          </Link>
        )}
      </span>
    </div>
  )
}

export default Announcement
