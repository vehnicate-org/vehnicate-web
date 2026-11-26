import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, Check, CircleDot, Smartphone, Wallet, Camera, MapPin } from 'lucide-react'
import FaqAccordion from '../components/ui/FaqAccordion'
import { PrimaryButton } from '../components/ui/Button'
import { LINKS } from '../utils/constants'

const STEPS = [
  { id: 'step-install', n: '01', title: 'Install app', text: 'Download vehnWay from Google Play and create your account.', image: '/mobile_landing_page.png', alt: 'vehnWay app landing screen', icon: Smartphone, note: 'A one-time setup. Takes about a minute.' },
  { id: 'step-mount', n: '02', title: 'Choose your setup', text: 'Mount your phone so the camera can see the road. No mount? Pocket mode still works.', image: '/appOnMount.png', alt: 'vehnWay mounted setup screen', icon: Camera, note: 'Mounted trips earn 2× Ellars.' },
  { id: 'step-drive', n: '03', title: 'Drive like you always do', text: 'Start a trip and keep your attention on the road. Detection runs in the background.', image: '/istockphoto-1197798630-612x612.jpg', alt: 'A driver travelling on the road', icon: MapPin, note: 'Video is processed on your phone.' },
  { id: 'step-earn', n: '04', title: 'Earn and use Ellars', text: 'Confirmed road defects earn Ellars. Use them with participating vMN merchants.', image: '/mobile_ellar_page.png', alt: 'Ellar rewards screen in vehnWay', icon: Wallet, note: 'Useful road data. Real rewards.' },
]

const FAQ_ITEMS = [
  { q: 'Does vehnicate drain my battery?', a: 'Detection runs on-device and pauses when your vehicle is still. Battery use varies by device, camera settings and trip length.' },
  { q: 'What happens to my video and location?', a: 'Video is processed on your phone and is not uploaded. Confirmed road defect locations are shared anonymously; personal routes and trip histories are not published.' },
  { q: 'Which phones can use the app?', a: 'The app currently works on Android phones that support Google Play services. A working camera and GPS help improve detection and location accuracy.' },
  { q: 'How are defects confirmed?', a: 'The app detects possible potholes and speedbreakers. Observations are cross-checked as other drivers encounter the same location before they are treated as confirmed map data.' },
]

const What = () => {
  const [active, setActive] = useState(0)
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    const nodes = STEPS.map((step) => document.getElementById(step.id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number(entry.target.dataset.stepIndex))
      })
    }, { rootMargin: '-38% 0px -42% 0px', threshold: 0 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="interior-page interior-what">
      <section className="section-pad interior-hero">
        <div className="container-x">
          <h1 className="display-heading max-w-3xl">A better drive starts with one small setup.</h1>
          <p className="interior-lede mt-5 max-w-[60ch]">Set up vehnicate once. Then your everyday journeys help map road defects, and confirmed observations earn you Ellars.</p>
          <a className="inline-flex items-center gap-2 mt-7 text-sm" href="#setup" style={{ color: 'var(--text)' }}>See the four steps <ArrowDown size={15} /></a>
        </div>
      </section>

      <section id="setup" className="setup-section border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-x setup-layout">
          <div className="setup-story-heading">
            <h2 className="display-heading">From setup to<br />your first Ellar.</h2>
            <p>Four simple steps turn everyday drives into useful road data and rewards.</p>
          </div>
          <div className="setup-story-grid">
            <div className="setup-story-steps">
              <div className="setup-progress-track" aria-hidden="true"><motion.span animate={{ scaleY: (active + 1) / STEPS.length }} transition={{ duration: reduceMotion ? 0 : .45, ease: 'easeOut' }} /></div>
              {STEPS.map((step, index) => {
                const Icon = step.icon
                return <article id={step.id} key={step.id} data-step-index={index} className={`setup-story-step ${active === index ? 'is-current' : ''}`}>
                  <div className="setup-story-step-meta"><span>{step.n} / 04</span><Icon size={17} /></div>
                  <h3>{step.title}</h3><p>{step.text}</p>
                  <div className="setup-note"><CircleDot size={14} />{step.note}</div>
                  <div className="setup-mobile-visual"><img src={step.image} alt={step.alt} loading={index ? 'lazy' : 'eager'} /></div>
                </article>
              })}
            </div>
            <div className="setup-showcase-sticky">
              <div className="setup-showcase-window">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div key={active} className="setup-showcase-frame" initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12, scale: .99 }} transition={{ duration: reduceMotion ? 0 : .42, ease: [.22, 1, .36, 1] }}>
                    <img src={STEPS[active].image} alt={STEPS[active].alt} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="setup-showcase-pagination" aria-label={`Step ${active + 1} of 4`}>{STEPS.map((step, index) => <span key={step.id} className={active === index ? 'active' : ''} />)}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="compare" className="compare-section border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-x section-pad">
          <div className="compare-heading"><div><h2 className="display-heading">Pocket or mounted.<br />Your call.</h2></div><p>Both work. A clear view of the road helps the app spot defects more reliably, and earns a higher trip multiplier.</p></div>
          <div className="compare-cards">
            <article className="compare-card pocket-card"><div className="compare-card-top"><span className="setup-icon"><Smartphone size={19} /></span><span className="compare-kicker">SIMPLE SETUP</span></div><h3>Phone in pocket</h3><p>Keep your phone with you. The app can still run during your trip.</p><div className="compare-rate"><strong>1×</strong><span>standard Ellar rate</span></div><ul><li><Check size={15} />No mount needed</li><li><Check size={15} />Works in the background</li><li className="muted"><CircleDot size={15} />Limited camera view</li></ul></article>
            <article className="compare-card mounted-card"><div className="compare-card-top"><span className="setup-icon"><Camera size={19} /></span><span className="compare-kicker">RECOMMENDED</span></div><h3>Phone mounted</h3><p>Secure your phone with the camera facing the road for a clearer view.</p><div className="compare-rate"><strong>2×</strong><span>Ellars on mounted trips</span></div><ul><li><Check size={15} />Clearer road view</li><li><Check size={15} />Better defect detection</li><li><Check size={15} />Double the trip multiplier</li></ul></article>
          </div>
          <p className="compare-safety">Set up your phone before you start driving. Always keep your attention on the road.</p>
        </div>
      </section>

      <section id="faq" className="faq-section border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container-x section-pad faq-layout">
          <div><h2 className="display-heading">Questions drivers<br />actually ask.</h2><p>Clear answers about the app, your phone and your privacy.</p></div>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <section className="section-pad what-cta"><div className="container-x"><div><h2>Make the kilometres count.</h2></div><PrimaryButton href={LINKS.app} external>Get the app <ArrowRight size={16} /></PrimaryButton></div></section>
    </div>
  )
}

export default What
