/**
 * Property Website Template
 * This file renders the full property website using the SITE_CONFIG
 */

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Phone, Mail, ExternalLink, X, ChevronLeft, ChevronRight, Menu, Users, Bed, Bath, Clock, Shield, AlertCircle, FileText, Calendar, Ban, Camera, Cigarette, Volume2, ArrowRight } from "lucide-react";
import { SITE_CONFIG, LISTING_CONFIG } from "./site-config.js";
import BookingWidget from "./components/BookingWidget.jsx";

const MotionDiv = motion.div;
const MotionImg = motion.img;

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "backdrop-blur-lg bg-[#FAF7F2]/90 border-b border-[#CBBBAA]/60 shadow-[0_20px_45px_-30px_rgba(30,30,30,0.45)] py-0" 
        : "bg-transparent border-transparent py-4"
    }`}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 sm:gap-3 group">
          <img
            src="/CBE-full-logo.png"
            alt="Coral Breeze Estate"
            className={`h-12 w-auto object-contain transition-all ${
              !isScrolled ? "brightness-0 invert drop-shadow-md" : ""
            }`} 
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {["gallery", "amenities", "location", "reviews", "contact"].map((link) => (
            <a
              key={link}
              className={`transition-colors ${
                isScrolled 
                  ? "text-[#3F6F63]/80 hover:text-[#3F6F63]" 
                  : "text-white/90 hover:text-white drop-shadow-sm"
              }`}
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
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-all shadow-md hover:shadow-lg ${
              isScrolled
                ? "bg-[#E17654] text-white hover:bg-[#C65A3A] shadow-[#E17654]/40"
                : "bg-white text-[#E17654] hover:bg-[#FFF5EE]"
            }`}
          >
            Book <ExternalLink size={16} />
          </a>
        </nav>

        {/* Mobile Hamburger Button - Touch-friendly */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden p-3 rounded-lg transition-colors touch-manipulation ${
            isScrolled 
              ? "text-[#3F6F63] hover:bg-[#F4EDE4] active:bg-[#E8DDD0]" 
              : "text-white hover:bg-white/10 active:bg-white/20"
          }`}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu - Touch-optimized */}
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

// Airbnb-style scrollable photo gallery
function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const photos = [...SITE_CONFIG.photos];

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
      {/* Luxury Full-Width Hero Section */}
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

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1514]/80 via-[#0F1514]/40 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between md:items-end md:justify-end">
            <div className="w-full px-4 sm:px-6 lg:px-8 pt-16 md:pt-0 md:pb-50">
              <div className="max-w-4xl">
                <MotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-white"
                >
                  {/* Tagline and Title - Higher on mobile, normal on desktop */}

                </MotionDiv>
              </div>
            </div>

            {/* Description and Buttons - Stay at bottom */}
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
                        const gallerySection = document.querySelector('#gallery') || document.querySelector('.photo-gallery-section');
                        if (gallerySection) {
                          gallerySection.scrollIntoView({ behavior: 'smooth' });
                        }
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

          {/* Navigation Arrows - Mobile (Touch-optimized) */}
          <div className="md:hidden">
            <button
              onClick={() => navigateMobile('prev')}
              className="absolute left-3 top-[35%] -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-white active:scale-95 transition-all z-20 touch-manipulation"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} className="text-[#1E1E1E]" />
            </button>
            <button
              onClick={() => navigateMobile('next')}
              className="absolute right-3 top-[35%] -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-white active:scale-95 transition-all z-20 touch-manipulation"
              aria-label="Next photo"
            >
              <ChevronRight size={20} className="text-[#1E1E1E]" />
            </button>

            {/* Photo Counter */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold z-20">
              {currentMobileIndex + 1} / {photos.length}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <button
              onClick={() => navigateMobile('prev')}
              className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-white transition-all z-20 hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} className="text-[#1E1E1E]" />
            </button>
            <button
              onClick={() => navigateMobile('next')}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-white transition-all z-20 hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight size={22} className="text-[#1E1E1E]" />
            </button>

            {/* Photo Counter */}
            <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold z-20">
              {currentMobileIndex + 1} / {photos.length}
            </div>
          </div>
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

// Luxury Photo Gallery Section (Storytelling) - Mobile Optimized
function PhotoGallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const allPhotos = [...SITE_CONFIG.photos];
  const displayPhotos = SITE_CONFIG.photos.slice(0, 6); // Show first 6 photos

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
          setSelectedImage((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1));
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSelectedImage((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0));
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
  }, [selectedImage, showAllPhotos, allPhotos.length]);

  const navigateImage = (direction) => {
    if (direction === 'prev') {
      setSelectedImage((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1));
    } else {
      setSelectedImage((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <>
      <div id="gallery" className="bg-white py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <div className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#3F6F63] mb-3 sm:mb-4">
              Visual Journey
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">
              Experience Every Moment
            </h2>
          </MotionDiv>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {displayPhotos.map((src, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl touch-manipulation active:scale-95 transition-transform"
                onClick={() => {
                  // +1 because allPhotos includes hero image at index 0
                  setSelectedImage(idx + 1);
                }}
              >
                <img
                  src={src}
                  alt={`${SITE_CONFIG.brand.name} - Photo ${idx + 1}`}
                  className="w-full h-48 sm:h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </MotionDiv>
            ))}
          </div>

          {SITE_CONFIG.photos.length > 6 && (
            <div className="text-center mt-6 sm:mt-8">
              <button
                onClick={() => setShowAllPhotos(true)}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[#3F6F63] text-[#3F6F63] font-semibold rounded-xl hover:bg-[#3F6F63] hover:text-white active:scale-95 transition-all touch-manipulation min-h-[48px] text-sm sm:text-base"
              >
                View All {allPhotos.length} Photos
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

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
            {allPhotos.length > 1 && (
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
            {allPhotos.length > 1 && (
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
              src={allPhotos[selectedImage]}
              alt={`${SITE_CONFIG.brand.name} photo ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 text-white text-sm">
              <span>{selectedImage + 1} / {allPhotos.length}</span>
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
                All Photos ({allPhotos.length})
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
              {allPhotos.map((src, idx) => (
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

// Luxury Property Details Section - Mobile Optimized
function PropertyDetails() {
  const { property, location } = SITE_CONFIG;

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
                {property.type} · {location.city}, {location.region}
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-6 text-sm sm:text-base text-[#1E1E1E]/70 mb-6 sm:mb-8">
                <span className="flex items-center gap-2">
                  <Users size={18} className="sm:w-5 sm:h-5 text-[#3F6F63] flex-shrink-0" />
                  <span className="font-medium">{property.guests} {property.guests === 1 ? 'guest' : 'guests'}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Bed size={18} className="sm:w-5 sm:h-5 text-[#3F6F63] flex-shrink-0" />
                  <span className="font-medium">{property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Bed size={18} className="sm:w-5 sm:h-5 text-[#3F6F63] flex-shrink-0" />
                  <span className="font-medium">{property.beds} {property.beds === 1 ? 'bed' : 'beds'}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Bath size={18} className="sm:w-5 sm:h-5 text-[#3F6F63] flex-shrink-0" />
                  <span className="font-medium">{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
                </span>
              </div>
            </div>

            {/* Full Description */}
            <div className="prose prose-sm sm:prose-lg max-w-none">
              <p className="text-base sm:text-lg md:text-xl text-[#1E1E1E]/80 leading-relaxed">
                {SITE_CONFIG.description}
              </p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}

// Luxury Booking Section - Mobile Optimized
function DirectBooking() {
  return (
    <div id="book" className="bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#3F6F63] mb-3 sm:mb-4">
            Reserve Your Stay
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">
            Plan Your Sedona Escape
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#1E1E1E]/70 max-w-2xl mx-auto px-4">
            Select your dates and secure your reservation at Coral Breeze Estate
          </p>
        </MotionDiv>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#FAF7F2] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-[#CBBBAA]/40 shadow-xl">
            <BookingWidget listingId={LISTING_CONFIG.id} />
          </div>
        </div>
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [blocked, setBlocked] = useState(new Set());
  const [validationError, setValidationError] = useState('');

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

  // Close expanded menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  // Fetch blocked dates
  useEffect(() => {
    const loadBlocked = async () => {
      const today = new Date();
      const threeMonthsLater = new Date(today);
      threeMonthsLater.setMonth(today.getMonth() + 3);

      const from = ymd(today);
      const to = ymd(threeMonthsLater);

      try {
        const url = withApiBase(`/blocked?from=${from}&to=${to}&listing=${LISTING_CONFIG.id}`);
        const res = await fetch(url);
        const j = await res.json();
        setBlocked(new Set(j.blocked));
      } catch (error) {
        console.error('Failed to fetch blocked dates:', error);
      }
    };

    loadBlocked();
  }, [withApiBase, ymd]);

  // Date validation helpers
  const isDateBlocked = (date) => {
    if (!date) return false;
    return blocked.has(ymd(date));
  };

  const hasBlockedDatesBetween = (start, end) => {
    if (!start || !end) return false;
    let current = new Date(start);
    const stopDate = new Date(end);

    while (current <= stopDate) {
      if (blocked.has(ymd(current))) return true;
      current.setDate(current.getDate() + 1);
    }
    return false;
  };

  // Handle date input changes
  const handleCheckInChange = (e) => {
    const dateValue = e.target.value;
    if (!dateValue) {
      setCheckIn(null);
      setCheckOut(null);
      setValidationError('');
      return;
    }

    const selectedDate = new Date(dateValue + 'T00:00:00');

    if (isDateBlocked(selectedDate)) {
      setValidationError('This date is unavailable');
      return;
    }

    setCheckIn(selectedDate);
    setValidationError('');

    // Check if existing checkout is still valid
    if (checkOut && hasBlockedDatesBetween(selectedDate, checkOut)) {
      setCheckOut(null);
      setValidationError('Date range crosses unavailable dates. Please select a new checkout date.');
    }

    // Emit event for sync
    window.dispatchEvent(new CustomEvent('booking-dates-selected', {
      detail: { checkIn: selectedDate, checkOut: checkOut && !hasBlockedDatesBetween(selectedDate, checkOut) ? checkOut : null }
    }));
  };

  const handleCheckOutChange = (e) => {
    const dateValue = e.target.value;
    if (!dateValue) {
      setCheckOut(null);
      setValidationError('');
      return;
    }

    const selectedDate = new Date(dateValue + 'T00:00:00');

    if (isDateBlocked(selectedDate)) {
      setValidationError('This date is unavailable');
      return;
    }

    if (checkIn && selectedDate <= checkIn) {
      setValidationError('Checkout must be after check-in');
      return;
    }

    if (checkIn && hasBlockedDatesBetween(checkIn, selectedDate)) {
      setValidationError('Date range crosses unavailable dates');
      return;
    }

    setCheckOut(selectedDate);
    setValidationError('');

    // Emit event for sync
    window.dispatchEvent(new CustomEvent('booking-dates-selected', {
      detail: { checkIn, checkOut: selectedDate }
    }));
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    return ymd(date);
  };

  const calculateTotal = () => {
    if (!nights) return LISTING_CONFIG.nightlyPrice;
    const basePrice = LISTING_CONFIG.nightlyPrice * nights;
    // Cleaning fee is added at checkout, not displayed on website
    return basePrice;
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
    <>
      {/* Collapsed: Book Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="group bg-gradient-to-r from-[#E17654] to-[#C65A3A] text-white rounded-full px-6 py-4 shadow-2xl hover:shadow-[#E17654]/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
        >
          <Calendar size={22} />
          <div className="text-left">
            <div className="text-sm font-bold">Book Now</div>
            <div className="text-xs opacity-90">${(nightlyPrice / 100).toLocaleString()}/night</div>
          </div>
        </button>
      )}

      {/* Expanded: Booking Widget */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />

          {/* Widget */}
          <div className="fixed bottom-8 right-8 z-50 border border-[#CBBBAA]/40 rounded-2xl p-6 shadow-2xl bg-white w-80 animate-slide-in">
            {/* Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-[#1E1E1E]/50 hover:text-[#1E1E1E] transition-colors"
              aria-label="Close booking menu"
            >
              <X size={20} />
            </button>

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

            {/* Date Selection Inputs */}
            <div className="border border-[#CBBBAA]/60 rounded-xl mb-4 overflow-hidden">
              <div className="grid grid-cols-2">
                <div className="p-4 border-r border-[#CBBBAA]/60">
                  <label className="text-xs font-semibold text-[#1E1E1E]/70 mb-1 block">CHECK-IN</label>
                  <input
                    type="date"
                    value={formatDateForInput(checkIn)}
                    onChange={handleCheckInChange}
                    min={ymd(new Date())}
                    className="w-full text-base font-medium text-[#1E1E1E] bg-transparent border-none outline-none focus:ring-0 p-0"
                  />
                </div>
                <div className="p-4">
                  <label className="text-xs font-semibold text-[#1E1E1E]/70 mb-1 block">CHECKOUT</label>
                  <input
                    type="date"
                    value={formatDateForInput(checkOut)}
                    onChange={handleCheckOutChange}
                    min={checkIn ? ymd(new Date(checkIn.getTime() + 86400000)) : ymd(new Date())}
                    disabled={!checkIn}
                    className="w-full text-base font-medium text-[#1E1E1E] bg-transparent border-none outline-none focus:ring-0 p-0 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Validation Error */}
            {validationError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {validationError}
              </div>
            )}

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
        </>
      )}
    </>
  );
}

// Luxury Amenities Section with Visual Cards
function Amenities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const maxVisible = 6;
  const visibleAmenities = SITE_CONFIG.amenities.slice(0, maxVisible);
  const hasMore = SITE_CONFIG.amenities.length > maxVisible;

  return (
    <>
      <div id="amenities" className="bg-[#FAF7F2] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="text-sm font-semibold tracking-[0.3em] uppercase text-[#3F6F63] mb-4">
              Premium Amenities
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-4">
              Every Detail, Curated
            </h2>
            <p className="text-lg md:text-xl text-[#1E1E1E]/70 max-w-2xl mx-auto">
              Thoughtfully designed spaces and amenities that elevate your Sedona experience
            </p>
          </MotionDiv>

          {/* Amenities Grid - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {visibleAmenities.map((a, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-[#CBBBAA]/40 hover:border-[#3F6F63]/40 hover:shadow-xl transition-all group touch-manipulation"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#E17654]/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#E17654]/20 transition-colors">
                  <a.icon size={24} className="sm:w-7 sm:h-7 text-[#E17654]" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-[#1E1E1E]">{a.label}</h3>
              </MotionDiv>
            ))}
          </div>

          {/* See All Button */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[#3F6F63] text-[#3F6F63] font-semibold rounded-xl hover:bg-[#3F6F63] hover:text-white active:scale-95 transition-all touch-manipulation min-h-[48px] text-sm sm:text-base"
              >
                See all {SITE_CONFIG.amenities.length} amenities
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* All Amenities Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="max-w-5xl mx-auto my-8 bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#CBBBAA]/40 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E1E1E]">
                All Amenities ({SITE_CONFIG.amenities.length})
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#1E1E1E]/50 hover:text-[#1E1E1E] transition-colors p-2"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SITE_CONFIG.amenities.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-lg hover:bg-[#FAF7F2] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#E17654]/10 flex items-center justify-center flex-shrink-0">
                      <a.icon size={20} className="text-[#E17654]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm sm:text-base font-semibold text-[#1E1E1E]">
                        {a.label}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Luxury Location Section with Storytelling - Mobile Optimized
function LocationMap() {
  return (
    <div id="location" className="bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#3F6F63] mb-3 sm:mb-4">
              Location
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-4 sm:mb-6">
              In the Heart of Red Rock Country
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#1E1E1E]/80 leading-relaxed mb-6 sm:mb-8">
              Coral Breeze Estate sits in the Village of Oak Creek, five minutes from Bell Rock trailheads and just south of Sedona proper. Mornings are for sunrise hikes up Cathedral Rock, afternoons for Southwest plates at The Hudson or farm-to-table bites at Elote Café, and evenings for stargazing on our desert terraces or wine flights at Page Springs Cellars.
            </p>
            <div className="space-y-2 sm:space-y-3">
              {SITE_CONFIG.checkin.details.slice(1, 6).map((detail, i) => (
                <div key={i} className="flex items-start gap-2 sm:gap-3">
                  <MapPin size={18} className="sm:w-5 sm:h-5 text-[#3F6F63] flex-shrink-0 mt-0.5 sm:mt-1" />
                  <span className="text-sm sm:text-base text-[#1E1E1E]/80">{detail}</span>
                </div>
              ))}
            </div>
          </MotionDiv>

          {SITE_CONFIG.location.mapEmbed && (
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#CBBBAA]/40 shadow-2xl"
            >
              <div className="relative w-full pb-[66.6%] sm:pb-[75%] h-0">
                <iframe
                  title={`${SITE_CONFIG.brand.name} Location Map`}
                  src={SITE_CONFIG.location.mapEmbed}
                  className="absolute top-0 left-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </MotionDiv>
          )}
        </div>
      </div>
    </div>
  );
}

// Luxury Reviews Section with Integrated Testimonials
function Reviews() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(5); // Show 5 reviews at a time in modal
  if (!SITE_CONFIG.reviews || SITE_CONFIG.reviews.length === 0) return null;

  const hasMoreThanThree = SITE_CONFIG.reviews.length > 3;
  const visibleReviews = SITE_CONFIG.reviews.slice(0, 3); // Always show 3 on page
  const featuredReview = SITE_CONFIG.reviews[0];
  const modalReviews = SITE_CONFIG.reviews.slice(0, reviewsToShow);
  const hasMoreInModal = reviewsToShow < SITE_CONFIG.reviews.length;

  return (
    <div id="reviews" className="bg-[#FAF7F2] py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#3F6F63] mb-3 sm:mb-4">
            Guest Experiences
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">
            Stories from Our Guests
          </h2>
        </MotionDiv>

        {/* Featured Review - Large Card - Mobile Optimized */}
        {featuredReview && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-8 sm:mb-12"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-[#CBBBAA]/40 shadow-xl">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#E17654] flex items-center justify-center text-white text-base sm:text-xl font-bold flex-shrink-0">
                  {featuredReview.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="text-lg sm:text-xl font-semibold text-[#1E1E1E]">{featuredReview.name}</div>
                  {featuredReview.date && (
                    <div className="text-xs sm:text-sm text-[#1E1E1E]/60">{featuredReview.date}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {Array.from({ length: featuredReview.rating }).map((_, j) => (
                  <Star key={j} size={18} className="sm:w-5 sm:h-5 fill-[#D7A44E] text-[#D7A44E]" />
                ))}
              </div>
              <p className="text-base sm:text-lg md:text-xl text-[#1E1E1E]/80 leading-relaxed">"{featuredReview.text}"</p>
            </div>
          </MotionDiv>
        )}

        {/* Additional Reviews Grid - Show 2 more (total 3) - Mobile Optimized */}
        {visibleReviews.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {visibleReviews.slice(1, 3).map((r, i) => (
              <MotionDiv
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#CBBBAA]/40 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E17654] flex items-center justify-center text-white text-sm sm:text-base font-semibold flex-shrink-0">
                    {r.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm sm:text-base text-[#1E1E1E]">{r.name}</div>
                    {r.date && (
                      <div className="text-xs text-[#1E1E1E]/60">{r.date}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={14} className="sm:w-4 sm:h-4 fill-[#D7A44E] text-[#D7A44E]" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#1E1E1E]/80 leading-relaxed">"{r.text}"</p>
              </MotionDiv>
            ))}
          </div>
        )}

        {hasMoreThanThree && (
          <div className="text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-[#3F6F63] font-semibold rounded-xl border-2 border-[#3F6F63] hover:bg-[#3F6F63] hover:text-white transition-all text-sm md:text-base"
            >
              View All {SITE_CONFIG.reviews.length} Reviews
              <ChevronRight size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        )}

        {/* Reviews Modal - Mobile Optimized */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-t-3xl sm:rounded-2xl md:rounded-3xl max-w-4xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Mobile Optimized */}
              <div className="sticky top-0 bg-white border-b border-[#CBBBAA]/40 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between z-10">
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E1E1E]">
                    All Reviews
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-[#1E1E1E]/70 mt-1">
                    {SITE_CONFIG.reviews.length} {SITE_CONFIG.reviews.length === 1 ? 'review' : 'reviews'}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 sm:p-3 hover:bg-[#F4EDE4] active:bg-[#E8DDD0] rounded-full transition-colors touch-manipulation flex-shrink-0 ml-4"
                  aria-label="Close modal"
                >
                  <X size={24} className="sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {modalReviews.map((r, i) => (
                  <div
                    key={i}
                    className="pb-4 md:pb-6 border-b border-[#CBBBAA]/30 last:border-0"
                  >
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E17654] flex items-center justify-center text-white text-sm md:text-base font-semibold flex-shrink-0">
                        {r.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base md:text-lg font-semibold text-[#1E1E1E]">{r.name}</div>
                        {r.date && (
                          <div className="text-xs md:text-sm text-[#1E1E1E]/60">{r.date}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2 md:mb-3">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} size={16} className="md:w-5 md:h-5 fill-[#D7A44E] text-[#D7A44E]" />
                      ))}
                    </div>
                    <p className="text-sm md:text-base text-[#1E1E1E]/80 leading-relaxed">"{r.text}"</p>
                  </div>
                ))}

                {/* Load More Button - Mobile Optimized */}
                {hasMoreInModal && (
                  <div className="text-center pt-4 pb-4 sm:pb-6">
                    <button
                      onClick={() => setReviewsToShow(prev => Math.min(prev + 5, SITE_CONFIG.reviews.length))}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#FAF7F2] text-[#3F6F63] font-semibold rounded-xl border-2 border-[#3F6F63] hover:bg-[#3F6F63] hover:text-white active:scale-95 transition-all text-sm sm:text-base touch-manipulation min-h-[48px]"
                    >
                      Load More Reviews
                      <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                    </button>
                    <p className="text-xs sm:text-sm text-[#1E1E1E]/60 mt-2">
                      Showing {reviewsToShow} of {SITE_CONFIG.reviews.length}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Luxury Meet Your Host Section - Mobile Optimized
function MeetYourHost() {
  const { host } = SITE_CONFIG;

  return (
    <div className="bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#FAF7F2] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-[#CBBBAA]/40"
          >
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E17654] flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                  {host.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#3F6F63] mb-2">
                  Your Hosts
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">
                  Meet {host.name}
                </h2>
                <p className="text-sm sm:text-base text-[#1E1E1E]/70 mb-4 sm:mb-6">
                  Hosted by {host.name} · Joined in {host.joined}
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-[#CBBBAA]/40">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Star size={18} className="sm:w-5 sm:h-5 fill-[#D7A44E] text-[#D7A44E]" />
                    <span className="text-sm sm:text-base text-[#1E1E1E]/80 font-medium">{host.responseRate} response rate</span>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <Clock size={18} className="sm:w-5 sm:h-5 text-[#3F6F63]" />
                    <span className="text-sm sm:text-base text-[#1E1E1E]/80 font-medium">{host.responseTime}</span>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-[#1E1E1E]/80 leading-relaxed">
                  {host.bio}
                </p>
              </div>
            </div>
          </MotionDiv>
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
      <div className="bg-[#FAF7F2] py-12 sm:py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <div className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#3F6F63] mb-3 sm:mb-4">
              Important Information
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">
              Things to Know
            </h2>
          </MotionDiv>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* House Rules - Mobile Optimized */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-[#1E1E1E] mb-2 sm:mb-3">House rules</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#1E1E1E]/80 mb-2 sm:mb-3">
                <li>{thingsToKnow.houseRules.checkIn}</li>
                <li>{thingsToKnow.houseRules.checkout}</li>
                <li>{thingsToKnow.houseRules.guests}</li>
              </ul>
              <button
                onClick={() => handleShowMore('houseRules')}
                className="text-xs sm:text-sm font-semibold text-[#3F6F63] underline hover:text-[#2d5248] transition-colors touch-manipulation min-h-[44px] flex items-center"
              >
                Show more
              </button>
            </div>

            {/* Safety & Property - Mobile Optimized */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-[#1E1E1E] mb-2 sm:mb-3">Safety & property</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-[#1E1E1E]/80 mb-2 sm:mb-3">
                <li>{thingsToKnow.safety.carbonMonoxide}</li>
                <li>{thingsToKnow.safety.smokeAlarm}</li>
                <li>{thingsToKnow.safety.noise}</li>
              </ul>
              <button
                onClick={() => handleShowMore('safety')}
                className="text-xs sm:text-sm font-semibold text-[#3F6F63] underline hover:text-[#2d5248] transition-colors touch-manipulation min-h-[44px] flex items-center"
              >
                Show more
              </button>
            </div>

            {/* Cancellation Policy - Mobile Optimized */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-[#1E1E1E] mb-2 sm:mb-3">Cancellation policy</h3>
              <p className="text-xs sm:text-sm text-[#1E1E1E]/80 mb-2 sm:mb-3">
                {thingsToKnow.cancellation.policy}
              </p>
              <button
                onClick={() => handleShowMore('cancellation')}
                className="text-xs sm:text-sm font-semibold text-[#3F6F63] underline hover:text-[#2d5248] transition-colors touch-manipulation min-h-[44px] flex items-center"
              >
                Show more
              </button>
            </div>
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

// Luxury Contact Section - Mobile Optimized
function Contact() {
  return (
    <div id="contact" className="bg-white py-12 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#3F6F63] mb-3 sm:mb-4">
            Get in Touch
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">
            Questions? We're Here to Help
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#1E1E1E]/70 max-w-2xl mx-auto px-4">
            Reach out anytime—we're committed to making your stay exceptional
          </p>
        </MotionDiv>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#FAF7F2] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-[#CBBBAA]/40 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-[#CBBBAA]/40 hover:border-[#E17654] active:scale-95 transition-all hover:shadow-lg touch-manipulation"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#E17654] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <Phone size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#3F6F63]/70 mb-1">Phone</div>
                  <div className="text-base sm:text-xl font-bold text-[#1E1E1E] group-hover:text-[#E17654] transition-colors">
                    {SITE_CONFIG.contact.phone}
                  </div>
                </div>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-[#CBBBAA]/40 hover:border-[#3F6F63] active:scale-95 transition-all hover:shadow-lg touch-manipulation"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#3F6F63] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                  <Mail size={24} className="sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-[0.2em] text-[#3F6F63]/70 mb-1">Email</div>
                  <div className="text-sm sm:text-lg font-bold text-[#1E1E1E] group-hover:text-[#3F6F63] transition-colors break-all">
                    {SITE_CONFIG.contact.email}
                  </div>
                </div>
              </a>
            </div>
            {SITE_CONFIG.contact.responseTime && (
              <div className="text-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-[#CBBBAA]/40">
                <div className="inline-flex items-center gap-2 text-sm sm:text-base text-[#1E1E1E]/70">
                  <Star size={16} className="sm:w-[18px] sm:h-[18px] fill-[#D7A44E] text-[#D7A44E]" />
                  <span className="font-medium">{SITE_CONFIG.contact.responseTime}</span>
                </div>
              </div>
            )}
            <div className="text-center">
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl px-8 sm:px-10 py-4 sm:py-5 bg-[#E17654] text-white font-bold text-base sm:text-lg shadow-lg shadow-[#E17654]/30 hover:bg-[#C65A3A] hover:shadow-xl active:scale-95 transition-all touch-manipulation min-h-[48px]"
              >
                Reserve Your Stay
                <ArrowRight size={20} className="sm:w-[22px] sm:h-[22px]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <div id="property-site" className="min-h-screen bg-white text-[#1E1E1E]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <PhotoGallery />
      <PropertyDetails />

      {/* Photo Gallery Section */}
      <PhotoGallerySection />

      <Amenities />
      <DirectBooking />
      <LocationMap />
      <Reviews />
      <MeetYourHost />
      <ThingsToKnow />

      {/* Floating Booking Widget - Desktop Only */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-40">
        <BookingSummary />
      </div>

      <Contact />
      <Footer />
    </div>
  );
}

