import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, CheckCircle, AlertTriangle, Info } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient-desert">Refund Policy</span>
          </h1>

          <div className="space-y-8">
            <section>
              <p className="text-lg text-muted-foreground">
                At Premium Desert Safari, we strive to provide exceptional service and ensure customer satisfaction. Our refund policy is designed to be fair and transparent for all parties involved.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <CheckCircle className="text-primary" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">Full Refund Eligibility</h2>
                    <p className="text-muted-foreground">
                      Cancellations made 24 hours or more before tour departure qualify for a 100% refund of the booking amount.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-destructive/10">
                    <AlertTriangle className="text-destructive" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-2">No Refund Situations</h2>
                    <p className="text-muted-foreground">
                      Cancellations within 24 hours of tour departure or no-shows are not eligible for any refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <Clock className="text-accent" size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-4">Refund Processing Timeline</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Step 1: Request Submission</h3>
                      <p className="text-muted-foreground text-sm">
                        Once you submit your cancellation request via WhatsApp or email, we will review it within 24 hours.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Step 2: Approval & Processing</h3>
                      <p className="text-muted-foreground text-sm">
                        After approval, the refund will be initiated to your original payment method within 1-2 business days.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Step 3: Bank Processing</h3>
                      <p className="text-muted-foreground text-sm">
                        Depending on your bank or payment provider, it may take 5-7 working days for the amount to reflect in your account.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Refund Methods</h2>
              <p className="text-muted-foreground mb-4">
                All refunds are processed through the original payment method used for booking:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Credit/Debit Card</p>
                    <p className="text-sm text-muted-foreground">Refunded to the same card used for payment (5-7 working days)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Bank Transfer</p>
                    <p className="text-sm text-muted-foreground">Direct transfer to your bank account (3-5 working days)</p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Info className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-4">Special Circumstances</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Weather-Related Cancellations</h3>
                      <p className="text-sm">
                        If we cancel your tour due to extreme weather conditions or safety concerns, you will receive a full refund or the option to reschedule at no additional cost.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Medical Emergencies</h3>
                      <p className="text-sm">
                        In case of genuine medical emergencies with proper documentation, we may offer a refund or rescheduling option even within the 24-hour window. Please contact us immediately.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Service Issues</h3>
                      <p className="text-sm">
                        If there are any issues with the service provided, please inform us during or immediately after the tour. We will investigate and offer appropriate compensation if warranted.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Important Information</h2>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <p>Refunds are processed in the same currency as the original booking</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <p>Payment gateway charges are non-refundable in case of late cancellations</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <p>Group bookings follow the same refund policy for each individual guest</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <p>Refund requests must include booking reference number and registered email</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <p>Any promotional discounts or vouchers used will not be reissued upon cancellation</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Tracking Your Refund</h2>
              <p className="text-muted-foreground mb-4">
                You can track the status of your refund by:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Contacting us via WhatsApp at +971 50 663 8921</li>
                <li>• Emailing us at info@premium-desert-safari.com with your booking reference</li>
                <li>• Checking your email for refund confirmation notifications</li>
              </ul>
            </section>

            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="font-bold text-lg mb-2">Need Assistance?</h3>
              <p className="text-muted-foreground">
                If you have any questions about refunds or need help with your cancellation, our customer support team is available 24/7. Contact us via WhatsApp at +971 50 663 8921 for immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;