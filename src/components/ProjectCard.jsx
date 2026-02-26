import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const ProjectCard = ({ project, colIndex, isHovered, onHover, onHoverEnd, onClick }) => {
  return (
    <div 
      data-parity={colIndex === 0 ? 'even' : 'odd'}
      className={`work-item group relative cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isHovered !== null && isHovered !== project.id ? 'blur-sm opacity-30 scale-95' : ''
      } ${isHovered === project.id ? 'scale-105 z-10 -translate-y-4' : ''}`}
      onClick={() => onClick(project.url)}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={onHoverEnd}
    >
      <div className={`relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-zinc-900 border transition-colors duration-500 ${isHovered === project.id ? 'border-accent/50 shadow-2xl shadow-accent/20' : 'border-white/5'}`}>
        <img 
          src={project.img} 
          alt={project.title} 
          className={`w-full h-full object-cover transition-all duration-1000 ${isHovered === project.id ? 'grayscale-0 scale-100 opacity-100' : 'grayscale opacity-70 scale-105'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-700 ${isHovered === project.id ? 'from-black/90 via-black/10 to-transparent opacity-90' : 'from-black/80 via-black/40 to-black/20 opacity-80'}`}></div>
        
        <div className={`absolute bottom-10 left-10 right-10 flex justify-between items-end transition-transform duration-700 ${isHovered === project.id ? 'translate-y-0' : 'translate-y-4'}`}>
          <div>
            <div className={`text-accent text-[0.6rem] font-bold tracking-[0.3em] uppercase mb-4 transition-all duration-700 delay-100 ${isHovered === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {project.type}
            </div>
            <h3 className="text-3xl md:text-4xl text-white leading-none font-bold drop-shadow-md">
              {project.title.split(' ')[0]}<br />
              <span className="font-light text-white/60">{project.title.split(' ').slice(1).join(' ')}</span>
            </h3>
          </div>
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-700 ${isHovered === project.id ? 'opacity-100 translate-x-0 rotate-45 bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'glass opacity-0 translate-x-4 rotate-0 text-white'}`}>
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
