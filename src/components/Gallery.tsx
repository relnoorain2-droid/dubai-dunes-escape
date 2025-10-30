import quadBikeGirl from "@/assets/quad-bike-girl.jpeg";
import quadBikeGirl2 from "@/assets/quad-bike-girl-2.jpeg";
import desertView from "@/assets/desert-view.jpeg";
import kidsSandSkiing from "@/assets/kids-sand-skiing.jpeg";
import proposalRing from "@/assets/proposal-ring.jpeg";
import girlCamel from "@/assets/girl-camel.jpeg";
import guestsSafari from "@/assets/guests-safari.jpeg";
import desertCamp from "@/assets/desert-camp.jpeg";
import desertCampNight from "@/assets/desert-camp-night.jpeg";
import camelRide from "@/assets/camel-ride.jpeg";
import desertCampView from "@/assets/desert-camp-view.jpeg";
import fireShow from "@/assets/fire-show.jpeg";
import sandSkating from "@/assets/sand-skating.jpeg";
import buffetGirls from "@/assets/buffet-girls.jpeg";
import buffetCounter from "@/assets/buffet-counter.jpeg";
import coupleProposal from "@/assets/couple-proposal.jpeg";
import arabicCouple from "@/assets/arabic-couple.jpeg";
import coupleSunset from "@/assets/couple-sunset.jpeg";
import tanouraDance from "@/assets/tanoura-dance.jpeg";

const galleryImages = [
  { src: quadBikeGirl, alt: "Girl riding quad bike in desert" },
  { src: quadBikeGirl2, alt: "Quad biking adventure" },
  { src: desertView, alt: "Beautiful desert landscape" },
  { src: kidsSandSkiing, alt: "Kids sand skiing fun" },
  { src: proposalRing, alt: "Romantic desert proposal" },
  { src: girlCamel, alt: "Camel interaction" },
  { src: guestsSafari, alt: "Guests enjoying safari" },
  { src: desertCamp, alt: "Desert camp experience" },
  { src: desertCampNight, alt: "Desert camp at night" },
  { src: camelRide, alt: "Traditional camel ride" },
  { src: desertCampView, alt: "Camp atmosphere" },
  { src: fireShow, alt: "Fire show performance" },
  { src: sandSkating, alt: "Desert sand skating" },
  { src: buffetGirls, alt: "Enjoying buffet dinner" },
  { src: buffetCounter, alt: "Live buffet counter" },
  { src: coupleProposal, alt: "Couple proposal moment" },
  { src: arabicCouple, alt: "Arabic couple experience" },
  { src: coupleSunset, alt: "Sunset romance" },
  { src: tanouraDance, alt: "Tanoura dance show" }
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-desert">Experience Gallery</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Glimpse the magic that awaits you in the heart of Dubai's desert
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;