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

const MotionDiv = motion.div;
const MotionImg = motion.img;

function Section({ id, title, children, eyebrow }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <MotionDiv
        {...fade}
        className="rounded-3xl bg-[#FAF7F2] border border-[#CBBBAA]/60 shadow-[0_25px_60px_-30px_rgba(30,30,30,0.35)] px-8 md:px-12 py-12"
      >
        {eyebrow && (
          <div className="text-xs font-semibold tracking-[0.35em] uppercase text-[#3F6F63]/80 mb-4">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1E1E1E] mb-6">{title}</h2>
        )}
        {children}
      </MotionDiv>
    </section>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#FAF7F2]/90 border-b border-[#CBBBAA]/60 shadow-[0_20px_45px_-30px_rgba(30,30,30,0.45)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="h-11 w-11 rounded-2xl bg-[#E17654] text-white grid place-items-center font-bold text-lg group-hover:scale-110 transition-transform shadow-lg shadow-[#E17654]/40">
            {SITE_CONFIG.brand.logoText}
          </div>
          <span className="font-semibold text-lg text-[#1E1E1E]">{SITE_CONFIG.brand.name}</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {["gallery","amenities","location","reviews","contact"].map((link) => (
            <a
              key={link}
              className="text-[#3F6F63]/80 hover:text-[#3F6F63] transition-colors"
              href={`#${link}`}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
          <a
            href="#book"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-[#E17654] text-white shadow-sm shadow-[#E17654]/40 hover:bg-[#C65A3A] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D7A44E]/70"
          >
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1514]/70 via-[#0F1514]/30 to-transparent z-0" />
      <img
        src={SITE_CONFIG.hero.image}
        alt={SITE_CONFIG.seo.coverAlt}
        className="h-[75vh] w-full object-cover"
      />
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <MotionDiv
            {...fade}
            className="max-w-2xl rounded-2xl bg-[rgba(250,247,242,0.88)] backdrop-blur-md ring-1 ring-[#CBBBAA]/60 p-6 md:p-8 text-[#1E1E1E] shadow-[0_35px_80px_-35px_rgba(15,21,20,0.65)]"
          >
            <span className="text-xs font-semibold tracking-[0.4em] uppercase text-[#3F6F63]">
              {SITE_CONFIG.brand.tagline}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-5 leading-tight">
              {SITE_CONFIG.brand.name}
            </h1>
            <p className="text-lg md:text-xl mt-4 leading-relaxed text-[#1E1E1E]/80">
              {SITE_CONFIG.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#book"
                className="rounded-xl bg-[#E17654] px-6 py-3 font-semibold text-white shadow-sm shadow-[#E17654]/30 hover:bg-[#C65A3A] focus:outline-none focus:ring-2 focus:ring-[#D7A44E] focus:ring-offset-2 focus:ring-offset-[#FAF7F2] transition-colors"
              >
                Check Availability
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-[#3F6F63]/30 px-6 py-3 font-semibold text-[#3F6F63] bg-white/70 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#3F6F63]/40 focus:ring-offset-2 focus:ring-offset-[#FAF7F2] transition-colors"
              >
                Contact Host
              </a>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}

function Highlights() {
  return (
    <Section id="highlights" eyebrow="Why you'll love it" title="Your Sedona Escape Awaits">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SITE_CONFIG.highlights.map((h, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-[#CBBBAA]/70 p-6 bg-gradient-to-br from-[#FAF7F2] to-[#F4EDE4] hover:shadow-[0_25px_45px_-35px_rgba(30,30,30,0.45)] transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E17654]/15 text-[#E17654] flex items-center justify-center group-hover:scale-110 transition-transform">
                <h.icon size={24} />
              </div>
              <div className="flex-1">
                <div className="text-[#1E1E1E] font-semibold text-base leading-tight">{h.label}</div>
              </div>
            </div>
          </MotionDiv>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
          {visiblePhotos.map((src, idx) => (
            <MotionImg
              {...fade}
              key={idx}
              src={src}
              alt={`${SITE_CONFIG.brand.name} photo ${idx + 1}`}
              className="rounded-2xl h-52 w-full object-cover ring-1 ring-[#CBBBAA]/60 cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
              onClick={() => setSelectedImage(idx)}
            />
          ))}
          {remainingCount > 0 && (
            <div
              className="rounded-2xl h-52 w-full bg-[#3F6F63] flex items-center justify-center cursor-pointer hover:bg-[#335b52] transition-colors ring-1 ring-[#3F6F63]/40 shadow-lg shadow-[#3F6F63]/30"
              onClick={() => setShowAllPhotos(true)}
            >
              <div className="text-center text-white">
                <div className="text-3xl font-semibold tracking-wide">{remainingCount}+</div>
                <div className="text-sm opacity-90 mt-1">More Photos</div>
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
          className="fixed inset-0 z-50 bg-[#0F1514]/95 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setShowAllPhotos(false)}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 sticky top-4 bg-[#0F1514]/60 backdrop-blur rounded-lg p-4 z-10 text-[#FAF7F2]">
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
                  className="rounded-lg w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity ring-1 ring-[#CBBBAA]/60"
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
    </Section>
  );
}

function Amenities() {
  return (
    <Section id="amenities" title="Amenities & Features" eyebrow="Everything you need for the perfect stay">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {SITE_CONFIG.amenities.map((a, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-[#CBBBAA]/70 p-5 bg-[#FAF7F2] hover:border-[#3F6F63]/40 hover:shadow-[0_20px_45px_-30px_rgba(30,30,30,0.4)] transition-all group"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E17654]/15 text-[#E17654] flex items-center justify-center group-hover:scale-125 transition-transform shadow-sm shadow-[#E17654]/20">
                <a.icon size={24} />
              </div>
              <span className="text-sm font-medium text-[#1E1E1E] leading-tight">{a.label}</span>
            </div>
          </MotionDiv>
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
            <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Sedona’s Red-Rock Playground</h3>
            <p className="text-[#1E1E1E]/75 leading-relaxed text-lg">
              Coral Breeze Estate sits in the Village of Oak Creek, five minutes from Bell Rock trailheads and just south of Sedona proper. Mornings are for sunrise hikes up Cathedral Rock, afternoons for Southwest plates at The Hudson or farm-to-table bites at Elote Café, and evenings for stargazing on our desert terraces or wine flights at Page Springs Cellars.
            </p>
          </div>
          <div className="bg-[#F4EDE4] rounded-2xl p-6 border border-[#CBBBAA]/70 shadow-sm">
            <h4 className="font-semibold text-[#1E1E1E] mb-4 flex items-center gap-2">
              <MapPin className="text-[#3F6F63]" size={20} />
              Nearby favorites
            </h4>
            <ul className="space-y-3 text-[#1E1E1E]/80">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D7A44E] mt-2 flex-shrink-0" />
                <span>Cathedral Rock Trailhead – 8 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D7A44E] mt-2 flex-shrink-0" />
                <span>Bell Rock Pathway for e-biking & hiking – 5 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D7A44E] mt-2 flex-shrink-0" />
                <span>Red Rock Café (breakfast) & Firecreek Coffee – 4 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D7A44E] mt-2 flex-shrink-0" />
                <span>Tlaquepaque Arts & Shopping Village – 12 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D7A44E] mt-2 flex-shrink-0" />
                <span>Elote Café & The Hudson (dinner hotspots) – 15 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D7A44E] mt-2 flex-shrink-0" />
                <span>Page Springs Cellars wine tasting – 20 minutes</span>
              </li>
            </ul>
          </div>
        </div>

        {SITE_CONFIG.location.mapEmbed && (
          <div className="rounded-2xl overflow-hidden border-2 border-[#CBBBAA]/70 shadow-xl bg-[#FAF7F2]">
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
          <MotionDiv
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-[#CBBBAA]/70 p-6 bg-[#FAF7F2] shadow-sm hover:shadow-[0_22px_40px_-32px_rgba(30,30,30,0.45)] transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} size={18} className="fill-[#D7A44E] text-[#D7A44E]" />
              ))}
            </div>
            <p className="text-[#1E1E1E]/80 leading-relaxed text-base mb-4">"{r.text}"</p>
            <div className="flex items-center justify-between pt-4 border-t border-[#CBBBAA]/60">
              <div className="text-sm font-semibold text-[#1E1E1E]">— {r.name}</div>
              {r.date && (
                <div className="text-xs text-[#1E1E1E]/60">{r.date}</div>
              )}
            </div>
          </MotionDiv>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact the Host" eyebrow="Have questions?">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border-2 border-[#CBBBAA]/70 p-8 bg-[#FAF7F2] shadow-[0_30px_60px_-35px_rgba(30,30,30,0.45)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/70 border border-[#CBBBAA]/60 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#E17654] flex items-center justify-center text-white shadow-sm shadow-[#E17654]/30">
                <Phone size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#3F6F63]/70 mb-1">Phone</div>
                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-lg font-semibold text-[#1E1E1E] hover:text-[#3F6F63] transition">
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/70 border border-[#CBBBAA]/60 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#3F6F63] flex items-center justify-center text-white shadow-sm shadow-[#3F6F63]/25">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#3F6F63]/70 mb-1">Email</div>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-lg font-semibold text-[#1E1E1E] hover:text-[#3F6F63] transition break-all">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>
          </div>
          {SITE_CONFIG.contact.responseTime && (
            <div className="text-center text-sm text-[#1E1E1E]/70 mb-6">
              <Star size={14} className="inline mr-1 fill-[#D7A44E] text-[#D7A44E]" />
              {SITE_CONFIG.contact.responseTime}
            </div>
          )}
          <div className="text-center">
            <a 
              href="#book" 
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 bg-[#E17654] text-white font-semibold shadow-sm shadow-[#E17654]/40 hover:bg-[#C65A3A] focus:outline-none focus:ring-2 focus:ring-[#D7A44E] focus:ring-offset-2 focus:ring-offset-[#FAF7F2] transition-transform hover:scale-[1.02]"
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
    <footer className="border-t border-[#CBBBAA]/70 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#1E1E1E]/70">
        <div>© {year} {SITE_CONFIG.brand.name}. {SITE_CONFIG.location.city}, {SITE_CONFIG.location.region}.</div>
        <div className="opacity-80 text-[#3F6F63]">Powered by Still House Media</div>
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
    <div className="min-h-screen bg-[#F4EDE4] text-[#1E1E1E]">
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

