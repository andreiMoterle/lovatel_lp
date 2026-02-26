import React, { useRef } from 'react'
import TypewriterText from './TypewriterText'
import { Target, Sparkles, Gem, Handshake, Zap, Shield, Leaf } from 'lucide-react'
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
  const galleryTitleRef = useRef()
  const galleryWrapperRef = useRef()

  useGSAP(() => {
    // Efeito de Revelação Suave (Fade Up)
    const textRevealElements = gsap.utils.toArray('.text-reveal')
    textRevealElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 100%',
            end: 'bottom -20%',
            toggleActions: 'play reverse play reverse'
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power4.out'
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
            stagger: 0.03,
            duration: 0.8,
            ease: 'back.out(1.5)'
          }
        )
      }
    })

    // Animação dos cartões com stagger
    const cards = gsap.utils.toArray('.info-card')
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 80, opacity: 0, rotateY: -15 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          },
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: 'power3.out'
        }
      )
    })

    // About Gallery Horizontal Scroll
    const galleryItems = gsap.utils.toArray('.gallery-item')
    if (galleryWrapperRef.current && galleryRef.current && galleryItems.length > 0) {
      gsap.to(galleryItems, {
        xPercent: -100 * (galleryItems.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: galleryWrapperRef.current,
          pin: true,
          scrub: 1,
          start: 'top 15%',
          end: () => '+=' + galleryRef.current.offsetWidth,
          refreshPriority: 1
        }
      })
    }

  }, { scope: container })


  return (
    <section id="agency" ref={container} className="relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-20 md:py-40 relative">
        {/* Hero Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[clamp(2.5rem,8vw,7rem)] leading-none font-black mb-4 md:mb-6">
            QUEM <span className="text-accent"><TypewriterText text="SOMOS" /></span>
          </h2>
          <p className="text-base md:text-xl lg:text-2xl text-white/50 max-w-[900px] mx-auto leading-relaxed text-reveal px-2">
            Existimos porque acreditamos que as soluções digitais <span className="text-white font-semibold">transformam o dia a dia das pessoas.</span>
          </p>
          <p className="text-sm md:text-base lg:text-lg text-white/40 max-w-[800px] mx-auto mt-4 md:mt-6 text-reveal px-2">
            Somos uma agência especializada em soluções online e offline para empresas e profissionais liberais. Sempre atualizados com as novas tecnologias e tendências.
          </p>
        </div>

        {/* Modern Cards Grid - Missão e Visão */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-12 md:mb-20 max-w-[1200px] mx-auto">
          {/* Missão Card */}
          <div className="info-card group relative overflow-hidden cursor-magnetic">
            <div className="glass relative p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-[2.5rem] border-2 border-white/10 hover:border-accent/50 transition-all duration-500 h-full shadow-[0_0_50px_rgba(88,74,137,0.1)] hover:shadow-[0_0_80px_rgba(88,74,137,0.3)]">
              <div className="flex items-start gap-3 md:gap-6 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent/20 border-2 border-accent/40 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Target className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.3em] text-accent/60 mb-1 md:mb-2 uppercase">01</div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight">Missão</h3>
                </div>
              </div>
              <p className="text-white/60 text-sm md:text-base lg:text-lg leading-relaxed">
                Criar uma <span className="text-white font-semibold">excelente experiência digital</span> ao usuário que interage com nossos produtos.
              </p>
            </div>
          </div>

          {/* Visão Card */}
          <div className="info-card group relative overflow-hidden cursor-magnetic">
            <div className="glass relative p-6 md:p-10 lg:p-12 rounded-2xl md:rounded-[2.5rem] border-2 border-white/10 hover:border-accent/50 transition-all duration-500 h-full shadow-[0_0_50px_rgba(88,74,137,0.1)] hover:shadow-[0_0_80px_rgba(88,74,137,0.3)]">
              <div className="flex items-start gap-3 md:gap-6 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent/20 border-2 border-accent/40 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.3em] text-accent/60 mb-1 md:mb-2 uppercase">02</div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tight">Visão</h3>
                </div>
              </div>
              <p className="text-white/60 text-sm md:text-base lg:text-lg leading-relaxed">
                Ser <span className="text-white font-semibold">referência no mercado digital</span> no Oeste Catarinense.
              </p>
            </div>
          </div>
        </div>

        {/* Valores Section - Premium Card */}
        <div className="max-w-[1400px] mx-auto mb-16 md:mb-32">
          <div className="info-card relative overflow-hidden cursor-default">
            <div className="absolute -inset-[100px] bg-accent/5 blur-[120px] rounded-full opacity-50"></div>
            <div className="glass relative p-6 md:p-12 lg:p-16 rounded-2xl md:rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3 md:gap-6 mb-8 md:mb-12">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-accent/20 border-2 border-accent/40 flex items-center justify-center shrink-0">
                  <Gem className="w-7 h-7 md:w-10 md:h-10 text-accent" />
                </div>
                <div>
                  <div className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-[0.3em] text-accent/60 mb-1 md:mb-2 uppercase">03</div>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight">Nossos Valores</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {[
                                  { icon: <Handshake className="w-4 h-4 md:w-5 md:h-5 text-accent" />, text: "Tratamos os outros como gostaríamos de ser tratados" },
                  { icon: <Zap className="w-4 h-4 md:w-5 md:h-5 text-accent" />, text: "A busca da excelência é um dos nossos diferenciais" },
                  { icon: <Shield className="w-4 h-4 md:w-5 md:h-5 text-accent" />, text: "Demonstramos ética para com todos os indivíduos" },
                  { icon: <Target className="w-4 h-4 md:w-5 md:h-5 text-accent" />, text: "Garantimos uma excelente experiência" },
                  { icon: <Leaf className="w-4 h-4 md:w-5 md:h-5 text-accent" />, text: "Comprometidos com a responsabilidade socioambiental" }
                ].map((valor, idx) => {
                  return (
                    <div 
                      key={idx} 
                      className="group/item relative p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-white/5 hover:border-accent/40 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 cursor-default overflow-hidden"
                    >
                      <div className="relative flex items-start gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-accent/10 border-2 border-accent/30 flex items-center justify-center shrink-0 group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-500">
                          {valor.icon}
                        </div>
                        <p className="text-white/60 group-hover/item:text-white/90 transition-colors text-xs md:text-sm leading-relaxed pt-0.5 md:pt-1">
                          {valor.text}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Galeria Horizontal */}
        <div ref={galleryWrapperRef} className="mb-12 md:mb-20">
          <div ref={galleryTitleRef} className="flex items-center justify-between mb-8 md:mb-16">
            <h3 className="text-2xl md:text-3xl lg:text-5xl font-black uppercase">NOSSA <span className="text-accent">ESTRUTURA</span></h3>
          </div>
          
          <div ref={galleryRef} className="overflow-hidden">
            <div className="flex gap-4 md:gap-8 lg:gap-12 flex-nowrap">
              {ABOUT_PHOTOS.map((photo, i) => (
                <div key={i} className="gallery-item w-[90vw] md:w-[40vw] aspect-video rounded-2xl md:rounded-3xl overflow-hidden relative group border border-white/10 shrink-0 cursor-grab">
                  <img 
                    src={photo} 
                    alt={`Lovatel Agência - Estrutura ${i + 1}`} 
                    className="w-full h-full object-cover grayscale-[0.7] opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                  <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6">
                    <div className="text-[0.6rem] md:text-xs font-bold tracking-[0.3em] text-accent/80 uppercase mb-1 md:mb-2">Lovatel Agência</div>
                    <div className="text-xs md:text-sm text-white/60">Nossa estrutura</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
