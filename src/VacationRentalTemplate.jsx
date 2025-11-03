import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Star, Wifi, Car, Droplets, Flame, Phone, Mail, ExternalLink, Moon, Sun, X, ChevronLeft, ChevronRight, Trees, Coffee, UtensilsCrossed, Waves } from "lucide-react";
import BookingWidget from "./components/BookingWidget.jsx";

/**
 * Vacation Rental Template Site — Minimal Gray Theme (Light/Dark)
 * - Neutral grays, soft borders, subtle shadows
 * - Theme toggle persists to localStorage
 */

const SITE = {
  brand: {
    name: "Cedar Ridge Retreat",
    tagline: "Luxury mountain escape in the heart of Central Oregon",
    logoText: "CRR",
    primary: "#8B6914", // Warm amber/bronze
    accent: "#2D5016", // Forest green
    secondary: "#C97D10", // Golden accent
    tertiary: "#7C3A00", // Deep brown
  },
  location: {
    city: "Bend",
    region: "Oregon",
    country: "USA",
    coordinates: { lat: 44.0582, lng: -121.3153 },
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.3146905359163!2d-121.38841398710235!3d44.01489112884049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54b8b841f33bbea1%3A0xa52ca9acff37e699!2sRimrock%20Trailhead%2C%20Bend%2C%20OR%2097702!5e0!3m2!1sen!2sus!4v1762145847541!5m2!1sen!2sus",
  },
  hero: {
    image: "/photos/cabin1.jpg",
    ctaPrimary: { label: "Check Availability", href: "#book" },
    ctaSecondary: { label: "Contact Host", href: "#contact" },
  },
  photos: [
    "/photos/cabin1.jpg",
    "/photos/cabin2.jpg",
    "/photos/cabin3.jpg",
    "/photos/cabin4.jpg",
    "/photos/cabin5.jpg",
    "/photos/cabin6.jpg",
    "/photos/cabin7.jpg",
    "/photos/cabin8.jpg",
    "/photos/cabin9.jpg",
    "/photos/cabin10.jpg",
    "/photos/cabin11.jpg",
    "/photos/cabin12.jpg",
    "/photos/cabin13.jpg",
    "/photos/cabin14.jpg",
    "/photos/cabin15.jpg",
    "/photos/cabin16.jpg",
  ],
  highlights: [
    { icon: Trees, label: "Private 2-acre forest setting" },
    { icon: Sun, label: "Stunning Cascade Mountain views" },
    { icon: Star, label: "4.9 average guest rating" },
    { icon: Droplets, label: "Luxury hot tub under the stars" },
    { icon: Moon, label: "Stargazing deck with telescope" },
    { icon: CalendarDays, label: "Sleeps 8 comfortably" },
  ],
  amenities: [
    { icon: Droplets, label: "Private hot tub (year-round)" },
    { icon: Flame, label: "Stone fireplace & fire pit" },
    { icon: Sun, label: "Mountain views from every room" },
    { icon: Coffee, label: "Fully equipped gourmet kitchen" },
    { icon: Wifi, label: "High-speed Wi-Fi (500 Mbps)" },
    { icon: Car, label: "Free parking (3 spaces)" },
    { icon: Trees, label: "Private hiking trails on property" },
    { icon: UtensilsCrossed, label: "Outdoor dining & BBQ area" },
    { icon: Moon, label: "Stargazing deck & telescope" },
    { icon: Waves, label: "Steam shower & sauna" },
  ],
  description:
    "Experience the perfect blend of rustic elegance and modern luxury at Cedar Ridge Retreat. Nestled on two private acres of old-growth Ponderosa pines, this meticulously designed cabin offers panoramic Cascade Mountain views, a year-round hot tub under the stars, and world-class stargazing. Wake to the sound of birdsong, spend days exploring nearby Deschutes River trails or skiing at Mt. Bachelor, then unwind by the stone fireplace or soak in your private hot tub. Just minutes from Bend's renowned breweries and restaurants, yet feels a world away in its secluded forest setting.",
  checkin: {
    details: [
      "Self check-in with smart lock",
      "8 minutes to downtown Bend",
      "15-minute drive to Mt. Bachelor Ski Resort",
      "5 minutes to Deschutes River trail access",
      "Walking distance to local breweries & restaurants",
      "Private hiking trails on 2-acre property",
      "Quiet hours 10pm–7am (respectful mountain community)",
      "No smoking, no parties",
    ],
  },
  reviews: [
    {
      name: "Michael & Lisa",
      text: "Absolutely stunning property! The cabin exceeded all expectations—the attention to detail is incredible, from the luxury linens to the gourmet kitchen. The hot tub under the stars was pure magic, and waking up to mountain views every morning was unforgettable. The location is perfect—secluded enough to feel private, but close enough to enjoy all Bend has to offer. Already planning our return trip!",
      rating: 5,
      date: "March 2024",
    },
    {
      name: "Rachel",
      text: "This is hands down the best Airbnb I've ever stayed at. The cabin is beautifully designed with high-end finishes throughout. The hot tub and stargazing deck were highlights, and the kitchen had everything we needed for cooking amazing meals. The host was incredibly responsive and left great local recommendations. The property feels completely private and peaceful. Five stars isn't enough!",
      rating: 5,
      date: "February 2024",
    },
    {
      name: "David & Family",
      text: "Perfect family getaway! The cabin comfortably fit all 8 of us, and the kids loved exploring the property and using the hot tub. The location was ideal—we spent mornings skiing at Mt. Bachelor and afternoons relaxing by the fire. The mountain views are spectacular, and the kitchen is incredibly well-stocked. The host thought of everything. Can't wait to come back!",
      rating: 5,
      date: "January 2024",
    },
    {
      name: "Jessica",
      text: "A truly luxurious mountain escape! The cabin's design is impeccable, blending modern amenities with rustic charm perfectly. The hot tub under the stars was therapeutic after hiking, and the steam shower was a nice touch. The private trails on the property were great for morning walks. The proximity to downtown Bend while feeling completely secluded is amazing. Highly recommend!",
      rating: 5,
      date: "December 2023",
    },
  ],
  contact: {
    phone: "+1 (541) 555-CEDAR",
    email: "stay@cedarridgeretreat.com",
    responseTime: "Usually responds within 1 hour",
  },
  seo: {
    coverAlt: "Luxury mountain cabin with Cascade Mountain views in Bend, Oregon",
  },
};

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function Section({ id, title, children, eyebrow }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div {...fade}>
        {eyebrow && (
          <div className="text-sm font-semibold tracking-widest uppercase text-[#8B6914] dark:text-[#C97D10] mb-3">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">{title}</h2>
        )}
        {children}
      </motion.div>
    </section>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-zinc-900/80 border-b border-amber-100/50 dark:border-amber-900/20 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#8B6914] to-[#C97D10] text-white grid place-items-center font-bold text-sm shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
            {SITE.brand.logoText}
          </div>
          <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-[#8B6914] dark:group-hover:text-[#C97D10] transition-colors">{SITE.brand.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-[#8B6914] dark:hover:text-[#C97D10] text-zinc-700 dark:text-zinc-300 font-medium transition-colors duration-200" href="#gallery">Gallery</a>
          <a className="hover:text-[#8B6914] dark:hover:text-[#C97D10] text-zinc-700 dark:text-zinc-300 font-medium transition-colors duration-200" href="#amenities">Amenities</a>
          <a className="hover:text-[#8B6914] dark:hover:text-[#C97D10] text-zinc-700 dark:text-zinc-300 font-medium transition-colors duration-200" href="#location">Location</a>
          <a className="hover:text-[#8B6914] dark:hover:text-[#C97D10] text-zinc-700 dark:text-zinc-300 font-medium transition-colors duration-200" href="#reviews">Reviews</a>
          <a className="hover:text-[#8B6914] dark:hover:text-[#C97D10] text-zinc-700 dark:text-zinc-300 font-medium transition-colors duration-200" href="#contact">Contact</a>
          <a href="#book" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-gradient-to-r from-[#8B6914] to-[#C97D10] text-white hover:from-[#7C3A00] hover:to-[#8B6914] shadow-md hover:shadow-lg transition-all duration-200 font-medium">
            Book <ExternalLink size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#7C3A00]/20 to-transparent z-[1]" />
      <img
        src={SITE.hero.image}
        alt={SITE.seo.coverAlt}
        className="h-[70vh] w-full object-cover"
      />
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div {...fade} className="max-w-2xl">
            <span className="text-amber-200 text-sm tracking-widest uppercase font-semibold">{SITE.brand.tagline}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 drop-shadow-lg leading-tight">
              {SITE.brand.name} — {SITE.location.city}, {SITE.location.region}
            </h1>
            <p className="text-white/95 mt-4 leading-relaxed text-lg drop-shadow-md">
              {SITE.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href={SITE.hero.ctaPrimary.href}
                className="rounded-2xl px-6 py-3.5 bg-gradient-to-r from-[#8B6914] to-[#C97D10] text-white hover:from-[#7C3A00] hover:to-[#8B6914] shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold transform hover:scale-105"
              >
                {SITE.hero.ctaPrimary.label}
              </a>
              <a
                href={SITE.hero.ctaSecondary.href}
                className="rounded-2xl px-6 py-3.5 bg-white/95 text-zinc-900 hover:bg-white shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold transform hover:scale-105"
              >
                {SITE.hero.ctaSecondary.label}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Highlights() {
  const iconColors = [
    "text-[#2D5016] dark:text-[#10b981]",
    "text-[#C97D10] dark:text-[#f59e0b]",
    "text-yellow-500 dark:text-yellow-400",
    "text-blue-500 dark:text-blue-400",
    "text-purple-500 dark:text-purple-400",
    "text-[#8B6914] dark:text-[#C97D10]",
  ];
  
  return (
    <Section id="highlights" eyebrow="Why you'll love it" title="Your Mountain Escape Awaits">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {SITE.highlights.map((h, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -4 }}
            className="rounded-2xl border border-amber-100 dark:border-amber-900/30 p-6 shadow-md hover:shadow-xl bg-gradient-to-br from-white to-amber-50/50 dark:from-zinc-900 dark:to-zinc-800 flex items-center gap-4 transition-all duration-300 cursor-default"
          >
            <div className={`p-3 rounded-xl bg-amber-100/50 dark:bg-amber-900/20 ${iconColors[i] || iconColors[0]}`}>
              <h.icon size={28} className="flex-shrink-0" />
            </div>
            <div className="text-zinc-900 dark:text-zinc-100 font-semibold text-base">{h.label}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const photos = SITE.photos;
  const maxVisible = 6;
  const visiblePhotos = photos.slice(0, maxVisible);
  const remainingCount = photos.length > maxVisible ? photos.length - maxVisible : 0;

  // Handle keyboard navigation and ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null && !showAllPhotos) return;

      if (e.key === 'Escape') {
        setSelectedImage(null);
        setShowAllPhotos(false);
      } else if (selectedImage !== null) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setSelectedImage((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSelectedImage((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
        }
      }
    };

    if (selectedImage !== null || showAllPhotos) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, showAllPhotos, photos.length]);

  const navigateImage = (direction) => {
    if (direction === 'prev') {
      setSelectedImage((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    } else {
      setSelectedImage((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <>
      <Section id="gallery" title="Gallery">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 relative">
          {visiblePhotos.map((src, idx) => (
            <motion.img
              {...fade}
              key={idx}
              src={src}
              alt={`Photo ${idx + 1} of ${SITE.brand.name}`}
              className="rounded-2xl h-52 w-full object-cover ring-2 ring-amber-100 dark:ring-amber-900/30 cursor-pointer hover:opacity-90 hover:ring-[#8B6914] dark:hover:ring-[#C97D10] transition-all duration-300 shadow-md hover:shadow-xl"
              onClick={() => setSelectedImage(idx)}
              whileHover={{ scale: 1.02 }}
            />)
          )}
          {remainingCount > 0 && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl h-52 w-full bg-gradient-to-br from-[#8B6914] to-[#C97D10] dark:from-[#7C3A00] dark:to-[#8B6914] flex items-center justify-center cursor-pointer hover:from-[#7C3A00] hover:to-[#8B6914] dark:hover:from-[#8B6914] dark:hover:to-[#C97D10] transition-all duration-300 ring-2 ring-amber-100 dark:ring-amber-900/30 shadow-md hover:shadow-xl"
              onClick={() => setShowAllPhotos(true)}
            >
              <div className="text-center text-white">
                <div className="text-3xl font-bold">{remainingCount}+</div>
                <div className="text-sm opacity-90 mt-1 font-medium">More Photos</div>
              </div>
            </motion.div>
          )}
        </div>
      </Section>

      {/* Single Image Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-amber-200 transition-colors p-2 z-10 bg-black/30 rounded-full hover:bg-black/50"
              aria-label="Close modal"
            >
              <X size={32} />
            </button>
            
            {/* Previous button */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-200 transition-all p-3 bg-gradient-to-r from-[#8B6914]/80 to-[#C97D10]/80 rounded-full hover:from-[#8B6914] hover:to-[#C97D10] shadow-lg hover:shadow-xl z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Next button */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-amber-200 transition-all p-3 bg-gradient-to-r from-[#8B6914]/80 to-[#C97D10]/80 rounded-full hover:from-[#8B6914] hover:to-[#C97D10] shadow-lg hover:shadow-xl z-10"
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            )}

            <img
              src={photos[selectedImage]}
              alt={`Photo ${selectedImage + 1} of ${SITE.brand.name}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 text-white text-sm">
              <span>{selectedImage + 1} / {photos.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* All Photos Grid Modal */}
      {showAllPhotos && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setShowAllPhotos(false)}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 sticky top-4 bg-black/50 backdrop-blur rounded-lg p-4 z-10">
              <h3 className="text-xl font-semibold text-white">
                All Photos ({photos.length})
              </h3>
              <button
                onClick={() => setShowAllPhotos(false)}
                className="text-white hover:text-zinc-300 transition-colors p-2"
                aria-label="Close modal"
              >
                <X size={32} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {photos.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Photo ${idx + 1} of ${SITE.brand.name}`}
                  className="rounded-lg w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity ring-1 ring-zinc-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAllPhotos(false);
                    setSelectedImage(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Booking Calendar */
function DirectBooking() {
  return (
    <Section id="book" title="Book Your Stay" eyebrow="Reserve Your Dates">
      <div className="rounded-2xl border-2 border-amber-100 dark:border-amber-900/30 p-6 md:p-8 bg-gradient-to-br from-white to-amber-50/30 dark:from-zinc-900 dark:to-zinc-800 shadow-xl">
        <BookingWidget />
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 text-center">
          Test mode — use 4242 4242 4242 4242 with any future date/CVC/ZIP.
        </p>
      </div>
    </Section>
  );
}

function Amenities() {
  return (
    <Section id="amenities" title="Amenities & Features" eyebrow="Everything you need for the perfect stay">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {SITE.amenities.map((a, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -2 }}
            className="rounded-2xl border border-amber-100 dark:border-amber-900/30 p-4 bg-white dark:bg-zinc-900 hover:bg-amber-50/50 dark:hover:bg-zinc-800 shadow-sm hover:shadow-md flex flex-col items-center gap-3 text-center transition-all duration-300 cursor-default group"
          >
            <div className="p-2.5 rounded-lg bg-amber-100/50 dark:bg-amber-900/20 group-hover:bg-amber-200/70 dark:group-hover:bg-amber-900/40 transition-colors">
              <a.icon size={28} className="text-[#8B6914] dark:text-[#C97D10] flex-shrink-0" />
            </div>
            <span className="text-zinc-800 dark:text-zinc-200 text-xs font-medium leading-snug">{a.label}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function LocationMap() {
  return (
    <Section id="location" title="Location" eyebrow={`${SITE.location.city}, ${SITE.location.region}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            Nestled on two private acres in {SITE.location.city}, {SITE.location.region}, Cedar Ridge Retreat offers the perfect balance of seclusion and accessibility. Immerse yourself in the natural beauty of Central Oregon while staying just minutes from world-class skiing, craft breweries, and outdoor adventures.
          </p>
          <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 space-y-2">
            {SITE.checkin.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl overflow-hidden border-2 border-amber-100 dark:border-amber-900/30 shadow-lg bg-zinc-50 dark:bg-zinc-900">
          <div className="relative w-full pb-[66.6%] h-0">
            <iframe
              title="Bend, Oregon Map"
              src={SITE.location.mapEmbed}
              className="absolute top-0 left-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Reviews() {
  return (
    <Section id="reviews" title="Guest Reviews">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SITE.reviews.map((r, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -4 }}
            className="rounded-2xl border border-amber-100 dark:border-amber-900/30 p-6 bg-gradient-to-br from-white to-amber-50/30 dark:from-zinc-900 dark:to-zinc-800 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-2 mb-4">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} size={18} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-base">"{r.text}"</p>
            <div className="mt-5 pt-4 border-t border-amber-100 dark:border-amber-900/30 flex items-center justify-between">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">— {r.name}</div>
              {r.date && <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{r.date}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact the Host">
        <div className="md:col-span-2">
        </div>
        <div className="rounded-2xl border border-amber-100 dark:border-amber-900/30 p-8 bg-gradient-to-br from-white to-amber-50/50 dark:from-zinc-900 dark:to-zinc-800 shadow-xl">
          <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200 mb-4">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <Phone size={20} className="text-[#8B6914] dark:text-[#C97D10]"/>
            </div>
            <span className="font-semibold">{SITE.contact.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200 mb-6">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <Mail size={20} className="text-[#8B6914] dark:text-[#C97D10]"/>
            </div>
            <span className="font-semibold">{SITE.contact.email}</span>
          </div>
          {SITE.contact.responseTime && (
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 pl-1">
              {SITE.contact.responseTime}
            </div>
          )}
          <a href="#book" className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 bg-gradient-to-r from-[#8B6914] to-[#C97D10] text-white hover:from-[#7C3A00] hover:to-[#8B6914] shadow-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105">
            Book Now <ExternalLink size={16}/>
          </a>
        </div>
    </Section>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="border-t border-amber-100 dark:border-amber-900/20 bg-gradient-to-b from-white to-amber-50/30 dark:from-zinc-950 dark:to-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="font-medium">
          © {year} <span className="text-[#8B6914] dark:text-[#C97D10] font-semibold">{SITE.brand.name}</span>. {SITE.location.city}, {SITE.location.region}.
        </div>
        <div className="opacity-80 text-zinc-500 dark:text-zinc-500">
          Powered by Still House Media
        </div>
      </div>
    </footer>
  );
}

export default function VacationRentalTemplate() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: SITE.brand.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.location.city,
      addressRegion: SITE.location.region,
      addressCountry: SITE.location.country,
    },
    image: [SITE.hero.image, ...SITE.photos],
    url: "https://templateairbnb.com",
    telephone: SITE.contact.phone,
    amenityFeature: SITE.amenities.map(a => ({ "@type": "LocationFeatureSpecification", name: a.label, value: true })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-amber-50/20 to-zinc-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <Hero />
      <Highlights />
      <Gallery />
      <DirectBooking />   {/* <-- inserted */}
      <Amenities />
      <LocationMap />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}
