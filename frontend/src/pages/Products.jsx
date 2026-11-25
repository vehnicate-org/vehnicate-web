import { ArrowRight, ArrowUpRight, LayoutDashboard, MapPinned, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LINKS } from '../utils/constants'

const PRODUCTS = [
  { number: '01', name: 'Road defect maps', eyebrow: 'PUBLIC ROAD INTELLIGENCE', description: 'Explore anonymously mapped potholes and speedbreakers reported by drivers on the road.', image: '/roads.png', type: 'image', icon: MapPinned, href: '/map', action: 'See the map preview', external: false, direct: 'https://www.vehnicate.com/map' },
  { number: '02', name: 'Analytics dashboard', eyebrow: 'AGGREGATE INSIGHTS', description: 'View network-level road data and aggregated activity through the Vehnicate dashboard.', image: '/analysis.png', type: 'image', icon: LayoutDashboard, href: LINKS.dashboard, action: 'Open dashboard', external: true },
  { number: '03', name: 'Vehnicate app', eyebrow: 'FOR ANDROID DRIVERS', description: 'Detect road defects during your drives, build safer maps and earn Ellars along the way.', image: '/app_homepage.png', type: 'image', icon: Smartphone, href: '/app', action: 'Explore the app', external: false, store: LINKS.app },
]

const Products = () => (
  <div className="interior-page products-page">
    <section className="section-pad interior-hero"><div className="container-x"><span className="label">THE VEHNICATE PLATFORM</span><h1 className="display-heading">Tools for better roads.</h1><p className="interior-lede mt-5 max-w-[56ch]">One connected network, built for drivers, local businesses and the people working to understand the roads we share.</p></div></section>
    <section className="section-pad"><div className="container-x products-grid">{PRODUCTS.map(({ number, name, eyebrow, description, image, type, icon: Icon, href, action, external, direct, store }) => <article className="product-showcase-card" key={number}><div className="product-showcase-visual">{type === 'video' ? <video src={image} muted loop playsInline preload="none" aria-hidden="true" /> : <img src={image} alt="" loading="lazy" />}<span className="product-number">{number} / 03</span></div><div className="product-showcase-copy"><span className="product-icon"><Icon size={17} /></span><span className="label">{eyebrow}</span><h2>{name}</h2><p>{description}</p><div className="product-actions">{external ? <a href={href} target="_blank" rel="noopener noreferrer" className="product-action-primary">{action} <ArrowUpRight size={15} /></a> : <Link to={href} className="product-action-primary">{action} <ArrowRight size={15} /></Link>}{store && <a href={store} target="_blank" rel="noopener noreferrer" className="product-action-secondary">Google Play <ArrowUpRight size={14} /></a>}{direct && <a href={direct} target="_blank" rel="noopener noreferrer" className="product-action-secondary">Open live map <ArrowUpRight size={14} /></a>}</div></div></article>)}</div></section>
  </div>
)

export default Products
