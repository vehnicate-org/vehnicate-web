import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Coins, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../components/ui/Button'

const TOTALS_URL = 'https://vehnicate-mapsellar-production.up.railway.app/public/ellar-totals'

const Ellar = () => {
  const [totals, setTotals] = useState(null)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const response = await fetch(TOTALS_URL)
        if (!response.ok) throw new Error('Could not load Ellar totals')
        const result = await response.json()
        if (active) setTotals(result)
      } catch { if (active) setTotals(null) }
    }
    load()
    const timer = window.setInterval(load, 60_000)
    return () => { active = false; window.clearInterval(timer) }
  }, [])

  return (
    <div className="interior-page interior-ellar">
      <section className="section-pad interior-hero ellar-hero">
        <div className="container-x">
          <h1 className="display-heading">The <span className="hero-gradient">Ellar.</span></h1>
          <p className="interior-lede mt-5 max-w-[62ch]">A reward for helping make roads safer. Earn Ellars through road observations, then use them with businesses in the Vehnicate Merchant Network.</p>
          <motion.div className="ellar-coin-hero" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? 0 : .8, ease: [.22, 1, .36, 1] }}><Coins size={54} strokeWidth={1.1} /><span>e</span></motion.div>
          <div className="ellar-totals" aria-live="polite"><div><small>TOTAL FROZEN</small><strong>{totals ? Number(totals.frozen_ellar || 0).toFixed(2) : '—'}</strong><span>Ellars</span></div><div><small>TOTAL LIQUID</small><strong>{totals ? Number(totals.liquid_ellar || 0).toFixed(2) : '—'}</strong><span>Ellars</span></div><p>Network totals update periodically.</p></div>
        </div>
      </section>

      <section className="ellar-origin border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-x section-pad"><div className="ellar-origin-copy"><h2 className="display-heading">A king’s story.<br />A modern promise.</h2><p>Legend tells of a Chola prince who ran over a calf with his chariot. When the cow asked for justice, King Ellalan held his own son accountable. The story became a symbol of justice that applies equally to everyone.</p><p>Ellar takes its name from Ellalan, also known as Manu Needhi Cholan. It represents a simple idea: the people who help make roads safer should share in the value they create.</p></div><figure className="ellalan-portrait"><img src="/Ellalan.jpg" alt="Portrait representing King Ellalan, namesake of the Ellar" /><figcaption>ELLALAN <span>· THE STORY BEHIND THE NAME</span></figcaption></figure></div>
      </section>

      <section className="ellar-mechanics border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-x section-pad"><h2 className="display-heading">From road signal<br />to real-world use.</h2><div className="ellar-mechanics-grid">
          <motion.article initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: reduceMotion ? 0 : .55 }}><span className="ellar-step">01</span><div className="ellar-step-icon"><Coins size={19} /></div><h3>Observe</h3><p>When the app detects a road defect, the observation can earn a discovery reward. The trip multiplier is <b>1.0</b> with a mounted camera and <b>0.5</b> with the camera off.</p><div className="ellar-formula">m = 1.0 <small>mounted, camera on</small><br />m = 0.5 <small>camera off</small></div></motion.article>
          <motion.article initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: reduceMotion ? 0 : .55, delay: .08 }}><span className="ellar-step">02</span><div className="ellar-step-icon"><ArrowRight size={19} /></div><h3>Verify</h3><p>Another driver's observation can confirm a reported defect. Confirmation rewards go to the liquid balance; the discoverer's frozen reward is released when the report is confirmed.</p><div className="ellar-formula">R<sub>confirmation</sub> = m(2 − log<sub>10</sub>n<sub>D</sub>)</div></motion.article>
          <motion.article initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: reduceMotion ? 0 : .55, delay: .16 }}><span className="ellar-step">03</span><div className="ellar-step-icon"><Store size={19} /></div><h3>Use</h3><p>Spend liquid Ellars with participating vMN merchants. Today, Muthaaramman Mini Supermarket is the first shop in the network.</p><Link to="/vmn" className="ellar-inline-link">Find a vMN merchant <ArrowUpRight size={15} /></Link></motion.article>
        </div><p className="ellar-note">Reward rules are subject to app verification and may change as the network develops.</p></div>
      </section>

      <section className="ellar-future border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-x section-pad"><motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : .55 }}><h2 className="display-heading">More coverage.<br />A stronger loop.</h2><p>As drivers map more roads, fewer first-time discoveries remain. Ellar issuance is designed to slow as coverage matures, while its usefulness can grow through the merchant network.</p><PrimaryButton href="/app">Start earning <ArrowUpRight size={15} /></PrimaryButton></motion.div><motion.div className="ellar-chart" initial={reduceMotion ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : .6, delay: .1 }}><div className="chart-heading"><span>ILLUSTRATIVE ELLAR SUPPLY</span><span>CONCEPT</span></div><svg viewBox="0 0 640 320" role="img" aria-label="Illustrative curve showing Ellar supply growth slowing as road coverage matures"><defs><linearGradient id="ellarLine" x1="0" x2="1"><stop offset="0" stopColor="#9660d8"/><stop offset="1" stopColor="#d64d91"/></linearGradient><linearGradient id="ellarFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#b34bc2" stopOpacity=".2"/><stop offset="1" stopColor="#b34bc2" stopOpacity="0"/></linearGradient></defs><path d="M56 260H610M56 45V260" fill="none" stroke="rgba(255,255,255,.15)"/><path d="M56 260 C160 259 190 245 245 206 C310 160 312 102 405 72 C477 48 540 50 610 48 L610 260Z" fill="url(#ellarFill)"/><motion.path className="ellar-chart-line" d="M56 260 C160 259 190 245 245 206 C310 160 312 102 405 72 C477 48 540 50 610 48" fill="none" stroke="url(#ellarLine)" strokeWidth="4" strokeLinecap="round" initial={reduceMotion ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: reduceMotion ? 0 : 1.5, ease: 'easeInOut' }}/><text x="56" y="290">ROAD COVERAGE</text><text x="57" y="33">ELLAR SUPPLY</text><text x="65" y="242">EARLY</text><text x="300" y="132">GROWING</text><text x="510" y="38">MATURE</text></svg><p>Conceptual illustration. Not a forecast.</p></motion.div></div>
      </section>
    </div>
  )
}

export default Ellar
