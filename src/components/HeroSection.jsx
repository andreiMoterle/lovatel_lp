import React, { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = ({ handleScroll }) => {
  const container = useRef()
  const heroRef = useRef()

  useGSAP(() => {
    // Hero Entrance & Custom Interactions
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    
    tl.from('.hero-title-line', {
      yPercent: 120,
      skewY: 6,
      opacity: 0,
      duration: 1.5,
      stagger: 0.15
    }, 0.2)
    .from('.hero-item', {
      y: 40,
      opacity: 0,
      duration: 1.5,
      stagger: 0.2
    }, 0.6)

    // Hero Interactive Parallax (Reacts to Mouse, only on desktop)
    const handleMouseMove = (e) => {
      if (window.innerWidth < 768) return // Desabilita no mobile
      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5) * 60
      const yPos = (clientY / window.innerHeight - 0.5) * 60

      gsap.to('.hero-title', { x: xPos, y: yPos, duration: 2, ease: 'power3.out' })
      gsap.to('.hero-item', { x: xPos * 0.4, y: yPos * 0.4, duration: 2.5, ease: 'power3.out' })
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Hero Scroll Fade/Parallax (Fades out dynamically on scroll)
    gsap.to('.hero-content', {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 250,
      opacity: 0,
      scale: 0.95
    })

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, { scope: container })

  return (
    <header ref={container} className="relative min-h-[110vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
      <div ref={heroRef} className="absolute inset-0 pointer-events-none"></div>
      <div className="relative z-10 hero-content w-full">
        <div className="flex items-center gap-4 mb-8 hero-item mt-16 md:mt-0">
          <span className="text-accent font-bold tracking-[0.3em] text-[0.6rem] md:text-[0.7rem] uppercase">Estúdio Digital Premium</span>
          <div className="h-px w-20 bg-white/20"></div>
        </div>
        
        <h1 className="text-[clamp(2.5rem,10vw,10rem)] leading-[0.82] mb-12 hero-title cursor-default perspective-1000">
          <div className="overflow-hidden"><span className="block hero-title-line">CRIAMOS <span className="inline-block text-white/20 italic font-light drop-shadow-2xl transition-all duration-500 hover:text-accent hover:scale-105 hover:skew-x-6">EXPERIÊNCIAS</span></span></div>
          <div className="overflow-hidden"><span className="block hero-title-line">HIPER REAIS<span className="text-accent">.</span></span></div>
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-end hero-item cursor-default">
          <p className="max-w-[450px] text-lg md:text-xl text-white/50 font-light leading-relaxed">
            Agência de elite focada em elevar o padrão visual de marcas visionárias através de <span className="text-white relative inline-block transition-all duration-300 hover:text-accent hover:drop-shadow-[0_0_15px_rgba(197,173,111,0.6)] cursor-crosshair group-text">Branding de Impacto</span> e <span className="text-white relative inline-block transition-all duration-300 hover:text-accent hover:drop-shadow-[0_0_15px_rgba(197,173,111,0.6)] cursor-crosshair group-text">Alta Performance Digital</span>.
          </p>
          <div className="flex gap-4">
            <a href="#work" onClick={(e) => handleScroll(e, '#work')} className="group flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-5 rounded-full hover:bg-white hover:text-black transition-all duration-500">
              <span className="font-bold tracking-widest text-sm">EXPLORAR PROJETOS</span>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-black/20">
                <ArrowUpRight size={20} />
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 animate-bounce opacity-30 hero-item">
        <div className="w-px h-20 bg-linear-to-b from-transparent via-white to-transparent"></div>
      </div>
    </header>
  )
}

export default HeroSection
