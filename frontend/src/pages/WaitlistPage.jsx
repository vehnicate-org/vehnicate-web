/* global Tally */
import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const WaitlistPage = () => {
  useEffect(() => {
    if (typeof Tally !== 'undefined') {
      Tally.loadEmbeds()
      return
    }
    if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) return

    const script = document.createElement('script')
    script.src = 'https://tally.so/widgets/embed.js'
    script.async = true
    script.onload = () => {
      if (typeof Tally !== 'undefined') Tally.loadEmbeds()
    }
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script)
    }
  }, [])

  return (
    <section className="section-pad interior-page interior-waitlist">
      <div className="container-x max-w-[640px]">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium underline underline-offset-4"
          style={{ color: 'var(--link)' }}
        >
          <ArrowLeft size={15} /> back to home
        </Link>
        <h1 className="display-heading waitlist-heading">
          be the first to know
        </h1>
        <p className="mt-3" style={{ color: 'var(--text-body)' }}>
          new cities, merchants and Ellar drops — join the list.
        </p>
        <div className="mt-8 max-w-[560px]">
          <iframe
            data-tally-src="https://tally.so/embed/mO2ZQp?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="200"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Join the Waitlist!"
          />
        </div>
      </div>
    </section>
  )
}

export default WaitlistPage
