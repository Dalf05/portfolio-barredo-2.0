import heroBg from '@/assets/hero-bg.png';

const HeroSection = () => {
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-end overflow-hidden"
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-[0%_center] sm:bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center md:items-end text-center md:text-right max-w-2xl ml-auto justify-center min-h-screen md:min-h-0 md:justify-start pt-20 md:pt-0">
          {/* Main title with soft text shadow for mobile readability */}
          <h1 
            className="font-display text-5xl md:text-8xl lg:text-9xl text-foreground animate-fade-up [text-shadow:_0_0_20px_rgb(0_0_0_/_0.8),_0_0_40px_rgb(0_0_0_/_0.6)] md:[text-shadow:none]"
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            CARLOS BARREDO
          </h1>
          
          {/* Subtitle with soft text shadow for mobile */}
          <p 
            className="mt-4 font-display text-2xl md:text-3xl text-foreground/90 underline-animation cursor-default animate-fade-up [text-shadow:_0_0_15px_rgb(0_0_0_/_0.8),_0_0_30px_rgb(0_0_0_/_0.6)] md:[text-shadow:none]"
            style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
          >
            Filmmaker
          </p>
          
          {/* Tagline - hidden on mobile */}
          <p 
            className="hidden md:block mt-8 text-lg md:text-xl text-muted-foreground font-light max-w-md animate-fade-up"
            style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
          >
            Crea tu propia historia
          </p>

          {/* Scroll indicator - hidden on mobile */}
          <div 
            className="hidden md:block mt-16 animate-fade-up"
            style={{ animationDelay: '0.8s', animationFillMode: 'backwards' }}
          >
            <a 
              href="#proyectos" 
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span className="text-sm tracking-widest uppercase">Scroll</span>
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="animate-bounce"
              >
                <path 
                  d="M12 5v14M5 12l7 7 7-7" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
