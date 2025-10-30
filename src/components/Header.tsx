import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-warm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl md:text-3xl font-bold">
            <span className="text-gradient-desert">Premium Desert Safari</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('packages')} className="text-foreground hover:text-primary transition-colors">
              Packages
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-foreground hover:text-primary transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">
              About Us
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
              Contact
            </button>
            <Button onClick={() => scrollToSection('booking')} className="bg-gradient-desert hover:opacity-90">
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 animate-fade-in">
            <button onClick={() => scrollToSection('home')} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('packages')} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Packages
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollToSection('about')} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              About Us
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-left py-2 text-foreground hover:text-primary transition-colors">
              Contact
            </button>
            <Button onClick={() => scrollToSection('booking')} className="bg-gradient-desert hover:opacity-90 w-full">
              Book Now
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;