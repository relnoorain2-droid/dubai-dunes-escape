import { Check, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    name: "Premium Desert Safari - Sharing Transfers",
    price: 195,
    pickupTime: "2:30 PM - 3:00 PM",
    duration: "06:00 hours",
    inclusions: [
      "Two way Hotel to hotel drop back",
      "Exploration of dunes in a 4x4 vehicle (25-30 minutes)",
      "Sunset views with photographic opportunity",
      "1 short Camel ride",
      "Henna tattooing",
      "Entertainment shows: Belly dance, Soft music (DJ), Sufi dance, Khaliji show, Dabka + Drummers show, Fire show",
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
    name: "Premium Desert Safari with Shisha on Table - Sharing Transfers",
    price: 245,
    pickupTime: "3:00 PM - 3:30 PM",
    duration: "06:00 hours",
    highlighted: true,
    inclusions: [
      "Two way Hotel to hotel drop back",
      "Exploration of dunes in a 4x4 vehicle (25-30 minutes)",
      "Sunset views with photographic opportunity",
      "1 short Camel ride",
      "Henna tattooing",
      "Shisha smoking at the table",
      "Entertainment shows: Belly dance, Soft music (DJ), Sufi dance, Khaliji show, Dabka + Drummers show, Fire show",
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
    name: "Premium Desert Safari with 200cc Polaris (Inside the Circle, beside the Camp) - Sharing Transfers",
    price: 265,
    pickupTime: "2:00 PM - 2:30 PM",
    duration: "06:00 hours",
    inclusions: [
      "Two way Hotel to hotel drop back",
      "Exploration of dunes in a 4x4 vehicle (25-30 minutes)",
      "Sunset views with photographic opportunity",
      "Camel ride",
      "Henna tattooing",
      "Live Cooking stations and relaxed sitting area",
      "Traditional BBQ dinner with vegetarian and non-vegetarian cuisines (At reserved area)",
      "Shisha smoking facility at the shisha corner",
      "Entertainment shows",
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
    name: "Premium Desert Safari with VIP Majlis - Sharing Transfers",
    price: 295,
    pickupTime: "2:30 PM - 3:00 PM",
    duration: "06:00 hours",
    inclusions: [
      "Two way Hotel to hotel drop back",
      "VIP Majlis",
      "Exploration of dunes in a 4x4 vehicle",
      "Sunset views with photographic opportunity",
      "1 short Camel ride",
      "Henna tattooing",
      "Shisha smoking facility at the shisha corner",
      "Unlimited refreshments",
      "Entertainment shows: Belly dance, Soft music (DJ), Sufi dance, Khaliji show, Dabka + Drummers show, Fire show",
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
}

const PackageSelector = ({ onSelectPackage }: PackageSelectorProps) => {
  return (
    <section id="packages" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-desert">Choose Your Adventure</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our premium desert safari packages and experience the magic of Dubai's golden dunes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative overflow-hidden transition-all hover:shadow-warm ${
                pkg.highlighted ? 'border-primary border-2 shadow-warm' : ''
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 right-0 bg-gradient-desert text-white px-4 py-1 text-sm font-semibold">
                  Most Popular
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
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="text-primary flex-shrink-0 mt-0.5" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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

        {/* Cancellation Policy */}
        <div className="mt-12 p-6 bg-card border border-border rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-primary">Cancellation Policy</h3>
          <ul className="space-y-2 text-sm md:text-base">
            <li className="flex items-start gap-2">
              <Check className="text-primary flex-shrink-0 mt-1" size={18} />
              <span>For all cancellations made 24 hours prior to the tour departure time, NO charges will be applicable.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary flex-shrink-0 mt-1" size={18} />
              <span>If cancellation is made within 24 hours of your tour departure time, 100% charges will be applicable.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary flex-shrink-0 mt-1" size={18} />
              <span>If eligible for a refund, your amount will be returned back to you within 7 working days.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PackageSelector;