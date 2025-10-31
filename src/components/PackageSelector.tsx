import { useEffect, useRef, useState } from "react";
import { Check, Clock, Users, ShieldCheck, Crown, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getInclusionImage } from "@/assets/inclusions";

export interface SafariPackage {
  id: string;
  name: string;
  price: number;
  pickupTime: string;
  duration: string;
  inclusions: string[];
  exclusions: string[];
  highlighted?: boolean;
}

const packages: SafariPackage[] = [
  {
    id: "premium",
    name: "Premium Desert Safari",
    price: 195,
    pickupTime: "2:30 PM - 3:00 PM",
    duration: "06:00 hours",
    inclusions: [
      "Two-way hotel-to-hotel drop-back (sharing transfer)",
      "Exploration of dunes in a 4x4 vehicle (25-30 minutes)",
      "Sunset views with photographic opportunity",
      "1 short Camel ride",
      "Henna tattooing",
      "Belly dance",
      "Soft music (DJ)",
      "Sufi dance",
      "Khaliji show",
      "Dabka + Drummers show",
      "Fire show",
      "Live Cooking stations and relaxed sitting area",
      "Traditional BBQ dinner with vegetarian and non-vegetarian cuisines (At reserved area)"
    ],
    exclusions: [
      "Alcohol",
      "All activities not included in this desert safari, such as quad biking and sand boarding"
    ]
  },
  {
    id: "premium_shisha",
    name: "Premium Desert Safari with Shisha on Table",
    price: 245,
    pickupTime: "3:00 PM - 3:30 PM",
    duration: "06:00 hours",
    inclusions: [
      "Two-way hotel-to-hotel drop-back (sharing transfer)",
      "Exploration of dunes in a 4x4 vehicle (25-30 minutes)",
      "Sunset views with photographic opportunity",
      "1 short Camel ride",
      "Henna tattooing",
      "Shisha smoking at the table",
      "Belly dance",
      "Soft music (DJ)",
      "Sufi dance show",
      "Khaliji show",
      "Dabka + Drummers show",
      "Fire show",
      "Live Cooking stations and relaxed sitting area",
      "Traditional BBQ dinner with vegetarian and non-vegetarian cuisines (At reserved area)"
    ],
    exclusions: [
      "Alcohol",
      "All activities not included in this desert safari, such as quad biking and sand boarding"
    ]
  },
  {
    id: "premium_polaris",
    name: "Premium Desert Safari with 200cc Polaris (Inside the Circle, beside the Camp)",
    price: 265,
    pickupTime: "2:00 PM - 2:30 PM",
    duration: "06:00 hours",
    highlighted: true,
    inclusions: [
      "Two-way hotel-to-hotel drop-back (sharing transfer)",
      "Exploration of dunes in a 4x4 vehicle (25-30 minutes)",
      "Sunset views with photographic opportunity",
      "Camel ride",
      "Henna tattooing",
      "Live Cooking stations and relaxed sitting area",
      "Traditional BBQ dinner with vegetarian and non-vegetarian cuisines (At reserved area)",
      "Shisha smoking facility at the shisha corner",
      "Belly dance",
      "Soft music (DJ)",
      "Sufi dance",
      "Khaliji show",
      "Dabka + Drummers show",
      "Fire show",
      "Unlimited refreshments",
      "20 min ride for Polaris 200cc - inside the circle"
    ],
    exclusions: [
      "Alcohol",
      "Any additional activity not mentioned in the inclusions"
    ]
  },
  {
    id: "premium_vip",
    name: "Premium Desert Safari with VIP Majlis",
    price: 295,
    pickupTime: "2:30 PM - 3:00 PM",
    duration: "06:00 hours",
    inclusions: [
      "Two-way hotel-to-hotel drop-back (sharing transfer)",
      "VIP Majlis",
      "Exploration of dunes in a 4x4 vehicle",
      "Sunset views with photographic opportunity",
      "1 short Camel ride",
      "Henna tattooing",
      "Shisha smoking facility at the shisha corner",
      "Unlimited refreshments",
      "Belly dance",
      "Soft music (DJ)",
      "Sufi dance show",
      "Khaliji show",
      "Dabka + Drummers show",
      "Fire show",
      "Live Cooking stations and relaxed sitting area",
      "Traditional BBQ dinner with vegetarian and non-vegetarian cuisines (At reserved area)"
    ],
    exclusions: [
      "Any activity not mentioned in the inclusions (example - add ons)"
    ]
  }
];

