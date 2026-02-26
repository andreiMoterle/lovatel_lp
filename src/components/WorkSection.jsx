import React, { useRef } from 'react'
import TypewriterText from './TypewriterText'
import ProjectCard from './ProjectCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  { id: 1, title: 'Quioca Contabilidade', type: 'Site Contábil', img: 'https://lovatel.com.br/storage/fotos_portfolios/JtcmqnGxfjPGmW0SV4R7Qtf4k2S6jckUOPPAgxMm.webp', url: 'https://quioca.com.br' },
  { id: 2, title: 'Rotta Móveis', type: 'Indústria Premium', img: 'https://lovatel.com.br/storage/fotos_portfolios/3H2fWPpuFEfWbVLjhisZrmxNXRi0quqSulmbMijN.webp', url: 'https://rottamoveis.com.br' },
  { id: 3, title: 'Rone Usinagem', type: 'Tecnologia Industrial', img: 'https://lovatel.com.br/storage/fotos_portfolios/LB3EiX3nz7LoPZORrlUPBKmeAEBQdPF14idwIErz.webp', url: 'https://roneusinagem.com.br' },
  { id: 4, title: 'Gelugo Esquadrias', type: 'Arquitetura', img: 'https://lovatel.com.br/storage/fotos_portfolios/pLrWdYNVfEXo5ke0mm87poHYv4AnHClqMTkMLGsG.webp', url: 'https://gelugo.com.br' },
  { id: 5, title: '4BDigital', type: 'Estratégia Digital', img: 'https://lovatel.com.br/storage/fotos_portfolios/fJEG3xkinM86Ck6R5Ecbe6vaRVSm93mqhvusYrj2.webp', url: 'https://4bdigital.com.br' },
  { id: 6, title: 'Zat Atacadista', type: 'Varejo', img: 'https://lovatel.com.br/storage/fotos_portfolios/DIH1sskfDx8v4Vj5CNDw1m468nIrADqiGHrwIZ0r.webp', url: 'https://zatatacadista.com.br' }
]

const WorkSection = ({ hoveredProject, setHoveredProject, setSelectedUrl }) => {
  const container = useRef()
  const titleRef = useRef()
  const mobileRef = useRef()

  useGSAP(() => {
    // Pin do título enquanto os projetos scrollam
    ScrollTrigger.create({
      trigger: titleRef.current,
      start: 'top 15%',
      end: () => `+=${container.current.offsetHeight - 400}`,
      pin: true,
      pinSpacing: false,
      markers: false
    })

    // Animação do Portfólio (Works) aparecendo com scroll
    const workItems = gsap.utils.toArray('.work-item')
    workItems.forEach((item, i) => {
      gsap.fromTo(item, 
        { y: 100, opacity: 0, scale: 0.95 }, 
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 100%',
            end: 'bottom 0%',
            toggleActions: 'play reverse play reverse'
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          delay: item.dataset.parity === 'even' ? 0 : 0.2
        }
      )
    })
  }, { scope: container })

  useGSAP(() => {
    const wrapper = mobileRef.current.querySelector('.mobile-wrapper')
    const cards = gsap.utils.toArray('.mobile-card')

    if (wrapper && cards.length > 0) {
      const tl = gsap.timeline({
        defaults: {
          ease: "none"
        },
        scrollTrigger: {
          trigger: mobileRef.current,
          start: 'top top',
          end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      tl.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
      });
    }
  }, { scope: mobileRef })

  return (
    <>
      {/* DESKTOP — intacto, oculto no mobile */}
      <section id="work" ref={container} className="hidden lg:flex max-w-[1600px] mx-auto px-4 md:px-6 pb-20 md:pb-40 relative">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        
        <div ref={titleRef} className="w-full lg:w-[35%] shrink-0">
          <div className="">
            <h2 className="text-[clamp(2.5rem,8vw,5.6rem)] leading-none mb-6 md:mb-8">
              <TypewriterText text="PROJETOS" /><br />
            </h2>
            <p className="max-w-[350px] text-white/40 text-base md:text-lg leading-relaxed text-reveal">
              Uma curadoria estratégica de projetos que desafiam o status quo e estabelecem novas tendências de mercado.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[65%] flex flex-col md:flex-row gap-6 md:gap-8">
          {[0, 1].map(colIndex => (
            <div key={colIndex} className={`flex-1 flex flex-col gap-6 md:gap-8 ${colIndex === 1 ? 'md:mt-32' : ''}`}>
              {PROJECTS.filter((_, i) => i % 2 === colIndex).map(project => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  colIndex={colIndex}
                  isHovered={hoveredProject}
                  onHover={setHoveredProject}
                  onHoverEnd={() => setHoveredProject(null)}
                  onClick={setSelectedUrl}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* MOBILE — horizontal scroll, oculto no desktop */}
      <section 
        id="work"
        ref={mobileRef}
        className="lg:hidden min-h-screen pt-20 flex flex-col justify-center overflow-hidden">

        <div className="px-4 mb-10 shrink-0">
          <h2 className="text-[clamp(2.5rem,12vw,4rem)] leading-none mb-4">
            <TypewriterText text="PROJETOS" />
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-[340px]">
            Uma curadoria estratégica de projetos que desafiam o status quo e estabelecem novas tendências de mercado.
          </p>
        </div>

        <div className="mobile-wrapper flex w-max">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="mobile-card px-4 shrink-0 h-[70vh] max-h-[500px] flex items-center"
            >
              <div className="max-w-[400px] h-full">
                <ProjectCard
                  project={project}
                  colIndex={0}
                  isHovered={hoveredProject}
                  onHover={setHoveredProject}
                  onHoverEnd={() => setHoveredProject(null)}
                  onClick={setSelectedUrl}
                />  
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default WorkSection
