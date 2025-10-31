// Utility to map inclusion text to an image path.
// Drop HD images into this folder and set explicit mappings below.

// Existing gallery assets that can serve as defaults
import camelRide from "@/assets/camel-ride.jpeg";
import fireShow from "@/assets/fire-show.jpeg";
import tanouraDance from "@/assets/tanoura-dance.jpeg";
import desertView from "@/assets/desert-view.jpeg";
import coupleSunset from "@/assets/couple-sunset.jpeg";
import buffetCounter from "@/assets/buffet-counter.jpeg";
import buffetGirls from "@/assets/buffet-girls.jpeg";
import desertCampNight from "@/assets/desert-camp-night.jpeg";
import desertCamp from "@/assets/desert-camp.jpeg";
import desertCampView from "@/assets/desert-camp-view.jpeg";
import guestsSafari from "@/assets/guests-safari.jpeg";
import quadBikeGirl from "@/assets/quad-bike-girl.jpeg";
import quadBikeGirl2 from "@/assets/quad-bike-girl-2.jpeg";
import arabicCouple from "@/assets/arabic-couple.jpeg";

// Fallback when no image is available
const placeholder = "/placeholder.svg";

// Explicit mapping for each inclusion line (exact text)
// Value can be a local import (preferred) or a remote URL string.
export const INCLUSION_IMAGES: Record<string, string> = {
  // Premium Desert Safari - Sharing Transfers
  "Two way Hotel to hotel drop back": guestsSafari,
  "Two-way hotel-to-hotel drop-back (sharing transfer)": guestsSafari,
  "Exploration of dunes in a 4x4 vehicle (25-30 minutes)": desertView,
  "Sunset views with photographic opportunity": coupleSunset,
  "1 short Camel ride": camelRide,
  "Henna tattooing": arabicCouple,
  "Belly dance": tanouraDance,
  "Soft music (DJ)": desertCampNight,
  "Sufi dance": tanouraDance,
  "Khaliji show": tanouraDance,
  "Dabka + Drummers show": tanouraDance,
  "Fire show": fireShow,
  "Live Cooking stations and relaxed sitting area": buffetGirls,
  "Traditional BBQ dinner with vegetarian and non-vegetarian cuisines (At reserved area)": buffetCounter,

  // Premium Desert Safari with Shisha on Table - Sharing Transfers
  "Shisha smoking at the table": desertCampNight,
  "Sufi dance show": tanouraDance,

  // Premium Desert Safari with 200cc Polaris
  "Camel ride": camelRide,
  "Shisha smoking facility at the shisha corner": desertCampNight,
  "Unlimited refreshments": desertCamp,
  "20 min ride for Polaris 200cc - inside the circle": quadBikeGirl2,

  // Premium Desert Safari with VIP Majlis
  "VIP Majlis": desertCampView,
  "Exploration of dunes in a 4x4 vehicle": desertView,
  "Sufi dance show": tanouraDance,
};

function keywordFallback(inclusion: string): string {
  const text = inclusion.toLowerCase();
  if (text.includes("camel")) return camelRide;
  if (text.includes("fire")) return fireShow;
  if (text.includes("tanoura")) return tanouraDance;
  if (text.includes("belly dance")) return tanouraDance;
  if (text.includes("sunset")) return coupleSunset;
  if (text.includes("photograph")) return coupleSunset;
  if (text.includes("dune") || text.includes("4x4") || text.includes("exploration")) return desertView;
  if (text.includes("bbq") || text.includes("dinner")) return buffetCounter;
  if (text.includes("live cooking")) return buffetGirls;
  if (text.includes("majlis")) return desertCampView;
  if (text.includes("refreshments")) return desertCamp;
  if (text.includes("dj") || text.includes("music")) return desertCampNight;
  if (text.includes("shisha")) return desertCampNight;
  if (text.includes("sufi")) return tanouraDance;
  if (text.includes("khaliji")) return tanouraDance;
  if (text.includes("dabka") || text.includes("drummer")) return tanouraDance;
  if (text.includes("polaris") || text.includes("quad")) return quadBikeGirl2 || quadBikeGirl;
  if (text.includes("hotel")) return guestsSafari;
  if (text.includes("henna")) return arabicCouple;
  return placeholder;
}

export function getInclusionImage(inclusion: string | null): string {
  if (!inclusion) return placeholder;
  // Try explicit mapping first
  const mapped = INCLUSION_IMAGES[inclusion];
  if (mapped) return mapped;
  // Fallback to keyword-based inference
  return keywordFallback(inclusion);
}

// Note:
// To customize:
// 1) Add HD images to `src/assets/inclusions/` (commit to GitHub).
// 2) Update `INCLUSION_IMAGES` with the exact inclusion text and image import.
//    You can also paste a remote URL string instead of an import.