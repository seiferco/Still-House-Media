/**
 * SITE CONFIGURATION
 * Edit this file to customize the property website
 */

import { CalendarDays, MapPin, Star, Wifi, Car, Droplets, Sun, Coffee, UtensilsCrossed, Trees, Flame, Mountain, Leaf } from "lucide-react";

export const SITE_CONFIG = {
  // Branding
  brand: {
    name: "Coral Breeze Estate",
    tagline: "Desert-modern retreat tucked into the red rocks of Sedona",
    logoText: "CBE",
  },

  // Location
  location: {
    city: "Sedona",
    region: "Arizona",
    country: "USA",
    // Optional: Add Google Maps embed URL
    // Get from: https://www.google.com/maps → Share → Embed a map
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.156272967268!2d-111.80058668479034!3d34.82219528139919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872da146986e01bd%3A0x1e3ddaa607e58780!2sChapel%20Area%2C%20Sedona%2C%20AZ%2086376!5e0!3m2!1sen!2sus!4v1762700000000!5m2!1sen!2sus",
  },

  // Property Details
  property: {
    type: "Entire guesthouse",
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
  },

  // Host Information
  host: {
    name: "Sarah & Michael",
    avatar: "/photos/host-avatar.jpg", // Optional: add host photo
    joined: "2020",
    responseTime: "Usually responds within 1 hour",
    responseRate: "100%",
    bio: "We're passionate about sharing the beauty of Sedona with travelers. As longtime locals, we love helping guests discover hidden trails, local eateries, and the best sunset spots. When we're not hosting, you'll find us hiking Cathedral Rock or enjoying wine at Page Springs Cellars.",
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
  ],

  // Highlights (shown below hero)
  highlights: [
    { icon: Mountain, label: "Panoramic red-rock vistas from every room" },
    { icon: Trees, label: "Minutes to Cathedral Rock trailheads" },
    { icon: Star, label: "4.9 average guest rating" },
    { icon: Droplets, label: "Private plunge spa + outdoor rainfall shower" },
    { icon: Sun, label: "Golden-hour terraces facing Bell Rock" },
    { icon: CalendarDays, label: "Sleeps 8 comfortably" },
  ],

  // Amenities
  amenities: [
    { icon: Droplets, label: "Desert plunge spa + outdoor shower" },
    { icon: Sun, label: "Two sunset viewing patios" },
    { icon: Coffee, label: "Locally roasted Chemex coffee bar" },
    { icon: Wifi, label: "High-speed Wi-Fi" },
    { icon: Car, label: "Electric vehicle charger + private driveway" },
    { icon: Trees, label: "Trailhead gear closet with daypacks + trekking poles" },
    { icon: Flame, label: "Indoor-outdoor fireplaces with cedarwood supply" },
    { icon: UtensilsCrossed, label: "Chef’s kitchen + outdoor grill station" },
    { icon: Leaf, label: "Desert meditation terrace with yoga mats" },
  ],

  // Property Description
  description: "Wake up to crimson skies over Sedona’s iconic red rocks at Coral Breeze Estate—a desert-modern haven minutes from the charming Village of Oak Creek. Designed with mid-century lines, hand-carved juniper beams, and floor-to-ceiling glass, the home blends resort comforts with Southwest soul. Brew locally roasted coffee as the sun hits Bell Rock, hike the neighboring Cathedral Rock and Bell Rock loops, or roll down to Tlaquepaque Arts Village for boutique shopping and patio dining. Evenings bring Aperol spritzes on the terracotta terrace, starry-night soaking in the plunge spa, and flickering fireplaces both indoors and out.",

  // Check-in Details & Location Info
  checkin: {
    details: [
      "Self check-in with smart lock + keyless desert gate",
      "5-minute drive to the Village of Oak Creek coffeehouses",
      "8 minutes to Cathedral Rock trailhead and Bell Rock Pathway",
      "12 minutes to Sedona’s Uptown galleries and Tlaquepaque Arts Village",
      "20 minutes to Page Springs Cellars & Verde Valley wine tasting rooms",
      "EV charger in private driveway + space for 3 vehicles",
      "Quiet hours 10pm–7am to honor the dark-sky community",
    ],
  },

  // Guest Reviews (optional - you can add real reviews)
  reviews: [
    {
      name: "Mia & Jordan",
      text: "We celebrated our anniversary here and the views over Bell Rock felt surreal. Sunrise yoga on the terrace followed by cinnamon roll pancakes at Red Rock Café—pure Sedona magic. Loved the curated hiking guides and spa-level bathroom amenities.",
      rating: 5,
      date: "March 2025"
    },
    {
      name: "Jennifer",
      text: "The design is stunning—warm stucco, cedar beams, adobe fireplaces. We hiked Cathedral Rock at sunrise, grabbed matcha from Firecreek Coffee, then spent the afternoon wine tasting in Page Springs. The plunge spa under the Milky Way was unforgettable.",
      rating: 5,
      date: "February 2025"
    },
    {
      name: "Robert & Family",
      text: "Perfect base for our spring break. The kids loved roasting marshmallows by the fire bowl after biking the Bell Rock Pathway. Plenty of room, thoughtful desert-inspired decor, and a fully stocked kitchen for tacos with farmers-market produce.",
      rating: 5,
      date: "January 2025"
    },
    {
      name: "Amanda",
      text: "Remote work never looked so good—fast Wi-Fi, sunrise hikes before logging in, and lunch at Creekside American Bistro. Evenings we soaked in the spa, watched the red rocks glow, and sampled craft cocktails at The Hudson. Already booking our fall trip!",
      rating: 5,
      date: "December 2024"
    },
  ],

  // Contact Information
  contact: {
    phone: "+1 (928) 555-7788",
    email: "hello@coralbreezestate.com",
    responseTime: "Usually responds within 1 hour",
  },

  // Things to Know
  thingsToKnow: {
    houseRules: {
      checkIn: "Check-in after 4:00 PM",
      checkout: "Checkout before 10:00 AM",
      guests: "3 guests maximum",
      pets: "Pets allowed",
      quietHours: "Quiet hours 10:00 PM - 8:00 AM",
      noParties: "No parties or events",
      noCommercial: "No commercial photography",
      noSmoking: "No smoking",
      additionalRules: [
        "The primary renter must be at least 25 years of age, per insurance requirements.",
        "Maximum number of pets allowed is 2. There is a pet fee, and pets must be included on the reservation's guest count at the time of booking so that the system calculates the cost of the reservation correctly. Pets must be crated when left alone. Guests are required to clean up pet waste or will incur an automatic charge of $60.",
        "Please respect the quiet hours to honor our dark-sky community designation.",
        "No unregistered guests. All guests must be included in the reservation.",
      ],
    },
    safety: {
      carbonMonoxide: "Carbon monoxide alarm",
      smokeAlarm: "Smoke alarm",
      noise: "Potential for noise",
      security: "Security camera on property",
      neighborhood: "Located in a residential neighborhood",
    },
    cancellation: {
      policy: "Free cancellation for 24 hours.",
      details: "Review this host's full policy for details.",
      fullPolicy: "Free cancellation within 24 hours of booking. After that, cancel before check-in for a 50% refund (minus service fees). No refund for cancellations made less than 7 days before check-in.",
    },
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

