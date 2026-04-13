import { useState, useEffect } from 'react'
import logoImg from '../assets/logo.png'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Our Menu', href: '#menu' },
  { label: 'Subscription', href: '#subscription' },
  { label: 'Contact Us', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (label, href) => {
    setActiveLink(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        {/* Logo */}
        <a href="#home" className="nav-logo" onClick={() => handleNavClick('Home', '#home')}>
          <img src={logoImg} alt="Grow n Glow Logo" className="logo-img" />
          <span className="logo-text">Grow n <span className="logo-glow">Glow</span></span>
        </a>

        {/* Desktop Nav */}
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`nav-link ${activeLink === link.label ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.label, link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Hamburger */}
        <div className="nav-actions">
          <a href="#menu" className="nav-cta" onClick={(e) => { e.preventDefault(); handleNavClick('Our Menu', '#menu') }}>
            Order Now
          </a>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="hamburger-btn"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`mobile-link ${activeLink === link.label ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.label, link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#menu" className="mobile-cta" onClick={(e) => { e.preventDefault(); handleNavClick('Our Menu', '#menu') }}>
              Order Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
