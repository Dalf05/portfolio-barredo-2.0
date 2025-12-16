import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSessionById } from '@/lib/photoSessions';
import { ArrowLeft, X } from 'lucide-react';

const PhotoSession = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to top when selecting a new image (mobile only)
  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
    if (window.innerWidth < 1024) {
      topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const session = getSessionById(id || '');

  if (!session || session.images.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Sesión no encontrada</h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Pinterest-style grid patterns
  const getImageClass = (index: number) => {
    const patterns = [
      'col-span-1 row-span-2', // tall
      'col-span-1 row-span-1', // square
      'col-span-1 row-span-1', // square
      'col-span-1 row-span-2', // tall
      'col-span-1 row-span-1', // square
      'col-span-1 row-span-1', // square
      'col-span-1 row-span-1', // square
      'col-span-1 row-span-2', // tall
      'col-span-1 row-span-1', // square
    ];
    return patterns[index % patterns.length];
  };

  const otherImages = session.images.filter((_, i) => i !== selectedImage);

  return (
    <div className="min-h-screen bg-background" ref={topRef}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/20">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-secondary/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="font-display text-2xl md:text-3xl text-foreground">
            {session.title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Selected image - Left side */}
          <div className="lg:w-1/2 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
            <div 
              className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                key={selectedImage}
                src={session.images[selectedImage]}
                alt={`${session.title} - Principal`}
                className="w-full h-full object-cover animate-scale-in"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-all duration-300 flex items-center justify-center">
                <span className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 px-4 py-2 rounded-lg backdrop-blur-sm">
                  Click para ampliar
                </span>
              </div>
            </div>
          </div>

          {/* Pinterest grid - Right side */}
          <div className="lg:w-1/2 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto scrollbar-thin">
            <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[150px] gap-3">
              {otherImages.map((image, index) => {
                const originalIndex = session.images.findIndex(img => img === image);
                return (
                  <div
                    key={`thumb-${index}`}
                    className={`${getImageClass(index)} overflow-hidden rounded-xl cursor-pointer group relative`}
                    onClick={() => handleImageSelect(originalIndex)}
                  >
                    <img
                      src={image}
                      alt={`${session.title} - ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center animate-fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 p-3 bg-secondary/50 hover:bg-secondary rounded-full transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          <img
            src={session.images[selectedImage]}
            alt={`${session.title} - Ampliada`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoSession;
