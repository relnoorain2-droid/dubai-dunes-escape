import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  ChevronRight, 
  Crown, 
  Users, 
  Clock, 
  MapPin, 
  Star,
  Plus,
  Minus,
  CalendarIcon
} from "lucide-react";
import { PACKAGES } from "@/data/packages";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface WizardState {
  step: number;
  fullName: string;
  mobile: string;
  email: string;
  pickupLocation?: string;
  numberOfGuests: number;
  travelDate?: Date;
  selectedPackage: any;
  displayedInclusions: string[];
  totalPrice: number;
  isSubmitting: boolean;
}

const BookingWizard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wizardState, setWizardState] = useState<WizardState>({
    step: 1,
    fullName: "",
    mobile: "",
    email: "",
    pickupLocation: "",
    numberOfGuests: 1,
    travelDate: undefined,
    selectedPackage: null,
    displayedInclusions: [],
    totalPrice: 0,
    isSubmitting: false,
  });

  const updateWizardState = (updates: Partial<WizardState>) => {
    setWizardState(prev => ({ ...prev, ...updates }));
  };

  const inclusionIntervalRef = useRef<number | null>(null);

  const startInclusionReveal = (pkg: any) => {
    if (inclusionIntervalRef.current) {
      window.clearInterval(inclusionIntervalRef.current);
      inclusionIntervalRef.current = null;
    }
    // reset displayed inclusions
    setWizardState(prev => ({ ...prev, displayedInclusions: [] }));
    let idx = 0;
    inclusionIntervalRef.current = window.setInterval(() => {
      if (!pkg?.inclusions || idx >= pkg.inclusions.length) {
        if (inclusionIntervalRef.current) {
          window.clearInterval(inclusionIntervalRef.current);
          inclusionIntervalRef.current = null;
        }
        // Ensure UI shows the complete list even if any interval ticks were missed
        setWizardState(prev => ({ ...prev, displayedInclusions: pkg?.inclusions || [] }));
        return;
      }
      // append next inclusion using functional update to avoid stale state
      setWizardState(prev => ({ 
        ...prev, 
        displayedInclusions: [...prev.displayedInclusions, pkg.inclusions[idx]] 
      }));
      idx += 1;
    }, 500);
  };

  const selectPackage = (pkg: any) => {
    updateWizardState({ selectedPackage: pkg });
    startInclusionReveal(pkg);
  };

  const changePackage = () => {
    updateWizardState({ selectedPackage: null, displayedInclusions: [] });
  };

  const proceedToPayment = async () => {
    if (!wizardState.selectedPackage) {
      toast({ title: "Select a package", description: "Please choose a package to continue", variant: "destructive" });
      return;
    }
    if (!wizardState.travelDate) {
      toast({ title: "Select a travel date", description: "Please choose a valid travel date", variant: "destructive" });
      return;
    }
    if (!wizardState.fullName) {
      toast({ title: "Add your name", description: "Please provide your full name", variant: "destructive" });
      return;
    }
    if (!wizardState.mobile || !wizardState.email) {
      toast({ title: "Add contact info", description: "Mobile and email are required at checkout", variant: "destructive" });
      return;
    }
    if (!wizardState.pickupLocation) {
      toast({ title: "Add pickup location", description: "Please provide your pickup location for transfer", variant: "destructive" });
      return;
    }
    try {
      updateWizardState({ isSubmitting: true });
      const totalAmount = wizardState.selectedPackage.price * wizardState.numberOfGuests;

      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
        body: {
          amount: totalAmount,
          packageName: wizardState.selectedPackage.name,
          successUrl: window.location.origin + '/booking-success',
          cancelUrl: window.location.origin + '/?booking=cancelled',
          failureUrl: window.location.origin + '/?booking=failed',
        },
      });

      if (paymentError || !paymentData) {
        throw new Error(paymentError?.message || 'Payment initialization failed');
      }

      const { data: bookingData, error: dbError } = await supabase
        .from('bookings')
        .insert({
          full_name: wizardState.fullName,
          mobile_number: wizardState.mobile,
          email: wizardState.email,
          number_of_guests: wizardState.numberOfGuests,
          safari_type: wizardState.selectedPackage.id,
          price_per_person: wizardState.selectedPackage.price,
          total_amount: totalAmount,
          pickup_time: wizardState.selectedPackage.pickupTime,
          payment_intent_id: paymentData.id,
          booking_date: format(wizardState.travelDate, 'yyyy-MM-dd'),
        })
        .select()
        .single();

      if (dbError) throw dbError;

      await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          booking: bookingData,
          packageName: wizardState.selectedPackage.name,
          customerEmail: wizardState.email,
          businessEmail: 'info@premium-desert-safari.com',
        },
      });

      // Persist minimal booking info for conversion tracking after payment redirect
      try {
        const totalAmount = wizardState.selectedPackage.price * wizardState.numberOfGuests;
        const payload = {
          totalAmount,
          currency: 'AED',
          packageName: wizardState.selectedPackage.name,
          guests: wizardState.numberOfGuests,
        };
        localStorage.setItem('lastBooking', JSON.stringify(payload));
        // Persist invoice data for post-payment invoice generation
        const invoicePayload = {
          invoiceNumber: `INV-${Date.now()}`,
          invoiceDate: new Date().toISOString(),
          customerName: wizardState.fullName,
          mobile: wizardState.mobile,
          email: wizardState.email,
          pickupLocation: wizardState.pickupLocation,
          guests: wizardState.numberOfGuests,
          package: {
            id: wizardState.selectedPackage.id,
            name: wizardState.selectedPackage.name,
            pricePerPerson: wizardState.selectedPackage.price,
            inclusions: wizardState.selectedPackage.inclusions,
            pickupTime: wizardState.selectedPackage.pickupTime,
            duration: wizardState.selectedPackage.duration,
          },
          amounts: {
            subtotal: wizardState.selectedPackage.price * wizardState.numberOfGuests,
            taxes: 0,
            fees: 0,
            total: wizardState.selectedPackage.price * wizardState.numberOfGuests,
            currency: 'AED',
          },
          business: {
            name: 'Premium Desert Safari Dubai',
            contact: '+971 50 663 8921',
            email: 'info@premium-desert-safari.com',
            website: window.location.origin,
          }
        };
        localStorage.setItem('invoiceData', JSON.stringify(invoicePayload));
      } catch {}

      window.location.href = paymentData.redirect_url;
    } catch (error) {
      console.error('Wizard booking error:', error);
      toast({ title: "Booking Failed", description: "There was an error processing your booking.", variant: "destructive" });
    } finally {
      updateWizardState({ isSubmitting: false });
    }
  };

  const goBack = () => {
    if (wizardState.step > 1) {
      updateWizardState({ step: wizardState.step - 1 });
    } else {
      navigate('/');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          wizardState.step >= 1 ? 'bg-gradient-desert text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          1
        </div>
        <div className={`w-12 h-1 ${wizardState.step >= 2 ? 'bg-gradient-desert' : 'bg-gray-200'}`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          wizardState.step >= 2 ? 'bg-gradient-desert text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          2
        </div>
        <div className={`w-12 h-1 ${wizardState.step >= 3 ? 'bg-gradient-desert' : 'bg-gray-200'}`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          wizardState.step >= 3 ? 'bg-gradient-desert text-white' : 'bg-gray-200 text-gray-500'
        }`}>
          3
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-gradient-desert">How are you? Let’s make a memorable desert safari.</span>
        </h2>
        <p className="text-lg text-muted-foreground">I’ll guide you through a quick booking flow.</p>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => updateWizardState({ step: 2 })} className="bg-gradient-desert px-10 py-3 text-lg">
          Let’s Start
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-gradient-desert">What’s your name?</span>
        </h2>
        <p className="text-lg text-muted-foreground">I’ll personalize your journey.</p>
      </div>
      <Card className="p-6">
        <label className="text-sm font-medium">Full Name *</label>
        <input
          className="mt-2 w-full border rounded px-3 py-2"
          placeholder="Enter your full name"
          value={wizardState.fullName}
          onChange={(e) => updateWizardState({ fullName: e.target.value })}
        />
        {wizardState.fullName && (
          <div className="mt-3 text-sm">
            <span className="font-semibold">Hello {wizardState.fullName},</span> let’s make your desert safari journey memorable.
          </div>
        )}
      </Card>
      <div className="flex justify-center">
        <Button onClick={() => updateWizardState({ step: 3 })} className="bg-gradient-desert px-8 py-3 text-lg">
          Continue
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-gradient-desert">Select your package</span>
        </h2>
        <p className="text-lg text-muted-foreground">Choose from our four experiences.</p>
      </div>

      {!wizardState.selectedPackage ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PACKAGES.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                pkg.isPopular ? 'ring-2 ring-amber-400 relative' : ''
              }`}
              onClick={() => selectPackage(pkg)}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="badge-popular px-4 py-1 text-sm font-semibold">
                    <Crown className="w-4 h-4 mr-1" />
                    Best Choice - Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{pkg.name}</CardTitle>
                    <CardDescription className="text-sm">{pkg.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Pickup: {pkg.pickupTime}</div>
                    <div className="text-sm text-muted-foreground">Duration: {pkg.duration}</div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-xl">{wizardState.selectedPackage.name}</CardTitle>
            <CardDescription>{wizardState.selectedPackage.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {wizardState.displayedInclusions.length === 0 && (
                <div className="text-sm text-muted-foreground">Loading inclusions…</div>
              )}
              {wizardState.displayedInclusions.map((inc, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-amber-600" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={changePackage}>Change package</Button>
              <Button onClick={() => updateWizardState({ step: 4 })} className="bg-gradient-desert">Continue</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-gradient-desert">When do you want to travel?</span>
        </h2>
        <p className="text-lg text-muted-foreground">Pick your preferred date.</p>
      </div>
      <Card className="p-6">
        <label className="text-sm font-medium">Travel Date *</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "mt-2 w-full justify-start text-left font-normal",
                !wizardState.travelDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {wizardState.travelDate ? format(wizardState.travelDate, "PPP") : "Select travel date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={wizardState.travelDate}
              onSelect={(date) => updateWizardState({ travelDate: date })}
              disabled={(date) => date < new Date()}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </Card>
      <div className="flex justify-center">
        <Button onClick={() => updateWizardState({ step: 5 })} className="bg-gradient-desert px-8 py-3 text-lg">
          Continue
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-gradient-desert">How many passengers?</span>
        </h2>
        <p className="text-lg text-muted-foreground">Set the number of guests.</p>
      </div>
      <Card className="p-6">
        <div className="flex items-center gap-4 mt-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => updateWizardState({ numberOfGuests: Math.max(1, wizardState.numberOfGuests - 1) })}
            disabled={wizardState.numberOfGuests <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center">
            <span className="text-2xl font-bold">{wizardState.numberOfGuests}</span>
            <span className="text-sm text-muted-foreground ml-2">
              {wizardState.numberOfGuests === 1 ? "Guest" : "Guests"}
            </span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => updateWizardState({ numberOfGuests: wizardState.numberOfGuests + 1 })}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {wizardState.numberOfGuests >= 5 ? (
          <div className="mt-3 p-3 bg-primary/10 border border-primary/30 rounded flex items-center gap-2">
            <Users className="text-primary" size={18} />
            <span className="text-sm font-medium text-primary">Private transfer is provided for groups of 5 or more.</span>
          </div>
        ) : (
          <div className="mt-3 p-3 bg-secondary/10 border border-secondary/30 rounded flex items-center gap-2">
            <Users className="text-secondary" size={18} />
            <span className="text-sm">Solo travelers can enjoy our sharing transfer. If you book for 5 or more people, we provide private transfer.</span>
          </div>
        )}
      </Card>
      <div className="flex justify-center">
        <Button onClick={() => updateWizardState({ step: 6 })} className="bg-gradient-desert px-8 py-3 text-lg">
          Go to Checkout
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          <span className="text-gradient-desert">Checkout</span>
        </h2>
        <p className="text-lg text-muted-foreground">Provide contact info and confirm payment.</p>
      </div>
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl">{wizardState.selectedPackage?.name}</CardTitle>
          <CardDescription>{wizardState.selectedPackage?.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {wizardState.selectedPackage?.inclusions.map((inclusion: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-amber-600" />
                <span>{inclusion}</span>
              </div>
            ))}
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Mobile / WhatsApp *</label>
              <input
                className="mt-2 w-full border rounded px-3 py-2"
                placeholder="+971 XXX XXX XXX"
                value={wizardState.mobile}
                onChange={(e) => updateWizardState({ mobile: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address *</label>
              <input
                type="email"
                className="mt-2 w-full border rounded px-3 py-2"
                placeholder="your.email@example.com"
                value={wizardState.email}
                onChange={(e) => updateWizardState({ email: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Pickup Location *</label>
              <input
                className="mt-2 w-full border rounded px-3 py-2"
                placeholder="Type your pickup point (Hotel/Residence/Location)"
                value={wizardState.pickupLocation || ''}
                onChange={(e) => updateWizardState({ pickupLocation: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">Be ready 10 minutes before the scheduled pickup time.</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount ({wizardState.numberOfGuests} {wizardState.numberOfGuests === 1 ? 'Guest' : 'Guests'})</span>
            <span className="text-gradient-desert">AED {wizardState.selectedPackage ? wizardState.selectedPackage.price * wizardState.numberOfGuests : 0}</span>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Button 
          onClick={proceedToPayment}
          disabled={wizardState.isSubmitting}
          className="bg-gradient-desert hover:opacity-90 px-12 py-4 text-xl"
        >
          {wizardState.isSubmitting ? 'Processing...' : 'Proceed to Payment'}
          <ChevronRight className="ml-2 w-6 h-6" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-desert">Premium Desert Safari</span>
          </h1>
          <p className="text-xl text-muted-foreground">Booking Wizard</p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {wizardState.step === 1 && renderStep1()}
          {wizardState.step === 2 && renderStep2()}
          {wizardState.step === 3 && renderStep3()}
          {wizardState.step === 4 && renderStep4()}
          {wizardState.step === 5 && renderStep5()}
          {wizardState.step === 6 && renderStep6()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 max-w-6xl mx-auto">
          <Button 
            variant="outline" 
            onClick={goBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {wizardState.step === 1 ? 'Back to Home' : 'Previous Step'}
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {wizardState.step} of 6
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingWizard;