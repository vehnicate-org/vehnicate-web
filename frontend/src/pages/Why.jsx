import { useEffect, useState } from 'react'
import MetricStrip from '../components/ui/MetricStrip'
import { PrimaryButton, TextLink } from '../components/ui/Button'
import { LINKS } from '../utils/constants'

const PEOPLE = ['son', 'wife', 'mother', 'husband', 'friend', 'daughter']

const CyclingWord = () => {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % PEOPLE.length), 3000)
    return () => clearInterval(t)
  }, [])

  const longest = PEOPLE.reduce((a, b) => (a.length >= b.length ? a : b))
  return (
    <span className="relative inline-block">
      {PEOPLE.map((p, idx) => (
        <span
          key={p}
          className="absolute inset-0 text-center transition-opacity duration-500"
          style={{ opacity: idx === i ? 1 : 0 }}
        >
          {p}
        </span>
      ))}
      <span className="invisible">{longest}</span>
    </span>
  )
}

const IMPACT = [
  { key: 'kilometresDriven', label: 'km driven safely' },
  { key: 'defectsMapped', label: 'hazards flagged' },
  { key: 'drivers', label: 'drivers' },
  { key: 'ellarsEarned', label: 'ellars returned' },
]

const Why = () => {
  return (
    <div className="interior-page interior-why">
      {/* STORY */}
      <section className="section-pad interior-hero why-hero">
        <div className="container-x max-w-[860px]">
          <h1 className="display-heading why-heading">
            every pothole you dodge is someone else's near-miss. someone is
            waiting for their <CyclingWord /> to return home safely.
          </h1>
          <p className="mt-4" style={{ color: 'var(--text-body)' }}>
            road accidents are not a statistic to us: missed dinners, empty
            chairs, calls nobody wants to take.
          </p>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="border-t why-quote" style={{ borderColor: 'var(--border)' }}>
        <div className="container-x section-pad">
          <div className="max-w-[860px] border-l-[3px] pl-5 text-[1.5rem] leading-snug text-ink">
            "your groceries reach your door in 10 minutes. your family should
            reach home just as fast."
            <span className="label !mt-3 block">— the tomato test</span>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-x py-14">
          <span className="label">the impact so far</span>
          <MetricStrip items={IMPACT} />
        </div>
      </section>

      {/* ECONOMY */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-x grid gap-10 py-14 md:grid-cols-2">
          <div>
            <h2 className="text-[1.75rem]">good roads should be profitable for everyone</h2>
            <p className="mt-3">
              <TextLink href="/vmn">see how the money flows →</TextLink>
            </p>
          </div>
          <div>
            {[
              ['01', 'drivers', 'earn Ellars every trip'],
              ['02', 'merchants', 'get footfall that spends'],
              ['03', 'cities', 'get a defect map for free'],
            ].map(([n, t, d], i, arr) => (
              <div
                key={n}
                className="flex items-center gap-4 py-3.5"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}
              >
                <span className="font-mono text-[0.9375rem]" style={{ color: 'var(--text-muted)' }}>{n}</span>
                <span>
                  <b className="font-semibold text-ink">{t}</b>{' '}
                  <span style={{ color: 'var(--text-body)' }}>{d}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad">
        <div className="container-x">
          <h2 className="text-[1.75rem]">the safest drive is the one that pays you back</h2>
          <div className="mt-4">
            <PrimaryButton href={LINKS.app}>Get the app</PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Why
