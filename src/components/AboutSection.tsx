import { Star, Award, Users, Heart } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-background scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-desert">About Premium Desert Safari</span>
            </h2>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Book Premium Desert Safari and take advantage of our thrilling Arabian desert adventure along with other desert activities and entertainment. 
              Ideal for people looking for an adventure, the desert safari offers you dune bashing opportunities in the desert of Dubai.
            </p>
            
            <p className="text-lg leading-relaxed text-muted-foreground mt-4">
              With a 4x4 vehicle, this journey is safe and at the same time exhilarating. Once you reach the desert camp, you can indulge in a variety of activities including camel riding, quad biking, shisha smoking, and more. 
              You can also don traditional Arabic clothes and click memorable pictures.
            </p>

            <p className="text-lg leading-relaxed text-muted-foreground mt-4">
              While all these activities are fun, don't forget the sunset as the desert looks its best during this magical time of day. 
              As the sun sets and night falls, the desert camp becomes colorful and enchanting. 
              You can hear melodious Arabic music and witness graceful belly dancing along with traditional Tanura dance shows. 
              All of this is followed by a lavish barbecue dinner featuring a spread of Arabic and international cuisine.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
                <Star className="text-primary" size={32} />
              </div>
              <h3 className="font-bold text-2xl mb-1">5.0</h3>
              <p className="text-sm text-muted-foreground">Guest Rating</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="font-bold text-2xl mb-1">10,000+</h3>
              <p className="text-sm text-muted-foreground">Happy Guests</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
                <Award className="text-primary" size={32} />
              </div>
              <h3 className="font-bold text-2xl mb-1">Premium</h3>
              <p className="text-sm text-muted-foreground">Service Quality</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-3">
                <Heart className="text-primary" size={32} />
              </div>
              <h3 className="font-bold text-2xl mb-1">24/7</h3>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;