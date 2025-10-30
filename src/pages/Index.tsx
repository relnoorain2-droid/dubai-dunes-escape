import { useState } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import PackageSelector from "@/components/PackageSelector";
import BookingForm from "@/components/BookingForm";
import Gallery from "@/components/Gallery";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SafariPackage } from "@/components/PackageSelector";

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState<SafariPackage | null>(null);

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
        <PackageSelector onSelectPackage={handleSelectPackage} />
        <BookingForm selectedPackage={selectedPackage} />
        <Gallery />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;