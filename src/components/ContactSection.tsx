import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/971506638921', '_blank');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-desert">Get In Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Have questions? We're here to help you plan your perfect desert adventure
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10">
                  <MessageCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                  <p className="text-muted-foreground mb-3">
                    Chat with us on WhatsApp for instant responses
                  </p>
                  <Button onClick={handleWhatsAppClick} variant="outline" className="w-full">
                    <MessageCircle size={18} className="mr-2" />
                    +971 50 663 8921
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Phone</h3>
                  <p className="text-muted-foreground">+971 50 663 8921</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Email</h3>
                  <p className="text-muted-foreground">info@premium-desert-safari.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    E-44 Hatta road,<br />
                    Al Badayer<br />
                    Madam
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-card rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Operating Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="font-medium">Monday - Sunday</span>
                  <span className="text-muted-foreground">24/7 Available</span>
                </div>
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-primary">Safari Timing:</strong> Daily pickups between 2:00 PM - 3:30 PM (varies by package)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;