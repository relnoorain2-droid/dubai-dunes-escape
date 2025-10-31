export interface SafariPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  pickupTime: string;
  duration: string;
  inclusions: string[];
  exclusions: string[];
  isPopular?: boolean;
}

export const PACKAGES: SafariPackage[] = [
  {
    id: "premium",
    name: "Premium Desert Safari",
    description: "Experience the ultimate desert adventure with premium amenities",
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
    description: "Premium desert experience enhanced with traditional shisha service",
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
    name: "Premium Desert Safari with 200cc Polaris",
    description: "The ultimate adventure with thrilling Polaris ride experience",
    price: 265,
    pickupTime: "2:00 PM - 2:30 PM",
    duration: "06:00 hours",
    isPopular: true,
    inclusions: [
      "Two-way hotel-to-hotel drop-back (sharing transfer)",
      "Exploration of dunes in a 4x4 vehicle (25-30 minutes)",
      "Sunset views with photographic opportunity",
      "Camel ride",
      "Henna tattooing",
      "Shisha smoking facility at the shisha corner",
      "Belly dance",
      "Soft music (DJ)",
      "Sufi dance",
      "Khaliji show",
      "Dabka + Drummers show",
      "Fire show",
      "Unlimited refreshments",
      "Live Cooking stations and relaxed sitting area",
      "Traditional BBQ dinner with vegetarian and non-vegetarian cuisines (At reserved area)",
      "20 min ride for Polaris 200cc - inside the circle"
    ],
    exclusions: [
      "Alcohol",
      "All activities not included in this desert safari, such as quad biking and sand boarding"
    ]
  },
  {
    id: "premium_vip",
    name: "Premium Desert Safari with VIP Majlis",
    description: "Premium desert experience with VIP Majlis seating",
    price: 295,
    pickupTime: "2:00 PM - 2:30 PM",
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
      "Alcohol",
      "All activities not included in this desert safari, such as quad biking and sand boarding"
    ]
  }
];