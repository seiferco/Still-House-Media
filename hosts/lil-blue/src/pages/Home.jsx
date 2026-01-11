import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Star,
    CheckCircle,
    Users,
    Calendar,
    Award,
    Sparkles
} from "lucide-react";
import ContactSection from "../components/ContactSection";
import AttractionsSection from "../components/AttractionsSection";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import { SITE_CONFIG } from "../site-config";

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Stats data
const stats = [
    { icon: Star, value: "5.0", label: "Guest Rating", color: "#FFB347" },
    { icon: Users, value: "500+", label: "Happy Guests", color: "#0077B6" },
    { icon: Calendar, value: "24hr", label: "Response Time", color: "#14B8A6" },
    { icon: Award, value: "4+", label: "Years Hosting", color: "#FF6B6B" },
];

// Property highlights
const highlights = [
    "Steps from pristine beaches",
    "Fully equipped modern kitchen",
    "High-speed WiFi throughout",
    "Private parking included",
    "Smart TV with streaming",
    "Fresh linens & towels provided",
];

export default function Home() {
    return (
        <div className="bg-[#FAFAFA]">
            {/* Hero Section */}
            <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={SITE_CONFIG.brand.heroImage}
                        alt="Vacation rental hero"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1A365D]/20 via-[#1A365D]/40 to-[#1A365D]/80" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                        <motion.div
                            className="max-w-3xl"
                            initial="initial"
                            animate="animate"
                            variants={stagger}
                        >
                            {/* Badge */}
                            <motion.div
                                variants={fadeUp}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6"
                            >
                                <Sparkles size={16} className="text-[#FFB347]" />
                                <span>Florida's Premier Vacation Rentals</span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h1
                                variants={fadeUp}
                                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight mb-6"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {SITE_CONFIG.brand.name}
                            </motion.h1>

                            {/* Tagline */}
                            <motion.p
                                variants={fadeUp}
                                className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed"
                            >
                                {SITE_CONFIG.brand.tagline}
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                variants={fadeUp}
                                className="flex flex-wrap gap-4"
                            >
                                <Link
                                    to="/properties"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#0077B6] text-white font-semibold rounded-xl hover:bg-[#005F92] transition-all shadow-lg hover:shadow-xl text-lg"
                                >
                                    View Properties
                                    <ArrowRight size={20} />
                                </Link>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 transition-all border border-white/30 text-lg"
                                >
                                    Contact Us
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center pt-2">
                        <div className="w-1.5 h-3 rounded-full bg-white/80" />
                    </div>
                </motion.div>
            </section>

            {/* Stats Bar */}
            <section className="relative -mt-16 z-20 px-4">
                <motion.div
                    className="mx-auto max-w-5xl bg-white rounded-2xl shadow-xl p-6 md:p-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div
                                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                                    style={{ backgroundColor: `${stat.color}20` }}
                                >
                                    <stat.icon size={24} style={{ color: stat.color }} />
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-[#1A365D]">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-[#64748B]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Welcome Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#CAF0F8] text-[#0077B6] text-sm font-medium mb-4">
                                <span>Welcome</span>
                            </div>
                            <h2
                                className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-6"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Your Perfect Florida Escape Awaits
                            </h2>
                            <p className="text-lg text-[#64748B] leading-relaxed mb-8">
                                {SITE_CONFIG.brand.description}
                            </p>

                            {/* Highlights Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle size={20} className="text-[#14B8A6] flex-shrink-0" />
                                        <span className="text-[#1A365D] text-sm">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Image Grid */}
                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="space-y-4">
                                <img
                                    src="/photos/gallery-4.jpg"
                                    alt="Beach house exterior"
                                    className="w-full h-48 object-cover rounded-2xl shadow-md"
                                />
                                <img
                                    src="/photos/gallery-9.jpg"
                                    alt="Living room interior"
                                    className="w-full h-32 object-cover rounded-2xl shadow-md"
                                />
                            </div>
                            <div className="space-y-4 pt-8">
                                <img
                                    src="/photos/gallery-17.jpg"
                                    alt="Kitchen"
                                    className="w-full h-32 object-cover rounded-2xl shadow-md"
                                />
                                <img
                                    src="/photos/gallery-39.jpg"
                                    alt="Beach view"
                                    className="w-full h-48 object-cover rounded-2xl shadow-md"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="py-20 px-4 bg-gradient-to-b from-[#F1F5F9] to-white">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Our Properties
                        </h2>
                        <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
                            Handpicked vacation homes designed for your perfect getaway
                        </p>
                    </motion.div>

                    {/* Properties Grid */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={stagger}
                    >
                        {SITE_CONFIG.properties.slice(0, 3).map((property) => (
                            <motion.div key={property.id} variants={fadeUp}>
                                <Link
                                    to={`/properties/${property.slug}`}
                                    className="group block"
                                >
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2E8F0]">
                                        {/* Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={property.heroImage}
                                                alt={property.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Price Badge */}
                                            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-sm">
                                                <span className="font-bold text-[#1A365D]">
                                                    ${property.nightlyPrice || 199}
                                                </span>
                                                <span className="text-[#64748B] text-sm">/night</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
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
                                            <h3 className="text-xl font-bold text-[#1A365D] mb-2 group-hover:text-[#0077B6] transition-colors">
                                                {property.name}
                                            </h3>
                                            <p className="text-[#64748B] line-clamp-2 mb-4 text-sm">
                                                {property.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-[#64748B]">
                                                    {property.guests || 6} guests • {property.bedrooms || 2} beds
                                                </span>
                                                <ArrowRight
                                                    size={18}
                                                    className="text-[#0077B6] group-hover:translate-x-1 transition-transform"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* View All Button */}
                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Link
                            to="/properties"
                            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#0077B6] text-[#0077B6] font-semibold rounded-xl hover:bg-[#0077B6] hover:text-white transition-all"
                        >
                            View All Properties
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 px-4 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2
                                className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-6"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Why Guests Love Staying With Us
                            </h2>
                            <div className="space-y-6 text-lg text-[#64748B] leading-relaxed">
                                <p>
                                    At Tide Ridge Getaways, our commitment to you goes beyond providing a place to stay—we’re dedicated to delivering a truly exceptional, 5-star experience every single time.
                                </p>
                                <p>
                                    From the moment you arrive at our charming waterfront home in Crystal River, Florida, we focus on the little details that make your getaway unforgettable. Our cozy, modern retreat is meticulously cleaned, thoughtfully furnished, and ready to welcome you with everything you need for relaxation and adventure: a private dock for sunset views, complimentary kayaks to explore the life rich waters, a fully equipped kitchen, and a game room for indoor fun on rainy days.
                                </p>
                                <p>
                                    We treat every guest like family because we understand that your time away is precious. Our goal is simple: to ensure you leave with memories full of peace, joy, and that rare feeling of being perfectly taken care of.
                                </p>
                                <p>
                                    We’re proud that our guests consistently rate their stays with us 5 stars, praising the spotless cleanliness, serene location, and genuine hospitality. Your satisfaction isn’t just our priority—it’s the heart of everything we do.
                                </p>
                            </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <div className="aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/5] relative">
                                    <img
                                        src="/photos/about-experience.jpg"
                                        alt="Host at Blue Springs"
                                        className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                {/* Ornamental overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D]/40 to-transparent pointer-events-none" />
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#CAF0F8] rounded-full -z-10 blur-xl opacity-70" />
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#FFB347]/20 rounded-full -z-10 blur-xl" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Attractions Section */}
            <AttractionsSection />

            {/* Testimonials */}
            <TestimonialsCarousel />

            {/* CTA Banner */}
            <section className="py-20 px-4 bg-gradient-to-r from-[#0077B6] to-[#00B4D8]">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2
                        className="text-3xl md:text-4xl font-bold text-white mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Ready for Your Florida Adventure?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Book directly with us and save on fees. Get the best rates,
                        personalized service, and instant confirmation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/properties"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0077B6] font-bold rounded-xl hover:bg-[#F8F9FA] transition-all shadow-lg text-lg"
                        >
                            Browse Properties
                            <ArrowRight size={20} />
                        </Link>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white hover:bg-white/10 transition-all text-lg"
                        >
                            Have Questions?
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Contact Section */}
            <ContactSection />
        </div>
    );
}
