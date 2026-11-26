import { Sparkles } from 'lucide-react'

const EllarOrbit = ({ className = '' }) => (
  <div className={`reward-orbit ${className}`} aria-hidden="true">
    <div className="orbit orbit-one" />
    <div className="orbit orbit-two" />
    <div className="ellar-coin">e<span>✳</span></div>
    <Sparkles className="orbit-spark" size={20} />
  </div>
)

export default EllarOrbit
