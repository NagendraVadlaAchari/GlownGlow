import { useState } from 'react'
import saladImg from '../assets/hero.png'
import abcImg   from '../assets/abc_juice.png'
import greenImg from '../assets/green_juice.png'
import pomImg   from '../assets/pom_juice.png'
import melonImg from '../assets/melon_juice.png'
import pinImg   from '../assets/pineapple_juice.png'
import './Menu.css'
import { WEB3FORMS_ACCESS_KEY, WHATSAPP_NUMBER } from '../emailConfig'

/* ── Native WhatsApp deep-link — opens desktop/mobile app, NO web redirect ── */
const openWhatsAppNative = (phone, text) => {
  // whatsapp:// protocol opens WhatsApp Desktop (Windows/Mac) or mobile app
  // It will NOT redirect to web.whatsapp.com
  window.location.href = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(text)}`
}

/* ── Products ── */
const products = [
  { id: 1, name: 'Salad Bowl',              tag: 'Protein · Carb · Fiber (250g)',           price: '₹50',  priceNum: 50,  img: saladImg, badge: 'Bestseller',  badgeColor: '#7ABB4A' },
  { id: 2, name: 'ABC Cold Pressed Juice',  tag: 'Apple · Beetroot · Carrot (200ml)',       price: '₹89',  priceNum: 89,  img: abcImg,  badge: 'Blood Boost', badgeColor: '#b5294e' },
  { id: 3, name: 'Green Glow Juice',        tag: 'Spinach · Cucumber · Ginger (200ml)',     price: '₹89',  priceNum: 89,  img: greenImg, badge: 'Detox',       badgeColor: '#27ae60' },
  { id: 4, name: 'Pomegranate Apple Juice', tag: 'Pomegranate · Apple (200ml)',             price: '₹89',  priceNum: 89,  img: pomImg,  badge: 'Immunity',    badgeColor: '#c0392b' },
  { id: 5, name: 'Double Melon Juice',      tag: 'Watermelon · Cantaloupe (200ml)',         price: '₹89',  priceNum: 89,  img: melonImg, badge: 'Weight Loss', badgeColor: '#e67e22' },
  { id: 6, name: 'Pineapple Juice',         tag: 'Pineapple · Mint · Ginger (200ml)',       price: '₹89',  priceNum: 89,  img: pinImg,  badge: 'Metabolism',  badgeColor: '#d4ac0d' },
]

const trustPoints = [
  { icon: '🚫', label: '0 Sugar' },
  { icon: '✅', label: '0 Preservatives' },
  { icon: '⚡', label: 'Instant Made' },
  { icon: '🌿', label: '100% Natural' },
]

/* ── Juice Week Plan ── */
const benefits = [
  { icon: '🧹', label: 'Detox' },
  { icon: '✨', label: 'Glow' },
  { icon: '🩸', label: 'Blood Boost' },
  { icon: '⚖️', label: 'Weight Loss' },
  { icon: '🛡️', label: 'Immunity' },
]

const weekPlan = [
  { day: 'Monday',    name: 'ABC Power',             emoji: '🔴', color: '#b5294e', gradient: 'linear-gradient(135deg,#b5294e,#7a1230)', desc: 'Apple · Beetroot · Carrot — rich in iron, boosts blood & energy',          benefit: 'Blood Boost' },
  { day: 'Tuesday',   name: 'Green Glow Detox',       emoji: '💚', color: '#3a9a4a', gradient: 'linear-gradient(135deg,#3a9a4a,#1d5e28)', desc: 'Spinach · Cucumber · Ginger · Lemon — deep cleanse & skin glow',          benefit: 'Glow + Detox' },
  { day: 'Wednesday', name: 'Pomegranate Radiance',   emoji: '🍎', color: '#c0392b', gradient: 'linear-gradient(135deg,#c0392b,#922b21)', desc: 'Pomegranate · Apple — powerful antioxidants for radiant skin & immunity',  benefit: 'Immunity' },
  { day: 'Thursday',  name: 'Melon Slimmer',          emoji: '🍈', color: '#e67e22', gradient: 'linear-gradient(135deg,#e67e22,#a04000)', desc: 'Watermelon · Cantaloupe — hydrating, low-cal, perfect weight management', benefit: 'Weight Loss' },
  { day: 'Friday',    name: 'Pineapple Metabolism',   emoji: '🍍', color: '#d4ac0d', gradient: 'linear-gradient(135deg,#d4ac0d,#9a7d0a)', desc: 'Pineapple · Mint · Ginger — fire up metabolism, aid digestion',            benefit: 'Detox' },
]

const pricingPlans = [
  { id: 'weekly',   label: 'Weekly',    total: '₹695',   discountedTotal: null,    perDay: '₹139 / day', savings: null,    discount: null,     highlight: false },
  { id: 'biweekly', label: 'Bi-Weekly', total: '₹1,390', discountedTotal: '₹1,321', perDay: '₹132 / day', savings: '₹69',  discount: '5% OFF', highlight: true  },
  { id: 'monthly',  label: 'Monthly',   total: '₹2,780', discountedTotal: '₹2,502', perDay: '₹125 / day', savings: '₹278', discount: '10% OFF', highlight: false },
]

export default function Menu() {
  const [activePlan, setActivePlan] = useState('weekly')
  const [activeDay,  setActiveDay]  = useState(0)
  const [cart, setCart] = useState({})

  const handleAdd    = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
  const handleRemove = (id) => setCart(prev => {
    const qty = (prev[id] || 0) - 1
    if (qty <= 0) {
      const next = { ...prev }
      delete next[id]
      return next
    }
    return { ...prev, [id]: qty }
  })

  const totalItems = Object.values(cart).reduce((s, q) => s + q, 0)
  const totalPrice = products.reduce((s, p) => s + (cart[p.id] || 0) * p.priceNum, 0)

  const [cartSent,     setCartSent]     = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)

  /* ── Customer details modal state ── */
  const [showModal,    setShowModal]    = useState(false)
  const [orderChannel, setOrderChannel] = useState(null)   // 'email' | 'whatsapp'
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' })
  const [formErrors, setFormErrors] = useState({})

  const openOrderModal = (channel) => {
    setOrderChannel(channel)
    setFormErrors({})
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setOrderChannel(null)
  }

  const validateForm = () => {
    const errs = {}
    if (!customer.name.trim())              errs.name    = 'Please enter your name'
    if (!/^[6-9]\d{9}$/.test(customer.phone.trim())) errs.phone = 'Enter a valid 10-digit mobile number'
    if (!customer.address.trim())           errs.address = 'Please enter your delivery address'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  /* ── Cart text builders (now include customer info) ── */
  const buildCartLines = () =>
    products
      .filter(p => cart[p.id])
      .map(p => `• ${p.name} x${cart[p.id]} = ₹${cart[p.id] * p.priceNum}`)
      .join('\n')

  const buildCartBody = () =>
    `CUSTOMER DETAILS\n` +
    `========================================\n` +
    `Name    : ${customer.name}\n` +
    `Mobile  : ${customer.phone}\n` +
    `Address : ${customer.address}\n` +
    `========================================\n\n` +
    `ORDER SUMMARY\n` +
    `========================================\n` +
    buildCartLines() + `\n` +
    `----------------------------------------\n` +
    `TOTAL (${totalItems} item${totalItems > 1 ? 's' : ''}): ₹${totalPrice}\n` +
    `========================================\n\n` +
    `Please confirm and contact the customer.\n— Grow n Glow Website`

  /* ── Submit order (called from modal) ── */
  const submitOrder = async () => {
    if (!validateForm()) return

    if (orderChannel === 'email') {
      if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        alert('⚠️ Email not configured yet.\n\nGet your free key at https://web3forms.com')
        closeModal()
        return
      }
      setEmailLoading(true)
      closeModal()
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `🛒 New Order from ${customer.name} - Grow n Glow`,
            from_name: 'Grow n Glow Website',
            message: buildCartBody(),
            botcheck: '',
          }),
        })
        const data = await res.json()
        if (data.success) {
          setCartSent(true)
          setTimeout(() => setCartSent(false), 4000)
        } else {
          alert('❌ Failed to send order email. Please try WhatsApp instead.')
        }
      } catch {
        alert('❌ Network error. Please try WhatsApp instead.')
      } finally {
        setEmailLoading(false)
      }
    } else {
      // WhatsApp
      const text =
        `🛒 *New Order — Grow n Glow*\n\n` +
        `*👤 Customer Details*\n` +
        `• Name    : ${customer.name}\n` +
        `• Mobile  : ${customer.phone}\n` +
        `• Address : ${customer.address}\n\n` +
        `*🛍️ Order Items*\n` +
        buildCartLines() +
        `\n\n*TOTAL (${totalItems} item${totalItems > 1 ? 's' : ''}): ₹${totalPrice}*\n\nPlease confirm this order.`
      closeModal()
      openWhatsAppNative(WHATSAPP_NUMBER, text)
      setCartSent(true)
      setTimeout(() => setCartSent(false), 4000)
    }
  }

  return (
    <section className="menu-section" id="menu">

      {/* ── Floating Cart Buttons ── */}
      {totalItems > 0 && (
        <div className="cart-float-group">
          {cartSent ? (
            <div className="cart-float-sent">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              Order Sent!
            </div>
          ) : (
            <>
              <button className="cart-float-btn" id="cart-email-btn" onClick={() => openOrderModal('email')} title="Send order via Email" disabled={emailLoading}>
                {emailLoading ? (
                  <span className="cart-email-spinner" />
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                )}
                {emailLoading ? 'Sending…' : 'Email Order'}
                {!emailLoading && <span className="cart-float-badge">{totalItems}</span>}
              </button>
              <button className="cart-float-btn cart-float-btn--wa" id="cart-whatsapp-btn" onClick={() => openOrderModal('whatsapp')} title="Send order via WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </button>
            </>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          PART 1 — OUR PRODUCTS
      ══════════════════════════════════════ */}
      <div className="menu-inner">
        {/* Header */}
        <div className="products-header">
          <p className="section-tag">Our Products</p>
          <h2 className="menu-main-title">
            Discover the Art of <span className="title-green">Healthy Eating</span>
          </h2>
          <p className="menu-main-sub">
            Fresh salad bowls &amp; cold-pressed juices — 0 sugar, 0 preservatives, instant made
          </p>

          {/* Trust strip */}
          <div className="trust-strip">
            {trustPoints.map(t => (
              <span className="trust-strip-item" key={t.label}>
                <span>{t.icon}</span> {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="products-grid">
          {products.map((p, i) => (
            <div className="product-card" key={p.id} style={{ '--delay': `${i * 0.09}s` }}>
              <div className="pcard-badge-top" style={{ background: p.badgeColor }}>{p.badge}</div>
              <div className="veg-dot" title="Pure Veg"><span>●</span></div>

              <div className="product-img-wrap">
                <img src={p.img} alt={p.name} className="product-img" />
              </div>

              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-tag">{p.tag}</p>
                <div className="product-footer">
                  <span className="product-price">{p.price}</span>

                  {cart[p.id] ? (
                    /* ── Quantity stepper ── */
                    <div className="qty-stepper" id={`stepper-${p.id}`}>
                      <button
                        className="qty-btn qty-btn--minus"
                        id={`minus-${p.id}`}
                        onClick={() => handleRemove(p.id)}
                        aria-label="Remove one"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                      <span className="qty-count">{cart[p.id]}</span>
                      <button
                        className="qty-btn qty-btn--plus"
                        id={`plus-${p.id}`}
                        onClick={() => handleAdd(p.id)}
                        aria-label="Add one more"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                    </div>
                  ) : (
                    /* ── Plain Add to Cart ── */
                    <button
                      className="product-add-btn"
                      id={`add-${p.id}`}
                      onClick={() => handleAdd(p.id)}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          PART 2 — DRIVING WITH DISCIPLINE
      ══════════════════════════════════════ */}
      <div className="menu-inner discipline-wrap">

        {/* Divider */}
        <div className="section-divider">
          <span className="divider-line"></span>
          <span className="divider-label">Our Juice Plan</span>
          <span className="divider-line"></span>
        </div>

        {/* Header */}
        <div className="products-header">
          <p className="section-tag">Weekly Plan</p>
          <h2 className="menu-main-title">
            Driving with <span className="title-green">Discipline</span>
          </h2>
          <p className="menu-main-sub">
            5 days &nbsp;·&nbsp; 5 different juices &nbsp;·&nbsp; 5 benefits for your
            <strong> complete body health</strong>
          </p>
          <p className="menu-craft-note">Each crafted with fresh fruits, veggies &amp; herbs</p>

          {/* Benefit pills */}
          <div className="menu-benefits">
            {benefits.map(b => (
              <span className="benefit-pill" key={b.label}>
                <span>{b.icon}</span> {b.label}
              </span>
            ))}
          </div>
        </div>

        {/* Week cards */}
        <div className="week-plan-grid">
          {weekPlan.map((item, i) => (
            <div
              key={i}
              className={`week-card ${activeDay === i ? 'week-card--active' : ''}`}
              style={{ '--card-color': item.color, '--card-gradient': item.gradient }}
              onClick={() => setActiveDay(i)}
            >
              <div className="week-card-day">{item.day}</div>
              <div className="week-card-emoji">{item.emoji}</div>
              <div className="week-card-name">{item.name}</div>
              <div className="week-card-desc">{item.desc}</div>
              <span className="week-card-benefit">{item.benefit}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="pricing-section">
          <div className="pricing-header">
            <h3 className="pricing-title">
              Wanna Try Now?{' '}
              <span className="pricing-title-sub">You're just a click away</span>
            </h3>
            <p className="pricing-desc">
              Choose your plan — includes <strong>Cold Pressed Juice</strong> +{' '}
              <span className="combo-tag">🥗 Salad Bowl combo @ ₹50</span> at your doorstep
            </p>
          </div>

          {/* Toggle */}
          <div className="plan-toggle">
            {pricingPlans.map(plan => (
              <button
                key={plan.id}
                id={`plan-${plan.id}`}
                className={`plan-toggle-btn ${activePlan === plan.id ? 'plan-toggle-btn--active' : ''}`}
                onClick={() => setActivePlan(plan.id)}
              >
                {plan.label}
                {plan.discount && <span className="toggle-discount">{plan.discount}</span>}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="pricing-cards">
            {pricingPlans.map(plan => (
              <div
                key={plan.id}
                className={`pricing-card ${activePlan === plan.id ? 'pricing-card--active' : ''} ${plan.highlight ? 'pricing-card--highlight' : ''}`}
                onClick={() => setActivePlan(plan.id)}
                id={`pricing-card-${plan.id}`}
              >
                {plan.discount && <span className="pcard-badge">{plan.discount}</span>}
                <h4 className="pcard-label">{plan.label}</h4>
                {plan.discountedTotal ? (
                  <div className="pcard-price-wrap">
                    <div className="pcard-price-original">{plan.total}</div>
                    <div className="pcard-price">{plan.discountedTotal}</div>
                    <div className="pcard-savings">You save {plan.savings}!</div>
                  </div>
                ) : (
                  <div className="pcard-price">{plan.total}</div>
                )}
                <div className="pcard-per">{plan.perDay}</div>
                <ul className="pcard-features">
                  <li>🥗 Salad Bowl included</li>
                  <li>🧃 Fresh Cold Pressed Juice</li>
                  <li>🚚 Free Doorstep Delivery</li>
                  {plan.id !== 'weekly' && <li>💰 Save vs daily rate</li>}
                </ul>
                <button className="pcard-btn" id={`select-${plan.id}`}>
                  {activePlan === plan.id ? '✓ Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          {/* Order CTA */}
          <div className="pricing-cta-wrap">
            <a
              href="#contact"
              className="pricing-order-btn"
              id="menu-order-now-btn"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }) }}
            >
              Order Now — {pricingPlans.find(p => p.id === activePlan)?.total} / {activePlan}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <p className="pricing-note">🔒 No commitment · Cancel anytime · Fresh daily</p>
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════════
          CUSTOMER DETAILS MODAL
      ══════════════════════════════════════ */}
      {showModal && (
        <div className="order-modal-overlay" id="order-modal-overlay" onClick={(e) => e.target.id === 'order-modal-overlay' && closeModal()}>
          <div className="order-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">

            {/* Modal Header */}
            <div className="order-modal-header">
              <div className="order-modal-icon">
                {orderChannel === 'email' ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                )}
              </div>
              <div>
                <h2 id="modal-title" className="order-modal-title">Almost there! 🌿</h2>
                <p className="order-modal-subtitle">
                  {orderChannel === 'email' ? 'We need a few details to confirm your email order' : 'Share your details so we can confirm on WhatsApp'}
                </p>
              </div>
              <button className="order-modal-close" onClick={closeModal} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Order Summary Strip */}
            <div className="order-modal-summary">
              <span className="oms-label">🛒 Your Order</span>
              <span className="oms-items">{totalItems} item{totalItems > 1 ? 's' : ''}</span>
              <span className="oms-total">₹{totalPrice}</span>
            </div>

            {/* Form */}
            <div className="order-modal-form">

              {/* Name */}
              <div className={`omf-group ${formErrors.name ? 'omf-group--error' : ''}`}>
                <label className="omf-label" htmlFor="om-name">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Full Name <span className="omf-required">*</span>
                </label>
                <input
                  id="om-name"
                  type="text"
                  className="omf-input"
                  placeholder="e.g. Ravi Kumar"
                  value={customer.name}
                  onChange={e => setCustomer(c => ({ ...c, name: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && document.getElementById('om-phone').focus()}
                />
                {formErrors.name && <span className="omf-error">{formErrors.name}</span>}
              </div>

              {/* Phone */}
              <div className={`omf-group ${formErrors.phone ? 'omf-group--error' : ''}`}>
                <label className="omf-label" htmlFor="om-phone">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.37 16l.55.92z"/></svg>
                  Mobile Number <span className="omf-required">*</span>
                </label>
                <input
                  id="om-phone"
                  type="tel"
                  className="omf-input"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  value={customer.phone}
                  onChange={e => setCustomer(c => ({ ...c, phone: e.target.value.replace(/\D/g, '') }))}
                  onKeyDown={e => e.key === 'Enter' && document.getElementById('om-address').focus()}
                />
                {formErrors.phone && <span className="omf-error">{formErrors.phone}</span>}
              </div>

              {/* Address */}
              <div className={`omf-group ${formErrors.address ? 'omf-group--error' : ''}`}>
                <label className="omf-label" htmlFor="om-address">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Delivery Address <span className="omf-required">*</span>
                </label>
                <textarea
                  id="om-address"
                  className="omf-input omf-textarea"
                  placeholder="House no., Street, Area, City — Pincode"
                  rows={3}
                  value={customer.address}
                  onChange={e => setCustomer(c => ({ ...c, address: e.target.value }))}
                />
                {formErrors.address && <span className="omf-error">{formErrors.address}</span>}
              </div>

            </div>

            {/* Actions */}
            <div className="order-modal-actions">
              <button className="oma-cancel" onClick={closeModal}>Cancel</button>
              <button
                className={`oma-submit ${orderChannel === 'whatsapp' ? 'oma-submit--wa' : ''}`}
                id="om-submit-btn"
                onClick={submitOrder}
                disabled={emailLoading}
              >
                {emailLoading ? (
                  <><span className="cart-email-spinner" /> Sending…</>
                ) : orderChannel === 'email' ? (
                  <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Send Email Order</>
                ) : (
                  <><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Send via WhatsApp</>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