interface PackageSelectorProps {
  onSelectPackage: (pkg: SafariPackage) => void;
  preselectIndex?: number;
  preselectId?: string;
}
const PackageSelector = ({ onSelectPackage, preselectIndex, preselectId }: PackageSelectorProps) => {
  const [selectedInclusion, setSelectedInclusion] = useState<string | null>(null);
  const didAutoSelect = useRef(false);

  // Auto-select a package when preselectId or preselectIndex is provided
  useEffect(() => {
    if (didAutoSelect.current) return;
    if (preselectId) {
      const idx = packages.findIndex(p => p.id === preselectId);
      if (idx >= 0) {
        onSelectPackage(packages[idx]);
        didAutoSelect.current = true;
        return;
      }
    }
    if (typeof preselectIndex === 'number' && preselectIndex >= 0 && preselectIndex < packages.length) {
      onSelectPackage(packages[preselectIndex]);
      didAutoSelect.current = true;
    }
  }, [preselectId, preselectIndex, onSelectPackage]);

  // Compute common vs unique inclusions across packages
  const normalize = (s: string) => s.toLowerCase();
  const commonSet = new Set<string>(packages[0].inclusions.map(normalize));
  for (let i = 1; i < packages.length; i++) {
    const setI = new Set(packages[i].inclusions.map(normalize));
    for (const item of Array.from(commonSet)) {
      if (!setI.has(item)) commonSet.delete(item);
    }
  }
  const uniqueByPackage: Record<string, string[]> = {};
  for (const pkg of packages) {
    uniqueByPackage[pkg.id] = pkg.inclusions.filter((inc) => !commonSet.has(normalize(inc)));
  }

  return (
    <section id="packages" className="py-16 md:py-24 desert-ambient scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-desert">Choose Your Adventure</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our premium desert safari packages and experience the magic of Dubai's golden dunes
          </p>
        </div>

        {/* Solo travelers note */}
        <div className="mb-8 p-4 bg-secondary/20 border border-secondary/30 rounded-lg max-w-2xl mx-auto flex items-center gap-2 animate-fade-in">
          <Users className="text-primary" size={18} />
          <p className="text-sm md:text-base">Solo travelers are welcome — sharing transfer available on all packages.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {[...packages].sort((a, b) => Number(Boolean(b.highlighted)) - Number(Boolean(a.highlighted))).map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative overflow-hidden transition-all hover:shadow-warm ${
                pkg.highlighted ? 'border-primary border-2 shadow-warm' : ''
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 left-0 badge-popular px-4 py-2 text-xs md:text-sm font-bold tracking-wide flex items-center gap-2">
                  <Crown size={16} />
                  <span>Best Choice - Most Popular</span>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3">{pkg.name}</h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-primary">AED {pkg.price}</span>
                  <span className="text-muted-foreground">/ person</span>
                </div>

                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="text-primary" size={18} />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-primary" size={18} />
                    <span>Pickup: {pkg.pickupTime}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-primary">Inclusions:</h4>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="text-primary" size={16} />
                        <span>{item}</span>
                        <Button
                          aria-label={`View ${item}`}
                          className="h-6 px-2 text-xs ml-2 bg-gradient-desert text-white hover:opacity-90 rounded"
                          onClick={() => setSelectedInclusion(item)}
                        >
                          view
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Unique highlights per package */}
                {uniqueByPackage[pkg.id].length > 0 && (
                  <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="text-accent" size={18} />
                      <h4 className="font-semibold text-accent">Unique highlights</h4>
                    </div>
                    <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                      {uniqueByPackage[pkg.id].map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cancellation Policy Box */}
                <div className="mb-6 p-4 bg-muted/50 border border-primary/20 rounded-lg animate-glow">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-primary" size={20} />
                    <p className="text-sm font-semibold text-primary">Free cancellation up to 24 hours before</p>
                  </div>
                </div>

                <Button
                  onClick={() => onSelectPackage(pkg)}
                  className="w-full bg-gradient-desert hover:opacity-90 text-lg py-6"
                >
                  Book This Package
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Cancellation Policy minimal highlight */}
        <div className="mt-12 p-6 bg-card border border-border rounded-lg text-center animate-glow">
          <p className="text-base md:text-lg font-semibold text-primary">Free cancellation up to 24 hours before</p>
        </div>

        {/* Image Dialog */}
        <Dialog open={!!selectedInclusion} onOpenChange={() => setSelectedInclusion(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedInclusion}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src={getInclusionImage(selectedInclusion)}
                alt={selectedInclusion || "Activity"}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Experience the best of Arabian desert adventures
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PackageSelector;