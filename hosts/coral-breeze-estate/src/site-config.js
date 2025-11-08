/**
 * SITE CONFIGURATION
 * Edit this file to customize the property website
 */

import { CalendarDays, MapPin, Star, Wifi, Car, Droplets, Umbrella, Sun, Coffee, UtensilsCrossed, Trees, Trophy, Anchor, Cloud } from "lucide-react";

export const SITE_CONFIG = {
  // Branding
  brand: {
    name: "Coral Breeze Estate",           
    tagline: "Mid-century modern meets tropical paradise",     
    logoText: "CBE",                       
  },

  // Location
  location: {
    city: "Key Largo",
    region: "Florida",
    country: "USA",
    // Optional: Add Google Maps embed URL
    // Get from: https://www.google.com/maps → Share → Embed a map
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.6833325006123!2d-80.45237798752703!3d25.08602605279671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d0e20e211357c5%3A0x9aecd9473ba8681!2sKey%20Largo!5e0!3m2!1sen!2sus!4v1761956569244!5m2!1sen!2sus",
  },

  // Hero Section (main banner)
  hero: {
    image: "/photos/hero.jpg",            // Main cover photo (put in public/photos/)
    // Alternative: "/photos/home-hero.jpg"
  },

  // Photo Gallery
  // Add your photos to public/photos/ folder, then list them here
  photos: [
    "/photos/gallery-1.jpg",
    "/photos/gallery-2.jpg",
    "/photos/gallery-3.jpg",
    "/photos/gallery-4.jpg",
    "/photos/gallery-5.jpg",
    "/photos/gallery-6.jpg",
    "/photos/gallery-7.jpg",
    "/photos/gallery-8.jpg",
    "/photos/gallery-9.jpg",
    "/photos/gallery-10.jpg",
    "/photos/gallery-11.jpg",
    "/photos/gallery-12.jpg",
    "/photos/gallery-13.jpg",
    "/photos/gallery-14.jpg",
    // Add more as needed
  ],

  // Highlights (shown below hero)
  highlights: [
    { icon: Umbrella, label: "Steps from private beach access" },
    { icon: Trees, label: "Stunning ocean views from every room" },
    { icon: Star, label: "4.9 average guest rating" },
    { icon: Droplets, label: "Private outdoor shower & deck" },
    { icon: Sun, label: "Year-round tropical paradise" },
    { icon: CalendarDays, label: "Sleeps 8 comfortably" },
  ],

  // Amenities
  amenities: [
    { icon: Droplets, label: "Private beach access" },
    { icon: Umbrella, label: "Beach chairs & umbrellas" },
    { icon: Cloud, label: "Oceanfront balcony" },
    { icon: Coffee, label: "Fully equipped kitchen" },
    { icon: Wifi, label: "High-speed Wi-Fi" },
    { icon: Car, label: "Free parking (2 spaces)" },
    { icon: Anchor, label: "Kayak & paddleboard storage" },
    { icon: Trophy, label: "Fishing equipment available" },
    { icon: UtensilsCrossed, label: "Outdoor dining area" },
    { icon: Sun, label: "Sunset viewing deck" },
  ],

  // Property Description
  description: "Escape to a meticulously restored 1960s beach house where mid-century modern design meets laid-back island living. Wake up to turquoise waters, relax in your private hammock, and watch world-class sunsets from your oceanfront balcony. This architectural gem combines vintage charm with modern comforts in the heart of the Florida Keys.",

  // Check-in Details & Location Info
  checkin: {
    details: [
      "Self check-in with smart lock",
      "200 feet to private beach access",
      "5-minute drive to John Pennekamp Coral Reef State Park",
      "10 minutes to world-class fishing & diving",
      "Walking distance to local restaurants & bars",
      "Quiet hours 10pm–7am (respectful beach community)",
      "No smoking, no parties",
    ],
  },

  // Guest Reviews (optional - you can add real reviews)
  reviews: [
    {
      name: "Sarah & Mark",
      text: "This place is absolutely magical! The mid-century design is stunning and the ocean views are even better than the photos. We spent every morning on the balcony with coffee watching the sunrise. The beach access is incredibly convenient. Already planning our return!",
      rating: 5,
      date: "March 2024"
    },
    {
      name: "Jennifer",
      text: "Perfection! The house has so much character and the location can't be beat. We loved having our own beach setup and the outdoor shower after swimming was a game-changer. The kitchen had everything we needed. Five stars!",
      rating: 5,
      date: "February 2024"
    },
    {
      name: "Robert & Family",
      text: "Our best family vacation yet! The kids loved the beach access and the house comfortably fit all 8 of us. The decor is Instagram-worthy and the sunsets from the deck are unreal. Host was super responsive too.",
      rating: 5,
      date: "January 2024"
    },
    {
      name: "Amanda",
      text: "This mid-century gem is a dream! The attention to detail in the design is incredible, and the oceanfront location is spectacular. We spent hours kayaking and paddleboarding. Will definitely be back!",
      rating: 5,
      date: "December 2023"
    },
  ],

  // Contact Information
  contact: {
    phone: "+1 (305) 555-OCEAN",
    email: "stay@coralbreezestate.com",
    responseTime: "Usually responds within 1 hour",
  },

  // SEO/Meta
  seo: {
    coverAlt: "Mid-century modern beach house with ocean views in Key Largo, Florida",
  },
};

// Listing Configuration (matches backend)
// IMPORTANT: Make sure listingId matches what you create in server/store.js
export const LISTING_CONFIG = {
  id: "coral-breeze-estate",         // Must match the listing ID in server/store.js
  nightlyPrice: 45000,                // Price in cents (45000 = $450.00) - matches server/store.js
  cleaningFee: 9500,                  // Cleaning fee in cents (9500 = $95.00) - matches server/store.js
};

