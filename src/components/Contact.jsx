import { useEffect, useRef, useState } from 'react'
import { WEB3FORMS_ACCESS_KEY, WHATSAPP_NUMBER } from '../emailConfig'
import './Contact.css'

/* ── WhatsApp: opens native app only — NO web.whatsapp.com redirect ── */
const openWhatsApp = (phone, text) => {
  // whatsapp:// opens WhatsApp Desktop (Windows/Mac) or mobile app directly
  window.location.href = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`
}

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm]           = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const markDone = () => {
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSubmitted(false), 6000)
  }

  /* ── Send Email via Web3Forms API ── */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setError('⚠️ Email not configured yet. Please get your free access key from web3forms.com and paste it in emailConfig.js')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `🌿 New Message from ${form.name} | Grow n Glow`,
          from_name: 'Grow n Glow Website',
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          message: form.message,
          botcheck: '',          // honeypot
        }),
      })
      const data = await res.json()
      if (data.success) {
        markDone()
      } else {
        setError('❌ Failed to send email. Please try again or use WhatsApp.')
      }
    } catch {
      setError('❌ Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  /* ── WhatsApp (native app, no web redirect) ── */
  const handleWhatsApp = () => {
    if (!form.name.trim() || !form.message.trim()) {
      alert('Please fill in at least your Name and Message before sending via WhatsApp.')
      return
    }
    const text =
      `🌿 *New Message — Grow n Glow*\n\n` +
      `*Name:*    ${form.name}\n` +
      `*Phone:*   ${form.phone || 'Not provided'}\n` +
      `*Email:*   ${form.email || 'Not provided'}\n\n` +
      `*Message:*\n${form.message}`

    openWhatsApp(WHATSAPP_NUMBER, text)
    markDone()
  }

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-grid">

          {/* ── Info Side ── */}
          <div className="contact-info">
            <p className="section-tag">Get In Touch</p>
            <h2 className="contact-title">
              Ready to Experience <br />
              <span className="contact-title-green">Fresh Salads?</span><br />
              <span className="contact-title-sub">Order Now!</span>
            </h2>
            <p className="contact-desc">
              Have any questions, feedback, or want to make a bulk corporate order?
              We'd love to hear from you! Our team is always ready to help.
            </p>

            <div className="contact-cards">
              <div className="contact-card">
                <span className="contact-card-icon">📞</span>
                <div>
                  <strong>Call Us</strong>
                  <span>+91-7396624938</span>
                </div>
              </div>
              <div className="contact-card">
                <span className="contact-card-icon">📧</span>
                <div>
                  <strong>Email Us</strong>
                  <span>grownglow2k26@gmail.com</span>
                </div>
              </div>
              <div className="contact-card">
                <span className="contact-card-icon">🕐</span>
                <div>
                  <strong>Working Hours</strong>
                  <span>Mon–Sun: 6:00 AM – 10:00 PM</span>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <a href="#" className="social-link" id="fb-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-link" id="ig-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="social-link" id="yt-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                </svg>
              </a>
              <a href="#" className="social-link" id="li-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* ── Form Side ── */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="form-success">
                <div className="success-icon">✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out! We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <h3 className="form-title">Send Us a Message</h3>

                {error && (
                  <div className="form-error-banner">{error}</div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name</label>
                    <input type="text" id="contact-name" name="name"
                      placeholder="Your full name" value={form.name}
                      onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input type="tel" id="contact-phone" name="phone"
                      placeholder="+91 XXXXX XXXXX" value={form.phone}
                      onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input type="email" id="contact-email" name="email"
                    placeholder="your@email.com" value={form.email}
                    onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" name="message"
                    placeholder="Tell us about your query..." rows={5}
                    value={form.message} onChange={handleChange} required />
                </div>

                {/* hidden honeypot — anti-spam */}
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                {/* Action Buttons */}
                <div className="form-actions">
                  <button type="submit" className="form-submit" id="contact-submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="btn-spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Send Email
                      </>
                    )}
                  </button>
                  <button type="button" className="form-whatsapp" id="contact-whatsapp" onClick={handleWhatsApp}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
