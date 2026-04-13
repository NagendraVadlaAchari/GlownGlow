import { useEffect, useRef } from 'react'
import './OurStory.css'

const milestones = [
  { icon: '📍', title: 'Founded in Miyapur', sub: 'Hyderabad, Telangana' },
  { icon: '🥗', title: 'Balanced Meals',     sub: 'Protein · Carb · Fibre' },
  { icon: '🧃', title: 'Cold Pressed',        sub: '0 Sugar · 0 Preservatives' },
]

const bodyBenefits = [
  { icon: '🩸', label: 'Blood Improvement' },
  { icon: '⚖️', label: 'Weight Management' },
  { icon: '🛡️', label: 'Immunity Boosting' },
  { icon: '✨', label: 'Skin & Hair Care' },
  { icon: '💪', label: 'Energy & Active Lifestyle' },
  { icon: '🧘', label: 'Stress & Hypertension Relief' },
]

export default function OurStory() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="story-section" id="story" ref={sectionRef}>
      <div className="story-container">

        {/* ── LEFT: Story Text ── */}
        <div className="story-content">
          <p className="section-tag">Our Story</p>
          <h2 className="story-title">
            Why <span className="highlight">Grow n Glow?</span>
          </h2>

          <p className="story-text">
            Grow n Glow began as a simple idea in <strong>Miyapur, Hyderabad</strong> — to serve
            the best-balanced meal for the human body, suitable for all age groups. In a
            fast-paced metropolitan city like Hyderabad, people have become more focused on
            work than health, leading to early-age lifestyle concerns like{' '}
            <em>diabetes, obesity, stress, and hypertension.</em>
          </p>

          <p className="story-text">
            A healthy life demands healthy nutrients — <strong>carbs, protein, and regular
            fruits &amp; vegetable intake.</strong> Grow n Glow is laser-focused on exactly
            that: providing a protein-carb-fibre balanced salad bowl that keeps you active
            and energised for hours.
          </p>

          <p className="story-text">
            Our <strong>cold pressed juices</strong> cover all vital aspects of the human body
            — blood improvement, weight management, immunity boosting, and skin &amp; hair care.
            Cold pressing preserves every enzyme and nutrient, delivering{' '}
            <strong>0 sugar, 0 preservatives, instant made</strong> goodness that keeps every
            sip truly fresh and beneficial for your overall health.
          </p>

          {/* Milestones */}
          <div className="story-milestones">
            {milestones.map((m, i) => (
              <div className="milestone" key={i}>
                <div className="milestone-icon">{m.icon}</div>
                <div>
                  <strong>{m.title}</strong>
                  <span>{m.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="story-cta"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) }}
          >
            Get in Touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* ── RIGHT: Visual Cards ── */}
        <div className="story-visual">
          {/* Stat cards */}
          <div className="story-stat-cards">
            <div className="story-stat-card card-green">
              <span className="scard-icon">🥗</span>
              <span className="scard-number">₹50</span>
              <span className="scard-label">Salad Bowl</span>
            </div>
            <div className="story-stat-card card-dark">
              <span className="scard-icon">🧃</span>
              <span className="scard-number">₹89</span>
              <span className="scard-label">Cold Pressed Juice</span>
            </div>
            <div className="story-stat-card card-outline">
              <span className="scard-icon">🚚</span>
              <span className="scard-number">Free</span>
              <span className="scard-label">Doorstep Delivery</span>
            </div>
            <div className="story-stat-card card-outline">
              <span className="scard-icon">⚡</span>
              <span className="scard-number">Instant</span>
              <span className="scard-label">Fresh Made to Order</span>
            </div>
          </div>

          {/* Benefits box */}
          <div className="story-benefits-box">
            <h4>What We Cover for Your Body</h4>
            <ul className="story-benefit-list">
              {bodyBenefits.map((b, i) => (
                <li key={i}><span>{b.icon}</span> {b.label}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}
