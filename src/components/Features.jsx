import { useEffect, useRef } from 'react'
import './Features.css'

const features = [
  {
    icon: '🌾',
    title: 'Fresh Ingredients',
    desc: 'We source only the finest, freshest produce directly from farms. Every ingredient is hand-picked for its quality, nutrition, and taste.',
    color: '#7ABB4A',
  },
  {
    icon: '🍽️',
    title: 'Diverse Menu',
    desc: 'From classic Caesar salads to exotic quinoa bowls, our ever-expanding menu caters to every palate and dietary preference.',
    color: '#f5c842',
  },
  {
    icon: '⚡',
    title: 'Fast Delivery',
    desc: 'Hot and fresh to your doorstep within minutes. Our real-time tracking ensures you always know where your healthy meal is.',
    color: '#4ab8c1',
  },
  {
    icon: '🔬',
    title: 'Nutritionist Approved',
    desc: 'Every recipe is designed by certified nutritionists to ensure you get the perfect balance of macros and micronutrients.',
    color: '#e67e22',
  },
  {
    icon: '🌱',
    title: 'Zero Preservatives',
    desc: 'Absolutely no artificial preservatives, colours, or flavours. What you see is what you get — 100% natural goodness.',
    color: '#27ae60',
  },
  {
    icon: '🎯',
    title: 'Customizable Orders',
    desc: 'Build your perfect bowl your way. Choose your base, toppings, dressings, and portion sizes to match your exact needs.',
    color: '#9b59b6',
  },
]

export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="features-section" ref={sectionRef}>
      {/* Decorative elements */}
      <div className="features-deco deco-left"></div>
      <div className="features-deco deco-right"></div>

      <div className="container">
        {/* Header */}
        <div className="features-header">
          <p className="section-tag">Why Choose Us</p>
          <h2 className="features-title">
            Why <span className="title-green">Grow n Glow</span> Stands Out
          </h2>
          <p className="features-subtitle">
            We're not just a food brand — we're a movement towards healthier living.
            Here's what makes us different.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              className="feature-card"
              key={index}
              style={{ '--delay': `${index * 0.1}s`, '--accent-color': feature.color }}
            >
              <div className="feature-icon-wrap">
                <div className="feature-icon-ring"></div>
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
              <div className="feature-hover-bar"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
