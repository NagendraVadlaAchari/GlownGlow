import { useEffect, useRef } from 'react'
import heroImg from '../assets/hero.png'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Floating decorative blobs */}
      <div className="hero-blob blob-1"></div>
      <div className="hero-blob blob-2"></div>
      <div className="hero-blob blob-3"></div>

      <div className="hero-container">
        {/* Content */}
        <div className="hero-content">
          <div className="hero-tag">
            <span className="tag-dot"></span>
            India's Biggest Health Brand
          </div>
          <h1 className="hero-title">
            HEALTHY<br />
            <span className="hero-title-glow">BITES</span>
          </h1>
          <p className="hero-subtitle">Your Favourite Salads,<br />Just a Click Away</p>

          {/* Product showcase line */}
          <div className="hero-products">
            <div className="hero-product-item">
              <span className="hero-product-emoji">🥗</span>
              <span className="hero-product-label">Salad Bowls</span>
            </div>
            <span className="hero-product-plus">+</span>
            <div className="hero-product-item">
              <span className="hero-product-emoji">🧃</span>
              <span className="hero-product-label">Cold Pressed Juices</span>
            </div>
            <span className="hero-product-tagline">with a click away at your doorstep</span>
          </div>

          {/* Trust badges */}
          <div className="hero-trust-badges">
            <div className="trust-badge">
              <span className="trust-icon">🚫</span>
              <span>No Sugar</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">✅</span>
              <span>No Preservatives</span>
            </div>
            <div className="trust-badge">
              <span className="trust-icon">⚡</span>
              <span>Instant Made</span>
            </div>
          </div>
          <div className="hero-actions">
            <button
              className="hero-btn-primary"
              id="hero-order-btn"
              onClick={() => scrollToSection('#menu')}
            >
              <span>Order Now</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button
              className="hero-btn-outline"
              id="hero-story-btn"
              onClick={() => scrollToSection('#story')}
            >
              Our Story
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">2+</span>
              <span className="stat-label">Cloud Kitchens</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">1</span>
              <span className="stat-label">City Hyderabad</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="hero-image-wrap">
          <div className="hero-image-glow"></div>
          <div className="hero-image-ring ring-1"></div>
          <div className="hero-image-ring ring-2"></div>
          <img src={heroImg} alt="Fresh healthy salad bowl" className="hero-img" />

          {/* Floating badges */}
          <div className="hero-badge badge-fresh">
            <span className="badge-icon">🌿</span>
            <span>100% Fresh</span>
          </div>
          <div className="hero-badge badge-delivery">
            <span className="badge-icon">⚡</span>
            <span>Fast Delivery</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-dot"></div>
      </div>
    </section>
  )
}
