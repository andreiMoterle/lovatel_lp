import React, { useRef } from 'react'
import TypewriterText from './TypewriterText'
import { Plus } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const ABOUT_PHOTOS = [
  'https://lovatel.com.br/storage/fotos_sobre/CgIvXf68g4qRFXn8jUTd1KRevPoWP4ZMgIu3dbLi.webp',
  'https://lovatel.com.br/storage/fotos_sobre/D6AqDEhayiBUVKl8ri8A867uDyLIKr26Qn7bZlX8.webp',
  'https://lovatel.com.br/storage/fotos_sobre/DP6j1Dv7iosotvRQYGSJaMBTeNFLIMWXtD8CwPFv.webp',
  'https://lovatel.com.br/storage/fotos_sobre/EEAiuyCf9Trp6LFS7s0sQZTmGnCbeZVyDqgP4ywz.webp',
  'https://lovatel.com.br/storage/fotos_sobre/W8vjt1NxgpUf36NTBnXHGq3SwA3P25A4iHhHRnJt.webp',
  'https://lovatel.com.br/storage/fotos_sobre/YbsrawjUzC6sWKAelEUEIyxLd55YOCtoHMdeEptO.webp'
]

const AboutSection = () => {
  const container = useRef()
  const galleryRef = useRef()

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

    // About Gallery Horizontal Scroll
    const galleryItems = gsap.utils.toArray('.gallery-item')
    if (galleryRef.current && galleryItems.length > 0) {
      gsap.to(galleryItems, {
        xPercent: -100 * (galleryItems.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: galleryRef.current,
          pin: true,
          scrub: 1,
          start: 'top 20%',
          end: () => '+=' + galleryRef.current.offsetWidth,
          refreshPriority: 1 // Crucial for recalculating heights correctly for further components!
        }
      })
    }

  }, { scope: container })

  return (
    <section id="agency" ref={container} className="max-w-[1400px] mx-auto px-6 py-40">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-24">
        <div>
          <h2 className="text-[clamp(3rem,6vw,5rem)] leading-none mb-8">
            <TypewriterText text="QUEM SOMOS." />
          </h2>
          <p className="text-xl md:text-2xl text-white/60 mb-12 text-reveal leading-relaxed font-light">
            Existimos porque acreditamos que as soluções digitais <strong className="text-white">transformam o dia a dia das pessoas.</strong> Somos uma agência especializada em criar conexões reais através do digital e do offline.
          </p>
          
          <div className="space-y-10">
            <div className="text-reveal flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <span className="text-accent font-black">01</span>
              </div>
              <div>
                <h4 className="text-white font-bold tracking-widest uppercase mb-2">A Missão</h4>
                <p className="text-white/50 leading-relaxed">Criar uma excelente e imersiva experiência digital para cada usuário que interage com nossos produtos.</p>
              </div>
            </div>
            
            <div className="text-reveal flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <span className="text-accent font-black">02</span>
              </div>
              <div>
                <h4 className="text-white font-bold tracking-widest uppercase mb-2">A Visão</h4>
                <p className="text-white/50 leading-relaxed">Ser a maior referência em soluções e inovação no mercado digital no Oeste Catarinense.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center gap-12 text-reveal">
          <div className="glass p-10 md:p-14 rounded-[3rem] border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute -inset-20 bg-accent/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <h4 className="text-3xl font-bold mb-8 relative z-10 flex items-center gap-4">
              <span className="font-light text-white/20">03</span> Nossos Valores
            </h4>
            <ul className="space-y-6 text-white/60 relative z-10">
              {[
                "A busca da excelência",
                "Ética com todos os parceiros",
                "Excelente experiência digital",
                "Responsabilidade socioambiental"
              ].map((val, idx) => (
                <li key={idx} className="flex items-center gap-4 group/item cursor-default">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-accent group-hover/item:text-accent transition-colors">
                    <Plus size={14} />
                  </div>
                  <span className="group-hover/item:text-white transition-colors">{val}.</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Horizontal GSAP Gallery instead of standard Swiper */}
      <div className="mt-40 mb-20">
        <div className="flex items-center justify-between mb-16 text-reveal">
          <h3 className="text-2xl md:text-4xl">NOSSA ESTRUTURA</h3>
          <p className="text-white/40 uppercase tracking-widest text-xs">Arraste para o lado</p>
        </div>
        
        <div ref={galleryRef} className="overflow-hidden">
          <div className="flex gap-6 md:gap-12 w-[300vw] md:w-[200vw] flex-nowrap">
            {ABOUT_PHOTOS.map((photo, i) => (
              <div key={i} className="gallery-item w-[80vw] md:w-[40vw] aspect-video rounded-3xl overflow-hidden glass relative group">
                <img src={photo} alt="Agência" className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
