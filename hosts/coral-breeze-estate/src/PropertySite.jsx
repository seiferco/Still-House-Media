/**
 * Property Website Template
 * This file renders the full property website using the SITE_CONFIG
 */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Phone, Mail, ExternalLink, X, ChevronLeft, ChevronRight, Menu, Users, Bed, Bath, Home, Clock, Shield, AlertCircle, FileText, Calendar, Ban, Camera, Cigarette, Volume2 } from "lucide-react";
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
    // Smooth scroll to section
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Close menu on scroll
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
          <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-2xl bg-[#E17654] text-white grid place-items-center font-bold text-base sm:text-lg group-hover:scale-110 transition-transform shadow-lg shadow-[#E17654]/40">
            {SITE_CONFIG.brand.logoText}
          </div>
          <span className="font-semibold text-base sm:text-lg text-[#1E1E1E]">{SITE_CONFIG.brand.name}</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {["gallery","amenities","location","reviews","contact"].map((link) => (
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

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-[#3F6F63] hover:bg-[#F4EDE4] transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#CBBBAA]/60 bg-[#FAF7F2] shadow-lg">
          <nav className="mx-auto max-w-7xl px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleLinkClick}
                className="block px-4 py-2.5 rounded-lg text-[#3F6F63] font-semibold text-base hover:bg-[#F4EDE4] active:bg-[#E8DDD0] transition-colors"
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

// Airbnb-style scrollable photo gallery
function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const photos = [SITE_CONFIG.hero.image, ...SITE_CONFIG.photos];

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
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
    if (direction === 'prev') {
      setSelectedImage((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    } else {
      setSelectedImage((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    }
  };

  const navigateMobile = (direction) => {
    if (direction === 'prev') {
      setCurrentMobileIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    } else {
      setCurrentMobileIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    }
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      navigateMobile('next');
    } else if (isRightSwipe) {
      navigateMobile('prev');
    }
  };

  return (
    <>
      <div className="pt-16 sm:pt-0">
        {/* Mobile: Single image with navigation arrows and description preview */}
        <div className="md:hidden">
          <div 
            className="relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={photos[currentMobileIndex]}
              alt={`${SITE_CONFIG.brand.name} - Photo ${currentMobileIndex + 1}`}
              className="w-full h-[60vh] object-cover select-none"
              draggable="false"
            />
            
            {/* Navigation Arrows */}
            <button
              onClick={() => navigateMobile('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} className="text-[#1E1E1E]" />
            </button>
            <button
              onClick={() => navigateMobile('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all z-20"
              aria-label="Next photo"
            >
              <ChevronRight size={24} className="text-[#1E1E1E]" />
            </button>

            {/* Photo Counter */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold z-20">
              {currentMobileIndex + 1} / {photos.length}
            </div>

            {/* Description preview overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 z-10">
              <p className="text-white text-sm leading-relaxed line-clamp-3">
                {SITE_CONFIG.description.substring(0, 150)}...
              </p>
              <p className="text-white/80 text-xs mt-2">Swipe or use arrows to see more photos</p>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 z-20">
              {photos.slice(0, Math.min(photos.length, 10)).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentMobileIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentMobileIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
              {photos.length > 10 && (
                <span className="text-white/80 text-xs ml-1">+{photos.length - 10}</span>
              )}
            </div>
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-4 gap-2 max-w-[1760px] mx-auto">
          <div className="col-span-2 row-span-2">
            <img
              src={photos[0]}
              alt={`${SITE_CONFIG.brand.name} - Main photo`}
              className="w-full h-full object-cover rounded-l-3xl cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setSelectedImage(0)}
            />
          </div>
          {photos.slice(1, 5).map((src, idx) => (
            <div key={idx} className="relative">
              <img
                src={src}
                alt={`${SITE_CONFIG.brand.name} - Photo ${idx + 2}`}
                className="w-full h-64 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setSelectedImage(idx + 1)}
              />
              {idx === 3 && photos.length > 5 && (
                <div
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors rounded-r-3xl"
                  onClick={() => setSelectedImage(5)}
                >
                  <div className="text-white text-lg font-semibold">
                    Show all photos
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full w-full p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-zinc-300 transition-colors p-2 z-10 bg-black/50 rounded-full"
              aria-label="Close modal"
            >
              <X size={32} />
            </button>
            
            {photos.length > 1 && (
              <>
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

// Property Details Section (Airbnb style)
function PropertyDetails() {
  const { property, location } = SITE_CONFIG;
  
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-6 border-b border-[#CBBBAA]/40">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1E1E1E] mb-2">
            {SITE_CONFIG.brand.name}
          </h1>
          <p className="text-sm md:text-base text-[#1E1E1E]/70 mb-2 md:mb-3">
            {property.type} in {location.city}, {location.region}
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-[#1E1E1E]/80">
            <span className="flex items-center gap-1">
              <Users size={14} className="md:w-4 md:h-4" />
              {property.guests} {property.guests === 1 ? 'guest' : 'guests'}
            </span>
            <span className="flex items-center gap-1">
              <Bed size={14} className="md:w-4 md:h-4" />
              {property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}
            </span>
            <span className="flex items-center gap-1">
              <Bed size={14} className="md:w-4 md:h-4" />
              {property.beds} {property.beds === 1 ? 'bed' : 'beds'}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={14} className="md:w-4 md:h-4" />
              {property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}
            </span>
          </div>
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
    <div id="book" className="border-b border-[#CBBBAA]/40 pb-6 md:pb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1E1E1E] mb-4 md:mb-6">
        Where you'll sleep
      </h2>
      <div className="border border-[#CBBBAA]/40 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg bg-white">
        <BookingWidget listingId={LISTING_CONFIG.id} />
      </div>
    </div>
  );
}

// Booking Summary Widget (Airbnb-style sticky card)
function BookingSummary() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [nights, setNights] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('');

  const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const withApiBase = (path) => API_BASE ? `${API_BASE}${path}` : path;
  const ymd = (d) => d.toISOString().slice(0, 10);

  // Calculate nights when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays);
    } else {
      setNights(0);
    }
  }, [checkIn, checkOut]);

  // Listen for date selections from the main booking widget via custom events
  useEffect(() => {
    const handleDateSelection = (e) => {
      if (e.detail?.checkIn) {
        const date = e.detail.checkIn instanceof Date ? e.detail.checkIn : new Date(e.detail.checkIn);
        setCheckIn(date);
      } else if (e.detail?.checkIn === null) {
        setCheckIn(null);
      }
      if (e.detail?.checkOut) {
        const date = e.detail.checkOut instanceof Date ? e.detail.checkOut : new Date(e.detail.checkOut);
        setCheckOut(date);
      } else if (e.detail?.checkOut === null) {
        setCheckOut(null);
      }
    };
    window.addEventListener('booking-dates-selected', handleDateSelection);

    return () => {
      window.removeEventListener('booking-dates-selected', handleDateSelection);
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const calculateTotal = () => {
    if (!nights) return LISTING_CONFIG.nightlyPrice;
    const basePrice = LISTING_CONFIG.nightlyPrice * nights;
    const cleaningFee = LISTING_CONFIG.cleaningFee;
    return basePrice + cleaningFee;
  };

  const handleReserve = async () => {
    if (!checkIn || !checkOut) {
      // Scroll to booking widget if dates not selected
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsBooking(true);
    setBookingStatus('Placing 10-min hold…');

    try {
      // Create hold
      const r1 = await fetch(withApiBase('/hold'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: ymd(checkIn),
          end: ymd(checkOut),
          listing: LISTING_CONFIG.id
        })
      });

      const j1 = await r1.json();
      if (!r1.ok) {
        setBookingStatus('Hold failed: ' + (j1.error || 'unknown'));
        setIsBooking(false);
        return;
      }

      // Store hold in sessionStorage
      const storageKey = `coral-breeze-hold-${LISTING_CONFIG.id}`;
      sessionStorage.setItem(storageKey, JSON.stringify({ holdId: j1.hold.id, listing: LISTING_CONFIG.id }));

      setBookingStatus('Creating checkout…');

      // Create checkout
      const r2 = await fetch(withApiBase('/checkout'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          start: ymd(checkIn),
          end: ymd(checkOut),
          holdId: j1.hold.id,
          listing: LISTING_CONFIG.id
        })
      });

      const j2 = await r2.json();
      if (!r2.ok || !j2.url) {
        setBookingStatus('Checkout failed: ' + (j2.error || 'unknown'));
        setIsBooking(false);
        return;
      }

      // Redirect to Stripe checkout
      window.location.href = j2.url;
    } catch (error) {
      setBookingStatus('Error: ' + error.message);
      setIsBooking(false);
    }
  };

  const total = calculateTotal();
  const nightlyPrice = LISTING_CONFIG.nightlyPrice;

  return (
    <div className="border border-[#CBBBAA]/40 rounded-2xl p-6 shadow-lg bg-white sticky top-24">
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-[#1E1E1E] underline">
            ${(total / 100).toLocaleString()}
          </span>
          {nights > 0 && (
            <span className="text-[#1E1E1E]/70">for {nights} {nights === 1 ? 'night' : 'nights'}</span>
          )}
        </div>
        {nights === 0 && (
          <span className="text-sm text-[#1E1E1E]/70">${(nightlyPrice / 100).toLocaleString()} per night</span>
        )}
      </div>

      {/* Date Selection Box */}
      <div 
        className="border border-[#CBBBAA]/60 rounded-xl mb-4 overflow-hidden cursor-pointer hover:border-[#3F6F63] transition-colors"
        onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="grid grid-cols-2">
          <div className="p-4 border-r border-[#CBBBAA]/60">
            <div className="text-xs font-semibold text-[#1E1E1E]/70 mb-1">CHECK-IN</div>
            <div className="text-base font-medium text-[#1E1E1E]">
              {checkIn ? formatDate(checkIn) : 'Add date'}
            </div>
          </div>
          <div className="p-4 flex items-end justify-end">
            <div className="flex-1">
              <div className="text-xs font-semibold text-[#1E1E1E]/70 mb-1">CHECKOUT</div>
              <div className="text-base font-medium text-[#1E1E1E]">
                {checkOut ? formatDate(checkOut) : 'Add date'}
              </div>
            </div>
            <ChevronRight size={20} className="text-[#1E1E1E]/50 ml-2" />
          </div>
        </div>
      </div>

      {/* Reserve Button */}
      <button
        onClick={handleReserve}
        disabled={isBooking}
        className="w-full rounded-xl bg-gradient-to-r from-[#E17654] via-[#E17654] to-[#E17654]/90 text-white font-semibold py-4 text-lg hover:from-[#C65A3A] hover:via-[#C65A3A] hover:to-[#C65A3A]/90 transition-all shadow-md hover:shadow-lg mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isBooking ? bookingStatus : (checkIn && checkOut ? 'Book Now' : 'Check availability')}
      </button>

      {bookingStatus && !isBooking && bookingStatus.includes('failed') && (
        <p className="text-center text-sm text-red-600 mb-2">{bookingStatus}</p>
      )}

      <p className="text-center text-sm text-[#1E1E1E]/70">
        You won't be charged yet
      </p>
    </div>
  );
}

function Amenities() {
  return (
    <div className="border-b border-[#CBBBAA]/40 pb-6 md:pb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1E1E1E] mb-4 md:mb-6">
        What this place offers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {SITE_CONFIG.amenities.map((a, i) => (
          <div
            key={i}
            className="flex items-start gap-2 md:gap-3 py-2 md:py-3"
          >
            <a.icon size={20} className="md:w-6 md:h-6 text-[#3F6F63] flex-shrink-0 mt-0.5" />
            <span className="text-sm md:text-base text-[#1E1E1E]/80">{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LocationMap() {
  return (
    <div className="border-b border-[#CBBBAA]/40 pb-6 md:pb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1E1E1E] mb-4 md:mb-6">
        Where you'll be
      </h2>
      <div className="space-y-4 md:space-y-6">
        <p className="text-sm md:text-base text-[#1E1E1E]/80 leading-relaxed">
          {SITE_CONFIG.location.city}, {SITE_CONFIG.location.region}
        </p>
        {SITE_CONFIG.location.mapEmbed && (
          <div className="rounded-xl md:rounded-2xl overflow-hidden border border-[#CBBBAA]/40">
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
    </div>
  );
}

function Reviews() {
  const [showAll, setShowAll] = useState(false);
  if (!SITE_CONFIG.reviews || SITE_CONFIG.reviews.length === 0) return null;
  
  const hasMoreThanTwo = SITE_CONFIG.reviews.length > 2;
  const visibleReviews = showAll || !hasMoreThanTwo ? SITE_CONFIG.reviews : SITE_CONFIG.reviews.slice(0, 2);
  
  return (
    <div className="border-b border-[#CBBBAA]/40 pb-6 md:pb-8">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1E1E1E] mb-4 md:mb-6">
        Reviews
      </h2>
      <div className="space-y-4 md:space-y-6">
        {visibleReviews.map((r, i) => (
          <div key={i} className="pb-4 md:pb-6 border-b border-[#CBBBAA]/30 last:border-0">
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E17654] flex items-center justify-center text-white text-xs md:text-sm font-semibold">
                {r.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="text-sm md:text-base font-semibold text-[#1E1E1E]">{r.name}</div>
                {r.date && (
                  <div className="text-xs md:text-sm text-[#1E1E1E]/60">{r.date}</div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: r.rating }).map((_, j) => (
                <Star key={j} size={14} className="md:w-4 md:h-4 fill-[#D7A44E] text-[#D7A44E]" />
              ))}
            </div>
            <p className="text-sm md:text-base text-[#1E1E1E]/80 leading-relaxed">"{r.text}"</p>
          </div>
        ))}
      </div>
      {hasMoreThanTwo && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 md:mt-6 text-sm md:text-base font-semibold text-[#3F6F63] underline hover:text-[#2d5248] transition-colors"
        >
          Show all {SITE_CONFIG.reviews.length} reviews
        </button>
      )}
      {showAll && hasMoreThanTwo && (
        <button
          onClick={() => setShowAll(false)}
          className="mt-4 md:mt-6 text-sm md:text-base font-semibold text-[#3F6F63] underline hover:text-[#2d5248] transition-colors"
        >
          Show less
        </button>
      )}
    </div>
  );
}

// Meet Your Host Section
function MeetYourHost() {
  const { host } = SITE_CONFIG;
  
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8 border-b border-[#CBBBAA]/40">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-[#E17654] flex items-center justify-center text-white text-xl md:text-2xl font-bold">
            {host.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#1E1E1E] mb-2">
            Meet your host
          </h2>
          <p className="text-xs md:text-sm text-[#1E1E1E]/70 mb-3 md:mb-4">
            Hosted by {host.name} · Joined in {host.joined}
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 mb-3 md:mb-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Star size={14} className="md:w-4 md:h-4 fill-[#D7A44E] text-[#D7A44E]" />
              <span className="text-[#1E1E1E]/80">{host.responseRate} response rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="md:w-4 md:h-4 text-[#3F6F63]" />
              <span className="text-[#1E1E1E]/80">{host.responseTime}</span>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#1E1E1E]/80 leading-relaxed">
            {host.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

// Things to Know Section with Modals
function ThingsToKnow() {
  const [openModal, setOpenModal] = useState(null);
  const { thingsToKnow } = SITE_CONFIG;

  const handleShowMore = (type) => {
    setOpenModal(type);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    if (openModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [openModal]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8 border-b border-[#CBBBAA]/40">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1E1E1E] mb-4 md:mb-6">
          Things to know
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* House Rules */}
          <div>
            <h3 className="font-semibold text-[#1E1E1E] mb-3">House rules</h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80 mb-3">
              <li>{thingsToKnow.houseRules.checkIn}</li>
              <li>{thingsToKnow.houseRules.checkout}</li>
              <li>{thingsToKnow.houseRules.guests}</li>
            </ul>
            <button
              onClick={() => handleShowMore('houseRules')}
              className="text-sm font-semibold text-[#3F6F63] underline hover:text-[#2d5248] transition-colors"
            >
              Show more
            </button>
          </div>

          {/* Safety & Property */}
          <div>
            <h3 className="font-semibold text-[#1E1E1E] mb-3">Safety & property</h3>
            <ul className="space-y-2 text-sm text-[#1E1E1E]/80 mb-3">
              <li>{thingsToKnow.safety.carbonMonoxide}</li>
              <li>{thingsToKnow.safety.smokeAlarm}</li>
              <li>{thingsToKnow.safety.noise}</li>
            </ul>
            <button
              onClick={() => handleShowMore('safety')}
              className="text-sm font-semibold text-[#3F6F63] underline hover:text-[#2d5248] transition-colors"
            >
              Show more
            </button>
          </div>

          {/* Cancellation Policy */}
          <div>
            <h3 className="font-semibold text-[#1E1E1E] mb-3">Cancellation policy</h3>
            <p className="text-sm text-[#1E1E1E]/80 mb-3">
              {thingsToKnow.cancellation.policy}
            </p>
            <button
              onClick={() => handleShowMore('cancellation')}
              className="text-sm font-semibold text-[#3F6F63] underline hover:text-[#2d5248] transition-colors"
            >
              Show more
            </button>
          </div>
        </div>
      </div>

      {/* House Rules Modal */}
      {openModal === 'houseRules' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[#CBBBAA]/40 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#1E1E1E]">House rules</h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-[#F4EDE4] rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-[#1E1E1E]/80">
                You'll be staying in someone's home, so please treat it with care and respect.
              </p>
              
              <div>
                <h3 className="font-semibold text-[#1E1E1E] mb-3 flex items-center gap-2">
                  <Clock size={20} className="text-[#3F6F63]" />
                  Checking in and out
                </h3>
                <ul className="space-y-2 text-[#1E1E1E]/80">
                  <li className="flex items-start gap-3">
                    <Clock size={16} className="mt-1 text-[#3F6F63] flex-shrink-0" />
                    <span>{thingsToKnow.houseRules.checkIn}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={16} className="mt-1 text-[#3F6F63] flex-shrink-0" />
                    <span>{thingsToKnow.houseRules.checkout}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E1E1E] mb-3 flex items-center gap-2">
                  <Users size={20} className="text-[#3F6F63]" />
                  During your stay
                </h3>
                <ul className="space-y-2 text-[#1E1E1E]/80">
                  <li className="flex items-start gap-3">
                    <Users size={16} className="mt-1 text-[#3F6F63] flex-shrink-0" />
                    <span>{thingsToKnow.houseRules.guests}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#3F6F63] flex-shrink-0">🐾</span>
                    <span>{thingsToKnow.houseRules.pets}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Volume2 size={16} className="mt-1 text-[#3F6F63] flex-shrink-0" />
                    <div>
                      <div>{thingsToKnow.houseRules.quietHours}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Ban size={16} className="mt-1 text-[#3F6F63] flex-shrink-0" />
                    <span>{thingsToKnow.houseRules.noParties}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Camera size={16} className="mt-1 text-[#3F6F63] flex-shrink-0" />
                    <span>{thingsToKnow.houseRules.noCommercial}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Cigarette size={16} className="mt-1 text-[#3F6F63] flex-shrink-0" />
                    <span>{thingsToKnow.houseRules.noSmoking}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#1E1E1E] mb-3 flex items-center gap-2">
                  <FileText size={20} className="text-[#3F6F63]" />
                  Additional rules
                </h3>
                <ul className="space-y-2 text-[#1E1E1E]/80">
                  {thingsToKnow.houseRules.additionalRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D7A44E] mt-2 flex-shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Safety Modal */}
      {openModal === 'safety' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[#CBBBAA]/40 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#1E1E1E]">Safety & property</h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-[#F4EDE4] rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-[#3F6F63] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#1E1E1E] mb-1">{thingsToKnow.safety.carbonMonoxide}</div>
                  <div className="text-sm text-[#1E1E1E]/70">This property has a carbon monoxide alarm installed.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-[#3F6F63] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#1E1E1E] mb-1">{thingsToKnow.safety.smokeAlarm}</div>
                  <div className="text-sm text-[#1E1E1E]/70">Smoke alarms are installed throughout the property.</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-[#3F6F63] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#1E1E1E] mb-1">{thingsToKnow.safety.noise}</div>
                  <div className="text-sm text-[#1E1E1E]/70">The property is located in a residential area. Please be mindful of neighbors.</div>
                </div>
              </div>
              {thingsToKnow.safety.security && (
                <div className="flex items-start gap-3">
                  <Camera size={20} className="text-[#3F6F63] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-[#1E1E1E] mb-1">{thingsToKnow.safety.security}</div>
                    <div className="text-sm text-[#1E1E1E]/70">Security cameras are present for safety purposes.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Policy Modal */}
      {openModal === 'cancellation' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={handleCloseModal}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[#CBBBAA]/40 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[#1E1E1E]">Cancellation policy</h2>
              <button onClick={handleCloseModal} className="p-2 hover:bg-[#F4EDE4] rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-[#1E1E1E]/80">
                {thingsToKnow.cancellation.policy}
              </p>
              <div className="bg-[#F4EDE4] rounded-xl p-4 border border-[#CBBBAA]/40">
                <h3 className="font-semibold text-[#1E1E1E] mb-2">Full policy details</h3>
                <p className="text-sm text-[#1E1E1E]/80">
                  {thingsToKnow.cancellation.fullPolicy}
                </p>
              </div>
              <div className="pt-4 border-t border-[#CBBBAA]/40">
                <p className="text-sm text-[#1E1E1E]/70">
                  {thingsToKnow.cancellation.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
    <div className="min-h-screen bg-white text-[#1E1E1E]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <PhotoGallery />
      <PropertyDetails />
      
      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Description - Hidden on mobile (shown in photo overlay) */}
            <div className="hidden md:block border-b border-[#CBBBAA]/40 pb-8">
              <p className="text-[#1E1E1E]/80 leading-relaxed whitespace-pre-line">
                {SITE_CONFIG.description}
              </p>
            </div>
            {/* Mobile: Show description after photos */}
            <div className="md:hidden border-b border-[#CBBBAA]/40 pb-6">
              <p className="text-[#1E1E1E]/80 leading-relaxed text-sm">
                {SITE_CONFIG.description}
              </p>
            </div>

            <DirectBooking />
            <Amenities />
            <LocationMap />
            <Reviews />
            <MeetYourHost />
            <ThingsToKnow />
          </div>

          {/* Right Column - Booking Summary (Sticky, hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <BookingSummary />
          </div>
        </div>
      </div>

      <Contact />
      <Footer />
    </div>
  );
}

