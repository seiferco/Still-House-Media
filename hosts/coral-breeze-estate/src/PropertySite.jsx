/**
 * Property Website Template
 * This file renders the full property website using the SITE_CONFIG
 */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Phone, Mail, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
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
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white grid place-items-center font-bold text-lg group-hover:scale-110 transition-transform shadow-md">
            {SITE_CONFIG.brand.logoText}
          </div>
          <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{SITE_CONFIG.brand.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-cyan-600 dark:hover:text-cyan-400 text-zinc-700 dark:text-zinc-300 font-medium transition" href="#gallery">Gallery</a>
          <a className="hover:text-cyan-600 dark:hover:text-cyan-400 text-zinc-700 dark:text-zinc-300 font-medium transition" href="#amenities">Amenities</a>
          <a className="hover:text-cyan-600 dark:hover:text-cyan-400 text-zinc-700 dark:text-zinc-300 font-medium transition" href="#location">Location</a>
          <a className="hover:text-cyan-600 dark:hover:text-cyan-400 text-zinc-700 dark:text-zinc-300 font-medium transition" href="#reviews">Reviews</a>
          <a className="hover:text-cyan-600 dark:hover:text-cyan-400 text-zinc-700 dark:text-zinc-300 font-medium transition" href="#contact">Contact</a>
          <a href="#book" className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 transition font-semibold shadow-md hover:shadow-lg">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20 z-0" />
      <img
        src={SITE_CONFIG.hero.image}
        alt={SITE_CONFIG.seo.coverAlt}
        className="h-[75vh] w-full object-cover"
      />
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div {...fade} className="max-w-2xl">
            <span className="text-white/95 text-sm tracking-widest uppercase font-medium">{SITE_CONFIG.brand.tagline}</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
              {SITE_CONFIG.brand.name}
            </h1>
            <p className="text-lg md:text-xl text-white/95 mt-4 leading-relaxed font-light">
              {SITE_CONFIG.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#book"
                className="rounded-2xl px-6 py-4 bg-white text-zinc-900 hover:bg-zinc-100 transition font-semibold shadow-lg hover:shadow-xl"
              >
                Check Availability
              </a>
              <a
                href="#contact"
                className="rounded-2xl px-6 py-4 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition font-semibold border border-white/20"
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
    <Section id="highlights" eyebrow="Why you'll love it" title="Your Tropical Escape Awaits">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SITE_CONFIG.highlights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-md bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <h.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="text-zinc-900 dark:text-zinc-100 font-semibold text-base leading-tight">{h.label}</div>
              </div>
            </div>
          </motion.div>
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
    <Section id="amenities" title="Amenities & Features" eyebrow="Everything you need for the perfect stay">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {SITE_CONFIG.amenities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900 hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-lg transition-all group"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                <a.icon size={24} />
              </div>
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-tight">{a.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function LocationMap() {
  return (
    <Section id="location" title="Perfect Location" eyebrow={`${SITE_CONFIG.location.city}, ${SITE_CONFIG.location.region}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Your Island Paradise</h3>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              Nestled in the heart of {SITE_CONFIG.location.city}, this mid-century gem puts you steps from pristine beaches, 
              world-class diving, and the laid-back island vibe that makes the Florida Keys unforgettable.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 rounded-2xl p-6 border border-cyan-200 dark:border-cyan-800">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
              <MapPin className="text-cyan-600 dark:text-cyan-400" size={20} />
              Nearby Attractions
            </h4>
            <ul className="space-y-3">
              {SITE_CONFIG.checkin.details.map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {SITE_CONFIG.location.mapEmbed && (
          <div className="rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-50 dark:bg-zinc-900">
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
    <Section id="reviews" title="What Guests Are Saying" eyebrow="Guest Reviews">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SITE_CONFIG.reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed text-base mb-4">"{r.text}"</p>
            <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">— {r.name}</div>
              {r.date && (
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{r.date}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact the Host" eyebrow="Have questions?">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 p-8 bg-gradient-to-br from-white via-zinc-50 to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Phone</div>
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Email</div>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition break-all">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
          {SITE_CONFIG.contact.responseTime && (
            <div className="text-center text-sm text-zinc-600 dark:text-zinc-400 mb-6">
              <Star size={14} className="inline mr-1 fill-yellow-400 text-yellow-400" />
              {SITE_CONFIG.contact.responseTime}
            </div>
          )}
          <div className="text-center">
            <a 
              href="#book" 
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 transition font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book Your Stay <ExternalLink size={18} />
            </a>
          </div>
        </div>
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

