import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { LINKS } from '../utils/constants'

const SOCIALS = [
  { icon: FaLinkedinIn, href: LINKS.linkedin, label: 'LinkedIn', className: 'linkedin' },
  { icon: FaInstagram, href: LINKS.instagram, label: 'Instagram', className: 'instagram' },
  { icon: FaYoutube, href: LINKS.youtube, label: 'YouTube', className: 'youtube' },
]

const Contact = () => {
  const reduceMotion = useReducedMotion()
  const enter = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .6, ease: [.22, 1, .36, 1] } },
  }

  return (
    <section className="section-pad interior-page interior-contact">
      <div className="container-x contact-centered">
        <motion.div className="contact-centered-intro" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: reduceMotion ? 0 : .12 } } }}>
          <motion.h1 className="display-heading contact-heading" variants={enter}>Talk to the <span className="hero-gradient">vehnicate</span> team</motion.h1>
          <motion.p variants={enter}>Have an idea, want to collaborate, or simply want to say hello? We'd love to hear from you.</motion.p>
        </motion.div>

        <motion.div className="contact-centered-actions" initial="hidden" animate="show" variants={{ show: { transition: { delayChildren: reduceMotion ? 0 : .2, staggerChildren: reduceMotion ? 0 : .12 } } }}>
          <motion.a className="contact-action-button" href={`https://wa.me/${LINKS.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" variants={enter} whileHover={reduceMotion ? undefined : { y: -3 }}>
            <Phone size={19} strokeWidth={1.7} aria-hidden="true" /><span>{LINKS.phone}</span>
          </motion.a>
          <motion.a className="contact-action-button" href={`mailto:${LINKS.email}`} variants={enter} whileHover={reduceMotion ? undefined : { y: -3 }}>
            <Mail size={19} strokeWidth={1.7} aria-hidden="true" /><span>{LINKS.email}</span>
          </motion.a>
        </motion.div>

        <motion.div className="contact-centered-socials" initial="hidden" animate="show" variants={{ show: { transition: { delayChildren: reduceMotion ? 0 : .45, staggerChildren: reduceMotion ? 0 : .08 } } }}>
          {SOCIALS.map(({ icon: Icon, href, label, className }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`contact-social-icon ${className}`} aria-label={label} title={label} variants={enter} whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}>
              <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
