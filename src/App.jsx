import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import Features from './components/Features'
import Menu from './components/Menu'
import AppSection from './components/AppSection'
import Subscription from './components/Subscription'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <OurStory />
        <Features />
        <Menu />
        <AppSection />
        <Subscription />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
