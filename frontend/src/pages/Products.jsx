import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LINKS } from '../utils/constants'
import './Products.css'

const PRODUCTS = [
  {
    number: '01',
    key: 'maps',
    name: 'Road defect maps',
    category: 'PUBLIC ROAD INTELLIGENCE',
    description: 'Explore anonymously mapped potholes and speedbreakers reported by drivers on the road.',
    image: '/hn_maps.png',
    alt: 'Vehnicate road defect map with anonymously collected road reports',
    href: '/map',
    action: 'See the map preview',
    direct: 'https://www.vehnicate.com/map',
    directAction: 'Open live map',
  },
  {
    number: '02',
    key: 'dashboard',
    name: 'Analytics dashboard',
    category: 'AGGREGATE INSIGHTS',
    description: 'View network-level road data and aggregated activity through the Vehnicate dashboard.',
    image: '/hn_dashboard.png',
    alt: 'Vehnicate Driving Analytics dashboard with road intelligence and activity charts',
    href: LINKS.dashboard,
    action: 'Open dashboard',
    external: true,
  },
  {
    number: '03',
    key: 'app',
    name: 'Vehnicate app',
    category: 'FOR ANDROID DRIVERS',
    description: 'Detect road defects during your drives, build safer maps and earn Ellars along the way.',
    image: '/app_homepage.png',
    alt: 'Vehnicate Android app displayed on a phone',
    href: '/app',
    action: 'Explore the app',
    store: LINKS.app,
  },
]

const storyText = { hidden: {}, show: { transition: { staggerChildren: .12 } } }
const storyItem = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: .55, ease: [.22, 1, .36, 1] } } }

function ProductLink({ href, external = false, children, className = '' }) {
  const content = <>{children}{external ? <ArrowUpRight size={16} /> : <ArrowRight size={16} />}</>
  const classes = `product-cta ${className}`
  return external || href.startsWith('http')
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{content}</a>
    : <Link to={href} className={classes}>{content}</Link>
}

function RoadNetwork() {
  const reduceMotion = useReducedMotion()
  const lineTransition = reduceMotion ? { duration: 0 } : { duration: 2.2, ease: 'easeInOut' }
  return (
    <div className="products-network-art" aria-hidden="true">
      <svg viewBox="0 0 600 370" fill="none">
        <defs>
          <linearGradient id="products-route" x1="70" y1="280" x2="530" y2="85" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9857D5" stopOpacity=".16" />
            <stop offset=".55" stopColor="#C95BAE" stopOpacity=".8" />
            <stop offset="1" stopColor="#E78AC5" stopOpacity=".28" />
          </linearGradient>
        </defs>
        <motion.path d="M36 292C117 286 101 202 184 215S269 310 334 228 399 151 455 169 505 91 573 62" stroke="url(#products-route)" strokeWidth="2" strokeDasharray="7 9" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={lineTransition} />
        <motion.path d="M74 61C139 106 111 153 184 167S289 148 323 97 408 32 464 63 499 133 555 139" stroke="rgba(181,138,211,.22)" strokeWidth="1.5" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ ...lineTransition, delay: reduceMotion ? 0 : .2 }} />
        {[[36,292],[184,215],[334,228],[455,169],[573,62],[74,61],[184,167],[323,97],[464,63],[555,139]].map(([cx,cy], index) => (
          <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index < 5 ? 4 : 2.5} fill={index < 5 ? '#D98EC9' : '#AA78CA'} initial={{ opacity: .28 }} animate={reduceMotion ? { opacity: .8 } : { opacity: [.28,.9,.28] }} transition={reduceMotion ? { duration: 0 } : { duration: 3.4, delay: index * .18, repeat: Infinity, ease: 'easeInOut' }} />
        ))}
      </svg>
      <span className="products-network-caption">A network built from every journey</span>
    </div>
  )
}

function ProductActions({ product, className = '' }) {
  return (
    <div className={`product-actions ${className}`}>
      <ProductLink href={product.href} external={product.external}>{product.action}</ProductLink>
      {product.direct && <ProductLink href={product.direct} external className="product-cta-secondary">{product.directAction}</ProductLink>}
      {product.store && <a href={product.store} target="_blank" rel="noopener noreferrer" className="product-cta product-cta-secondary">Google Play <ArrowUpRight size={16} /></a>}
    </div>
  )
}

