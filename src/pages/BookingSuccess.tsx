import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackPurchase } from "@/lib/tracking";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  mobile: string;
  email: string;
  pickupLocation?: string;
  guests: number;
  package: {
    id: string;
    name: string;
    pricePerPerson: number;
    inclusions: string[];
    pickupTime?: string;
    duration?: string;
  };
  amounts: { subtotal: number; taxes: number; fees: number; total: number; currency: string };
  business: { name: string; contact: string; email: string; website: string };
}

const BookingSuccess = () => {
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const invoiceRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Fire conversion tracking using details persisted before payment
    try {
      const raw = localStorage.getItem('lastBooking');
      if (raw) {
        const { totalAmount, currency, packageName, guests } = JSON.parse(raw);
        if (typeof totalAmount === 'number' && currency) {
          trackPurchase(totalAmount, currency, { packageName, guests });
        }
        // Clear after use to avoid duplicate firing on refresh
        localStorage.removeItem('lastBooking');
      }
    } catch {}

    // Auto-open WhatsApp with a prefilled message upon booking success
    const message = encodeURIComponent("Hi, I have completed my booking");
    const whatsappUrl = `https://wa.me/971506638921?text=${message}`;

    // Attempt to open in a new tab (may be blocked by popup blockers)
    try {
      window.open(whatsappUrl, '_blank');
    } catch (e) {
      // If blocked, user can click the visible button below
      console.warn('WhatsApp auto-open may be blocked by the browser.');
    }

    // Load invoice data and auto-generate PDF download
    try {
      const invRaw = localStorage.getItem('invoiceData');
      if (invRaw) {
        const data: InvoiceData = JSON.parse(invRaw);
        setInvoice(data);
        // Delay to let invoice render
        setTimeout(async () => {
          if (invoiceRef.current) {
            const canvas = await html2canvas(invoiceRef.current, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            // Fit image into page keeping aspect ratio
            const imgWidth = pageWidth - 40; // margins
            const ratio = canvas.width / canvas.height;
            const imgHeight = imgWidth / ratio;
            const top = 20 + (pageHeight - imgHeight) / 2 - 20;
            pdf.addImage(imgData, 'PNG', 20, Math.max(20, top), imgWidth, imgHeight);
            pdf.save(`Invoice_${data.invoiceNumber}.pdf`);
            // Clear after generating
            localStorage.removeItem('invoiceData');
          }
        }, 300);
      }
    } catch {}
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
          {/* Hidden invoice layout for PDF generation */}
          {invoice && (
            <div ref={invoiceRef} style={{ position: 'absolute', left: -9999, top: -9999, width: 800 }}>
              <div className="p-6 rounded-lg border border-border bg-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Premium Desert Safari Dubai</h2>
                    <p className="text-sm text-muted-foreground">{invoice.business.contact} • {invoice.business.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Invoice</p>
                    <p className="text-sm">{new Date(invoice.invoiceDate).toLocaleDateString()} • {invoice.invoiceNumber}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Customer</p>
                    <p className="text-sm">{invoice.customerName}</p>
                    <p className="text-sm">Guests: {invoice.guests}</p>
                    {invoice.pickupLocation && <p className="text-sm">Pickup: {invoice.pickupLocation}</p>}
                  </div>
                  <div>
                    <p className="font-semibold">Package</p>
                    <p className="text-sm">{invoice.package.name}</p>
                    {invoice.package.pickupTime && <p className="text-sm">Pickup Time: {invoice.package.pickupTime}</p>}
                    {invoice.package.duration && <p className="text-sm">Duration: {invoice.package.duration}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-semibold mb-2">Inclusions</p>
                  <ul className="list-disc pl-6 text-sm">
                    {invoice.package.inclusions.map((inc, i) => (
                      <li key={i}>{inc}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{invoice.amounts.currency} {invoice.amounts.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes</span>
                    <span>{invoice.amounts.currency} {invoice.amounts.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fees</span>
                    <span>{invoice.amounts.currency} {invoice.amounts.fees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold mt-2">
                    <span>Total Paid</span>
                    <span>{invoice.amounts.currency} {invoice.amounts.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>Thank you for choosing Premium Desert Safari Dubai.</p>
                  <p>Keep a soft copy on your mobile; no print or hard copy needed.</p>
                  <p className="mt-1">{invoice.business.website}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingSuccess;