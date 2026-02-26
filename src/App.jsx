import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WaveBackground from './components/WaveBackground'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import WorkSection from './components/WorkSection'
import ServicesSection from './components/ServicesSection'
import { X, Menu } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [selectedUrl, setSelectedUrl] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const handleMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Âncoras fluídas
  const handleScroll = (e, id) => {
    e.preventDefault()
    const target = document.querySelector(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false) // Fecha o menu ao clicar
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <WaveBackground />

      {/* Global Cursor Glow */}
      <div
        className="fixed pointer-events-none z-[100] w-[600px] h-[600px] rounded-full"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(88,74,137,0.13) 0%, transparent 70%)',
        }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[min(1200px,94%)] glass-nav rounded-full px-4 md:px-8 py-3 md:py-4 flex justify-between items-center z-[1000]">
        <div className="flex items-center gap-2">
           <div className="w-7 h-7 md:w-8 md:h-8 bg-accent rounded-lg flex items-center justify-center font-black text-sm md:text-base text-black">L</div>
           <span className="font-black text-base md:text-xl tracking-tighter">LOVATEL<span className="text-accent">.</span></span>
        </div>
        
        <div className="hidden md:flex gap-8 text-[0.8rem] font-bold tracking-widest text-white/60 uppercase">
          <a href="#agency" onClick={(e) => handleScroll(e, '#agency')} className="hover:text-white transition-colors cursor-pointer">Quem Somos</a>
          <a href="#work" onClick={(e) => handleScroll(e, '#work')} className="hover:text-white transition-colors cursor-pointer">Projetos</a>
          <a href="#services" onClick={(e) => handleScroll(e, '#services')} className="hover:text-white transition-colors cursor-pointer">Serviços</a>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="hidden sm:inline-flex bg-white text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[0.7rem] md:text-[0.8rem] font-bold hover:bg-accent transition-colors cursor-pointer smooth-hover">
            FALE CONOSCO
          </a>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-white w-10 h-10 flex items-center justify-center"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-black/98 backdrop-blur-2xl border-l border-white/10 z-[999] md:hidden"
          >
            <div className="flex flex-col h-full pt-24 px-8">
              <nav className="flex flex-col gap-6 mb-12">
                <a 
                  href="#agency" 
                  onClick={(e) => handleScroll(e, '#agency')} 
                  className="text-white/80 hover:text-accent transition-colors text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-4 cursor-pointer"
                >
                  Quem Somos
                </a>
                <a 
                  href="#work" 
                  onClick={(e) => handleScroll(e, '#work')} 
                  className="text-white/80 hover:text-accent transition-colors text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-4 cursor-pointer"
                >
                  Projetos
                </a>
                <a 
                  href="#services" 
                  onClick={(e) => handleScroll(e, '#services')} 
                  className="text-white/80 hover:text-accent transition-colors text-xl font-bold uppercase tracking-widest border-b border-white/10 pb-4 cursor-pointer"
                >
                  Serviços
                </a>
              </nav>

              <a 
                href="#contact" 
                onClick={(e) => handleScroll(e, '#contact')} 
                className="bg-accent text-black px-8 py-4 rounded-full text-sm font-black text-center tracking-widest hover:bg-white transition-colors uppercase cursor-pointer smooth-hover"
              >
                Fale Conosco
              </a>

              <div className="mt-auto mb-8 pt-8 border-t border-white/10">
                <p className="text-white/40 text-xs tracking-widest mb-4 uppercase">Redes Sociais</p>
                <div className="flex gap-6">
                  <a href="#" className="text-white/60 hover:text-accent transition-colors text-sm uppercase font-bold cursor-pointer">Instagram</a>
                  <a href="#" className="text-white/60 hover:text-accent transition-colors text-sm uppercase font-bold cursor-pointer">LinkedIn</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <HeroSection handleScroll={handleScroll} />
      <AboutSection />
      
      {/* Work Section */}
      <WorkSection 
        hoveredProject={hoveredProject}
        setHoveredProject={setHoveredProject}
        setSelectedUrl={setSelectedUrl}
      />

      <ServicesSection />

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedUrl && (
          <motion.div 
            className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[2000] flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 py-5 flex justify-between items-center border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black text-xs text-black">L</div>
                 <span className="font-black text-sm tracking-widest uppercase">VISUALIZAÇÃO</span>
              </div>
              <button 
                onClick={() => setSelectedUrl(null)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all bg-white/5"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow w-full max-w-[1800px] mx-auto bg-white/5">
              <iframe src={selectedUrl} className="w-full h-full border-none bg-[#050505]" title="Client Preview" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer id="contact" className="py-12 md:py-20 px-4 md:px-6 border-t border-white/5 bg-black/50">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <div className="font-black text-3xl md:text-4xl mb-3 md:mb-4">LOVATEL<span className="text-accent">.</span></div>
              <p className="text-white/20 text-[0.65rem] md:text-xs tracking-widest">UMA NOVA ERA DE IDENTIDADE DIGITAL.</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12 text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] text-white/40">
               <a href="#" className="hover:text-accent transition-colors uppercase cursor-pointer">Instagram</a>
               <a href="#" className="hover:text-accent transition-colors uppercase cursor-pointer">LinkedIn</a>
               <a href="#" className="hover:text-accent transition-colors uppercase cursor-pointer">Behance</a>
            </div>
            
            <div className="text-[0.65rem] md:text-xs text-white/20 tracking-wider text-center md:text-left pt-6 md:pt-0 border-t border-white/5 md:border-0">
              © 2026 LOVATEL AGÊNCIA DIGITAL.<br className="md:hidden" /> TODOS OS DIREITOS RESERVADOS.
            </div>
        </div>
      </footer>
    </div>
  )
}

export default App
