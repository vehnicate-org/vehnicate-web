import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LINKS } from '../../utils/constants'

const HomeMaps = () => {
  const root = useRef(null)
  const video = useRef(null)

  useEffect(() => {
    if (!root.current || !video.current) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.current?.play().catch(() => {})
      else video.current?.pause()
    }, { threshold: 0.2 })
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={root} className="home-maps-section section-pad">
      <div className="container-x">
        <div className="home-maps-heading"><h2 className="display-heading">Map of <span>road defects.</span></h2></div>
        <p className="home-maps-description">After your drive, confirmed road defects are added to the map anonymously. Each report helps the next driver know what’s ahead.</p>
        <div className="home-maps-video"><video ref={video} src="/map_recording.mp4" muted loop playsInline preload="none" controls aria-label="Preview of the Vehnicate road defects map" /></div>
        <div className="home-maps-footer"><span>Explore road conditions and see how the network works.</span><Link to="/products">Explore products <ArrowUpRight size={15} /></Link><a href="https://www.vehnicate.com/map" target="_blank" rel="noopener noreferrer">Go to maps <ArrowUpRight size={15} /></a></div>
      </div>
    </section>
  )
}

export default HomeMaps
