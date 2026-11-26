import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border px-5 py-2.5 text-[0.9375rem] font-medium transition-colors duration-150'

const PrimaryButton = ({ href, external, children, className = '', ...rest }) => {
  const cls = `${base} ${className}`
  const s = { backgroundImage: 'var(--gradient-cta)', color: 'var(--on-brand)', borderColor: 'transparent' }
  const on = 'var(--gradient-cta-reverse)'
  const off = 'var(--gradient-cta)'
  const handlers = {
    onMouseEnter: (e) => (e.currentTarget.style.backgroundImage = on),
    onMouseLeave: (e) => (e.currentTarget.style.backgroundImage = off),
  }
  if (href) {
    if (external || href.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={s} {...handlers}>
          {children}
        </a>
      )
    }
    return (
      <Link to={href} className={cls} style={s} {...handlers}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} style={s} {...handlers} {...rest}>
      {children}
    </button>
  )
}

const SecondaryButton = ({ href, external, children, className = '', ...rest }) => {
  const cls = `${base} ${className}`
  const s = { borderColor: 'var(--text)', color: 'var(--text)', background: 'transparent' }
  const on = 'var(--bg-subtle)'
  const off = 'transparent'
  const handlers = {
    onMouseEnter: (e) => (e.currentTarget.style.background = on),
    onMouseLeave: (e) => (e.currentTarget.style.background = off),
  }
  if (href) {
    if (external || href.startsWith('http')) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={s} {...handlers}>
          {children}
        </a>
      )
    }
    return (
      <Link to={href} className={cls} style={s} {...handlers}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} style={s} {...handlers} {...rest}>
      {children}
    </button>
  )
}

const TextLink = ({ href, external, children, className = '' }) => {
  const cls = `text-[0.9375rem] font-medium underline underline-offset-4 ${className}`
  const s = { color: 'var(--link)' }
  if (external || href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={s}>
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className={cls} style={s}>
      {children}
    </Link>
  )
}

export { PrimaryButton, SecondaryButton, TextLink }
