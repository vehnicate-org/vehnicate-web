import { useEffect, useState } from 'react'

// Replicates the old site's hero background layers (Hero.jsx):
// vertical brand gradient, animated grid, radial glow, cycling blobs, bottom fade.
const SiteBackground = () => {
  const [blob, setBlob] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setBlob((b) => (b + 1) % 3), 8000)
    return () => clearInterval(id)
  }, [])

  const blobs = [
    'radial-gradient(circle at 20% 50%, var(--bg-glow) 0%, transparent 40%)',
    'radial-gradient(circle at 80% 50%, var(--bg-glow-alt) 0%, transparent 40%)',
    'radial-gradient(circle at 40% 70%, var(--bg-glow) 0%, transparent 40%)',
  ]

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* main gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, color-mix(in srgb, var(--brand-purple) 5%, transparent), color-mix(in srgb, var(--brand-pink) 5%, transparent) 50%, var(--bg))' }}
      />

      {/* grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--bg-grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--bg-grid-line) 1px, transparent 1px),
            linear-gradient(var(--bg-grid-line-soft) 1px, transparent 1px),
            linear-gradient(90deg, var(--bg-grid-line-soft) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
        }}
      >
        <div
          className="bg-grid-drift absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(var(--bg-grid-line-fine) 1px, transparent 1px),
              linear-gradient(90deg, var(--bg-grid-line-fine) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 50px 50px',
          }}
        />
      </div>

      {/* radial glow */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, var(--bg-glow) 0%, color-mix(in srgb, var(--bg-glow) 50%, transparent) 50%, transparent 70%)' }}
      />

      {/* animated radial blobs */}
      <div
        className="absolute inset-0 transition-[background] duration-1000"
        style={{
          background: `${blobs[blob]}, linear-gradient(to bottom, transparent 60%, var(--bg-fade) 100%)`,
        }}
      />

      {/* bottom fade */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, transparent, var(--bg))' }} />
    </div>
  )
}

export default SiteBackground
