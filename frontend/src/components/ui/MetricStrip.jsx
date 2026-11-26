import { useEffect, useRef, useState } from 'react'
import { fetchPublicStats } from '../../utils/publicStats'

const format = (value) => {
  if (!Number.isFinite(value)) return '—'
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  return value.toLocaleString('en-IN', { maximumFractionDigits: 1 })
}

function MetricValue({ value }) {
  const [display, setDisplay] = useState(format(0))
  const lastValue = useRef(0)
  const numberRef = useRef(null)

  useEffect(() => {
    const target = Number(value)
    let frame = 0

    const animate = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        lastValue.current = target
        setDisplay(format(target))
        return
      }

      const from = lastValue.current
      const start = performance.now()
      const duration = 1100
      const precision = Number.isInteger(target) ? 1 : 10
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = from + (target - from) * eased
        setDisplay(format(Math.round(current * precision) / precision))
        if (progress < 1) frame = requestAnimationFrame(tick)
        else lastValue.current = target
      }
      frame = requestAnimationFrame(tick)
    }

    const element = numberRef.current
    if (!element || typeof IntersectionObserver === 'undefined') {
      animate()
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      animate()
    }, { threshold: .25 })
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <p ref={numberRef} className="metric-number" style={{ color: 'var(--text)' }}>{display}</p>
}

const MetricStrip = ({ items }) => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let alive = true

    const refresh = async () => {
      const result = await fetchPublicStats(controller.signal)
      if (alive) setStats(result)
    }

    refresh()
    const interval = window.setInterval(refresh, 60_000)
    return () => {
      alive = false
      controller.abort()
      window.clearInterval(interval)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 gap-px min-[800px]:grid-cols-4" style={{ background: 'var(--border)' }}>
      {items.map((item) => {
        const value = stats?.[item.key]
        return (
          <div key={item.key} className="px-5 py-4" style={{ background: 'var(--bg-elevated)' }}>
            {stats === null ? <div className="skeleton h-8 w-24" aria-hidden="true" /> : value == null ? <p className="metric-number" style={{ color: 'var(--text)' }}>—</p> : <MetricValue value={value} />}
            <p className="mt-2 text-[0.875rem]" style={{ color: 'var(--text-muted)' }}>{item.label}</p>
          </div>
        )
      })}
    </div>
  )
}

export default MetricStrip
