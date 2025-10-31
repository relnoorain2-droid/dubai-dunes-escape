import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, X, AlertCircle } from "lucide-react";

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient-desert">Cancellation Policy</span>
          </h1>

          <div className="space-y-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Check className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Free Cancellation Period</h2>
                  <p className="text-muted-foreground">
                    For all cancellations made 24 hours or more prior to your tour departure time, NO charges will be applied. You will receive a full refund of your booking amount.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-destructive/10">
                  <X className="text-destructive" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Late Cancellation</h2>
                  <p className="text-muted-foreground">
                    If your cancellation is made within 24 hours of your tour departure time, 100% of the booking charges will be applicable. This helps us manage our resources and commitments to service providers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <AlertCircle className="text-accent" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Refund Processing</h2>
                  <p className="text-muted-foreground mb-4">
                    If you are eligible for a refund based on the cancellation timing, your amount will be returned to your original payment method within 7 working days from the date of cancellation approval.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Note: Bank processing times may vary. If you do not receive your refund within the specified timeframe, please contact us immediately.
                  </p>
                </div>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">How to Cancel Your Booking</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>To cancel your desert safari booking, please contact us through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>WhatsApp: +971 50 663 8921 (Recommended for fastest response)</li>
                  <li>Email: info@premium-desert-safari.com</li>
                </ul>
                <p>Please provide your booking reference number and the email address used for booking when requesting a cancellation.</p>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Weather Conditions</h2>
              <p className="text-muted-foreground">
                In rare cases of extreme weather conditions that make the desert safari unsafe, we reserve the right to cancel or reschedule tours. In such situations, you will be offered either:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>A full refund of your booking amount</li>
                <li>Rescheduling to another available date at no extra charge</li>
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold mb-4">No-Show Policy</h2>
              <p className="text-muted-foreground">
                If you fail to show up at the designated pickup location at the scheduled time without prior notification, it will be considered a no-show. No refunds will be provided for no-show bookings. We recommend arriving at your pickup location at least 10 minutes before the scheduled pickup time.
              </p>
            </section>

            <section className="mt-8 bg-muted p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Important Notes</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>All cancellation requests must be made in writing (WhatsApp or Email)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cancellation time is calculated from the tour departure time, not booking time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Group bookings follow the same cancellation policy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Partial cancellations (reducing guest count) follow the same 24-hour policy</span>
                </li>
              </ul>
            </section>

            <div className="mt-8 p-6 bg-card border-2 border-primary/20 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Questions About Cancellation?</h3>
              <p className="text-muted-foreground">
                If you have any questions or need clarification about our cancellation policy, please don't hesitate to contact us via WhatsApp at +971 50 663 8921. Our team is available 24/7 to assist you.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CancellationPolicy;