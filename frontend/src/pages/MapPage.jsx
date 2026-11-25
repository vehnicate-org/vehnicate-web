import { useEffect, useRef } from 'react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const PUBLIC_MAP = 'https://www.vehnicate.com/map'

const MapPage = () => {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.2) video.play().catch(() => {})
      else video.pause()
    }, { threshold: [0, 0.2] })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="interior-page interior-map-page">
      <section ref={sectionRef} className="map-preview-section section-pad">
        <div className="container-x">
          <div className="map-preview-heading"><div><span className="label">ROAD INTELLIGENCE, MADE VISIBLE</span><h1 className="display-heading">Map of <span>road defects.</span></h1></div><MapPin className="map-heading-icon" size={28} strokeWidth={1.2} /></div>
          <p className="map-preview-lede">Once your drive is complete, the road defects you drove over are added to the map anonymously. No names. No personal routes. Just useful information for the next driver.</p>
          <div className="map-video-frame"><video ref={videoRef} src="/map_recording.mp4" muted loop playsInline preload="metadata" controls aria-label="Preview of the Vehnicate road defects map" /><div className="map-video-footer"><span><i /> MAP PREVIEW</span><span>ANONYMOUS ROAD DEFECT DATA</span></div></div>
          <div className="map-preview-action"><div><strong>Explore the road defects map</strong><span>See reported road hazards in the live map.</span></div><a className="map-external-link" href={PUBLIC_MAP} target="_blank" rel="noopener noreferrer">Go to maps <ArrowUpRight size={17} /></a></div>
        </div>
      </section>
      <section className="map-bottom border-t" style={{ borderColor: 'var(--border)' }}><div className="container-x"><span className="label">MORE OF THE NETWORK</span><Link to="/vmn">Learn how the vMN connects drivers and local shops <ArrowUpRight size={15} /></Link><Link to="/ellar">See how Ellars work <ArrowUpRight size={15} /></Link></div></section>
    </div>
  )
}

export default MapPage
