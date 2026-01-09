import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../site-config";

export default function TermsOfService() {
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
                        <FileText size={16} />
                        <span>Legal</span>
                    </div>
                    <h1
                        className="text-4xl font-bold text-[#1A365D] mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Terms of Service
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
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">1. Agreement to Terms</h2>
                        <p className="text-[#64748B] leading-relaxed">
                            By accessing or using {SITE_CONFIG.brand.name}'s website and booking services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">2. Booking and Reservations</h2>
                        <div className="text-[#64748B] leading-relaxed space-y-3">
                            <p>When making a reservation, you agree to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Provide accurate and complete information</li>
                                <li>Be at least 25 years of age (unless accompanied by a parent/guardian)</li>
                                <li>Use the property only for lawful purposes</li>
                                <li>Not exceed the maximum occupancy listed for the property</li>
                                <li>Pay all applicable fees, taxes, and deposits as required</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">3. Payment Terms</h2>
                        <div className="text-[#64748B] leading-relaxed space-y-3">
                            <p>
                                Full payment is required at the time of booking unless otherwise specified. We accept major credit cards and other payment methods as displayed during checkout.
                            </p>
                            <p>
                                A security deposit may be required and will be refunded within 7-14 business days after checkout, pending inspection of the property.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">4. Property Rules</h2>
                        <div className="text-[#64748B] leading-relaxed space-y-3">
                            <p>All guests are expected to:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Respect quiet hours as specified in the property guidelines</li>
                                <li>Keep the property clean and report any damages immediately</li>
                                <li>Dispose of trash properly and follow recycling guidelines</li>
                                <li>Not smoke inside the property (unless explicitly permitted)</li>
                                <li>Follow all local laws and ordinances</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">5. Liability</h2>
                        <p className="text-[#64748B] leading-relaxed">
                            {SITE_CONFIG.brand.name} is not liable for any injury, loss, or damage to persons or property during your stay. Guests use all amenities and facilities at their own risk. We recommend guests obtain travel insurance for their protection.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">6. Modifications</h2>
                        <p className="text-[#64748B] leading-relaxed">
                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this website. Your continued use of our services constitutes acceptance of any modifications.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1A365D] mb-4">7. Contact Us</h2>
                        <p className="text-[#64748B] leading-relaxed">
                            If you have any questions about these Terms of Service, please contact us at{" "}
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
