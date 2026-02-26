import React from 'react'

const TypewriterText = ({ text, className = '' }) => (
  <span className={`typing-effect ${className}`}>
    {text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ transformOrigin: 'bottom' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
)

export default TypewriterText
