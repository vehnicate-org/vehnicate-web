// labelled placeholder box for illustrations / images (layout phase)
const Placeholder = ({ label, className = '', style }) => (
  <div className={`ph ${className}`} style={style} role="img" aria-label={label}>
    {label}
  </div>
)

export default Placeholder