function ProductShowcase({ product, reverse = false }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const textVariants = reduceMotion ? { hidden: {}, show: {} } : storyText
  const itemVariants = reduceMotion ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0, transition: { duration: 0 } } } : storyItem
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [20, -20])

  return (
    <section ref={ref} className={`product-story ${reverse ? 'product-story-reverse' : ''} product-story-${product.key}`} aria-labelledby={`product-title-${product.key}`}>
      <div className="container-x product-story-grid">
        <motion.div className="product-story-copy" variants={textVariants} initial={reduceMotion ? false : 'hidden'} whileInView="show" viewport={{ once: true, amount: .25 }}>
          <motion.span variants={itemVariants} className="product-story-number">{product.number} <i>—</i> 03</motion.span>
          <motion.span variants={itemVariants} className="product-category">{product.category}</motion.span>
          <motion.h2 variants={itemVariants} id={`product-title-${product.key}`}>{product.name}</motion.h2>
          <motion.p variants={itemVariants}>{product.description}</motion.p>
          <motion.div variants={itemVariants}><ProductActions product={product} /></motion.div>
        </motion.div>
        <motion.figure className={`product-story-visual product-story-visual-${product.key}`} style={{ y: imageY }} initial={reduceMotion ? false : { opacity: 0, scale: .975 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduceMotion ? 0 : .8, ease: [.22, 1, .36, 1] }}>
          <div className="product-visual-frame">
            <img src={product.image} alt={product.alt} loading="lazy" />
          </div>
          {product.key === 'app' && <figcaption>VEHNICATE FOR ANDROID <span>GOOGLE PLAY</span></figcaption>}
        </motion.figure>
      </div>
    </section>
  )
}

const Products = () => {
  const reduceMotion = useReducedMotion()
  return (
    <div className="interior-page products-page">
      <section className="products-hero">
        <div className="container-x products-hero-grid">
          <motion.div className="products-hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .7, ease: [.22, 1, .36, 1] }}>
            <h1 className="display-heading">Tools for<br />better roads.</h1>
            <p>One connected network, built for drivers, local businesses and the people working to understand the roads we share.</p>
          </motion.div>
          <RoadNetwork />
        </div>
      </section>

      <section className="products-overview section-pad" aria-labelledby="products-overview-title">
        <div className="container-x">
          <div className="products-overview-heading"><h2 id="products-overview-title">One network.<br />Three ways in.</h2><p>From the driver's phone to the wider road network, each product has a part to play.</p></div>
          <div className="products-bento">
            <article className="product-bento-card product-bento-app">
              <div className="product-bento-copy"><span className="product-story-number">{PRODUCTS[2].number} <i>—</i> 03</span><span className="product-category">{PRODUCTS[2].category}</span><h3>{PRODUCTS[2].name}</h3><p>{PRODUCTS[2].description}</p><ProductLink href={PRODUCTS[2].href}>{PRODUCTS[2].action}</ProductLink><a href={PRODUCTS[2].store} target="_blank" rel="noopener noreferrer" className="product-bento-secondary">Google Play <ArrowUpRight size={15} /></a></div>
              <div className="product-bento-app-art"><img src={PRODUCTS[2].image} alt={PRODUCTS[2].alt} loading="lazy" /></div>
            </article>
            {[PRODUCTS[0], PRODUCTS[1]].map((product) => (
              <article className={`product-bento-card product-bento-${product.key}`} key={product.key}>
                <div className="product-bento-visual"><img src={product.image} alt={product.alt} loading="lazy" /><span>{product.number} / 03</span></div>
                <div className="product-bento-copy"><span className="product-category">{product.category}</span><h3>{product.name}</h3><ProductLink href={product.href} external={product.external}>{product.action}</ProductLink>{product.direct && <a href={product.direct} target="_blank" rel="noopener noreferrer" className="product-bento-secondary">Open live map <ArrowUpRight size={15} /></a>}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="products-stories">
        <ProductShowcase product={PRODUCTS[0]} />
        <ProductShowcase product={PRODUCTS[1]} reverse />
        <ProductShowcase product={PRODUCTS[2]} />
      </div>
    </div>
  )
}

export default Products
