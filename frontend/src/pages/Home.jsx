import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin, ShieldCheck, Smartphone, Sparkles, Zap, ChartNoAxesCombined } from 'lucide-react'
import MetricStrip from '../components/ui/MetricStrip'
import Pipeline from '../components/ui/Pipeline'
import { PrimaryButton, SecondaryButton, TextLink } from '../components/ui/Button'
import { LINKS } from '../utils/constants'
import HomeMaps from '../components/sections/HomeMaps'
import EllarOrbit from '../components/sections/EllarOrbit'

const STATS = [
  { key: 'kilometresDriven', label: 'kilometres driven' },
  { key: 'defectsMapped', label: 'defects mapped' },
  { key: 'drivers', label: 'drivers' },
  { key: 'ellarsInNetwork', label: 'Ellars in network' },
]

const STEPS = [
  { n: '01', title: 'install', text: 'grab the app, ~1 min' },
  { n: '02', title: 'mount', text: 'camera sees the road' },
  { n: '03', title: 'drive', text: 'nothing else to do' },
  { n: '04', title: 'earn', text: 'Ellars per defect' },
]

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={reduceMotion ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } } : rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      transition={reduceMotion ? { duration: 0 } : { delay }}
    >
      {children}
    </motion.div>
  )
}

const Home = () => (
  <div className="home-page">
    <section className="hero-shell relative overflow-hidden">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="container-x hero-layout relative z-10 grid items-center gap-10 py-16 md:min-h-[670px] md:grid-cols-[1.04fr_.96fr] md:py-20">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
          <motion.h1 variants={rise} className="hero-title mt-5 max-w-[720px] text-[clamp(3.3rem,7vw,6.4rem)] leading-[.93] tracking-[-.065em]">
            Every road<br />has a <span className="hero-gradient">story.</span>
          </motion.h1>
          <motion.p variants={rise} className="mt-6 max-w-[480px] text-[1.05rem] leading-8" style={{ color: 'var(--text-body)' }}>
            Make your everyday drive count. Help map safer roads, and get rewarded for every pothole or speedbreaker you drive over...
          </motion.p>
          <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryButton href={LINKS.app} external className="hero-primary">Get the app <ArrowUpRight size={16} /></PrimaryButton>
            <SecondaryButton href="https://www.vehnicate.com/map" external className="hero-secondary">Explore the live map <ArrowRight size={16} /></SecondaryButton>
          </motion.div>
        </motion.div>

        <motion.div className="hero-art-wrap relative mx-auto w-full max-w-[540px]" initial={{ opacity: 0, scale: .92, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .9, delay: .2, ease: [.22, 1, .36, 1] }}>
          <div className="hero-art-glow" />
          <div className="hero-art-grid" />
          <img src="/gggyrate.svg" alt="" className="hero-twirl hero-art-ring" />
          <img src="/pothole_speedbreaker_ellar.png" alt="Pothole, speedbreaker and Ellar illustration" className="hero-art-main" />
        </motion.div>
      </div>
    </section>

    <section id="impact" className="metrics-section">
      <div className="container-x py-8 md:py-10">
        <MetricStrip items={STATS} />
      </div>
    </section>

    <section className="section-pad story-section">
      <div className="container-x">
        <Reveal className="section-intro">
          <h2 className="display-heading">Your commute can<br className="hidden sm:block" /> do a little more.</h2>
          <p>One drive helps build a clearer picture of the roads we all share. No extra effort, just a smarter way to get there.</p>
        </Reveal>
        <div className="impact-grid mt-12">
          <Reveal className="impact-card impact-card-map" delay={.06}>
            <div className="card-index">01 — collective intelligence</div>
            <h3>Make the unseen<br />visible.</h3>
            <p>Every verified road signal brings communities and cities closer to safer streets.</p>
            <div className="map-art"><img src="/roads.png" alt="A mapped road network" /><span className="map-pin pin-a"><MapPin size={16} /></span><span className="map-pin pin-b"><MapPin size={16} /></span><span className="map-pin pin-c"><MapPin size={16} /></span><span className="map-art-tag">LIVE ROAD NETWORK <i /></span></div>
            <TextLink href="/map" className="impact-link">Explore the map <ArrowUpRight size={15} /></TextLink>
          </Reveal>
          <Reveal className="impact-card impact-card-reward" delay={.14}>
            <div className="card-index">02 — rewards with purpose</div>
            <EllarOrbit />
            <h3>Good roads<br />go both ways.</h3>
            <p>Earn Ellars as you help improve road intelligence. Good for your city, good for you.</p>
            <TextLink href="/ellar" className="impact-link">Meet the Ellar <ArrowUpRight size={15} /></TextLink>
          </Reveal>
        </div>
      </div>
    </section>

    <section className="how-section section-pad">
      <div className="container-x grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-start">
        <Reveal>
          <h2 className="display-heading">A better drive<br />starts here.</h2>
          <p className="mt-4 max-w-sm leading-7">Set it up once. Then let your everyday journeys do the good work.</p>
          <TextLink href="/what" className="impact-link mt-6">How it works <ArrowRight size={15} /></TextLink>
        </Reveal>
        <Reveal delay={.12} className="steps-frame"><Pipeline steps={STEPS} /></Reveal>
      </div>
    </section>

    <HomeMaps />

    <section className="platform-section section-pad">
      <div className="container-x">
        <Reveal className="platform-heading"><div><h2 className="display-heading">Built for the<br />whole road ahead.</h2></div><p>From the driver's seat to the city dashboard, every part of vehnicate moves us forward.</p></Reveal>
        <div className="platform-grid mt-10">
          <Reveal className="platform-card platform-map" delay={.02}><span className="platform-icon"><MapPin size={18} /></span><div><h3>See the bigger picture.</h3><p>Road signals, visualised for everyone.</p></div><img src="/roads.png" alt="vehnicate road map" /><TextLink href="/map" className="card-arrow" aria-label="Explore maps"><ArrowUpRight size={18} /></TextLink></Reveal>
          <Reveal className="platform-card platform-app" delay={.08}><span className="platform-icon"><Smartphone size={18} /></span><h3>Just drive. We’ll handle the rest.</h3><p>Road insights, right from your phone.</p><div className="mini-phone"><div className="phone-camera" /><span className="phone-label">YOUR DRIVE<br /><b>IN MOTION</b></span><div className="phone-wave"><i /><i /><i /><i /><i /><i /><i /></div></div><TextLink href="/app" className="card-arrow" aria-label="Explore the app"><ArrowUpRight size={18} /></TextLink></Reveal>
          <Reveal className="platform-card platform-ellar" delay={.14}><span className="platform-icon"><Sparkles size={18} /></span><h3>A little good<br />comes around.</h3><p>Turn better driving into meaningful rewards.</p><div className="mini-ellar">e<span>✳</span></div><TextLink href="/ellar" className="card-arrow" aria-label="Discover Ellar"><ArrowUpRight size={18} /></TextLink></Reveal>
          <Reveal className="platform-card platform-vmn" delay={.2}><span className="platform-icon"><Zap size={18} /></span><h3>Good things, closer.</h3><p>Discover local businesses in the vehnicate network.</p><div className="merchant-lines"><i /><i /><i /></div><TextLink href="/vmn" className="card-arrow" aria-label="Explore the merchant network"><ArrowUpRight size={18} /></TextLink></Reveal>
          <Reveal className="platform-card platform-dashboard" delay={.26}><span className="platform-icon"><ChartNoAxesCombined size={18} /></span><h3>Road data, in context.</h3><p>Explore network-level insights and road activity.</p><div className="dashboard-bars"><i /><i /><i /><i /><i /></div><TextLink href="https://dashboard.vehnicate.com/" external className="card-arrow" aria-label="Open analytics dashboard"><ArrowUpRight size={18} /></TextLink></Reveal>
        </div>
        <Reveal className="trust-strip mt-5"><ShieldCheck size={18} /><span><b>Privacy comes standard.</b> Video is processed on-device. Your trips stay yours.</span><TextLink href="/why" className="impact-link">Our approach <ArrowRight size={14} /></TextLink></Reveal>
      </div>
    </section>

    <section className="closing-section">
      <div className="closing-glow" />
      <Reveal className="container-x closing-content"><h2>Let’s make the<br /><span className="hero-gradient">road better.</span></h2><p>Join the people turning everyday drives into a better way forward.</p><PrimaryButton href={LINKS.app} external className="hero-primary">Get started <ArrowUpRight size={16} /></PrimaryButton></Reveal>
      <div className="closing-art" aria-hidden="true"><img src="/gggyrate.svg" alt="" /></div>
    </section>
  </div>
)

export default Home
