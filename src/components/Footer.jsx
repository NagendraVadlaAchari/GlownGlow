import logoImg from '../assets/logo.png'
import './Footer.css'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Our Menu', href: '#menu' },
  { label: 'Subscription', href: '#subscription' },
  { label: 'Contact Us', href: '#contact' },
]

const menuLinks = [
  { label: 'Classic Salads', href: '#menu' },
  { label: 'Exotic Bowls', href: '#menu' },
  { label: 'Quinoa Salads', href: '#menu' },
  { label: 'Pasta Salads', href: '#menu' },
  { label: 'Keto Options', href: '#menu' },
  { label: 'Healthy Desserts', href: '#menu' },
]

export default function Footer() {
  const scrollToSection = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      {/* Top wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#1D3A1F"/>
        </svg>
      </div>

      <div className="footer-main">
        <div className="footer-container">
          {/* Brand column */}
          <div className="footer-brand">
            <a href="#home" className="footer-logo" onClick={(e) => { e.preventDefault(); scrollToSection('#home') }}>
              <img src={logoImg} alt="Grow n Glow Logo" />
              <span>Grow n <span className="logo-glow">Glow</span></span>
            </a>
            <p className="footer-desc">
              India's fastest growing health food brand. We believe that eating healthy 
              should be convenient, delicious, and affordable for everyone.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook" id="footer-fb">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="Instagram" id="footer-ig">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn" id="footer-li">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="YouTube" id="footer-yt">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1D3A1F"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                  >
                    <span className="link-arrow">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Menu</h4>
            <ul className="footer-links">
              {menuLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href) }}
                  >
                    <span className="link-arrow">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col footer-newsletter">
            <h4 className="footer-col-title">Stay Updated</h4>
            <p className="footer-newsletter-text">
              Subscribe to our newsletter for weekly healthy recipes, tips, and exclusive offers.
            </p>
            <form className="footer-form" id="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                id="footer-email"
                aria-label="Email for newsletter"
                required
              />
              <button type="submit" id="footer-subscribe-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>

            <div className="footer-badges">
              <div className="footer-badge-item">
                <span>🌿</span>
                <span>100% Natural</span>
              </div>
              <div className="footer-badge-item">
                <span>🚀</span>
                <span>Fast Delivery</span>
              </div>
              <div className="footer-badge-item">
                <span>💚</span>
                <span>Zero Preservatives</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <strong>Grow n Glow</strong>. All rights reserved. 
            Made with 💚 for a healthier India.
          </p>
          <div className="footer-legal">
            <a href="#" id="privacy-link">Privacy Policy</a>
            <a href="#" id="terms-link">Terms of Service</a>
            <a href="#" id="refund-link">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
