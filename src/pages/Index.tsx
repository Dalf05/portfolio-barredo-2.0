import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import logoBarr3 from '@/assets/logo-barr3.png';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {/* Fixed logo top left */}
      <div className={`fixed top-6 left-6 z-50 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <img 
          src={logoBarr3} 
          alt="BARR3 Logo" 
          className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
        />
      </div>
      
      <main className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <HeroSection />
        
        {/* Video background wrapper for Projects and Contact */}
        <div className="relative overflow-hidden">
          {/* Video Background - stacked vertically */}
          <div className="absolute inset-0 flex flex-col">
            {[...Array(6)].map((_, i) => (
              <video
                key={i}
                autoPlay
                loop
                muted
                playsInline
                className="w-full flex-shrink-0"
              >
                <source src="/videos/background-video.mp4" type="video/mp4" />
              </video>
            ))}
          </div>
          
          {/* Dark overlay with gradient for better readability and transition */}
          <div className="absolute inset-0 bg-background/65" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
          
          {/* Content */}
          <div className="relative z-10">
            <ProjectsSection />
            <ContactSection />
          </div>
        </div>
        
        <Footer />
      </main>
    </>
  );
};

export default Index;
