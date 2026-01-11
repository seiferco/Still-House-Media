import { motion } from "framer-motion";
import {
    Waves,
    UtensilsCrossed,
    Palmtree,
    ShoppingBag,
    Map,
    Sun,
    Anchor,
    Camera,
    FishSymbol,
    Binoculars
} from "lucide-react";


const attractions = [
    {
        id: 1,
        category: "Swimming",
        icon: Binoculars,
        title: "Swim With Manatees",
        description: "Crystal River is the only place in the U.S. where you can legally swim with manatees. Multiple reputable tour operators are just minutes away.",
        distance: "5 min drive",
        image: "/photos/attractions/to-do-trg1.jpg",
    },
    {
        id: 2,
        category: "Nature",
        icon: Waves,
        title: "Three Sisters Springs",
        description: "One of the clearest, most beautiful natural spring systems in Florida.",
        distance: "10 min drive",
        image: "/photos/attractions/to-do-trg2.jpg",
    },
    {
        id: 3,
        category: "Water Sports",
        icon: Waves,
        title: "Kayaking & Paddleboarding",
        description: "Launch directly from Lil’ Blue’s dock using the included kayaks or explore local launching spots.",
        distance: "15 min drive",
        image: "/photos/attractions/to-do-trg3.jpg",
    },
    {
        id: 4,
        category: "Nature",
        icon: Palmtree,
        title: "Fishing & Boating",
        description: "The Nature Coast is known for: Redfish, Snook, Trout, Flounder, Blue crabs. Tie up your boat at the house or use one of many local ramps, including the Fort Island Trail Boat Ramp.",
        distance: "20 min drive",
        image: "/photos/attractions/to-do-trg4.jpg",
    },
    {
        id: 5,
        category: "Shopping",
        icon: ShoppingBag,
        title: "Gulf Coast Beaches",
        description: "Enjoy soft sand, sunsets, and calm Gulf waters just a short drive away.",
        distance: "10 min drive",
        image: "/photos/attractions/to-do-trg5.jpg",
    },
    {
        id: 6,
        category: "Day Trips",
        icon: Map,
        title: "Wildlife Watching",
        description: "Explore Crystal River’s charming downtown: Seafood restaurants, Cafes, Bars, Grocery stores, Shopping",
        distance: "Shortmin drive",
        image: "/photos/attractions/to-do-trg6.jpg",
    },
    {
        id: 7,
        category: "Day Trips",
        icon: Map,
        title: "State Parks & Trails",
        description: "Explore Crystal River’s charming downtown: Seafood restaurants, Cafes, Bars, Grocery stores, Shopping",
        distance: "Shortmin drive",
        image: "/photos/attractions/to-do-trg7.jpg",
    },
    {
        id: 8,
        category: "Day Trips",
        icon: Map,
        title: "Local Dining & Shopping",
        description: "Explore Crystal River’s charming downtown: Seafood restaurants, Cafes, Bars, Grocery stores, Shopping",
        distance: "Shortmin drive",
        image: "/photos/attractions/to-do-trg8.jpg",
    },
    {
        id: 9,
        category: "Day Trips",
        icon: Map,
        title: "Learn The History",
        description: "Learn Native American history at this 61-acre National Historic Landmark, a ceremonial center active for about 1,600 years. Walk the six-mound complex and plaza, then climb Temple Mound A—the highest point in Crystal River.",
        distance: "Shortmin drive",
        image: "/photos/attractions/to-do-trg9.jpg",
    }
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
        <section className="py-20 px-4 bg-gradient-to-b from-[#F0F9FF] to-white" id="attractions">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
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
                        From stunning springs to charming downtown spots, discover everything Crystal River has to offer.
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
                            className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#E2E8F0] flex flex-col ${!attraction.image ? 'justify-between' : ''}`}
                        >
                            {/* Image (if available) */}
                            {attraction.image ? (
                                <div className="relative h-48 overflow-hidden flex-shrink-0">
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
                                </div>
                            ) : (
                                /* No Image: Icon Header */
                                <div className="p-6 pb-0 flex items-center gap-3">
                                    <div className="p-3 rounded-xl bg-[#CAF0F8] text-[#0077B6]">
                                        <attraction.icon size={24} />
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                                        {attraction.category}
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-lg font-bold text-[#1A365D] mb-3 group-hover:text-[#0077B6] transition-colors">
                                    {attraction.title}
                                </h3>
                                <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                                    {attraction.description}
                                </p>

                                {/* List Items (if available) */}
                                {attraction.hasList && (
                                    <ul className="mt-auto space-y-2">
                                        {attraction.listItems.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-[#64748B]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#0077B6] mt-1.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
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
