import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SafariPackage } from "./PackageSelector";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Lock, CreditCard } from "lucide-react";

interface BookingFormProps {
  selectedPackage: SafariPackage | null;
}

const BookingForm = ({ selectedPackage }: BookingFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    numberOfGuests: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPackage) {
      toast({
        title: "Please select a package",
        description: "Choose a safari package before booking",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const totalAmount = selectedPackage.price * formData.numberOfGuests;

      // Create payment intent with Ziina
      const paymentResponse = await fetch('https://api.ziina.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ACFplIm28AkdUUD2L7IoZhPJKVNcYj7Ih2tezeRib+E4wWdBMo9P9mKPxahv9M8F',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100), // Convert to fils
          success_url: window.location.origin + '/booking-success',
          cancel_url: window.location.origin + '/?booking=cancelled',
          test: true, // Set to false for production
        }),
      });

      if (!paymentResponse.ok) {
        throw new Error('Payment initialization failed');
      }

      const paymentData = await paymentResponse.json();

      // Save booking to database
      const { error: dbError } = await supabase
        .from('bookings')
        .insert({
          full_name: formData.fullName,
          mobile_number: formData.mobile,
          email: formData.email,
          number_of_guests: formData.numberOfGuests,
          safari_type: selectedPackage.id,
          price_per_person: selectedPackage.price,
          total_amount: totalAmount,
          pickup_time: selectedPackage.pickupTime,
          payment_intent_id: paymentData.id,
        });

      if (dbError) throw dbError;

      // Redirect to payment page
      window.location.href = paymentData.redirect_url;
      
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedPackage) {
    return (
      <section id="booking" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-desert">Book Your Adventure</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Please select a package above to continue with your booking
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-desert">Complete Your Booking</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            You're just a few steps away from your desert adventure
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-warm">
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="font-bold text-xl mb-2">{selectedPackage.name}</h3>
            <p className="text-2xl font-bold text-primary">
              AED {selectedPackage.price} <span className="text-sm text-muted-foreground">per person</span>
            </p>
            <p className="text-sm mt-2">Pickup Time: {selectedPackage.pickupTime}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="mobile">Mobile / WhatsApp Number *</Label>
              <Input
                id="mobile"
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                placeholder="+971 XXX XXX XXX"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests *</Label>
              <Input
                id="guests"
                type="number"
                min="1"
                required
                value={formData.numberOfGuests}
                onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
              />
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-bold mb-6">
                <span>Total Amount:</span>
                <span className="text-2xl text-primary">
                  AED {selectedPackage.price * formData.numberOfGuests}
                </span>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-primary" size={20} />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="text-primary" size={20} />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="text-primary" size={20} />
                  <span>Safe Checkout</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-desert hover:opacity-90 text-lg py-6"
              >
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default BookingForm;