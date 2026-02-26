import React, { useState } from 'react'
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

  // Âncoras fluídas
  const handleScroll = (e, id) => {
    e.preventDefault()
    const target = document.querySelector(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      <WaveBackground />
      
      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[min(1200px,92%)] glass-nav rounded-full px-8 py-4 flex justify-between items-center z-[1000]">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center font-black text-black">L</div>
           <span className="font-black text-xl tracking-tighter">LOVATEL<span className="text-accent">.</span></span>
        </div>
        
        <div className="hidden md:flex gap-8 text-[0.8rem] font-bold tracking-widest text-white/60 uppercase">
          <a href="#work" onClick={(e) => handleScroll(e, '#work')} className="hover:text-white transition-colors">Projetos</a>
          <a href="#services" onClick={(e) => handleScroll(e, '#services')} className="hover:text-white transition-colors">Serviços</a>
          <a href="#agency" onClick={(e) => handleScroll(e, '#agency')} className="hover:text-white transition-colors">Quem Somos</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="hidden sm:inline-flex bg-white text-black px-6 py-2.5 rounded-full text-[0.8rem] font-bold hover:bg-accent transition-colors">
            FALE CONOSCO
          </a>
          <button className="md:hidden text-white"><Menu size={24} /></button>
        </div>
      </nav>

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
                 <span className="font-black text-sm tracking-widest uppercase">MODO DE VISUALIZAÇÃO</span>
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
      <footer id="contact" className="py-20 px-6 border-t border-white/5 bg-black/50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <div className="font-black text-4xl mb-4">LOVATEL<span className="text-accent">.</span></div>
              <p className="text-white/20 text-xs tracking-widest">UMA NOVA ERA DE IDENTIDADE DIGITAL.</p>
            </div>
            <div className="flex gap-12 text-xs font-bold tracking-[0.3em] text-white/40">
               <a href="#" className="hover:text-accent transition-colors uppercase">Instagram</a>
               <a href="#" className="hover:text-accent transition-colors uppercase">LinkedIn</a>
               <a href="#" className="hover:text-accent transition-colors uppercase">Behance</a>
            </div>
            <div className="text-xs text-white/20 tracking-wider">
              © 2026 LOVATEL AGÊNCIA DIGITAL. TODOS OS DIREITOS RESERVADOS.
            </div>
        </div>
      </footer>
    </div>
  )
}

export default App
