import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { SITE_CONFIG } from "../site-config";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const contactInfo = [
        {
            icon: Phone,
            label: "Phone",
            value: SITE_CONFIG.contact?.phone || "Contact for phone",
            href: `tel:${SITE_CONFIG.contact?.phone || ""}`,
        },
        {
            icon: Mail,
            label: "Email",
            value: SITE_CONFIG.contact?.email || "Contact for email",
            href: `mailto:${SITE_CONFIG.contact?.email || ""}`,
        },
        {
            icon: MapPin,
            label: "Location",
            value: SITE_CONFIG.contact?.address || "Florida, USA",
            href: null,
        },
        {
            icon: Clock,
            label: "Response Time",
            value: "Usually within 24 hours",
            href: null,
        },
    ];

    return (
        <section id="contact" className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0077B6]/10 text-[#0077B6] text-sm font-medium mb-4">
                        <Mail size={16} />
                        <span>Get In Touch</span>
                    </div>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Have Questions?
                    </h2>
                    <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        className="lg:col-span-2 space-y-6"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {contactInfo.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F5F9] transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#0077B6]/10 flex items-center justify-center flex-shrink-0">
                                    <item.icon size={22} className="text-[#0077B6]" />
                                </div>
                                <div>
                                    <p className="text-sm text-[#64748B] mb-1">{item.label}</p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="font-medium text-[#1A365D] hover:text-[#0077B6] transition-colors"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="font-medium text-[#1A365D]">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:col-span-3"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-[#F8F9FA] rounded-2xl p-8 space-y-6"
                        >
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-[#1A365D] mb-2"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20 outline-none transition-all"
                                        placeholder="John Smith"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-[#1A365D] mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-[#1A365D] mb-2"
                                >
                                    Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20 outline-none transition-all"
                                    placeholder="(555) 123-4567"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-[#1A365D] mb-2"
                                >
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-white focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/20 outline-none transition-all resize-none"
                                    placeholder="Tell us about your trip plans, questions, or special requests..."
                                />
                            </div>

                            {/* Success Message */}
                            {isSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 p-4 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6]"
                                >
                                    <CheckCircle size={20} />
                                    <span className="font-medium">Thank you! We'll be in touch soon.</span>
                                </motion.div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0077B6] text-white font-semibold rounded-xl hover:bg-[#005F92] active:scale-[0.98] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
