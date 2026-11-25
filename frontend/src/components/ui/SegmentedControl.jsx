// topic segmented control (contact form)
const SegmentedControl = ({ options, value, onChange }) => (
  <div
    className="segmented-control mb-6 flex overflow-hidden rounded-md border"
    style={{ borderColor: 'var(--border-strong)' }}
    role="radiogroup"
  >
    {options.map((opt) => {
      const active = value === opt.value
      return (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(opt.value)}
          className="flex-1 border px-2 py-2 text-[0.8125rem] transition-colors sm:text-[0.875rem]"
          style={{
            borderColor: 'var(--border)',
            background: active ? 'var(--btn-bg)' : 'transparent',
            color: active ? 'var(--on-accent)' : 'var(--text-body)',
          }}
        >
          {opt.label}
        </button>
      )
    })}
  </div>
)

export default SegmentedControl
