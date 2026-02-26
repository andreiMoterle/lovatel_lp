import React, { useRef } from 'react'
import TypewriterText from './TypewriterText'
import { Plus, Monitor } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const ServicesSection = () => {
  const container = useRef()

  useGSAP(() => {
    // Efeito de Revelação Suave (Fade Up)
    const textRevealElements = gsap.utils.toArray('.text-reveal')
    textRevealElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 100%',
            end: 'bottom -20%',
            toggleActions: 'play reverse play reverse'
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out'
        }
      )
    })

    // Efeito de "Escrita" para títulos
    const typingTexts = gsap.utils.toArray('.typing-effect')
    typingTexts.forEach((el) => {
      const chars = el.querySelectorAll('.char')
      if (chars.length > 0) {
        gsap.fromTo(chars,
          { opacity: 0, y: 20, rotateX: -90 },
          {
            scrollTrigger: {
              trigger: el,
              start: 'top 100%',
              end: 'bottom -20%',
              toggleActions: 'play reverse play reverse'
            },
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.03, // Velocidade da digitação
            duration: 0.8,
            ease: 'back.out(1.5)'
          }
        )
      }
    })
  }, { scope: container })

  return (
    <section id="services" ref={container} className="bg-white/5 py-20 md:py-40">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
        <div>
          <h2 className="text-[clamp(2.2rem,6vw,4.2rem)] leading-none mb-8 md:mb-12">
            <TypewriterText text="COMO ELEVAMOS" /><br />
            <span className="text-accent">SEU NEGÓCIO.</span>
          </h2>
          <p className="text-base md:text-xl text-white/40 mb-8 md:mb-12 max-w-[500px] text-reveal">
            Misturamos design thinking com execução técnica impecável para criar ferramentas reais de venda e posicionamento.
          </p>
          <div className="space-y-3 md:space-y-4">
             {['Identidade Visual', 'Performance Web', 'Estratégia de Crescimento', 'Design de Embalagens'].map((s, i) => (
               <div key={i} className="text-reveal flex items-center gap-3 md:gap-6 py-4 md:py-6 border-b border-white/10 group cursor-default">
                  <span className="text-white/20 font-black text-lg md:text-2xl group-hover:text-accent transition-colors shrink-0">0{i+1}</span>
                  <h4 className="text-base md:text-2xl group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-500 uppercase font-bold">{s}</h4>
               </div>
             ))}
          </div>
        </div>
        
        <div className="relative group text-reveal mt-8 lg:mt-0">
          <div className="absolute -inset-4 bg-accent/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative glass p-8 md:p-12 lg:p-16 rounded-3xl md:rounded-[4rem] border-white/10 flex flex-col gap-8 md:gap-12 shadow-2xl">
             <div className="grid grid-cols-2 gap-6 md:gap-10">
                <div className="space-y-3 md:space-y-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-accent"><Monitor size={20} className="md:w-7 md:h-7" /></div>
                  <h5 className="font-bold text-sm md:text-xl uppercase tracking-wider">TECNOLOGIA</h5>
                  <p className="text-xs md:text-sm text-white/40 leading-relaxed">Sistemas escaláveis e seguros para qualquer tamanho de operação ou desafio técnico.</p>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-accent"><Plus size={20} className="md:w-7 md:h-7" /></div>
                  <h5 className="font-bold text-sm md:text-xl uppercase tracking-wider">DESIGN</h5>
                  <p className="text-xs md:text-sm text-white/40 leading-relaxed">Experiências visuais que encantam e prendem o olhar do usuário desde o primeiro segundo.</p>
                </div>
             </div>
             <a href="#contact" className="w-full bg-accent text-black py-4 md:py-6 rounded-full font-black text-center tracking-[0.2em] hover:bg-white transition-colors uppercase text-xs md:text-sm">
               INICIAR PROJETO
             </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
