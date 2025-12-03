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
    const photos = [property.heroImage, ...property.photos];

    // ... (Keep existing gallery logic, simplified for brevity)
    // Note: For production, copy the full logic from the original PropertySite.jsx

    return (
        <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
            <img
                src={photos[currentMobileIndex]}
                alt="Hero"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1514]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
                <div className="max-w-4xl mx-auto">
                    <p className="text-sm font-bold tracking-widest uppercase mb-2 text-[#E17654]">{property.tagline}</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{property.name}</h1>
                    <button
                        onClick={() => document.getElementById('book').scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-[#E17654] text-white font-bold rounded-xl hover:bg-[#C65A3A] transition-colors shadow-lg"
                    >
                        Reserve Your Stay
                    </button>
                </div>
            </div>
        </div>
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
