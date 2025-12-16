import { Link } from 'react-router-dom';
import { photoSessions } from '@/lib/photoSessions';

const PhotoGallery = () => {
  return (
    <div className="mt-24">
      {/* Photos section title */}
      <div className="text-center mb-12">
        <h3 className="font-display text-4xl md:text-5xl text-foreground text-glow mb-4">
          SESIONES
        </h3>
        <div className="w-16 h-0.5 bg-foreground/50 mx-auto" />
      </div>

      {/* Session blocks - Grid 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {photoSessions.map((session) => (
          <Link
            key={session.id}
            to={session.images.length > 0 ? `/fotos/${session.id}` : '#'}
            className={`relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden group ${
              session.images.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {/* Background image or placeholder */}
            {session.coverImage ? (
              <img
                src={session.coverImage}
                alt={session.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="absolute inset-0 bg-secondary" />
            )}
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-background/60 group-hover:bg-background/50 transition-all duration-300" />
            
            {/* Session title */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h4 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground text-center px-4 drop-shadow-lg">
                {session.title}
              </h4>
            </div>
            
            {/* Coming soon badge for empty sessions */}
            {session.images.length === 0 && (
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-muted-foreground text-sm">Próximamente</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
