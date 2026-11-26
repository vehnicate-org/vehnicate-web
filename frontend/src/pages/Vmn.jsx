import { ArrowRight, ArrowUpRight, ShoppingBasket, Sparkles, Store, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PrimaryButton } from '../components/ui/Button'

const Vmn = () => (
  <div className="interior-page interior-vmn">
    <section className="section-pad interior-hero">
      <div className="container-x">
        <h1 className="display-heading max-w-3xl">Good journeys bring good customers.</h1>
        <p className="interior-lede mt-5 max-w-[58ch]">Drivers earn Ellars on the road. Local businesses welcome them in. The vMN connects the two.</p>
        <Link to="/vmn/how-it-works" className="inline-flex items-center gap-2 mt-7 text-sm" style={{ color: 'var(--text)' }}>See how the network works <ArrowRight size={15} /></Link>
      </div>
    </section>

    <section className="merchant-feature-section border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container-x section-pad">
        <div className="merchant-section-heading"><div><h2 className="display-heading">One local shop.<br />A network growing around it.</h2></div><p>Meet the first merchant accepting Ellars. More local businesses can join the network.</p></div>
        <article className="merchant-feature">
          <div className="merchant-feature-art" aria-hidden="true"><div className="merchant-art-grid" /><div className="store-mark"><Store size={34} strokeWidth={1.3} /></div><span className="merchant-art-caption">LOCAL COMMERCE / 01</span></div>
          <div className="merchant-feature-copy"><span className="merchant-status"><i /> CURRENT vMN MERCHANT</span><h3>Muthaaramman<br />Mini Supermarket</h3><p className="merchant-type"><ShoppingBasket size={15} /> Grocery</p><div className="merchant-offer"><Sparkles size={17} /><span><small>ELLAR CUSTOMER OFFER</small><b>Up to 10% off</b></span></div><p className="merchant-footnote">Ask in store for current offer details and redemption terms.</p></div>
          <div className="merchant-feature-index">01 <span>/ 01</span></div>
        </article>
      </div>
    </section>

    <section className="merchant-growth border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container-x section-pad">
        <div className="growth-copy"><h2 className="display-heading">Be part of the<br />next good thing.</h2><p>Join a growing community connecting drivers with neighbourhood businesses. Welcome Ellar customers, build loyalty and grow through local recommendations.</p><PrimaryButton href="/contact?topic=merchant">Become a vMN merchant <ArrowUpRight size={16} /></PrimaryButton></div>
        <div className="growth-points">{[
          [UsersRound, 'Meet nearby customers', 'Connect with drivers who already earn and use Ellars.'],
          [Sparkles, 'Offer a simple reward', 'Choose an offer that works for your business.'],
          [Store, 'Grow with the network', 'We’ll work with you to get set up and introduce your shop.'],
        ].map(([Icon, title, text], index) => <article className="growth-point" key={title}><span className="growth-icon"><Icon size={18} /></span><div><small>0{index + 1}</small><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </div>
    </section>

    <section className="section-pad merchant-bottom"><div className="container-x"><div><h2>Drivers earn. Local shops grow.</h2></div><Link to="/vmn/how-it-works" className="inline-flex items-center gap-2">Explore the vMN flow <ArrowRight size={16} /></Link></div></section>
  </div>
)

export default Vmn
