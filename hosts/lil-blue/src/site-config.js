/**
 * SITE CONFIGURATION
 * Tide Ridge Getaways
 */

import { CalendarDays, MapPin, Star, Wifi, Car, Waves, Snowflake, Flame, Phone, Mail, Coffee, Tv, Utensils, ArrowRight } from "lucide-react";

export const SITE_CONFIG = {
  // Main Brand (Tide Ridge Getaways)
  brand: {
    name: "Tide Ridge Getaways",
    tagline: "Your Premier Vacation Rental Experience",
    logoText: "TRG",
    description: "Experience the ultimate getaway with Tide Ridge. We offer a curated selection of premier vacation rentals designed for comfort, relaxation, and unforgettable memories.",
    heroImage: "/photos/landing-hero.jpg", // Using Lil Blue's hero for now, or a generic one
  },

  // Global Contact Info
  contact: {
    phone: "+1 (555) 123-4567",
    email: "reservations@tideridgegetaways.com",
  },

  // Properties List
  properties: [
    {
      id: "lil-blue",
      name: "Lil' Blue",
      slug: "lil-blue", // URL path: /properties/lil-blue
      tagline: "Waterfront Serenity in Crystal River",
      description: "Welcome to Lil' Blue, a single level, newly remodeled 3BR/2BA waterfront home with new appliances & thoughtful decor. Enjoy direct water access, a private dock, and a peaceful atmosphere perfect for families and nature lovers.",
      location: {
        city: "Crystal River",
        region: "Florida",
        country: "USA",
        mapEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d55807.99454496727!2d-82.67928117610934!3d28.881127061444158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1764521994414!5m2!1sen!2sus",
      },
      heroImage: "/photos/hero.jpg",
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
        "/photos/gallery-15.jpg",
        "/photos/gallery-16.jpg",
        "/photos/gallery-17.jpg",
        "/photos/gallery-18.jpg",
        "/photos/gallery-19.jpg",
        "/photos/gallery-20.jpg",
        "/photos/gallery-21.jpg",
        "/photos/gallery-22.jpg",
        "/photos/gallery-23.jpg",
        "/photos/gallery-24.jpg",
        "/photos/gallery-25.jpg",
        "/photos/gallery-26.jpg",
        "/photos/gallery-27.jpg",
        "/photos/gallery-28.jpg",
        "/photos/gallery-29.jpg",
        "/photos/gallery-30.jpg",
        "/photos/gallery-31.jpg",
        "/photos/gallery-32.jpg",
        "/photos/gallery-33.jpg",
        "/photos/gallery-34.jpg",
        "/photos/gallery-35.jpg",
        "/photos/gallery-36.jpg",
        "/photos/gallery-37.jpg",
        "/photos/gallery-38.jpg",
        "/photos/gallery-39.jpg",
        "/photos/gallery-40.jpg",
        "/photos/gallery-41.jpg",
        "/photos/gallery-42.jpg",
        "/photos/gallery-43.jpg",
        "/photos/gallery-44.jpg",
        "/photos/gallery-45.jpg",
        "/photos/gallery-46.jpg",
        "/photos/gallery-47.jpg",
      ],
      highlights: [
        { icon: CalendarDays, label: "Sleeps 8" },
        { icon: MapPin, label: "Waterfront Access" },
        { icon: Star, label: "5.0 host rating" },
      ],
      amenities: [
        { icon: Wifi, label: "Fast Wi-Fi" },
        { icon: Car, label: "Free parking" },
        { icon: Waves, label: "Hot tub" },
        { icon: Snowflake, label: "A/C" },
        { icon: Flame, label: "Fireplace" },
        { icon: Coffee, label: "Coffee Maker" },
        { icon: Tv, label: "Smart TV" },
        { icon: Utensils, label: "Full Kitchen" },
      ],
      checkin: {
        details: [
          "Self check-in with smart lock",
          "Quiet hours 10pm–7am",
          "No smoking, no parties",
        ],
      },
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
      ],
      booking: {
        hostexUrl: "https://hostex.io/booking/your-property-id",
      },
      seo: {
        coverAlt: "Lil' Blue waterfront home in Crystal River",
      },
    },
    // Add more properties here in the future
  ],
};
