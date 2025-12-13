import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Phone, Mail, ExternalLink, X, ChevronLeft, ChevronRight, Menu, Users, Bed, Bath, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "../site-config";

const fade = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const MotionDiv = motion.div;
const MotionImg = motion.img;

function ScriptLoader({ url }) {
    useEffect(() => {
        if (!url) return;
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = url;
            script.type = "module";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [url]);
    return null;
}

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

function PhotoGallery({ property }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const photos = [property.heroImage, ...property.photos];
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
                        alt={`${property.name} - Hero`}
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
                                            {property.tagline}
                                        </div>
                                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-0 md:mb-12 lg:mb-50 leading-tight">
                                            {property.name}
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
                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        <button
                                            onClick={() => document.getElementById('book').scrollIntoView({ behavior: 'smooth' })}
                                            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E17654] text-white font-semibold rounded-xl hover:bg-[#C65A3A] active:scale-95 transition-all shadow-lg shadow-[#E17654]/30 text-sm sm:text-base touch-manipulation min-h-[48px]"
                                        >
                                            Reserve Your Stay
                                            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                                        </button>
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

                    {/* Mobile Navigation */}
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

                    {/* Desktop Navigation */}
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
                            alt={`${property.name} photo ${selectedImage + 1}`}
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

function Gallery({ property }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const photos = property.photos;
    const maxVisible = 6;
    const visiblePhotos = photos.slice(0, maxVisible);
    const remainingCount = photos.length > maxVisible ? photos.length - maxVisible : 0;
    const allPhotos = [property.heroImage, ...property.photos];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedImage === null && !showAllPhotos) return;
            if (e.key === 'Escape') { setSelectedImage(null); setShowAllPhotos(false); }
            else if (selectedImage !== null) {
                if (e.key === 'ArrowLeft') { e.preventDefault(); setSelectedImage((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1)); }
                else if (e.key === 'ArrowRight') { e.preventDefault(); setSelectedImage((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0)); }
            }
        };
        if (selectedImage !== null || showAllPhotos) { document.addEventListener('keydown', handleKeyDown); document.body.style.overflow = 'hidden'; }
        return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = 'unset'; };
    }, [selectedImage, showAllPhotos, allPhotos.length]);

    const navigateImage = (direction) => {
        if (direction === 'prev') setSelectedImage((prev) => (prev > 0 ? prev - 1 : allPhotos.length - 1));
        else setSelectedImage((prev) => (prev < allPhotos.length - 1 ? prev + 1 : 0));
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
                            alt={`${property.name} photo ${idx + 1}`}
                            className="rounded-2xl h-52 w-full object-cover ring-1 ring-[#CBBBAA]/60 cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                            onClick={() => setSelectedImage(idx + 1)} // +1 because index 0 is hero
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
                        {allPhotos.length > 1 && (
                            <>
                                <button onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"><ChevronLeft size={32} /></button>
                                <button onClick={(e) => { e.stopPropagation(); navigateImage('next'); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-zinc-300 transition-colors p-2 bg-black/50 rounded-full hover:bg-black/70 z-10"><ChevronRight size={32} /></button>
                            </>
                        )}
                        <img src={allPhotos[selectedImage]} alt={`${property.name} photo ${selectedImage + 1}`} className="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto" onClick={(e) => e.stopPropagation()} />
                        <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 text-white text-sm"><span>{selectedImage + 1} / {allPhotos.length}</span></div>
                    </div>
                </div>
            )}
            {showAllPhotos && (
                <div className="fixed inset-0 z-50 bg-[#0F1514]/95 backdrop-blur-sm p-4 overflow-y-auto" onClick={() => setShowAllPhotos(false)}>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-6 sticky top-4 bg-[#0F1514]/60 backdrop-blur rounded-lg p-4 z-10 text-[#FAF7F2]">
                            <h3 className="text-xl font-semibold text-white">All Photos ({allPhotos.length})</h3>
                            <button onClick={() => setShowAllPhotos(false)} className="text-white hover:text-zinc-300 transition-colors p-2"><X size={32} /></button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {allPhotos.map((src, idx) => (
                                <img key={idx} src={src} alt={`${property.name} photo ${idx + 1}`} className="rounded-lg w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity ring-1 ring-[#CBBBAA]/60" onClick={(e) => { e.stopPropagation(); setShowAllPhotos(false); setSelectedImage(idx); }} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default function PropertyDetails() {
    const { id } = useParams();
    const property = SITE_CONFIG.properties.find(p => p.slug === id);

    if (!property) {
        return <Navigate to="/properties" replace />;
    }

    return (
        <div>
            <PhotoGallery property={property} />

            {/* Property Details Section */}
            <div className="bg-white border-b border-[#CBBBAA]/30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-4xl">
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-6 text-sm sm:text-base text-[#1E1E1E]/70 mb-8">
                            <span className="flex items-center gap-2"><Users size={18} className="text-[#3F6F63]" /><span className="font-medium">8 guests</span></span>
                            <span className="flex items-center gap-2"><Bed size={18} className="text-[#3F6F63]" /><span className="font-medium">3 bedrooms</span></span>
                            <span className="flex items-center gap-2"><Bath size={18} className="text-[#3F6F63]" /><span className="font-medium">2 baths</span></span>
                        </div>
                        <p className="text-lg md:text-xl text-[#1E1E1E]/80 leading-relaxed">{property.description}</p>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <Section id="highlights" eyebrow="Why you'll love it" title="Highlights">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {property.highlights.map((h, i) => (
                        <div key={i} className="rounded-2xl border border-[#CBBBAA]/70 p-6 bg-white flex items-center gap-4">
                            <div className="p-3 bg-[#E17654]/10 rounded-xl text-[#E17654]"><h.icon size={24} /></div>
                            <span className="font-semibold text-[#1E1E1E]">{h.label}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Gallery */}
            <Gallery property={property} />

            {/* Booking */}
            <Section id="book" title="Book Your Stay">
                <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-[#CBBBAA]/60 bg-white min-h-[600px]">
                    {property.booking?.hostexWidget ? (
                        <>
                            {/* Script Loader */}
                            <ScriptLoader url={property.booking.hostexWidget.scriptUrl} />
                            <hostex-booking-widget
                                listing-id={property.booking.hostexWidget.listingId}
                                id={property.booking.hostexWidget.widgetId}
                                style={{ width: "100%", height: "100%", minHeight: "800px", display: "block" }}
                            ></hostex-booking-widget>
                        </>
                    ) : property.booking?.hostexUrl ? (
                        <iframe
                            src={property.booking.hostexUrl}
                            className="w-full h-[800px] border-0"
                            title="Book Now"
                            loading="lazy"
                        />
                    ) : (
                        <div className="p-12 text-center text-zinc-500">Booking widget not configured.</div>
                    )}
                </div>
            </Section>

            {/* Amenities */}
            <Section id="amenities" title="Amenities">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.amenities.map((a, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#CBBBAA]/40">
                            <a.icon className="text-[#3F6F63]" size={20} />
                            <span className="text-[#1E1E1E] font-medium">{a.label}</span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Location */}
            <Section id="location" title="Location">
                <div>
                    <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                        <iframe
                            src={property.location.mapEmbed}
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                    <p className="text-xs text-[#1E1E1E]/60 text-center italic mt-2">
                        Location is approximate until booked
                    </p>
                </div>
            </Section>

        </div>
    );
}
