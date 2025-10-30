import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-gradient-desert">Privacy Policy</span>
          </h1>

          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">Information Collection</h2>
              <p className="text-muted-foreground">
                Premium Desert Safari collects personal information that you voluntarily provide when making a booking, including your full name, mobile number, email address, and the number of guests. This information is essential for processing your booking and ensuring a seamless safari experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Use of Information</h2>
              <p className="text-muted-foreground">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Process and confirm your desert safari bookings</li>
                <li>Communicate pickup times and important updates</li>
                <li>Send booking confirmations and receipts</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve our services based on feedback</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
              <p className="text-muted-foreground">
                Your personal information is stored securely and protected using industry-standard SSL encryption. We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
              <p className="text-muted-foreground">
                All payment transactions are processed through our secure payment gateway partner. We do not store your complete credit card information on our servers. Payment processing is handled with the highest security standards to protect your financial data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. Your information may be shared with trusted service providers only to the extent necessary to operate our services, such as payment processors and booking management systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Access your personal information</li>
                <li>Request corrections to your data</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our Privacy Policy or how we handle your personal information, please contact us via WhatsApp at +971 50 663 8921 or email us at info@premiumdesertsafari.ae
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;