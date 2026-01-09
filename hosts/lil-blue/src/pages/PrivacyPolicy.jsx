import { motion } from "framer-motion";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../site-config";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#FAFAFA] py-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Link */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[#0077B6] hover:text-[#005F92] mb-8 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0077B6]/10 text-[#0077B6] text-sm font-medium mb-4">
                        <Shield size={16} />
                        <span>Privacy</span>
                    </div>
                    <h1
                        className="text-4xl font-bold text-[#1A365D] mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Privacy Policy
                    </h1>
                    <p className="text-[#64748B]">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-8"
                >
                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">1. Information We Collect</h2>
                        <div className="text-[#64748B] leading-relaxed space-y-3">
                            <p>We collect information you provide directly to us, including:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Name, email address, and phone number</li>
                                <li>Billing and payment information</li>
                                <li>Booking dates and guest information</li>
                                <li>Communication preferences</li>
                                <li>Any other information you choose to provide</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">2. How We Use Your Information</h2>
                        <div className="text-[#64748B] leading-relaxed space-y-3">
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Process and manage your bookings</li>
                                <li>Communicate with you about your reservation</li>
                                <li>Send you marketing communications (with your consent)</li>
                                <li>Improve our services and customer experience</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">3. Information Sharing</h2>
                        <p className="text-[#64748B] leading-relaxed">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">4. Data Security</h2>
                        <p className="text-[#64748B] leading-relaxed">
                            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">5. Cookies</h2>
                        <p className="text-[#64748B] leading-relaxed">
                            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookies through your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">6. Your Rights</h2>
                        <div className="text-[#64748B] leading-relaxed space-y-3">
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Access and receive a copy of your personal data</li>
                                <li>Rectify inaccurate personal data</li>
                                <li>Request deletion of your personal data</li>
                                <li>Object to processing of your personal data</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">7. Contact Us</h2>
                        <p className="text-[#64748B] leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at{" "}
                            <a href={`mailto:${SITE_CONFIG.contact?.email || ""}`} className="text-[#0077B6] hover:underline">
                                {SITE_CONFIG.contact?.email || "our email"}
                            </a>.
                        </p>
                    </section>
                </motion.div>
            </div>
        </div>
    );
}
