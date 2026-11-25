// receipt-style ledger card for the Ellar page
const LedgerCard = ({ rows, footnote }) => (
  <div
    className="rounded-md border p-5 font-mono text-[0.9375rem]"
    style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}
  >
    <p className="label !mb-3">a quick example</p>
    {rows.map((r, i) => (
      <div key={i}>
        <div className="flex items-baseline justify-between py-2.5">
          <span>{r.label}</span>
          <b className="font-semibold" style={{ color: r.negative ? 'var(--text-muted)' : 'var(--text)' }}>
            {r.value}
          </b>
        </div>
        {i < rows.length - 1 && <hr style={{ borderColor: 'var(--border)' }} />}
      </div>
    ))}
    {footnote && (
      <p className="mt-3 text-[0.8125rem]" style={{ color: 'var(--text-muted)' }}>
        {footnote}
      </p>
    )}
  </div>
)

export default LedgerCard
