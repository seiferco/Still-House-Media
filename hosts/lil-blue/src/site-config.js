/**
 * SITE CONFIGURATION
 * Tide Ridge Getaways
 */

import {
  CalendarDays, MapPin, Star, Wifi, Car, Waves, Snowflake, Flame, Phone, Mail, Coffee, Tv, Utensils,
  ArrowRight, Bath, Wind, Sparkles, Droplets, Shirt, Bed, Moon, Sun, Anchor, Trees,
  Gamepad2, Dumbbell, Book, Baby, Dice5, Fan, Video, ShieldAlert, FireExtinguisher, BriefcaseMedical,
  Briefcase, Refrigerator, Microwave, ChefHat, Wine, Joystick, UtensilsCrossed, Monitor,
  Thermometer, Accessibility, PawPrint, Clock, Key, Lock, Home
} from "lucide-react";

const lil_blue_description = `✨ Welcome to Lil’ Blue, a single level, newly remodeled 3BR/2BA waterfront home with new appliances & thoughtful decor
🛏️ Sleeps 8
🎱 Game room w/ pool table, arcade 👾 & darts 🎯
🛶 Dock w/ tie-up, 3 kayaks, fish station & green fishing light 🎣
♿ Ground-level, wheelchair-friendly
❄️ Mini-split AC in every room
🐾 Pet friendly
🐬 See manatees, dolphins & eagles 🦅 from the dock
🥾 Hike nearby trails
🌿 Ideal for families, anglers & nature lovers
💛 We want your stay at Lil’ Blue to be amazing!

The space
🏡 Welcome to your waterfront escape in beautiful Crystal River, Florida. Lil’ Blue is a fully remodeled (2025) 3-bedroom, 2-bath home that sleeps up to 8 guests (6 adult max).
Home features a large game room with pool table, 4 player arcade machine, and dartboard for hours of family enjoyment!

🎣 Fish from the backyard dock, launch kayaks right from one of two docks, or tie up your own boat for effortless inshore adventures. A 10 minute boat ride to the open water of the Gulf.
Dolphin, manatee, snook, flounder, and blue crabs are regular visitors!

Multiple public boat ramps are just minutes away. The closest being Fort Island Trail Boat Ramp.

Area is best suited for boats with 24” of draft or less. Florida Marine Tracks is always recommended for the Nature Coast. A Google Map route and GPX file is provided to the main channel. This track is for reference purposes only.

🛏️ The home features:

- King bed in the primary bedroom
- Queen bed in the guest room
- Twin bunk bed with twin trundle
- Rollaway twin bed

❄️ Each room has its own mini-split AC unit, so everyone can set their preferred temperature.

🛋️ The home is stocked with upscale furnishings, thoughtful décor, and all the comforts of home:

- Fully equipped kitchen with quality cookware and sharp knives
- Coffee grinder, drip machine, and Keurig included
- Washer and dryer
- Fast Wi-Fi and Roku TVs in every room (guests log into their own streaming accounts)
- Arcade games, pool table, dart board, board games, cards and outdoor cornhole
- Fenced backyard, rocking chairs, and an outdoor fan on the patio
- Weber grill for outdoor cooking
- Keyless entry for easy check-in
- Two exterior Ring cameras (front and back—covering the driveway and dock for your peace of mind)

🚗 You’re less than 5 minutes from downtown Crystal River and the grocery store.

🥾 Enjoy state park access, hiking trails, and frequent sightings of bald eagles, wild turkeys, and deer right in the neighborhood.

🛑 No parties or events permitted — perfect for families, couples, and peaceful getaways.

Guest access
Guests have exclusive access to the entire home, including the backyard dock, game room, and all indoor amenities. The property is designed for ease of use, featuring keyless entry and a fenced backyard for added safety.

Other things to note
With a convenient location just minutes from downtown Crystal River, this home is ideal for families, nature lovers, and anglers. Explore nearby hiking trails and state parks while enjoying the frequent sightings of wildlife.`;


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
      description: lil_blue_description,
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
      ],
      highlights: [
        { icon: CalendarDays, label: "Sleeps 8" },
        { icon: MapPin, label: "Waterfront Access" },
        { icon: Star, label: "5.0 host rating" },
      ],
      amenities: [
        {
          category: "Bathroom",
          items: [
            { icon: Bath, label: "Bathtub" },
            { icon: Wind, label: "Hair dryer" },
            { icon: Sparkles, label: "Cleaning products" },
            { icon: Droplets, label: "Shampoo" },
            { icon: Droplets, label: "Conditioner" },
            { icon: Droplets, label: "Body soap" },
            { icon: Thermometer, label: "Hot water" },
          ]
        },
        {
          category: "Bedroom and Laundry",
          items: [
            { icon: Shirt, label: "Washer" },
            { icon: Shirt, label: "Free dryer – In unit" },
            { icon: Sparkles, label: "Essentials" },
            { icon: Shirt, label: "Hangers" },
            { icon: Bed, label: "Bed linens" },
            { icon: Moon, label: "Extra pillows and blankets" },
            { icon: Moon, label: "Room-darkening shades" },
            { icon: Shirt, label: "Iron" },
            { icon: Shirt, label: "Drying rack for clothing" },
            { icon: Briefcase, label: "Clothing storage" },
          ]
        },
        {
          category: "Entertainment",
          items: [
            { icon: Tv, label: "TV" },
            { icon: Gamepad2, label: "Game console" },
            { icon: Dumbbell, label: "Exercise equipment" },
            { icon: Dice5, label: "Pool table" },
            { icon: Joystick, label: "Arcade games" },
            { icon: Book, label: "Books and reading material" },
          ]
        },
        {
          category: "Family",
          items: [
            { icon: Baby, label: "Crib" },
            { icon: Baby, label: "Pack ’n play/Travel crib" },
            { icon: Baby, label: "Children’s books and toys" },
            { icon: Dice5, label: "Board games" },
          ]
        },
        {
          category: "Heating and Cooling",
          items: [
            { icon: Snowflake, label: "Air conditioning" },
            { icon: Fan, label: "Ceiling fan" },
            { icon: Flame, label: "Heating" },
          ]
        },
        {
          category: "Home Safety",
          items: [
            { icon: Video, label: "Exterior security cameras" },
            { icon: ShieldAlert, label: "Smoke alarm" },
            { icon: ShieldAlert, label: "Carbon monoxide alarm" },
            { icon: FireExtinguisher, label: "Fire extinguisher" },
            { icon: BriefcaseMedical, label: "First aid kit" },
          ]
        },
        {
          category: "Internet and Office",
          items: [
            { icon: Wifi, label: "Wifi" },
            { icon: Briefcase, label: "Dedicated workspace" },
          ]
        },
        {
          category: "Kitchen and Dining",
          items: [
            { icon: ChefHat, label: "Kitchen" },
            { icon: Refrigerator, label: "Refrigerator" },
            { icon: Microwave, label: "Microwave" },
            { icon: Utensils, label: "Cooking basics" },
            { icon: UtensilsCrossed, label: "Dishes and silverware" },
            { icon: Refrigerator, label: "Freezer" },
            { icon: Utensils, label: "Dishwasher" },
            { icon: Flame, label: "Stove" },
            { icon: Flame, label: "Oven" },
            { icon: Coffee, label: "Coffee maker" },
            { icon: Wine, label: "Wine glasses" },
            { icon: Flame, label: "Toaster" },
            { icon: ChefHat, label: "Baking sheet" },
            { icon: Utensils, label: "Blender" },
            { icon: Utensils, label: "Barbecue utensils" },
            { icon: Monitor, label: "Dining table" },
            { icon: Coffee, label: "Coffee" },
          ]
        },
        {
          category: "Location Features",
          items: [
            { icon: Anchor, label: "Waterfront" },
            { icon: Shirt, label: "Laundromat nearby" },
          ]
        },
        {
          category: "Outdoor",
          items: [
            { icon: Sun, label: "Patio or balcony" },
            { icon: Trees, label: "Backyard" },
            { icon: Sun, label: "Outdoor furniture" },
            { icon: Flame, label: "BBQ grill" },
            { icon: Anchor, label: "Kayak" },
            { icon: Anchor, label: "Boat slip" },
          ]
        },
        {
          category: "Parking and Facilities",
          items: [
            { icon: Car, label: "Free parking on premises" },
            { icon: Home, label: "Single level home" },
          ]
        },
        {
          category: "Services",
          items: [
            { icon: PawPrint, label: "Pets allowed" },
            { icon: CalendarDays, label: "Long term stays allowed" },
            { icon: Key, label: "Self check-in" },
            { icon: Lock, label: "Smart lock" },
            { icon: Sparkles, label: "Housekeeping available" },
          ]
        },
      ],
      checkin: {
        details: [
          "Self check-in with smart lock",
          "Quiet hours 10pm–7am",
          "No smoking, no parties",
        ],
      },
      policies: {
        cancellation: {
          title: "Cancellation policy",
          description: "Full refund if cancelled within 24 hours after booking. No refund if cancelled after that.",
          details: "Full refund if cancel within 24 hours after booking. Get back 100% of what you paid. No refund if cancel after that. This reservation is non-refundable."
        },
        houseRules: [
          "Check-in after 4:00 PM",
          "Checkout before 11:00 AM",
          "Self check-in with smart lock",
          "8 guests maximum",
          "Pets allowed (dogs only, under 30lbs)",
          "Quiet hours 10:00 PM - 7:00 AM",
          "No parties or events",
          "No commercial photography",
          "No smoking"
        ],
        houseRulesDetails: `🏠 General House Rules
• No smoking inside the home. Smoking is allowed outside only; please dispose of cigarette butts responsibly.
• Dogs only, under 30 lbs, with prior approval. Must be house-trained and not left unattended inside or outside. No aggressive breeds. All pets should be leashed while outside of the fenced area.
• Clean up all pet waste. Pet fee applies. Unauthorized or non disclosed pets will incur a $150/ night charge.
• No parties or events without prior approval.
• Only registered guests are allowed on the property.
• Quiet hours: 10:00 PM – 7:00 AM.

🎯 Game Room Rules
• Use all equipment responsibly.
• Do not lean or sit on the pool table.
• No food or drinks on the pool table or arcade machines.
• Darts must be used only with the provided dartboard. Please supervise children at all times in the game room.
• Turn off all electronics when done using them.

🛶 Kayak Use Rules
• Use of kayaks is at your own risk.
• Life jackets must be worn at all times while on the water. We provide them in various sizes.
• Kayaks must be returned to their storage area after use.
• Do not use kayaks at night or in poor weather conditions.
• Please rinse off sand and saltwater before returning the gear.

🛥️ Dock & Floating Dock Rules
• Swim at your own risk.
• Children must be supervised at all times near the water.
• No diving from the dock or floating dock.
• Fishing is allowed — please clean up and dispose of all bait, hooks, and lines properly.
• Boat tie off on floating dock is preferred. Clears are available on non floating dock for larger boats.
• Do not attempt to use or modify boat lift without prior approval.
• Be cautious, docks may be slippery when wet.

🧼 Before Checkout
• Please start a load of towels in the washer.
• Put used dishes in the dishwasher and start it.
• Please take garbage out and place in outdoor waste bin.
• Return furniture and game room items to original positions.`,
        safety: [
          "Nearby lake, river, other body of water",
          "Exterior security cameras on property",
          "Carbon monoxide alarm",
          "Smoke alarm"
        ],
        safetyDetails: "Exterior security cameras on property: For guest safety, this home has outdoor cameras at each entry. A Ring doorbell at the front door. A final camera is located on the dock facing down the canal. This camera provides us with beautiful sunset views. No cameras inside or in private areas."
      },
      // Static reviews as fallback (used if API fails)
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
        hostexWidget: {
          listingId: "114722",
          widgetId: "eyJob3N0X2lkIjoiMTAzNjM5Iiwid2lkZ2V0X2hvc3QiOiJodHRwczovL3cuaG9zdGV4Ym9va2luZy5zaXRlIn0=",
          scriptUrl: "https://hostex.io/app/assets/js/hostex-widget.js?version=20251201120438",
        },
        hostexPropertyId: "12346606", // For fetching reviews via API
      },
      seo: {
        coverAlt: "Lil' Blue waterfront home in Crystal River",
      },
    },
    // Add more properties here in the future
  ],
};
