import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah & Michael",
        location: "Chicago, IL",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        text: "Absolutely stunning property! The views were incredible and everything was spotlessly clean. The host was incredibly responsive and gave us great local recommendations. We'll definitely be back!",
        date: "November 2024",
    },
    {
        id: 2,
        name: "The Johnson Family",
        location: "Atlanta, GA",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        text: "Perfect family vacation! The kids loved the beach access and the home had everything we needed. Kitchen was fully stocked and the beds were so comfortable. Highly recommend!",
        date: "October 2024",
    },
    {
        id: 3,
        name: "David L.",
        location: "New York, NY",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        text: "This was our 3rd visit and it keeps getting better. The recent renovations look amazing and the attention to detail is unmatched. Best vacation rental we've ever stayed at.",
        date: "September 2024",
    },
    {
        id: 4,
        name: "Emily & Tom",
        location: "Boston, MA",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        text: "We celebrated our anniversary here and it was magical. The sunset views from the deck are breathtaking. The property is exactly as described - actually even better in person!",
        date: "August 2024",
    },
];

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance every 5 seconds
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const navigate = (direction) => {
        if (direction === "prev") {
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        } else {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }
    };

    const renderStars = (count) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={16}
                className={i < count ? "text-[#FFB347] fill-[#FFB347]" : "text-gray-300"}
            />
        ));
    };

    return (
        <section
            className="py-20 px-4 bg-[#1A365D]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                        What Our Guests Say
                    </h2>
                    <p className="text-lg text-white/70">
                        Hear from travelers who have experienced our Florida paradise
                    </p>
                </motion.div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Quote Icon */}
                    <Quote
                        size={80}
                        className="absolute -top-4 left-4 text-[#0077B6]/20 z-0"
                    />

                    {/* Testimonial Card */}
                    <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.4 }}
                                className="p-8 md:p-12"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        <img
                                            src={testimonials[currentIndex].avatar}
                                            alt={testimonials[currentIndex].name}
                                            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-[#CAF0F8]"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4">
                                            {renderStars(testimonials[currentIndex].rating)}
                                        </div>

                                        {/* Text */}
                                        <p className="text-[#1A365D] text-lg md:text-xl leading-relaxed mb-6 italic">
                                            "{testimonials[currentIndex].text}"
                                        </p>

                                        {/* Author */}
                                        <div>
                                            <p className="font-semibold text-[#1A365D]">
                                                {testimonials[currentIndex].name}
                                            </p>
                                            <p className="text-[#64748B] text-sm">
                                                {testimonials[currentIndex].location} • {testimonials[currentIndex].date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <button
                        onClick={() => navigate("prev")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1A365D] hover:bg-[#0077B6] hover:text-white transition-all z-20"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => navigate("next")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1A365D] hover:bg-[#0077B6] hover:text-white transition-all z-20"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex
                                ? "bg-[#00B4D8] w-8"
                                : "bg-white/30 hover:bg-white/50"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
