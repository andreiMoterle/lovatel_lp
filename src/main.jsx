import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import Lenis from 'lenis'

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1.2,
  smoothWheel: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
