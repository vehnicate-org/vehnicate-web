// horizontal pipeline: top rule per step, mono number, title + short text
const Pipeline = ({ steps, cols = 4 }) => {
  const gridCls =
    cols === 4
      ? 'grid-cols-2 md:grid-cols-4'
      : cols === 3
        ? 'grid-cols-1 sm:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2'
  return (
    <div className={`grid ${gridCls}`}>
      {steps.map((s) => (
        <div
          key={s.n ?? s.title}
          className="border-t-2 py-4 pr-4 pt-4"
          style={{ borderColor: 'var(--text)' }}
        >
          {s.n && (
            <span className="block font-mono text-[12px]" style={{ color: 'var(--text-muted)' }}>
              {s.n}
            </span>
          )}
          {s.title && <h3 className="mt-1 text-[1.0625rem] font-semibold text-ink">{s.title}</h3>}
          {s.text && (typeof s.text === 'string' ? (
            <p className="mt-1 text-[0.9375rem]" style={{ color: 'var(--text-body)' }}>{s.text}</p>
          ) : (
            <div className="mt-1">{s.text}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Pipeline
