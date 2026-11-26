import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, BatteryCharging, Camera, Check, Clock3, MapPin, ShieldCheck, Smartphone } from 'lucide-react'
import { LINKS } from '../utils/constants'

const STEPS = [
  { n: '01', title: 'Install & sign in', time: '1 min', text: 'Get Vehnicate from Google Play and create your account.', detail: 'Your account opens to your Ellar balance and trip dashboard.', image: '/app_homepage.png', alt: 'Vehnicate home screen with Ellar balance', icon: Smartphone },
  { n: '02', title: 'Allow camera access', time: '10 sec', text: 'Camera access lets the app identify potholes and speedbreakers while you travel.', detail: 'Video is processed on your device and is not uploaded.', image: '/dataCollection_screen.jpeg', alt: 'Vehnicate camera data collection screen', icon: Camera },
  { n: '03', title: 'Allow location access', time: '10 sec', text: 'Location attaches the right place to each road observation.', detail: 'Only confirmed defect locations are shared anonymously.', image: '/appOnMount.png', alt: 'Vehnicate location and trip setup screen', icon: MapPin },
  { n: '04', title: 'Keep the app running', time: '30 sec', text: 'Allow background activity so a trip can continue with your screen off.', detail: 'Some Android phones ask you to adjust battery optimization.', image: '/garage.jpeg', alt: 'Vehnicate running in the background on a phone', icon: BatteryCharging },
  { n: '05', title: 'Mount up and drive', time: 'Ready', text: 'Secure your phone before setting off, open a trip, and drive as usual.', detail: 'Your first confirmed road observations can earn Ellars.', image: '/analysis.png', alt: 'Vehnicate trip analytics screen', icon: Check },
]

const PERMISSIONS = [
  { icon: Camera, title: 'Camera', reason: 'Spot potholes and speedbreakers.', status: 'Video stays on your phone.' },
  { icon: MapPin, title: 'Location', reason: 'Place road defects accurately.', status: 'Only defect positions are shared.' },
  { icon: BatteryCharging, title: 'Background activity', reason: 'Keep a trip running with the screen off.', status: 'You can stop a trip anytime.' },
  { icon: ShieldCheck, title: 'Notifications', reason: 'Trip reminders and milestones.', status: 'Optional.' },
]

const AppPage = () => {
  const [active, setActive] = useState(0)
  const triggerRefs = useRef([])
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number(entry.target.dataset.step))
      })
    }, { rootMargin: '-42% 0px -48% 0px', threshold: 0 })
    triggerRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goToStep = (index) => {
    const target = triggerRefs.current[index]
    if (!target) return
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -window.innerHeight * 0.25 })
    else target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const current = STEPS[active]
  const CurrentIcon = current.icon

  return (
    <div className="interior-page interior-app">
      <section className="section-pad interior-hero app-hero">
        <div className="container-x app-hero-grid">
          <div><h1 className="display-heading">Set up once.<br />Make every drive count.</h1><p className="interior-lede mt-5 max-w-[54ch]">A short setup gets road detection ready in the background. Here’s what each permission does and what you’ll see in the app.</p><a className="app-store-link" href={LINKS.app} target="_blank" rel="noopener noreferrer"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" width="162" height="52" /><span>Free on Google Play <ArrowRight size={15} /></span></a></div>
          <div className="app-requirements"><h2>What you’ll need</h2><div><span><Smartphone size={17} />Android + Google Play services</span><span><Camera size={17} />A working camera</span><span><MapPin size={17} />Location services</span><span><Clock3 size={17} />About five minutes</span></div></div>
        </div>
      </section>

      <section className="app-slides-section" aria-label="App setup guide">
        <div className="app-slides-sticky">
          <div className="app-slide-progress" aria-label="Choose a setup step">{STEPS.map((step, index) => <button type="button" key={step.n} aria-label={`Go to step ${step.n}: ${step.title}`} aria-current={active === index ? 'step' : undefined} onClick={() => goToStep(index)}><span>{step.n}</span><i /></button>)}</div>
          <div className="app-slide-content">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div className="app-slide-copy" key={`copy-${current.n}`} initial={reduceMotion ? false : { opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: 18 }} transition={{ duration: reduceMotion ? 0 : .32, ease: [.22, 1, .36, 1] }}>
                <span className="label">STEP {current.n} <span className="app-step-time">{current.time}</span></span><div className="app-step-icon"><CurrentIcon size={19} /></div><h2>{current.title}</h2><p>{current.text}</p><div className="app-step-detail"><ShieldCheck size={16} /><span>{current.detail}</span></div>
                {current.n === '04' && <details className="app-device-help"><summary>Battery settings not showing?</summary><p>Open your phone’s battery settings and allow Vehnicate to run in the background. The exact steps vary by Android manufacturer.</p></details>}
                <div className="app-slide-controls"><button type="button" onClick={() => goToStep(Math.max(0, active - 1))} disabled={active === 0}><ArrowLeft size={15} /> Previous</button><button type="button" onClick={() => goToStep(Math.min(STEPS.length - 1, active + 1))} disabled={active === STEPS.length - 1}>Next <ArrowRight size={15} /></button></div>
              </motion.div>
              <motion.figure className="app-slide-image" key={`image-${current.n}`} initial={reduceMotion ? false : { opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }} transition={{ duration: reduceMotion ? 0 : .35 }}><img src={current.image} alt={current.alt} /><figcaption>VEHNICATE APP <span>{current.n} / {STEPS.length.toString().padStart(2, '0')}</span></figcaption></motion.figure>
            </AnimatePresence>
          </div>
        </div>
        {STEPS.map((step, index) => <div ref={(el) => { triggerRefs.current[index] = el }} className="app-slide-trigger" data-step={index} key={step.n} aria-hidden="true" />)}
      </section>

      <section className="app-permissions-section border-t" style={{ borderColor: 'var(--border)' }}><div className="container-x section-pad"><div className="app-section-heading"><div><h2 className="display-heading">Your phone. Your control.</h2></div><p>Each permission supports a specific app feature. You can review access in Android settings anytime.</p></div><div className="app-permissions-grid">{PERMISSIONS.map(({ icon: Icon, title, reason, status }) => <article className="app-permission-card" key={title}><span><Icon size={18} /></span><div><h3>{title}</h3><p>{reason}</p><small>{status}</small></div></article>)}</div></div></section>

      <section className="app-gallery-section border-t" style={{ borderColor: 'var(--border)' }}><div className="container-x section-pad"><h2 className="display-heading">A clearer view of every trip.</h2><div className="app-gallery">{[{ src: '/app_homepage.png', label: 'Trip overview' }, { src: '/incentives.png', label: 'Ellar rewards' }, { src: '/analysis.png', label: 'Driving analytics' }].map((item) => <figure key={item.src}><img src={item.src} alt={item.label} loading="lazy" /><figcaption>{item.label}</figcaption></figure>)}</div></div></section>
    </div>
  )
}

export default AppPage
