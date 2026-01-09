import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Star, Bed, Bath } from "lucide-react";
import { SITE_CONFIG } from "../site-config";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function Properties() {
    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-[#0077B6] to-[#00B4D8] py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1
                            className="text-4xl md:text-5xl font-bold text-white mb-4"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Our Properties
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Discover exceptional vacation rentals for your perfect Florida getaway
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="initial"
                        animate="animate"
                        variants={stagger}
                    >
                        {SITE_CONFIG.properties.map((property) => (
                            <motion.div key={property.id} variants={fadeUp}>
                                <Link
                                    to={`/properties/${property.slug}`}
                                    className="group block h-full"
                                >
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2E8F0] h-full flex flex-col">
                                        {/* Image Container */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={property.heroImage}
                                                alt={property.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />

                                            {/* Location Badge */}
                                            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#1A365D] text-xs font-semibold shadow-sm">
                                                <MapPin size={12} />
                                                {property.location?.city || "Florida"}, {property.location?.region || "FL"}
                                            </div>

                                            {/* Price Badge */}
                                            <div className="absolute bottom-4 right-4 px-4 py-2 rounded-xl bg-[#1A365D]/90 backdrop-blur-sm text-white shadow-lg">
                                                <span className="font-bold text-lg">${property.nightlyPrice || 199}</span>
                                                <span className="text-white/80 text-sm">/night</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className="text-[#FFB347] fill-[#FFB347]"
                                                    />
                                                ))}
                                                <span className="text-sm text-[#64748B] ml-1">5.0</span>
                                            </div>

                                            {/* Title & Tagline */}
                                            <h2 className="text-xl font-bold text-[#1A365D] mb-1 group-hover:text-[#0077B6] transition-colors">
                                                {property.name}
                                            </h2>
                                            <p className="text-sm text-[#0077B6] font-medium mb-3">
                                                {property.tagline}
                                            </p>

                                            {/* Description */}
                                            <p className="text-[#64748B] text-sm line-clamp-2 mb-4 flex-grow">
                                                {property.description}
                                            </p>

                                            {/* Property Details */}
                                            <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4 pt-4 border-t border-[#E2E8F0]">
                                                <div className="flex items-center gap-1.5">
                                                    <Users size={16} className="text-[#0077B6]" />
                                                    <span>{property.guests || 6} guests</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Bed size={16} className="text-[#0077B6]" />
                                                    <span>{property.bedrooms || 2} beds</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Bath size={16} className="text-[#0077B6]" />
                                                    <span>{property.bathrooms || 2} baths</span>
                                                </div>
                                            </div>

                                            {/* CTA */}
                                            <div className="w-full py-3 bg-[#F1F5F9] text-[#0077B6] font-semibold rounded-xl text-center group-hover:bg-[#0077B6] group-hover:text-white transition-all flex items-center justify-center gap-2">
                                                View Details
                                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* CTA Section */}
            <motion.section
                className="py-16 px-4 bg-[#CAF0F8]/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h2
                        className="text-2xl md:text-3xl font-bold text-[#1A365D] mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Need Help Choosing?
                    </h2>
                    <p className="text-[#64748B] mb-6">
                        Not sure which property is right for your group? We're happy to help you find the perfect fit.
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#0077B6] text-white font-semibold rounded-xl hover:bg-[#005F92] transition-all shadow-lg"
                    >
                        Contact Us
                        <ArrowRight size={18} />
                    </a>
                </div>
            </motion.section>
        </div>
    );
}
