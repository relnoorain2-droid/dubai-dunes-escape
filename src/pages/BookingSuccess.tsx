import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BookingSuccess = () => {
  useEffect(() => {
    // Here you could add logic to send confirmation email
    // via Supabase edge function
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-glow">
            <CheckCircle className="text-primary" size={48} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-desert">Booking Confirmed!</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for booking your Premium Desert Safari experience with us!
          </p>

          <div className="bg-card p-8 rounded-lg border border-border shadow-warm mb-8">
            <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
            <ul className="space-y-4 text-left">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">You'll receive a booking confirmation email shortly with all the details.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold">WhatsApp Notification</p>
                  <p className="text-sm text-muted-foreground">We'll send you pickup details via WhatsApp 24 hours before your safari.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Pickup Reminder</p>
                  <p className="text-sm text-muted-foreground">Be ready at your pickup location 10 minutes before the scheduled time.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-desert hover:opacity-90"
            >
              Return to Home
            </Button>
            <Button
              onClick={() => window.open('https://wa.me/971506638921', '_blank')}
              variant="outline"
            >
              Contact Us on WhatsApp
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Need help? Contact us anytime at +971 50 663 8921
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingSuccess;