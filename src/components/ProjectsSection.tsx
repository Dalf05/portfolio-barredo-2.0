import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import VideoModal from './VideoModal';
import PhotoGallery from './PhotoGallery';

import projectVideoclip from '@/assets/project-videoclip.png';
import projectBarbershop from '@/assets/project-barbershop.webp';
import projectVW from '@/assets/project-vw.jpg';
import projectSilla from '@/assets/project-silla.png';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  videoUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'HUELEN A GAS',
    description: 'Videoclip • 2025',
    image: projectVideoclip,
    videoUrl: 'https://www.youtube.com/embed/w1ltRFgotYY'
  },
  {
    id: 2,
    title: 'Diamond Barbershop',
    description: 'Promocional • 2025',
    image: projectBarbershop,
    videoUrl: 'https://www.youtube.com/embed/kELo-0utDX0'
  },
  {
    id: 3,
    title: 'Volkswagen GTI',
    description: 'Spot Publicitario • 2025',
    image: projectVW,
    videoUrl: 'https://www.youtube.com/embed/M4XeQ8Nzfwc'
  },
  {
    id: 4,
    title: 'SILLA',
    description: 'Corto • 2025',
    image: projectSilla,
    videoUrl: 'https://www.youtube.com/embed/V5_NXDy5Ok4'
  },
  {
    id: 5,
    title: 'Próximo Proyecto',
    description: 'Coming Soon...',
    image: '',
    videoUrl: ''
  }
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    dragFree: true
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Mouse drag scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - container.offsetLeft;
      scrollLeft.current = container.scrollLeft;
      container.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      container.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX.current) * 2;
      container.scrollLeft = scrollLeft.current - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="proyectos" className="py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl text-foreground text-glow mb-4">
            Proyectos Recientes
          </h2>
          <div className="w-24 h-0.5 bg-foreground/50 mx-auto" />
        </div>

        {/* Videos subsection title */}
        <div className="text-center mb-12">
          <h3 className="font-display text-4xl md:text-5xl text-foreground text-glow mb-4">
            VIDEOS
          </h3>
          <div className="w-16 h-0.5 bg-foreground/50 mx-auto" />
        </div>

        {/* Carousel container */}
        <div className="relative">
          {/* Navigation arrows */}
          {/* Navigation arrows - visible on all devices */}
          <button
            onClick={scrollPrev}
            className="flex absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-secondary/90 hover:bg-accent transition-colors shadow-lg"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>
          
          <button
            onClick={scrollNext}
            className="flex absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-secondary/90 hover:bg-accent transition-colors shadow-lg"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden cursor-grab" ref={emblaRef}>
            <div className="flex" ref={containerRef}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => project.videoUrl && setSelectedProject(project)}
                  className={`flex-shrink-0 w-80 md:w-96 pl-6 ${project.videoUrl ? 'cursor-pointer' : 'cursor-default'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-glass rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-foreground/30 group hover:shadow-lg hover:shadow-primary/10">
                    {/* Image */}
                    <div className="relative aspect-video bg-secondary overflow-hidden">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="flex items-center gap-2">
                            <span className="rec-dot" />
                            <span className="text-muted-foreground text-sm">Coming soon...</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Play overlay */}
                      {project.videoUrl && (
                        <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-foreground ml-1">
                              <polygon points="5,3 19,12 5,21" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-2xl text-foreground mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Spacer at the end for loop gap */}
              <div className="flex-shrink-0 w-6" />
            </div>
          </div>
        </div>

        {/* Photo Gallery Section */}
        <PhotoGallery />
      </div>

      {/* Video Modal */}
      {selectedProject && (
        <VideoModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          videoUrl={selectedProject.videoUrl}
          title={selectedProject.title}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
