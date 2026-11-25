// hairline table with mono uppercase headers — layout placeholder for spec tables
const SpecTable = ({ head, rows }) => (
  <div className="spec-table overflow-x-auto" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
    <table className="w-full border-collapse text-left text-[0.9375rem]">
      {head && (
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="border-b px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.08em]"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'var(--bg-subtle)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                className="border-b px-4 py-3 align-top last:border-b-0"
                style={{ borderColor: 'var(--border)', color: 'var(--text-body)' }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default SpecTable
