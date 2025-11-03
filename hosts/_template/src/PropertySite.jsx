/**
 * Property Website Template
 * This file renders the full property website using the SITE_CONFIG
 */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Star, Wifi, Car, Waves, Snowflake, Flame, Phone, Mail, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SITE_CONFIG, LISTING_CONFIG } from "./site-config.js";
import BookingWidget from "./components/BookingWidget.jsx";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function Section({ id, title, children, eyebrow }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div {...fade}>
        {eyebrow && (
          <div className="text-sm font-medium tracking-widest uppercase text-zinc-500 dark:text-zinc-400 mb-2">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">{title}</h2>
        )}
        {children}
      </motion.div>
    </section>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900 grid place-items-center font-semibold">
            {SITE_CONFIG.brand.logoText}
          </div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{SITE_CONFIG.brand.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-zinc-900 dark:hover:text-white text-zinc-700 dark:text-zinc-300" href="#gallery">Gallery</a>
          <a className="hover:text-zinc-900 dark:hover:text-white text-zinc-700 dark:text-zinc-300" href="#amenities">Amenities</a>
          <a className="hover:text-zinc-900 dark:hover:text-white text-zinc-700 dark:text-zinc-300" href="#location">Location</a>
          <a className="hover:text-zinc-900 dark:hover:text-white text-zinc-700 dark:text-zinc-300" href="#reviews">Reviews</a>
          <a className="hover:text-zinc-900 dark:hover:text-white text-zinc-700 dark:text-zinc-300" href="#contact">Contact</a>
          <a href="#book" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-0" />
      <img
        src={SITE_CONFIG.hero.image}
        alt={SITE_CONFIG.seo.coverAlt}
        className="h-[70vh] w-full object-cover"
      />
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
          <motion.div {...fade} className="max-w-xl">
            <span className="text-white/90 text-sm tracking-widest uppercase">{SITE_CONFIG.brand.tagline}</span>
            <h1 className="text-4xl md:text-5xl font-semibold text-white mt-3">
              {SITE_CONFIG.brand.name} — {SITE_CONFIG.location.city}, {SITE_CONFIG.location.region}
            </h1>
            <p className="text-white/90 mt-3 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="#book"
                className="rounded-2xl px-5 py-3 bg-zinc-900 text-white hover:bg-zinc-800 transition"
              >
                Check Availability
              </a>
              <a
                href="#contact"
                className="rounded-2xl px-5 py-3 bg-white/90 text-zinc-900 hover:bg-white transition"
              >
                Contact Host
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Highlights() {
  return (
    <Section id="highlights" eyebrow="Why you'll love it">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SITE_CONFIG.highlights.map((h, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm bg-white dark:bg-zinc-900 flex items-center gap-3"
          >
            <h.icon className="text-zinc-600 dark:text-zinc-300" />
            <div className="text-zinc-900 dark:text-zinc-100 font-medium">{h.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const photos = SITE_CONFIG.photos;
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
              alt={`${SITE_CONFIG.brand.name} photo ${idx + 1}`}
              className="rounded-2xl h-52 w-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage(idx)}
            />
          ))}
          {remainingCount > 0 && (
            <div
              className="rounded-2xl h-52 w-full bg-zinc-900 dark:bg-zinc-800 flex items-center justify-center cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors ring-1 ring-zinc-200 dark:ring-zinc-800"
              onClick={() => setShowAllPhotos(true)}
            >
              <div className="text-center text-white">
                <div className="text-3xl font-semibold">{remainingCount}+</div>
                <div className="text-sm opacity-80 mt-1">More Photos</div>
              </div>
            </div>
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
              className="absolute -top-12 right-0 text-white hover:text-zinc-300 transition-colors p-2 z-10"
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
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Next button */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>
            )}

            <img
              src={photos[selectedImage]}
              alt={`${SITE_CONFIG.brand.name} photo ${selectedImage + 1}`}
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
                  alt={`${SITE_CONFIG.brand.name} photo ${idx + 1}`}
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

function DirectBooking() {
  return (
    <Section id="book" title="Book Your Stay">
      <BookingWidget listingId={LISTING_CONFIG.id} />
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
        Secure booking powered by Stripe. Use test card 4242 4242 4242 4242 for demo mode.
      </p>
    </Section>
  );
}

function Amenities() {
  return (
    <Section id="amenities" title="Amenities">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {SITE_CONFIG.amenities.map((a, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900 flex items-center gap-3"
          >
            <a.icon className="text-zinc-600 dark:text-zinc-300" />
            <span className="text-zinc-800 dark:text-zinc-200">{a.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function LocationMap() {
  return (
    <Section id="location" title="Location" eyebrow={`${SITE_CONFIG.location.city}, ${SITE_CONFIG.location.region}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Located in {SITE_CONFIG.location.city}, {SITE_CONFIG.location.region}, this property offers easy access to local attractions, dining, and outdoor activities.
          </p>
          <ul className="mt-4 list-disc list-inside text-zinc-700 dark:text-zinc-300 space-y-1">
            {SITE_CONFIG.checkin.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>

        {SITE_CONFIG.location.mapEmbed && (
          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-50 dark:bg-zinc-900">
            <div className="relative w-full pb-[66.6%] h-0">
              <iframe
                title={`${SITE_CONFIG.brand.name} Location Map`}
                src={SITE_CONFIG.location.mapEmbed}
                className="absolute top-0 left-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

function Reviews() {
  if (!SITE_CONFIG.reviews || SITE_CONFIG.reviews.length === 0) return null;
  
  return (
    <Section id="reviews" title="Guest Reviews">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SITE_CONFIG.reviews.map((r, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-zinc-800 dark:text-zinc-200">"{r.text}"</p>
            <div className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">— {r.name}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact the Host">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm max-w-md">
        <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 mb-3">
          <Phone size={18} /> {SITE_CONFIG.contact.phone}
        </div>
        <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 mb-4">
          <Mail size={18} /> {SITE_CONFIG.contact.email}
        </div>
        <a href="#book" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition">
          Book Now <ExternalLink size={16} />
        </a>
      </div>
    </Section>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-400">
        <div>
          © {year} {SITE_CONFIG.brand.name}. {SITE_CONFIG.location.city}, {SITE_CONFIG.location.region}.
        </div>
        <div className="opacity-80">
          Powered by Still House Media
        </div>
      </div>
    </footer>
  );
}

export default function PropertySite() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: SITE_CONFIG.brand.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.region,
      addressCountry: SITE_CONFIG.location.country,
    },
    image: [SITE_CONFIG.hero.image, ...SITE_CONFIG.photos],
    telephone: SITE_CONFIG.contact.phone,
    amenityFeature: SITE_CONFIG.amenities.map(a => ({ "@type": "LocationFeatureSpecification", name: a.label, value: true })),
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <Hero />
      <Highlights />
      <Gallery />
      <DirectBooking />
      <Amenities />
      <LocationMap />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
}

