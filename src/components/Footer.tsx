import logoBarr3 from '@/assets/logo-barr3.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 flex flex-col items-center gap-5">
        <img 
          src={logoBarr3} 
          alt="BARR3 Logo" 
          className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
        <p className="text-center text-sm text-muted-foreground tracking-wide">
          © {currentYear} Carlos Barredo. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
