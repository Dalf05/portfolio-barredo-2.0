import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setShowFlash(true);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Flash effect */}
      {showFlash && (
        <div className="absolute inset-0 bg-foreground animate-flash pointer-events-none" />
      )}

      {/* Camera SVG */}
      <div className="mb-12 relative">
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-90"
        >
          {/* Camera body */}
          <rect x="20" y="20" width="80" height="50" rx="6" fill="hsl(0 0% 15%)" stroke="hsl(0 0% 30%)" strokeWidth="2"/>
          
          {/* Lens */}
          <circle cx="60" cy="45" r="20" fill="hsl(0 0% 10%)" stroke="hsl(0 0% 40%)" strokeWidth="3"/>
          <circle cx="60" cy="45" r="12" fill="hsl(0 0% 5%)" stroke="hsl(0 0% 25%)" strokeWidth="2"/>
          <circle cx="60" cy="45" r="5" fill="hsl(220 80% 30%)"/>
          
          {/* Flash */}
          <rect x="75" y="12" width="20" height="10" rx="2" fill="hsl(0 0% 20%)" stroke="hsl(0 0% 35%)" strokeWidth="1"/>
          
          {/* Recording dot */}
          <circle cx="90" cy="28" r="4" fill="hsl(0 100% 50%)" className="animate-pulse"/>
          
          {/* Viewfinder */}
          <rect x="25" y="24" width="15" height="10" rx="1" fill="hsl(0 0% 8%)"/>
        </svg>
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl md:text-4xl tracking-wider mb-8 text-foreground text-glow">
        PORTFOLIO DE CARLOS BARREDO
      </h1>

      {/* Progress bar container */}
      <div className="w-64 md:w-80 h-1 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-foreground transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="mt-4 text-sm text-muted-foreground font-light tracking-widest">
        {Math.round(progress)}%
      </p>
    </div>
  );
};

export default LoadingScreen;
