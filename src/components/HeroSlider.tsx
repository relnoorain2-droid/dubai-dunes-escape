import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import desertCamp from "@/assets/desert-camp.jpeg";
import desertView from "@/assets/desert-view.jpeg";
import coupleSunset from "@/assets/couple-sunset.jpeg";
import camelRide from "@/assets/camel-ride.jpeg";

const slides = [
  {
    image: desertCamp,
    title: "Premium VIP Desert Safari",
    subtitle: "Experience the Ultimate Arabian Adventure"
  },
  {
    image: desertView,
    title: "Explore Golden Dunes",
    subtitle: "Unforgettable Desert Landscapes"
  },
  {
    image: coupleSunset,
    title: "Magical Sunset Views",
    subtitle: "Create Memories That Last Forever"
  },
  {
    image: camelRide,
    title: "Traditional Camel Rides",
    subtitle: "Authentic Desert Experience"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div id="home" className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all"
      >
        <ChevronRight className="text-white" size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;