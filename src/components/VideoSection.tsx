import { Play } from "lucide-react";

const VideoSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-desert">Experience Desert Safari</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch our exclusive desert safari experience video and discover the magic of Arabian adventure that awaits you.
            </p>
          </div>

          <div className="relative">
            {/* Video Container with responsive aspect ratio */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/G9Ix7mT2Vmo?loop=1&playlist=G9Ix7mT2Vmo&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                title="Premium Desert Safari Experience - Dubai"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/20 rounded-full blur-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-amber-400/20 rounded-full blur-sm"></div>
          </div>

          {/* Call to action below video */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Ready to create your own unforgettable memories?
            </p>
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <Play size={20} />
              <span>Book Your Adventure Today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;