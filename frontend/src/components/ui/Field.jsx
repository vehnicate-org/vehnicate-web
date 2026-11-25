// underline-style form field (input or textarea when `rows` is passed)
const Field = ({ label, rows, ...props }) => {
  const cls =
    'w-full resize-none border-0 border-b bg-transparent py-2.5 text-[1rem] text-ink placeholder:text-muted focus:outline-none'
  const style = { borderColor: 'var(--text-muted)' }
  const onFocus = (e) => (e.currentTarget.style.borderColor = 'var(--text)')
  const onBlur = (e) => (e.currentTarget.style.borderColor = 'var(--text-muted)')

  return (
    <div className="mb-5">
      <label className="label !mb-1">{label}</label>
      {rows ? (
        <textarea rows={rows} {...props} className={cls} style={style} onFocus={onFocus} onBlur={onBlur} />
      ) : (
        <input {...props} className={cls} style={style} onFocus={onFocus} onBlur={onBlur} />
      )}
    </div>
  )
}

export default Field
