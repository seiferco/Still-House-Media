/**
 * Property Website Template
 * This file renders the full property website using the SITE_CONFIG
 */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Phone, Mail, ExternalLink, X, ChevronLeft, ChevronRight, Menu, Users, Bed, Bath, Home, Clock, Shield, AlertCircle, FileText, Calendar, Ban, Camera, Cigarette, Volume2, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "./site-config.js";
import MapboxMap from "./components/MapboxMap";

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const MotionDiv = motion.div;
const MotionImg = motion.img;

function Section({ id, title, children, eyebrow }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <MotionDiv
        {...fade}
        className="rounded-3xl bg-[#FAF7F2] border border-[#CBBBAA]/60 shadow-[0_25px_60px_-30px_rgba(30,30,30,0.35)] px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: "gallery", label: "Gallery" },
    { id: "amenities", label: "Amenities" },
    { id: "location", label: "Location" },
    { id: "reviews", label: "Reviews" },
    { id: "book", label: "Book" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = (e) => {
    setIsMenuOpen(false);
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      const handleScroll = () => setIsMenuOpen(false);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#FAF7F2]/90 border-b border-[#CBBBAA]/60 shadow-[0_20px_45px_-30px_rgba(30,30,30,0.45)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 sm:gap-3 group">
          <img src="/favicon.png" alt="Logo" className="h-9 w-9 sm:h-11 sm:w-11 rounded-2xl object-cover shadow-lg shadow-[#E17654]/40 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-base sm:text-lg text-[#1E1E1E]">{SITE_CONFIG.brand.name}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {["gallery", "amenities", "location", "reviews", "contact"].map((link) => (
            <a
              key={link}
              className="text-[#3F6F63]/80 hover:text-[#3F6F63] transition-colors"
              href={`#${link}`}
              onClick={(e) => {
                const element = document.querySelector(`#${link}`);
                if (element) {
                  e.preventDefault();
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
          <a
            href="#book"
            onClick={(e) => {
              const element = document.querySelector('#book');
              if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-[#E17654] text-white shadow-sm shadow-[#E17654]/40 hover:bg-[#C65A3A] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D7A44E]/70"
          >
            Book <ExternalLink size={16} />
          </a>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 rounded-lg text-[#3F6F63] hover:bg-[#F4EDE4] active:bg-[#E8DDD0] transition-colors touch-manipulation"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-[#CBBBAA]/60 bg-[#FAF7F2] shadow-lg">
          <nav className="mx-auto max-w-7xl px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleLinkClick}
                className="block px-4 py-3.5 rounded-lg text-[#3F6F63] font-semibold text-base hover:bg-[#F4EDE4] active:bg-[#E8DDD0] transition-colors touch-manipulation min-h-[44px] flex items-center"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const photos = [SITE_CONFIG.hero.image, ...SITE_CONFIG.photos];
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') setSelectedImage(null);
      else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setSelectedImage((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setSelectedImage((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
      }
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, photos.length]);

  const navigateImage = (direction) => {
    if (direction === 'prev') setSelectedImage((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    else setSelectedImage((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const navigateMobile = (direction) => {
    if (direction === 'prev') setCurrentMobileIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    else setCurrentMobileIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) navigateMobile('next');
    else if (distance < -minSwipeDistance) navigateMobile('prev');
  };

  return (
    <>
      <div className="relative">
        <div
          className="relative h-[70vh] md:h-[85vh] overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img
            src={photos[currentMobileIndex]}
            alt={`${SITE_CONFIG.brand.name} - Hero`}
            className="w-full h-full object-cover select-none"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1514]/80 via-[#0F1514]/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between md:items-end md:justify-end">
            <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 md:pt-0 md:pb-20">
              <div className="max-w-4xl">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white"
                >
                  <div className="md:mb-0">
                    <div className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/90 mb-3">
                      {SITE_CONFIG.brand.tagline}
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-0 md:mb-12 lg:mb-16 leading-tight">
                      {SITE_CONFIG.brand.name}
                    </h1>
                  </div>
                </MotionDiv>
              </div>
            </div>
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
              <div className="max-w-4xl">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white"
                >
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-8">
                    {SITE_CONFIG.description.substring(0, 200)}...
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href="#book"
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E17654] text-white font-semibold rounded-xl hover:bg-[#C65A3A] active:scale-95 transition-all shadow-lg shadow-[#E17654]/30 text-sm sm:text-base touch-manipulation min-h-[48px]"
                    >
                      Reserve Your Stay
                      <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                    </a>
                    <button
                      onClick={() => {
                        const gallerySection = document.querySelector('#gallery');
                        if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 active:scale-95 transition-all border border-white/20 text-sm sm:text-base touch-manipulation min-h-[48px]"
                    >
                      View Gallery
                    </button>
                  </div>
                </MotionDiv>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => navigateMobile('prev')}
              className="absolute left-3 top-[35%] -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-white active:scale-95 transition-all z-20 touch-manipulation"
            >
              <ChevronLeft size={20} className="text-[#1E1E1E]" />
            </button>
            <button
              onClick={() => navigateMobile('next')}
              className="absolute right-3 top-[35%] -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-white active:scale-95 transition-all z-20 touch-manipulation"
            >
              <ChevronRight size={20} className="text-[#1E1E1E]" />
            </button>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold z-20">
              {currentMobileIndex + 1} / {photos.length}
            </div>
          </div>
          <div className="hidden md:block">
            <button
              onClick={() => navigateMobile('prev')}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-white transition-all z-20 hover:scale-110"
            >
              <ChevronLeft size={22} className="text-[#1E1E1E]" />
            </button>
            <button
              onClick={() => navigateMobile('next')}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-white transition-all z-20 hover:scale-110"
            >
              <ChevronRight size={22} className="text-[#1E1E1E]" />
            </button>
            <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold z-20">
              {currentMobileIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      </div>
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full w-full p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-zinc-300 transition-colors p-2 z-10 bg-black/50 rounded-full"
            >
              <X size={32} />
            </button>
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <img
              src={photos[selectedImage]}
              alt={`${SITE_CONFIG.brand.name} photo ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 text-white text-sm">
              <span>{selectedImage + 1} / {photos.length}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Highlights() {
  return (
    <Section id="highlights" eyebrow="Why you'll love it" title="Your Escape Awaits">
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null && !showAllPhotos) return;
      if (e.key === 'Escape') { setSelectedImage(null); setShowAllPhotos(false); }
      else if (selectedImage !== null) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); setSelectedImage((prev) => (prev > 0 ? prev - 1 : photos.length - 1)); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); setSelectedImage((prev) => (prev < photos.length - 1 ? prev + 1 : 0)); }
      }
    };
    if (selectedImage !== null || showAllPhotos) { document.addEventListener('keydown', handleKeyDown); document.body.style.overflow = 'hidden'; }
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = 'unset'; };
  }, [selectedImage, showAllPhotos, photos.length]);

  const navigateImage = (direction) => {
    if (direction === 'prev') setSelectedImage((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    else setSelectedImage((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
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
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-7xl max-h-full w-full">
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white hover:text-zinc-300 transition-colors p-2 z-10"><X size={32} /></button>
            {photos.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"><ChevronLeft size={32} /></button>
                <button onClick={(e) => { e.stopPropagation(); navigateImage('next'); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"><ChevronRight size={32} /></button>
              </>
            )}
            <img src={photos[selectedImage]} alt={`${SITE_CONFIG.brand.name} photo ${selectedImage + 1}`} className="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto" onClick={(e) => e.stopPropagation()} />
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 text-white text-sm"><span>{selectedImage + 1} / {photos.length}</span></div>
          </div>
        </div>
      )}
      {showAllPhotos && (
        <div className="fixed inset-0 z-50 bg-[#0F1514]/95 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setShowAllPhotos(false)}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 sticky top-4 bg-[#0F1514]/60 backdrop-blur rounded-lg p-4 z-10 text-[#FAF7F2]">
              <h3 className="text-xl font-semibold text-white">All Photos ({photos.length})</h3>
              <button onClick={() => setShowAllPhotos(false)} className="text-white hover:text-zinc-300 transition-colors p-2"><X size={32} /></button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {photos.map((src, idx) => (
                <img key={idx} src={src} alt={`${SITE_CONFIG.brand.name} photo ${idx + 1}`} className="rounded-lg w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity ring-1 ring-[#CBBBAA]/60" onClick={(e) => { e.stopPropagation(); setShowAllPhotos(false); setSelectedImage(idx); }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PropertyDetails() {
  const { property, location } = SITE_CONFIG;
  // Fallback for property details if not present in config
  const guests = property?.guests || "X";
  const bedrooms = property?.bedrooms || "X";
  const beds = property?.beds || "X";
  const bathrooms = property?.bathrooms || "X";
  const type = property?.type || "Vacation Rental";

  return (
    <div className="bg-white border-b border-[#CBBBAA]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <div className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#3F6F63] mb-3 sm:mb-4">
                {type} · {location.city}, {location.region}
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-6 text-sm sm:text-base text-[#1E1E1E]/70 mb-6 sm:mb-8">
                <span className="flex items-center gap-2"><Users size={18} className="sm:w-5 sm:h-5 text-[#3F6F63] flex-shrink-0" /><span className="font-medium">{guests} guests</span></span>
                <span className="flex items-center gap-2"><Bed size={18} className="sm:w-5 sm:h-5 text-[#3F6F63] flex-shrink-0" /><span className="font-medium">{bedrooms} bedrooms</span></span>
                <span className="flex items-center gap-2"><Bed size={18} className="sm:w-5 sm:h-5 text-[#3F6F63] flex-shrink-0" /><span className="font-medium">{beds} beds</span></span>
                <span className="flex items-center gap-2"><Bath size={18} className="sm:w-5 sm:h-5 text-[#3F6F63] flex-shrink-0" /><span className="font-medium">{bathrooms} baths</span></span>
              </div>
            </div>
            <div className="prose prose-sm sm:prose-lg max-w-none">
              <p className="text-base sm:text-lg md:text-xl text-[#1E1E1E]/80 leading-relaxed">{SITE_CONFIG.description}</p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}

function DirectBooking() {
  return (
    <Section id="book" title="Book Your Stay">
      <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-[#CBBBAA]/60 bg-white">
        {SITE_CONFIG.booking?.hostexUrl ? (
          <iframe
            src={SITE_CONFIG.booking.hostexUrl}
            className="w-full h-[800px] border-0"
            title="Book Now"
            loading="lazy"
          />
        ) : (
          <div className="p-12 text-center text-zinc-500 bg-zinc-50">
            <p className="font-medium">Booking widget not configured.</p>
            <p className="text-sm mt-2">Please add your Hostex URL to site-config.js</p>
          </div>
        )}
      </div>
    </Section>
  );
}

function Amenities() {
  return (
    <Section id="amenities" title="Amenities">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {SITE_CONFIG.amenities.map((a, i) => (
          <div key={i} className="rounded-2xl border border-[#CBBBAA]/60 p-4 bg-white flex items-center gap-3 shadow-sm">
            <a.icon className="text-[#3F6F63]" />
            <span className="text-[#1E1E1E] font-medium">{a.label}</span>
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
          <p className="text-[#1E1E1E]/80 leading-relaxed text-lg">
            Located in {SITE_CONFIG.location.city}, {SITE_CONFIG.location.region}, this property offers easy access to local attractions, dining, and outdoor activities.
          </p>
          <ul className="mt-6 list-disc list-inside text-[#1E1E1E]/70 space-y-2">
            {SITE_CONFIG.checkin.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
        {SITE_CONFIG.location.latitude && SITE_CONFIG.location.longitude && (
          <div className="rounded-2xl overflow-hidden border border-[#CBBBAA]/60 shadow-lg bg-[#FAF7F2]">
            <div className="relative w-full pb-[66.6%] h-0">
               <div className="absolute top-0 left-0 w-full h-full">
                  <MapboxMap 
                    latitude={SITE_CONFIG.location.latitude}
                    longitude={SITE_CONFIG.location.longitude}
                    token={SITE_CONFIG.location.mapboxToken}
                  />
               </div>
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
          <div key={i} className="rounded-2xl border border-[#CBBBAA]/60 p-6 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              {Array.from({ length: r.rating }).map((_, j) => <Star key={j} size={18} className="fill-[#E17654] text-[#E17654]" />)}
            </div>
            <p className="text-[#1E1E1E] italic text-lg">"{r.text}"</p>
            <div className="mt-4 text-sm text-[#3F6F63] font-semibold uppercase tracking-wider">— {r.name}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact the Host">
      <div className="rounded-2xl border border-[#CBBBAA]/60 p-8 bg-white shadow-lg max-w-md">
        <div className="text-[#1E1E1E] mb-6 text-lg">
            Have questions before you book? Send us an email and we'll get back to you shortly.
        </div>
        
        <a 
          href={`mailto:${SITE_CONFIG.contact.email}`}
          className="flex items-center gap-3 text-[#1E1E1E] mb-8 text-lg hover:text-[#E17654] transition-colors p-3 bg-gray-50 rounded-lg border border-gray-100"
        >
          <Mail size={24} className="text-[#E17654]" /> 
          <span className="font-medium">{SITE_CONFIG.contact.email}</span>
        </a>

        <a href="#book" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 bg-[#1E1E1E] text-white hover:bg-[#333] transition shadow-lg w-full justify-center font-semibold">
          Book Now <ExternalLink size={18} />
        </a>
      </div>
    </Section>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="border-t border-[#CBBBAA]/40 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#1E1E1E]/60">
        <div>© {year} {SITE_CONFIG.brand.name}. {SITE_CONFIG.location.city}, {SITE_CONFIG.location.region}.</div>
        <div className="opacity-80">Powered by Still House Media</div>
      </div>
    </footer>
  );
}

export default function PropertySite() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: SITE_CONFIG.brand.name,
    address: { "@type": "PostalAddress", addressLocality: SITE_CONFIG.location.city, addressRegion: SITE_CONFIG.location.region, addressCountry: SITE_CONFIG.location.country },
    image: [SITE_CONFIG.hero.image, ...SITE_CONFIG.photos],
    telephone: SITE_CONFIG.contact.phone,
    amenityFeature: SITE_CONFIG.amenities.map(a => ({ "@type": "LocationFeatureSpecification", name: a.label, value: true })),
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1E1E] font-sans selection:bg-[#E17654]/20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <PhotoGallery />
      <PropertyDetails />
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
