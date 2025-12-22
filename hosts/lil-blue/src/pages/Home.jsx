import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import ContactSection from "../components/ContactSection";
import { SITE_CONFIG } from "../site-config";

const fade = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[80vh] overflow-hidden">
                <img
                    src={SITE_CONFIG.brand.heroImage}
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                    <motion.div {...fade} className="max-w-3xl text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{SITE_CONFIG.brand.name}</h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90">{SITE_CONFIG.brand.tagline}</p>
                        <Link
                            to="/properties"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E17654] text-white font-semibold rounded-xl hover:bg-[#C65A3A] transition-all shadow-lg text-lg"
                        >
                            View Our Properties <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Brand Story */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-[#1E1E1E] mb-6">Welcome to Paradise</h2>
                    <p className="text-lg text-[#1E1E1E]/80 leading-relaxed">
                        {SITE_CONFIG.brand.description}
                    </p>
                </div>
            </section>

            {/* Featured Properties Preview */}
            <section className="py-20 px-4 bg-[#FAF7F2]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#1E1E1E] mb-4">Featured Stays</h2>
                        <p className="text-[#1E1E1E]/70">Handpicked homes for your perfect vacation</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {SITE_CONFIG.properties.slice(0, 3).map((property) => (
                            <Link key={property.id} to={`/properties/${property.slug}`} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-[#CBBBAA]/30">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={property.heroImage}
                                            alt={property.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">{property.name}</h3>
                                        <p className="text-[#1E1E1E]/70 line-clamp-2 mb-4">{property.description}</p>
                                        <div className="flex items-center justify-between text-sm font-medium text-[#E17654]">
                                            <span>View Details</span>
                                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/properties"
                            className="inline-block px-8 py-3 border-2 border-[#3F6F63] text-[#3F6F63] font-semibold rounded-xl hover:bg-[#3F6F63] hover:text-white transition-all"
                        >
                            View All Properties
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <ContactSection />
        </div>
    );
}
