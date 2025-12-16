import { useState } from 'react';
import { Mail, Linkedin, Instagram, Check, Copy } from 'lucide-react';

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const email = 'barredoworks@gmail.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email');
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: email,
      action: copyEmail,
      isButton: true
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/carlos-barredo-garcia-a92210332/',
      isButton: false
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/_caarloss.05/',
      isButton: false
    }
  ];

  return (
    <section id="contacto" className="py-24">
      <div className="container mx-auto px-6">
        {/* Section title */}
        <h2 className="font-display text-5xl md:text-7xl text-center text-foreground text-glow mb-8">
          Contacto
        </h2>

        <p className="text-center text-xl text-muted-foreground mb-16">
          ¿Tienes un proyecto en mente?
        </p>

        {/* Contact links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          {contactLinks.map((link) => {
            const IconComponent = link.icon;
            
            if (link.isButton) {
              return (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="flex items-center gap-3 px-6 py-4 rounded-xl card-glass hover:bg-accent transition-all duration-300 hover:scale-105 group w-full sm:w-auto justify-center"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <IconComponent className="w-5 h-5 text-foreground" />
                  )}
                  <span className="text-foreground font-medium">
                    {copied ? '¡Copiado!' : link.label}
                  </span>
                  {!copied && <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />}
                </button>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-4 rounded-xl card-glass hover:bg-accent transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
              >
                <IconComponent className="w-5 h-5 text-foreground" />
                <span className="text-foreground font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
