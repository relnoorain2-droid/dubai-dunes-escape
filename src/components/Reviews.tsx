import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Review {
  name: string;
  text: string;
}

const REVIEWS: Review[] = [
  { name: "Aisha K.", text: "Absolutely breathtaking experience! 5 stars for the dune bashing and sunset." },
  { name: "Rahul S.", text: "VIP Majlis was luxurious and the staff were super friendly. Highly recommend!" },
  { name: "Maria P.", text: "Kids loved the camel ride and the dinner was delicious. Will come again!" },
  { name: "Omar L.", text: "Smooth booking, on-time pickup, and unforgettable shows. Perfect evening!" },
  { name: "Nina G.", text: "Fantastic from start to finish. Great value and wonderful memories!" },
];

const Reviews = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-card border-t border-border" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-2">
            <span className="text-gradient-desert">Guest Reviews & Social Proof</span>
          </h2>
          <p className="text-muted-foreground">Real 5-star feedback from happy customers</p>
        </div>

        <div className="relative max-w-3xl mx-auto overflow-hidden">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="p-6 rounded-xl bg-white shadow-warm border border-border">
                <div className="flex items-center gap-1 mb-3 text-amber-500">
                  <Star size={18} /><Star size={18} /><Star size={18} /><Star size={18} /><Star size={18} />
                </div>
                <p className="text-lg">“{r.text}”</p>
                <p className="mt-4 text-sm text-muted-foreground">— {r.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;