import { useEffect, useRef, useState } from 'react'
import './Subscription.css'

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    originalPrice: '₹2,780',
    price: '₹2,502',
    savings: '₹278',
    discount: '10% OFF',
    period: 'per month',
    desc: 'Daily fresh salads & juices delivered right to your doorstep.',
    features: [
      'Daily fresh delivery',
      'Access to full menu',
      'Free delivery on all orders',
      'Priority customer support',
    ],
    highlight: false,
    icon: '🌱',
  },
  {
    id: 'quarterly',
    name: 'Quarterly Plan',
    originalPrice: '₹8,340',
    price: '₹7,089',
    savings: '₹1,251',
    discount: '15% OFF',
    period: 'per 3 months',
    desc: 'Bigger savings and hassle-free healthy living for 3 full months.',
    features: [
      'Everything in Monthly',
      '15% savings vs monthly',
      'Exclusive member discounts',
      'Free nutritional consultation',
    ],
    highlight: true,
    badge: 'Most Popular',
    icon: '🌿',
  },
  {
    id: 'halfyearly',
    name: 'Half-Yearly Plan',
    originalPrice: '₹16,680',
    price: '₹12,510',
    savings: '₹4,170',
    discount: '25% OFF',
    period: 'per 6 months',
    desc: 'Maximum savings and guaranteed consistency for a full 6 months.',
    features: [
      'Everything in Quarterly',
      '25% savings vs monthly',
      'Customizable meal plans',
      'Dedicated health coach',
    ],
    highlight: false,
    icon: '🌳',
  },
]

export default function Subscription() {
  const sectionRef = useRef(null)
  const [selectedPlan, setSelectedPlan] = useState('quarterly')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <section className="subscription-section" id="subscription" ref={sectionRef}>
      {/* bg deco */}
      <div className="sub-blob sub-blob-1"></div>
      <div className="sub-blob sub-blob-2"></div>

      <div className="container">
        {/* Header */}
        <div className="sub-header">
          <p className="section-tag sub-tag">Subscription Plans</p>
          <h2 className="sub-title">
            Our <span className="title-white-glow">Subscription</span> Plans
          </h2>
          <p className="sub-subtitle">
            Make healthy eating a habit with Grow n Glow's flexible subscription plans, 
            designed to fit your lifestyle and budget.
          </p>
        </div>

        {/* Plans */}
        <div className="plans-grid">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`plan-card ${plan.highlight ? 'plan-highlight' : ''} ${selectedPlan === plan.id ? 'plan-selected' : ''}`}
              style={{ '--delay': `${index * 0.15}s` }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.badge && (
                <div className="plan-badge">{plan.badge}</div>
              )}
              <div className="plan-icon">{plan.icon}</div>
              <h3 className="plan-name">{plan.name}</h3>
              <div className="sub-discount-badge">{plan.discount}</div>
              <div className="plan-price">
                <div className="plan-original-price">{plan.originalPrice}</div>
                <div className="plan-price-row">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
                <div className="plan-savings-tag">🏷️ You save {plan.savings}!</div>
              </div>
              <p className="plan-desc">{plan.desc}</p>
              <ul className="plan-features">
                {plan.features.map((feat, i) => (
                  <li key={i}>
                    <span className="feat-check">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                className={`plan-btn ${plan.highlight ? 'plan-btn-white' : 'plan-btn-outline'}`}
                id={`subscribe-${plan.id}`}
              >
                {selectedPlan === plan.id ? 'Selected ✓' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* Email lead form */}
        <div className="sub-lead">
          <div className="sub-lead-inner">
            <div className="sub-lead-text">
              <h3>Start Your Healthy Journey Today</h3>
              <p>Enter your email to get started with your subscription and receive a special welcome offer.</p>
            </div>
            {submitted ? (
              <div className="sub-success">
                <span>🎉</span>
                <p>Thank you! We'll be in touch soon with your welcome offer.</p>
              </div>
            ) : (
              <form className="sub-form" onSubmit={handleSubmit} id="subscription-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="subscription-email"
                />
                <button type="submit" id="subscription-submit">
                  Get Started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
