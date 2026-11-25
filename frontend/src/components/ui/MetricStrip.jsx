import { useEffect, useRef, useState } from 'react'

const STATS_URL = import.meta.env.VITE_STATS_API_URL || '/api/stats'

const format = (n) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return n.toLocaleString('en-IN')
  return String(n)
}

// dashboard-style metrics strip: mono numerals, hairline dividers, skeletons
const MetricStrip = ({ items }) => {
  const [stats, setStats] = useState(null)
  const [failed, setFailed] = useState(false)
  const ref = useRef(null)
  const counted = useRef(false)

  useEffect(() => {
    let alive = true
    fetch(STATS_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => alive && setStats(data))
      .catch(() => alive && setFailed(true))
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (!stats || counted.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          counted.current = true
          entry.target.querySelectorAll('[data-count]').forEach((el) => {
            const target = Number(el.dataset.count)
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              el.textContent = format(target)
              return
            }
            const start = performance.now()
            const dur = 1200
            const tick = (now) => {
              const p = Math.min((now - start) / dur, 1)
              const eased = 1 - Math.pow(1 - p, 3)
              el.textContent = format(Math.round(target * eased))
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          })
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [stats])

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-px min-[800px]:grid-cols-4"
      style={{ background: 'var(--border)' }}
    >
      {items.map((item) => {
        const value = stats ? stats[item.key] : null
        const ready = value !== null && value !== undefined
        return (
          <div key={item.key} className="px-5 py-4" style={{ background: 'var(--bg-elevated)' }}>
            {!stats || failed || !ready ? (
              <div className="skeleton h-8 w-24" aria-hidden="true" />
            ) : (
              <p
                data-count={value}
                className="font-mono text-[1.75rem] font-semibold leading-none"
                style={{ color: 'var(--text)' }}
              >
                {format(0)}
              </p>
            )}
            <p className="mt-2 text-[0.875rem]" style={{ color: 'var(--text-muted)' }}>
              {item.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default MetricStrip
