import { motion } from "framer-motion";
import {
    Waves,
    UtensilsCrossed,
    Palmtree,
    ShoppingBag,
    Map,
    Sun,
    Anchor,
    Camera
} from "lucide-react";

const attractions = [
    {
        id: 1,
        category: "Beaches",
        icon: Waves,
        title: "Pristine Gulf Beaches",
        description: "Crystal clear waters and white sandy beaches just minutes away. Perfect for swimming, sunbathing, and shell collecting.",
        distance: "5 min drive",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        category: "Dining",
        icon: UtensilsCrossed,
        title: "Local Seafood & Dining",
        description: "Fresh-caught seafood restaurants and waterfront dining experiences. From casual beach bars to upscale oceanfront establishments.",
        distance: "10 min drive",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        category: "Water Sports",
        icon: Anchor,
        title: "Water Adventures",
        description: "Kayaking, paddleboarding, jet skiing, and boat rentals. Explore the beautiful Florida waterways and discover marine life.",
        distance: "15 min drive",
        image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 4,
        category: "Nature",
        icon: Palmtree,
        title: "State Parks & Nature",
        description: "Explore stunning nature preserves, hiking trails, and wildlife sanctuaries. Perfect for eco-tours and photography.",
        distance: "20 min drive",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 5,
        category: "Shopping",
        icon: ShoppingBag,
        title: "Shopping & Entertainment",
        description: "Boutique shopping, outlet malls, and local artisan markets. Find unique souvenirs and Florida treasures.",
        distance: "10 min drive",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 6,
        category: "Day Trips",
        icon: Map,
        title: "Nearby Attractions",
        description: "Theme parks, aquariums, and historic sites all within easy reach. Create unforgettable family adventures.",
        distance: "45 min drive",
        image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&w=800&q=80",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export default function AttractionsSection() {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-[#CAF0F8]/30 to-white" id="attractions">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0077B6]/10 text-[#0077B6] text-sm font-medium mb-4">
                        <Sun size={16} />
                        <span>Things To Do</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Explore the Area
                    </h2>
                    <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
                        From stunning beaches to exciting adventures, discover everything our
                        Florida paradise has to offer during your stay.
                    </p>
                </motion.div>

                {/* Attractions Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {attractions.map((attraction) => (
                        <motion.div
                            key={attraction.id}
                            variants={cardVariants}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2E8F0]"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={attraction.image}
                                    alt={attraction.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D]/60 to-transparent" />

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#0077B6] text-xs font-semibold">
                                    <attraction.icon size={14} />
                                    {attraction.category}
                                </div>

                                {/* Distance Badge */}
                                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#0077B6] text-white text-xs font-medium">
                                    {attraction.distance}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#1A365D] mb-2 group-hover:text-[#0077B6] transition-colors">
                                    {attraction.title}
                                </h3>
                                <p className="text-[#64748B] text-sm leading-relaxed">
                                    {attraction.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <p className="text-[#64748B] mb-4">
                        Want more local recommendations? We're happy to share our favorite spots!
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#0077B6] text-[#0077B6] font-semibold hover:bg-[#0077B6] hover:text-white transition-all"
                    >
                        <Camera size={18} />
                        Ask Us for Tips
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
