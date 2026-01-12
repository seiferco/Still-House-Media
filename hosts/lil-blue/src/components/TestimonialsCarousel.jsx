import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SITE_CONFIG } from "../site-config.js";

const MotionDiv = motion.div;
const fade = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function TestimonialsCarousel() {
    // Unused carousel logic removed in favor of grid layout
    // if needed in the future, it can be restored from history.


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

    return (
        <Section id="reviews" eyebrow="What guests say" title="Guest Reviews">
            <div className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-[#E2E8F0]/60">
                <div className="elfsight-app-15e1c5a3-cfb5-42f0-8897-579b6773535e" data-elfsight-app-lazy></div>
            </div>
        </Section>
    );
}
