import { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import PackageSelector from "@/components/PackageSelector";
import BookingForm from "@/components/BookingForm";
import Gallery from "@/components/Gallery";
import VideoSection from "@/components/VideoSection";
import Reviews from "@/components/Reviews";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SafariPackage } from "@/components/PackageSelector";

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState<SafariPackage | null>(null);
  const location = useLocation();

  // Derive preselection and add-ons from query params
  const { preselectIndex, preselectId, selectedAddons } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const pkgIdxStr = params.get('package');
    const pkgId = params.get('packageId') || undefined;
    const shisha = params.get('shisha') === 'true';
    const polaris = params.get('polaris') === 'true';
    const idx = pkgIdxStr ? Number(pkgIdxStr) : undefined;
    return {
      preselectIndex: Number.isFinite(idx) ? (idx as number) : undefined,
      preselectId: pkgId,
      selectedAddons: { shisha, polaris },
    };
  }, [location.search]);

  const handleSelectPackage = (pkg: SafariPackage) => {
    setSelectedPackage(pkg);
    // Scroll to booking form
    setTimeout(() => {
      const bookingElement = document.getElementById('booking');
      if (bookingElement) {
        bookingElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSlider />
        {/* Instant Booking button section */}
        <section className="container mx-auto px-4 mt-6 mb-4">
          <div className="flex justify-center">
            <Link
              to="/booking-wizard"
              className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-desert text-white shadow-warm hover:opacity-90 text-lg"
            >
              Instant Booking Tour
            </Link>
          </div>
        </section>
        <PackageSelector onSelectPackage={handleSelectPackage} preselectIndex={preselectIndex} preselectId={preselectId} />
        <BookingForm selectedPackage={selectedPackage} selectedAddons={selectedAddons} />
        <Gallery />
        <VideoSection />
        <Reviews />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;