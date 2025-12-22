import { useState, useEffect } from "react";
import { CalendarX, Key, Shield, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";

const fade = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

function PolicyModal({ title, content, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-none flex items-center justify-between px-6 py-4 bg-white border-b border-[#CBBBAA]/30">
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 rounded-full hover:bg-[#FAF7F2] transition-colors"
                    >
                        <X size={24} className="text-[#1E1E1E]" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                    <div className="text-base text-[#1E1E1E]/80 leading-relaxed whitespace-pre-line">
                        {content}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function ThingsToKnow({ property }) {
    if (!property.policies) return null;

    const { cancellation, houseRules, safety, houseRulesDetails, safetyDetails } = property.policies;
    const [activeModal, setActiveModal] = useState(null); // 'cancellation', 'houseRules', 'safety'

    const openModal = (type) => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    return (
        <section id="things-to-know" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-[#1E1E1E]">Things to know</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {/* Cancellation Policy */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <CalendarX size={24} className="text-[#1E1E1E]" />
                        <h3 className="text-xl font-semibold text-[#1E1E1E]">{cancellation.title}</h3>
                    </div>
                    <div className="text-[#1E1E1E]/80 leading-relaxed mb-4">
                        <p>{cancellation.description}</p>
                    </div>
                    <button
                        onClick={() => openModal('cancellation')}
                        className="flex items-center gap-1 font-semibold text-[#1E1E1E] underline hover:text-[#3F6F63] transition-colors mt-auto w-fit"
                    >
                        Show more <ChevronRight size={16} />
                    </button>
                </div>

                {/* House Rules */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <Key size={24} className="text-[#1E1E1E]" />
                        <h3 className="text-xl font-semibold text-[#1E1E1E]">House rules</h3>
                    </div>
                    <ul className="text-[#1E1E1E]/80 leading-relaxed space-y-2 mb-4">
                        {houseRules.slice(0, 5).map((rule, idx) => (
                            <li key={idx}>{rule}</li>
                        ))}
                    </ul>
                    <button
                        onClick={() => openModal('houseRules')}
                        className="flex items-center gap-1 font-semibold text-[#1E1E1E] underline hover:text-[#3F6F63] transition-colors mt-auto w-fit"
                    >
                        Show more <ChevronRight size={16} />
                    </button>
                </div>

                {/* Safety & Property */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                        <Shield size={24} className="text-[#1E1E1E]" />
                        <h3 className="text-xl font-semibold text-[#1E1E1E]">Safety & property</h3>
                    </div>
                    <ul className="text-[#1E1E1E]/80 leading-relaxed space-y-2 mb-4">
                        {safety.slice(0, 5).map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                    <button
                        onClick={() => openModal('safety')}
                        className="flex items-center gap-1 font-semibold text-[#1E1E1E] underline hover:text-[#3F6F63] transition-colors mt-auto w-fit"
                    >
                        Show more <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Modals */}
            {activeModal === 'cancellation' && (
                <PolicyModal
                    title={cancellation.title}
                    content={cancellation.details || cancellation.description}
                    onClose={closeModal}
                />
            )}
            {activeModal === 'houseRules' && (
                <PolicyModal
                    title="House Rules"
                    content={houseRulesDetails || houseRules.join('\n')}
                    onClose={closeModal}
                />
            )}
            {activeModal === 'safety' && (
                <PolicyModal
                    title="Safety & Property"
                    content={safetyDetails || safety.join('\n')}
                    onClose={closeModal}
                />
            )}
        </section>
    );
}
