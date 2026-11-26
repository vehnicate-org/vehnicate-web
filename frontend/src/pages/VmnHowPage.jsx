import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, RefreshCw, ShoppingBag, Store, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../components/ui/Button'

const FLOW = [
  { n: '01', title: 'Driver earns Ellars', text: 'Road observations and trips earn Ellars. Mounted camera trips get the higher multiplier.', icon: Wallet },
  { n: '02', title: 'Driver visits a merchant', text: 'Drivers discover and visit participating local businesses in the vMN.', icon: Store },
  { n: '03', title: 'Ellars are redeemed', text: 'Drivers exchange Ellars for a merchant product or service. The driver gets value; the shop gains a customer.', icon: ShoppingBag },
  { n: '04', title: 'The network grows', text: 'Merchants welcome repeat customers, more drivers join, and the network becomes more valuable for everyone.', icon: RefreshCw },
]

const VmnHowPage = () => {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return undefined
    const timer = window.setInterval(() => setActive((step) => (step + 1) % FLOW.length), 4500)
    return () => window.clearInterval(timer)
  }, [active, reduceMotion])

  const navigate = (index) => setActive((index + FLOW.length) % FLOW.length)

  return (
    <div className="interior-page vmn-how-page">
      <section className="section-pad interior-hero vmn-how-hero"><div className="container-x"><Link to="/vmn" className="vmn-back-link"><ArrowLeft size={15} /> The merchant network</Link><h1 className="display-heading max-w-3xl">One loop. Shared value.</h1><p className="interior-lede mt-5 max-w-[58ch]">Drivers, Ellars and local merchants keep value moving through a network that grows with every journey.</p></div></section>
      <section className="vmn-ecosystem-section"><div className="container-x"><div className="vmn-ecosystem-top"><div><h2>Every part moves the next.</h2></div><div className="vmn-cycle-controls"><button type="button" onClick={() => navigate(active - 1)} aria-label="Previous ecosystem step"><ArrowLeft size={16}/></button><span>0{active + 1} <i>/</i> 04</span><button type="button" onClick={() => navigate(active + 1)} aria-label="Next ecosystem step"><ArrowRight size={16}/></button></div></div>
          <div className="vmn-ecosystem" aria-label="Four-step circular vehnicate Merchant Network flow">
            <svg className="ecosystem-desktop-svg" viewBox="0 0 1000 720" aria-hidden="true"><defs><linearGradient id="vmnLoopGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#9b63d1"/><stop offset=".52" stopColor="#d478be"/><stop offset="1" stopColor="#a665d5"/></linearGradient><filter id="vmnParticleGlow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path className="ecosystem-track" d="M500 190 C615 190 680 250 680 355 C680 455 610 530 500 530 C390 530 320 455 320 355 C320 250 385 190 500 190"/><path id="vmn-loop-path" className="ecosystem-flow" d="M500 190 C615 190 680 250 680 355 C680 455 610 530 500 530 C390 530 320 455 320 355 C320 250 385 190 500 190"/><circle className="ecosystem-particle-halo" r="10" filter="url(#vmnParticleGlow)"><animateMotion dur="18s" repeatCount="indefinite" rotate="auto"><mpath href="#vmn-loop-path"/></animateMotion></circle><circle className="ecosystem-particle-core" r="4"><animateMotion dur="18s" repeatCount="indefinite" rotate="auto"><mpath href="#vmn-loop-path"/></animateMotion></circle></svg>
            <svg className="ecosystem-mobile-svg" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="vmnMobileGlow" x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path className="mobile-ecosystem-track" d="M50 35 V940 C85 940 85 60 50 60"/><circle className="ecosystem-particle-halo" r="3.7" filter="url(#vmnMobileGlow)"><animateMotion dur="18s" repeatCount="indefinite" path="M50 35 V940 C85 940 85 60 50 60"/></circle></svg>
            <div className="ecosystem-hub"><span className="hub-pulse"/><div className="hub-mark">v<span>MN</span></div><small>SHARED VALUE<br/>NETWORK</small></div>
            {FLOW.map(({ n, title, text, icon: Icon }, index) => <motion.button type="button" className={`ecosystem-node node-${n} ${active === index ? 'is-active' : ''}`} key={n} onClick={() => navigate(index)} aria-pressed={active === index} animate={{ opacity: active === index ? 1 : .67, scale: active === index ? 1 : .975 }} transition={{ duration: reduceMotion ? 0 : .45, ease: [.22, 1, .36, 1] }}><div className="ecosystem-node-top"><span>{n}</span><Icon size={16}/></div><h3>{title}</h3><p>{text}</p></motion.button>)}
          </div>
          <div className="ecosystem-mobile-steps">{FLOW.map(({ n, title, text, icon: Icon }, index) => <button key={n} type="button" onClick={() => navigate(index)} className={`mobile-ecosystem-node ${active === index ? 'is-active' : ''}`} aria-pressed={active === index}><div className="mobile-node-copy"><span>{n} / 04</span><h3>{title}</h3><p>{text}</p></div><Icon className="mobile-node-icon" size={18}/></button>)}</div>
          <p className="ecosystem-caption">The loop continues: road contributions bring drivers in, local merchants give Ellars utility, and returning customers help the network grow.</p>
        </div></section>
      <section className="section-pad vmn-how-cta"><div className="container-x"><div><h2>Have a local business?</h2><p>Talk to us about joining as a vMN merchant.</p></div><PrimaryButton href="/contact?topic=merchant">Become a merchant <ArrowRight size={16}/></PrimaryButton></div></section>
    </div>
  )
}

export default VmnHowPage
