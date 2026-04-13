import { useEffect, useRef } from 'react'
import './AppSection.css'

const appFeatures = [
  {
    icon: '🗺️',
    title: 'Explore Varieties',
    desc: 'Explore Veg and Non-Veg options with smart filters.',
  },
  {
    icon: '⚡',
    title: 'Fast Delivery',
    desc: 'Real-time order tracking and instant notifications.',
  },
  {
    icon: '🎁',
    title: 'Rewards & Offers',
    desc: 'Earn points on every order. Exclusive app-only deals.',
  },
  {
    icon: '💳',
    title: 'Easy Payments',
    desc: 'Multiple secure payment gateways. Pay your way.',
  },
]

export default function AppSection() {
  const sectionRef = useRef(null)

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

  return (
    <section className="app-section" ref={sectionRef}>
      <div className="container">
        <div className="app-grid">
          {/* Left: Phone mockup */}
          <div className="app-phone-wrap">
            <div className="phone-outer-ring"></div>
            <div className="app-phone-mockup">
              <div className="phone-screen">
                <div className="phone-status-bar">
                  <span>9:41</span>
                  <span>●●●</span>
                </div>
                <div className="phone-content">
                  <div className="phone-header">
                    <span className="phone-logo">🌿 Grow n Glow</span>
                    <span className="phone-notif">🔔</span>
                  </div>
                  <div className="phone-banner">
                    <p>Today's Special</p>
                    <h4>Caesar Bowl</h4>
                    <span className="phone-price">₹249</span>
                  </div>
                  <div className="phone-salads">
                    <div className="phone-salad-item">🥗</div>
                    <div className="phone-salad-item">🥙</div>
                    <div className="phone-salad-item">🫙</div>
                  </div>
                  <div className="phone-order-btn">Order Now →</div>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="phone-float float-1">
              <span>📦</span>
              <div>
                <strong>Order Placed!</strong>
                <small>Arriving in 25 mins</small>
              </div>
            </div>
            <div className="phone-float float-2">
              <span>⭐</span>
              <div>
                <strong>4.9/5</strong>
                <small>50k+ Reviews</small>
              </div>
            </div>
          </div>

          {/* Right: Features */}
          <div className="app-content">
            <p className="section-tag">Mobile App</p>
            <h2 className="app-title">
              Straight from Our Kitchen<br />
              <span className="title-highlight">To Your Doorstep</span>
            </h2>
            <p className="app-desc">
              Download the Grow n Glow app and unlock a world of fresh, nutritious meals 
              at your fingertips. Seamless ordering, real-time tracking, and exclusive 
              offers — all in one beautiful app.
            </p>

            <div className="app-features-list">
              {appFeatures.map((feat, i) => (
                <div className="app-feature-item" key={i}>
                  <div className="app-feat-icon">{feat.icon}</div>
                  <div>
                    <h4 className="app-feat-title">{feat.title}</h4>
                    <p className="app-feat-desc">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="app-store-btns">
              <a href="#" className="store-btn" id="app-store-btn">
                <span className="store-btn-icon">🍎</span>
                <div>
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </a>
              <a href="#" className="store-btn" id="play-store-btn">
                <span className="store-btn-icon">▶</span>
                <div>
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
