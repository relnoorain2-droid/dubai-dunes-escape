import { MessageCircle, ShieldCheck, Lock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const Footer = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971506638921', '_blank');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src={logo}
                alt="Premium Desert Safari"
                className="h-10 md:h-12 lg:h-14 w-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-muted-foreground mb-4">
              Experience the ultimate Arabian adventure with our premium desert safari packages in Dubai.
            </p>
            <Button onClick={handleWhatsAppClick} className="bg-gradient-desert hover:opacity-90">
              <MessageCircle size={18} className="mr-2" />
              WhatsApp Us
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollToSection('home')} className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('packages')} className="text-muted-foreground hover:text-primary transition-colors">
                  Packages
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('gallery')} className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-lg mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cancellation-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="/refund-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h4 className="font-bold text-lg mb-4">Secure Booking</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="text-primary" size={20} />
                <span className="text-sm">100% Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="text-primary" size={20} />
                <span className="text-sm">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="text-primary" size={20} />
                <span className="text-sm">Trusted Payment Gateway</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Premium Desert Safari Dubai. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 z-50"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </footer>
  );
};

export default Footer;