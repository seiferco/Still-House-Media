import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, Phone, Mail, ExternalLink, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Menu, Users, Bed, Bath, ArrowRight, Calendar } from "lucide-react";
import ContactSection from "../components/ContactSection";
import ThingsToKnow from "../components/ThingsToKnow";
import MapboxMap from "../components/MapboxMap";
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
                className="rounded-3xl bg-[#F8F9FA] border border-[#E2E8F0]/60 shadow-[0_25px_60px_-30px_rgba(30,30,30,0.35)] px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12"
            >
                {eyebrow && (
                    <div className="text-xs font-semibold tracking-[0.35em] uppercase text-[#0077B6]/80 mb-4">
                        {eyebrow}
                    </div>
                )}
                {title && (
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#1A365D] mb-6">{title}</h2>
                )}
                {children}
            </MotionDiv>
        </section>
    );
}

function ExpandableDescription({ description, maxLength = 500, propertyName = "About this space" }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const shouldTruncate = description.length > maxLength;

    // Find a good breaking point (end of line or sentence) near maxLength
    const getTruncatedText = () => {
        if (!shouldTruncate) return description;

        // Look for a line break near maxLength
        const nearMaxLength = description.substring(0, maxLength);
        const lastNewline = nearMaxLength.lastIndexOf('\n');

        if (lastNewline > maxLength * 0.6) {
            return description.substring(0, lastNewline);
        }

        // Otherwise, break at the last space before maxLength
        const lastSpace = nearMaxLength.lastIndexOf(' ');
        return description.substring(0, lastSpace > 0 ? lastSpace : maxLength);
    };

    const displayText = getTruncatedText();

    // Handle escape key and body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <>
            <div className="relative">
                <div className="text-base md:text-lg text-[#1A365D]/80 leading-relaxed whitespace-pre-line">
                    {displayText}
                    {shouldTruncate && '...'}
                </div>

                {shouldTruncate && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 inline-flex items-center gap-2 text-[#0077B6] hover:text-[#335b52] font-semibold transition-colors group underline underline-offset-4"
                    >
                        <span>Show More</span>
                        <ChevronRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                )}
            </div>

            {/* Description Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsModalOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-[#E2E8F0]/30">
                            <h3 className="text-xl font-semibold text-[#1A365D]">{propertyName}</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 -mr-2 rounded-full hover:bg-[#F8F9FA] transition-colors"
                            >
                                <X size={24} className="text-[#1A365D]" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                            <div className="text-base md:text-lg text-[#1A365D]/80 leading-relaxed whitespace-pre-line">
                                {description}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}

/* Amenities Modal Component */
function AmenitiesModal({ isOpen, onClose, property }) {
    // Handle escape key and body scroll lock
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-[#E2E8F0]/30">
                    <h3 className="text-xl font-semibold text-[#1A365D]">Amenities</h3>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-full hover:bg-[#F8F9FA] transition-colors"
                    >
                        <X size={24} className="text-[#1A365D]" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="px-6 py-8 overflow-y-auto max-h-[calc(85vh-80px)]">
                    <div className="space-y-12">
                        {property.amenities.map((category, idx) => (
                            <div key={idx}>
                                <h4 className="text-lg font-bold text-[#1A365D] mb-6 flex items-center gap-3">
                                    <span className="w-1 h-6 bg-[#0077B6] rounded-full" />
                                    {category.category}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                                    {category.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 py-1 min-w-0">
                                            <div className="flex-shrink-0 p-2 bg-[#F8FAFC] rounded-lg text-[#0077B6]">
                                                <item.icon size={20} />
                                            </div>
                                            <span className="text-[#1A365D]/80 font-medium break-words min-w-0">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function AmenitiesSection({ property }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Flatten all amenities to get a preview list
    const allAmenities = property.amenities.flatMap(cat => cat.items);
    const previewAmenities = allAmenities.slice(0, 8);
    const totalCount = allAmenities.length;

    return (
        <Section id="amenities" title="Amenities">
            <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-10">
                    {previewAmenities.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl border border-[#E2E8F0]/50 bg-white hover:border-[#0077B6]/30 hover:shadow-md transition-all group min-h-[80px] min-w-0">
                            <div className="flex-shrink-0 p-2.5 md:p-3 bg-gradient-to-br from-[#CAF0F8] to-white rounded-xl text-[#0077B6] group-hover:scale-110 transition-transform">
                                <item.icon size={20} className="md:w-6 md:h-6" />
                            </div>
                            <span className="font-semibold text-[#1A365D] text-sm md:text-base leading-tight break-words min-w-0">{item.label}</span>
                        </div>
                    ))}
                </div>

                {totalCount > 8 && (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-4 bg-white border-2 border-[#1A365D] text-[#1A365D] font-bold rounded-xl hover:bg-[#1A365D] hover:text-white transition-all shadow-sm flex items-center gap-2"
                        >
                            Show all {totalCount} amenities
                        </button>
                    </div>
                )}

                <AmenitiesModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    property={property}
                />
            </div>
        </Section>
    );
}


function Reviews({ property }) {
    return (
        <Section id="reviews" eyebrow="What guests say" title="Guest Reviews">
            <div className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-[#E2E8F0]/60">
                <div className="elfsight-app-15e1c5a3-cfb5-42f0-8897-579b6773535e" data-elfsight-app-lazy></div>
            </div>
        </Section>
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
                                        <div className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-white/90 mb-3 drop-shadow-md">
                                            {property.tagline}
                                        </div>
                                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-0 md:mb-12 lg:mb-50 leading-tight">
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
                                            onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0077B6] text-white font-semibold rounded-xl hover:bg-[#C65A3A] active:scale-95 transition-all shadow-lg shadow-[#0077B6]/30 text-sm sm:text-base touch-manipulation min-h-[48px]"
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
                            <ChevronLeft size={20} className="text-[#1A365D]" />
                        </button>
                        <button
                            onClick={() => navigateMobile('next')}
                            className="absolute right-3 top-[35%] -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-xl hover:bg-white active:scale-95 transition-all z-20 touch-manipulation"
                        >
                            <ChevronRight size={20} className="text-[#1A365D]" />
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
                            <ChevronLeft size={22} className="text-[#1A365D]" />
                        </button>
                        <button
                            onClick={() => navigateMobile('next')}
                            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl hover:bg-white transition-all z-20 hover:scale-110"
                        >
                            <ChevronRight size={22} className="text-[#1A365D]" />
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
                            className="rounded-2xl h-52 w-full object-cover ring-1 ring-[#E2E8F0]/60 cursor-pointer hover:opacity-90 transition-opacity shadow-sm"
                            onClick={() => setSelectedImage(idx + 1)} // +1 because index 0 is hero
                        />
                    ))}
                    {remainingCount > 0 && (
                        <div
                            className="rounded-2xl h-52 w-full bg-[#0077B6] flex items-center justify-center cursor-pointer hover:bg-[#335b52] transition-colors ring-1 ring-[#0077B6]/40 shadow-lg shadow-[#0077B6]/30"
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
                        <div className="flex items-center justify-between mb-6 sticky top-4 bg-[#0F1514]/60 backdrop-blur rounded-lg p-4 z-10 text-[#F8F9FA]">
                            <h3 className="text-xl font-semibold text-white">All Photos ({allPhotos.length})</h3>
                            <button onClick={() => setShowAllPhotos(false)} className="text-white hover:text-zinc-300 transition-colors p-2"><X size={32} /></button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {allPhotos.map((src, idx) => (
                                <img key={idx} src={src} alt={`${property.name} photo ${idx + 1}`} className="rounded-lg w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity ring-1 ring-[#E2E8F0]/60" onClick={(e) => { e.stopPropagation(); setShowAllPhotos(false); setSelectedImage(idx); }} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* Custom Calendar Component */
function CustomCalendar({ selectedDate, onSelect, blockedDates = [], minDate, onClose }) {
    const [viewDate, setViewDate] = useState(() => {
        if (selectedDate) {
            const [y, m, d] = selectedDate.split('-').map(Number);
            return new Date(y, m - 1, d);
        }
        return new Date();
    });

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const monthName = viewDate.toLocaleString('default', { month: 'long' });

    const handlePrevMonth = (e) => {
        e.stopPropagation();
        setViewDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = (e) => {
        e.stopPropagation();
        setViewDate(new Date(year, month + 1, 1));
    };

    const isDateBlocked = (dateStr) => blockedDates.includes(dateStr);
    const isDatePast = (dateStr) => minDate && dateStr < minDate;

    const days = [];
    // Padding for first day of week
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10 md:h-9 md:w-9" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const fullDate = new Date(year, month, d);
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

        const isBlocked = isDateBlocked(dateStr);
        const isPast = isDatePast(dateStr);
        const isDisabled = isBlocked || isPast;
        const isSelected = selectedDate === dateStr;

        days.push(
            <button
                key={d}
                disabled={isDisabled}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(dateStr);
                }}
                className={`
                    h-10 w-10 md:h-9 md:w-9 flex items-center justify-center rounded-xl text-sm font-medium transition-all
                    ${isSelected ? 'bg-[#0077B6] text-white shadow-md' : ''}
                    ${!isSelected && !isDisabled ? 'hover:bg-[#F1F5F9] text-[#1A365D]' : ''}
                    ${isDisabled ? 'text-[#CBD5E1] cursor-not-allowed opacity-50' : ''}
                    ${isBlocked && !isPast ? 'line-through decoration-[#ef4444]/60' : ''}
                `}
            >
                {d}
            </button>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] p-4 w-[280px] md:w-[300px] absolute top-full left-0 md:left-auto md:right-0 mt-2 z-50 animate-in fade-in zoom-in duration-200 origin-top" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-1.5 hover:bg-[#F1F5F9] rounded-lg transition-colors">
                    <ChevronLeft size={18} className="text-[#1A365D]" />
                </button>
                <h4 className="font-bold text-[#1A365D] text-sm">{monthName} {year}</h4>
                <button onClick={handleNextMonth} className="p-1.5 hover:bg-[#F1F5F9] rounded-lg transition-colors">
                    <ChevronRight size={18} className="text-[#1A365D]" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                    <div key={`${day}-${idx}`} className="h-8 flex items-center justify-center text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                        {day}
                    </div>
                ))}
                {days}
            </div>

            <div className="mt-3 pt-3 border-t border-[#F1F5F9] flex items-center justify-end">
                <button onClick={onClose} className="text-[#0077B6] text-[11px] font-bold hover:underline">Close</button>
            </div>
        </div>
    );
}

/* Booking Inputs Component */
function BookingInputs({ property, blockedDates = [] }) {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(2);
    const [isGuestOpen, setIsGuestOpen] = useState(false);
    const [isCheckInOpen, setIsCheckInOpen] = useState(false);
    const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
    const [error, setError] = useState("");

    const minCheckOutDate = (() => {
        if (!checkIn) return today;
        const [y, m, d] = checkIn.split('-').map(Number);
        const next = new Date(y, m - 1, d);
        next.setDate(next.getDate() + 1);
        return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}-${String(next.getDate()).padStart(2, '0')}`;
    })();

    // Close picker when clicking outside
    useEffect(() => {
        const handleClick = () => {
            setIsCheckInOpen(false);
            setIsCheckOutOpen(false);
            setIsGuestOpen(false);
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleCheckInSelect = (val) => {
        setCheckIn(val);
        setIsCheckInOpen(false);
        setError("");

        // Auto-suggest checkout if invalid or not set (must be at least 1 night after check-in)
        if (!checkOut || val >= checkOut) {
            const [y, m, d] = val.split('-').map(Number);
            const nextDay = new Date(y, m - 1, d);
            nextDay.setDate(nextDay.getDate() + 1);
            const nextDayStr = `${nextDay.getFullYear()}-${String(nextDay.getMonth() + 1).padStart(2, '0')}-${String(nextDay.getDate()).padStart(2, '0')}`;
            setCheckOut(nextDayStr);
        }
    };

    const handleCheckOutSelect = (val) => {
        setCheckOut(val);
        setIsCheckOutOpen(false);
        setError("");
    };

    const handleSearch = () => {
        if (!checkIn || !checkOut) {
            setError("Please select both check-in and check-out dates.");
            return;
        }

        // Check availability against blocked dates
        const [sy, sm, sd] = checkIn.split('-').map(Number);
        const [ey, em, ed] = checkOut.split('-').map(Number);
        const start = new Date(sy, sm - 1, sd);
        const end = new Date(ey, em - 1, ed);

        if (start >= end) {
            setError("Check-out must be at least one night after check-in.");
            return;
        }

        const selectedDates = [];
        let curr = new Date(start);

        while (curr < end) {
            const dStr = `${curr.getFullYear()}-${String(curr.getMonth() + 1).padStart(2, '0')}-${String(curr.getDate()).padStart(2, '0')}`;
            selectedDates.push(dStr);
            curr.setDate(curr.getDate() + 1);
        }

        const isUnavailable = selectedDates.some(date => blockedDates.includes(date));
        if (isUnavailable) {
            setError("One or more of your selected dates are already booked. Please try different dates.");
            return;
        }

        const widgetConfig = property.booking?.hostexWidget;
        if (!widgetConfig) return;

        // Decode host_id and widget_host from the widgetId (base64)
        let hostId = "103639"; // Fallback from example
        let widgetHost = "https://w.hostexbooking.site";

        try {
            const decoded = JSON.parse(atob(widgetConfig.widgetId));
            hostId = decoded.host_id || hostId;
            widgetHost = decoded.widget_host || widgetHost;
        } catch (e) {
            console.error("Failed to decode Hostex widgetId", e);
        }

        const baseUrl = `${widgetHost}/book/${widgetConfig.listingId}`;

        const params = new URLSearchParams();
        params.append("check_in", checkIn);
        params.append("check_out", checkOut);
        params.append("listing_id", widgetConfig.listingId);
        params.append("host_id", hostId);
        params.append("site_type", "1");
        params.append("adults", guests.toString());
        params.append("children", "0");
        params.append("infants", "0");
        params.append("pets", "0");
        params.append("rate_plan_id", "14470"); // Specific to this listing from working example
        params.append("origin", window.location.href);

        const fullUrl = `${baseUrl}?${params.toString()}`;
        window.open(fullUrl, '_blank');
    };

    // Helper for display dates
    const formatDate = (dateStr) => {
        if (!dateStr) return "Add date";
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-[#E2E8F0]">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#1A365D] mb-1">Book Your Stay</h3>
                <p className="text-[#64748B] text-sm">Select dates and guest count to view pricing.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <p>{error}</p>
                </div>
            )}
            <div className="space-y-4">
                {/* Dates Container */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Check In */}
                    <div className="relative">
                        <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 ml-1">Check In</label>
                        <div className="relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsCheckInOpen(!isCheckInOpen); setIsCheckOutOpen(false); setIsGuestOpen(false); }}
                                className={`w-full flex items-center gap-3 pl-10 pr-4 py-3 bg-[#F8F9FA] border ${error && !checkIn ? 'border-red-300' : 'border-[#E2E8F0]'} rounded-xl focus:ring-2 focus:ring-[#0077B6] outline-none text-[#1A365D] font-medium transition-all hover:bg-white text-left shadow-sm`}
                            >
                                <span className={checkIn ? "text-[#1A365D]" : "text-[#94A3B8]"}>{formatDate(checkIn)}</span>
                            </button>
                            <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0077B6]" />

                            {isCheckInOpen && (
                                <CustomCalendar
                                    selectedDate={checkIn}
                                    onSelect={handleCheckInSelect}
                                    blockedDates={blockedDates}
                                    minDate={today}
                                    onClose={() => setIsCheckInOpen(false)}
                                />
                            )}
                        </div>
                    </div>

                    {/* Check Out */}
                    <div className="relative">
                        <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 ml-1">Check Out</label>
                        <div className="relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsCheckOutOpen(!isCheckOutOpen); setIsCheckInOpen(false); setIsGuestOpen(false); }}
                                className={`w-full flex items-center gap-3 pl-10 pr-4 py-3 bg-[#F8F9FA] border ${error && !checkOut ? 'border-red-300' : 'border-[#E2E8F0]'} rounded-xl focus:ring-2 focus:ring-[#0077B6] outline-none text-[#1A365D] font-medium transition-all hover:bg-white text-left shadow-sm`}
                            >
                                <span className={checkOut ? "text-[#1A365D]" : "text-[#94A3B8]"}>{formatDate(checkOut)}</span>
                            </button>
                            <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0077B6]" />

                            {isCheckOutOpen && (
                                <CustomCalendar
                                    selectedDate={checkOut}
                                    onSelect={handleCheckOutSelect}
                                    blockedDates={blockedDates}
                                    minDate={minCheckOutDate}
                                    onClose={() => setIsCheckOutOpen(false)}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Guests */}
                <div className="relative">
                    <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 ml-1">Guests</label>
                    <button
                        onClick={(e) => { e.stopPropagation(); setIsGuestOpen(!isGuestOpen); setIsCheckInOpen(false); setIsCheckOutOpen(false); }}
                        className="w-full flex items-center justify-between pl-10 pr-4 py-3 bg-[#F8F9FA] border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#0077B6] outline-none text-[#1A365D] font-medium text-left transition-all hover:bg-white shadow-sm"
                    >
                        <span>{guests} Guest{guests !== 1 ? 's' : ''}</span>
                        {isGuestOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    <Users size={18} className="absolute left-3.5 top-[42px] text-[#0077B6]" />

                    {/* Guest Dropdown */}
                    {isGuestOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#E2E8F0] p-4 z-20 animate-in fade-in zoom-in duration-200 origin-top" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between">
                                <span className="text-[#1A365D] font-medium">Adults & Children</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setGuests(Math.max(1, guests - 1))}
                                        className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#0077B6] hover:bg-[#F0F9FF] disabled:opacity-50"
                                        disabled={guests <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="w-4 text-center font-bold text-[#1A365D]">{guests}</span>
                                    <button
                                        onClick={() => setGuests(Math.min(property.guests || 10, guests + 1))}
                                        className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#0077B6] hover:bg-[#F0F9FF]"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsGuestOpen(false)}
                                className="w-full mt-4 py-2 bg-[#F8F9FA] text-[#0077B6] font-semibold rounded-lg hover:bg-[#E0F2FE] transition-colors text-sm"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>

                {/* Search Button */}
                <div className="pt-4">
                    <button
                        onClick={handleSearch}
                        className="w-full py-4 bg-[#0077B6] text-white font-bold rounded-xl hover:bg-[#005F92] transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg"
                    >
                        Check Availability
                        <ArrowRight size={20} />
                    </button>
                </div>
                <div className="mt-6 pt-6 border-t border-[#F1F5F9] text-center">
                    <p className="text-xs text-[#64748B]">You won't be charged yet</p>
                </div>
            </div>
        </div>
    );
}

function BookingSection({ property, blockedDates }) {
    return (
        <Section id="book" title="Book Your Stay">
            <div className="relative">
                <BookingInputs property={property} blockedDates={blockedDates} />

                <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-[#E2E8F0]/60 bg-white min-h-[500px] flex flex-col items-center justify-center p-4 sm:p-8">
                    {property.booking?.hostexWidget ? (
                        <>
                            {/* Script Loader */}
                            <ScriptLoader url={property.booking.hostexWidget.scriptUrl} />
                            <hostex-booking-widget
                                listing-id={property.booking.hostexWidget.listingId}
                                id={property.booking.hostexWidget.widgetId}
                                style={{ width: "100%", height: "100%", minHeight: "600px", display: "block" }}
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
            </div>
        </Section>
    );
}

export default function PropertyDetails() {
    const { id } = useParams();
    const property = SITE_CONFIG.properties.find(p => p.slug === id);
    const [blockedDates, setBlockedDates] = useState([]);

    useEffect(() => {
        if (property?.booking?.hostexPropertyId) {
            fetch(`/api/hostex/availability/${property.booking.hostexPropertyId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.blockedDates) {
                        setBlockedDates(data.blockedDates);
                    }
                })
                .catch(err => console.error("Failed to fetch availability:", err));
        }
    }, [property]);

    if (!property) {
        return <Navigate to="/properties" replace />;
    }

    return (
        <div className="bg-[#F8FAFC]">
            <PhotoGallery property={property} />

            <div id="book" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12 relative">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Property Details Intro */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E2E8F0]/50">
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-6 text-sm sm:text-base text-[#1A365D]/70 mb-8 pb-8 border-b border-[#F1F5F9]">
                                <span className="flex items-center gap-2"><Users size={18} className="text-[#0077B6]" /><span className="font-medium">8 guests</span></span>
                                <span className="flex items-center gap-2"><Bed size={18} className="text-[#0077B6]" /><span className="font-medium">3 bedrooms</span></span>
                                <span className="flex items-center gap-2"><Bath size={18} className="text-[#0077B6]" /><span className="font-medium">2 baths</span></span>
                            </div>
                            <ExpandableDescription description={property.description} maxLength={500} propertyName={`About ${property.name}`} />
                        </div>

                        {/* Highlights */}
                        <div id="highlights" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#1A365D] mb-6 flex items-center gap-2">
                                <div className="w-2 h-8 bg-[#0077B6] rounded-full" />
                                Highlights
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {property.highlights.map((h, i) => (
                                    <div key={i} className="rounded-2xl border border-[#E2E8F0]/70 p-6 bg-white flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="p-3 bg-[#0077B6]/10 rounded-xl text-[#0077B6]"><h.icon size={24} /></div>
                                        <span className="font-semibold text-[#1A365D]">{h.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery */}
                        <div className="scroll-mt-24">
                            <Gallery property={property} />
                        </div>

                        {/* Amenities */}
                        <div className="scroll-mt-24">
                            <AmenitiesSection property={property} />
                        </div>

                        {/* Hostex Widget Section (Legacy placement but now part of flow) */}
                        <div id="availability" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#1A365D] mb-6 flex items-center gap-2">
                                <div className="w-2 h-8 bg-[#0077B6] rounded-full" />
                                Availability
                            </h2>
                            <div className="w-full rounded-3xl overflow-hidden shadow-lg border border-[#E2E8F0]/60 bg-white min-h-[500px] flex flex-col items-center justify-center p-4 sm:p-8">
                                {property.booking?.hostexWidget ? (
                                    <>
                                        {/* Script Loader */}
                                        <ScriptLoader url={property.booking.hostexWidget.scriptUrl} />
                                        <hostex-booking-widget
                                            listing-id={property.booking.hostexWidget.listingId}
                                            id={property.booking.hostexWidget.widgetId}
                                            style={{ width: "100%", height: "100%", minHeight: "600px", display: "block" }}
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
                        </div>

                        {/* Reviews */}
                        <div className="scroll-mt-24">
                            <Reviews property={property} />
                        </div>

                        {/* Things to Know */}
                        <div className="scroll-mt-24">
                            <ThingsToKnow property={property} />
                        </div>

                        {/* Location */}
                        <div id="location" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#1A365D] mb-6 flex items-center gap-2">
                                <div className="w-2 h-8 bg-[#0077B6] rounded-full" />
                                Location
                            </h2>
                            <div className="rounded-3xl overflow-hidden shadow-lg h-[400px] border border-[#E2E8F0]">
                                <MapboxMap 
                                    latitude={property.location.latitude} 
                                    longitude={property.location.longitude} 
                                    token={property.location.mapboxToken} 
                                />
                            </div>
                            <p className="text-xs text-[#1A365D]/60 text-center italic mt-4">
                                Location is approximate until booked
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Sticky Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24">
                            <BookingInputs property={property} blockedDates={blockedDates} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Booking Bar / Inputs (Fallback or stay at bottom) */}
            <div className="lg:hidden px-4 pb-12">
                <BookingInputs property={property} blockedDates={blockedDates} />
            </div>

            {/* Contact */}
            <ContactSection />
        </div>
    );
}
