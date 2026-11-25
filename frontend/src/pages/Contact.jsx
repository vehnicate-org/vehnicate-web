import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { Linkedin, Youtube, Instagram, Send, CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react'
import Field from '../components/ui/Field'
import SegmentedControl from '../components/ui/SegmentedControl'
import { PrimaryButton } from '../components/ui/Button'
import { LINKS } from '../utils/constants'

const EMAILJS_CONFIG = {
  serviceId: 'service_3v3d3sz',
  adminTemplateId: 'template_7mdmioc',
  replyTemplateId: 'template_ccysqje',
  publicKey: 'XKRZgZZpyV7zxyZNe',
}

const TOPICS = [
  { value: 'general', label: 'General' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'merchant', label: 'Merchant' },
  { value: 'issue', label: 'Report an issue' },
]

const SOCIALS = [
  { icon: Linkedin, href: LINKS.linkedin, label: 'LinkedIn' },
  { icon: Youtube, href: LINKS.youtube, label: 'YouTube' },
  { icon: Instagram, href: LINKS.instagram, label: 'Instagram' },
]

const Contact = () => {
  const [searchParams] = useSearchParams()
  const [topic, setTopic] = useState(() => TOPICS.some(({ value }) => value === searchParams.get('topic')) ? searchParams.get('topic') : 'general')
  const [form, setForm] = useState({ name: '', email: '', shop: '', area: '', message: '', website: '' })
  const [status, setStatus] = useState('idle')
  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    if (form.website) return
    setStatus('sending')
    const params = {
      from_name: form.name,
      from_email: form.email,
      subject: `vehnicate contact - ${topic}${form.shop ? ` - ${form.shop}` : ''}`,
      message: `${form.message}\n\ntopic: ${topic}${form.shop ? `\nshop: ${form.shop}` : ''}${form.area ? `\narea: ${form.area}` : ''}`,
    }
    try {
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.adminTemplateId, params, EMAILJS_CONFIG.publicKey)
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.replyTemplateId, params, EMAILJS_CONFIG.publicKey)
      setStatus('sent')
      setForm({ name: '', email: '', shop: '', area: '', message: '', website: '' })
      window.setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section-pad interior-page interior-contact">
      <div className="container-x contact-layout">
        <div className="contact-intro">
          <span className="label">CONTACT</span>
          <h1 className="display-heading contact-heading">Talk to the Vehnicate team.</h1>
          <p>Questions about the app, interested in the merchant network, or spotted something we should know about? Send us a note.</p>
          <div className="contact-details">
            <div className="contact-detail"><span><Mail size={13}/> Email</span><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></div>
            <div className="contact-detail"><span><Phone size={13}/> Phone</span><a href={`tel:${LINKS.phone.replace(/\s/g, '')}`}>{LINKS.phone}</a></div>
            <div className="contact-detail"><span>Follow Vehnicate</span><div className="contact-socials">{SOCIALS.map(({ icon: Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer"><Icon size={14}/>{label}</a>)}</div></div>
          </div>
        </div>

        <div className="contact-form-panel">
          {status === 'sent' ? (
            <div className="contact-success" role="status"><CheckCircle size={30}/><h2>Message sent</h2><p>Thanks for getting in touch. We’ll be in contact soon.</p></div>
          ) : (
            <>
              <div className="contact-form-heading"><h2>Send a message</h2><p>We’ll get back to you as soon as we can.</p></div>
              <form onSubmit={submit}>
                <input type="text" name="website" value={form.website} onChange={set('website')} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <span className="contact-topic-label">I’m contacting you about</span>
                <SegmentedControl options={TOPICS} value={topic} onChange={setTopic} />
                <Field label="Name" required value={form.name} onChange={set('name')} placeholder="Your name" />
                <Field label="Email" type="email" required value={form.email} onChange={set('email')} placeholder="you@example.com" />
                {topic === 'merchant' && <><Field label="Business name" required value={form.shop} onChange={set('shop')} placeholder="Your business" /><Field label="Area" required value={form.area} onChange={set('area')} placeholder="Neighbourhood or city" /></>}
                <Field label="Message" rows={4} required value={form.message} onChange={set('message')} placeholder="How can we help?" />
                {status === 'error' && <p className="contact-error" role="alert"><AlertCircle size={16}/> We couldn’t send your message. Please try again or email us directly.</p>}
                <PrimaryButton type="submit" disabled={status === 'sending'}><Send size={14}/>{status === 'sending' ? 'Sending…' : 'Send message'}</PrimaryButton>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
