// vMN directory: hairline table that scales to many merchants
// rows: [{ cells: [...], href?, cta? }]
const DirectoryTable = ({ columns, rows }) => (
  <div className="overflow-x-auto border" style={{ borderColor: 'var(--border)', background: 'var(--bg-elevated)' }}>
    <table className="w-full border-collapse text-left text-[0.9375rem]">
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              key={c}
              className="border-b px-4 py-3 font-mono text-[11px] font-normal uppercase tracking-[0.08em]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'var(--bg-subtle)' }}
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) =>
          row.placeholder ? (
            <tr key={i}>
              <td
                className="border-b px-4 py-3"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                colSpan={columns.length}
              >
                + your shop here →{' '}
                <a href="/contact" className="font-medium underline underline-offset-4" style={{ color: 'var(--link)' }}>
                  become a merchant
                </a>
              </td>
            </tr>
          ) : (
            <tr key={i}>
              {row.cells.map((cell, j) => (
                <td
                  key={j}
                  className="border-b px-4 py-3 align-top last:border-b-0"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-body)' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          )
        )}
      </tbody>
    </table>
  </div>
)

export default DirectoryTable
