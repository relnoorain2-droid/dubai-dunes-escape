import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SafariPackage } from "./PackageSelector";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Lock, CreditCard, Plus, Minus, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
    travelDate: undefined as Date | undefined,
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
      if (!formData.travelDate) {
        toast({
          title: "Please select a travel date",
          description: "Choose your preferred travel date to continue",
          variant: "destructive",
        });
        return;
      }

      const totalAmount = selectedPackage.price * formData.numberOfGuests;

      // Create payment intent via edge function
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: totalAmount,
          packageName: selectedPackage.name,
          successUrl: window.location.origin + '/booking-success',
          cancelUrl: window.location.origin + '/?booking=cancelled',
          failureUrl: window.location.origin + '/?booking=failed',
        },
      });

      if (paymentError || !paymentData) {
        console.error('Payment creation error:', paymentError);
        throw new Error(paymentError?.message || 'Payment initialization failed');
      }

      // Save booking to database
      const { data: bookingData, error: dbError } = await supabase
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
          booking_date: format(formData.travelDate, 'yyyy-MM-dd'),
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Send confirmation emails
      await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          booking: bookingData,
          packageName: selectedPackage.name,
          customerEmail: formData.email,
          businessEmail: 'bookings@desertsafari.com', // Replace with your business email
        },
      });

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
              <Label htmlFor="travelDate">Travel Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.travelDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.travelDate ? format(formData.travelDate, "PPP") : "Select travel date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.travelDate}
                    onSelect={(date) => setFormData({ ...formData, travelDate: date })}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests *</Label>
              <div className="flex items-center gap-4 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, numberOfGuests: Math.max(1, formData.numberOfGuests - 1) })}
                  disabled={formData.numberOfGuests <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold">{formData.numberOfGuests}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {formData.numberOfGuests === 1 ? "Guest" : "Guests"}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setFormData({ ...formData, numberOfGuests: formData.numberOfGuests + 1 })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
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