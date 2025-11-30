/**
 * SITE CONFIGURATION
 * Edit this file to customize the property website
 */

import { CalendarDays, MapPin, Star, Wifi, Car, Waves, Snowflake, Flame, Phone, Mail, Coffee, Tv, Utensils } from "lucide-react";

export const SITE_CONFIG = {
  // Branding
  brand: {
    name: "Your Property Name",           // e.g., "Mountain View Cabin"
    tagline: "Your property tagline",      // e.g., "Modern cabin minutes from the lake"
    logoText: "YPN",                       // Short initials for logo (2-3 letters)
  },

  // Location
  location: {
    city: "City Name",
    region: "State/Province",              // e.g., "Oregon" or "British Columbia"
    country: "USA",
    // Optional: Add Google Maps embed URL
    // Get from: https://www.google.com/maps → Share → Embed a map
    mapEmbed: "https://www.google.com/maps?q=Your+Location&hl=en&z=12&output=embed",
  },

  // Hero Section (main banner)
  hero: {
    image: "/photos/hero.jpg",            // Main cover photo (put in public/photos/)
  },

  // Photo Gallery
  // Add your photos to public/photos/ folder, then list them here
  photos: [
    "/photos/gallery-1.jpg",
    "/photos/gallery-2.jpg",
    "/photos/gallery-3.jpg",
    "/photos/gallery-4.jpg",
    "/photos/gallery-5.jpg",
    // Add more as needed
  ],

  // Highlights (shown below hero)
  highlights: [
    { icon: CalendarDays, label: "Sleeps X" },        // Update number
    { icon: MapPin, label: "X min to downtown" },     // Update distance
    { icon: Star, label: "X.X host rating" },         // Update rating
  ],

  // Amenities
  amenities: [
    { icon: Wifi, label: "Fast Wi-Fi" },
    { icon: Car, label: "Free parking" },
    { icon: Waves, label: "Hot tub" },
    { icon: Snowflake, label: "A/C" },
    { icon: Flame, label: "Fireplace" },
    { icon: Coffee, label: "Coffee Maker" },
    { icon: Tv, label: "Smart TV" },
    { icon: Utensils, label: "Full Kitchen" },
    // Add/remove amenities as needed
  ],

  // Property Description
  description: "Write a compelling description of your property here. Mention what makes it special, nearby attractions, and what guests will love about staying here. This text will appear in the main 'About' section of the website.",

  // Check-in Details
  checkin: {
    details: [
      "Self check-in with smart lock",
      "Quiet hours 10pm–7am",
      "No smoking, no parties",
      // Add your house rules here
    ],
  },

  // Guest Reviews (optional - you can add real reviews)
  reviews: [
    {
      name: "Guest Name",
      text: "Amazing stay! The property was perfect and exactly as described.",
      rating: 5,
    },
    {
      name: "Guest Name 2",
      text: "Great location and very clean. Would definitely stay again!",
      rating: 5,
    },
    // Add more reviews
  ],

  // Contact Information
  contact: {
    phone: "+1 (555) 123-4567",
    email: "host@yourproperty.com",
  },

  // Booking Configuration (Hostex)
  booking: {
    // Replace this with your Hostex Booking Widget URL
    // Go to Hostex -> Channels -> Direct Booking -> Copy Link
    hostexUrl: "https://hostex.io/booking/your-property-id",
  },

  // SEO/Meta
  seo: {
    coverAlt: "Your property description for accessibility",
  },
};
