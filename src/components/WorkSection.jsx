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

  useGSAP(() => {
    // Animação do Portfólio (Works) aparecendo com scroll
    const workItems = gsap.utils.toArray('.work-item')
    workItems.forEach((item, i) => {
      gsap.fromTo(item, 
        { y: 100, opacity: 0, scale: 0.95 }, 
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'top 20%',
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

  return (
    <section id="work" ref={container} className="max-w-[1600px] mx-auto px-6 pb-40 relative">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-start">
        
        <div className="lg:w-1/3 lg:sticky lg:top-40 shrink-0 z-20">
          <h2 className="text-[clamp(3rem,8vw,5.6rem)] leading-none mb-8">
            <TypewriterText text="PROJETOS" /><br />
          </h2>
          <p className="max-w-[350px] text-white/40 text-lg leading-relaxed text-reveal">
            Uma curadoria estratégica de projetos que desafiam o status quo e estabelecem novas tendências de mercado.
          </p>
        </div>

        <div className="lg:w-2/3 flex flex-col md:flex-row gap-8">
          {[0, 1].map(colIndex => (
            <div key={colIndex} className={`flex-1 flex flex-col gap-8 ${colIndex === 1 ? 'md:mt-32' : ''}`}>
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
  )
}

export default WorkSection
