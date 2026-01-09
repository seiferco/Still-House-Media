import { motion } from "framer-motion";
import { ArrowLeft, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../site-config";

export default function CancellationPolicy() {
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
                        <Calendar size={16} />
                        <span>Booking Policy</span>
                    </div>
                    <h1
                        className="text-4xl font-bold text-[#1A365D] mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Cancellation Policy
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
                    className="space-y-8"
                >
                    {/* Overview Card */}
                    <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
                        <h2 className="text-xl font-bold text-[#1A365D] mb-6">Cancellation Timeline</h2>

                        <div className="space-y-6">
                            {/* 30+ days */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#14B8A6]/10 border border-[#14B8A6]/20">
                                <CheckCircle size={24} className="text-[#14B8A6] flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-[#1A365D] mb-1">
                                        30+ days before check-in
                                    </h3>
                                    <p className="text-[#64748B]">
                                        <span className="font-semibold text-[#14B8A6]">Full refund</span> of all payments, minus any non-refundable service fees.
                                    </p>
                                </div>
                            </div>

                            {/* 14-29 days */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FFB347]/10 border border-[#FFB347]/20">
                                <AlertCircle size={24} className="text-[#FFB347] flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-[#1A365D] mb-1">
                                        14-29 days before check-in
                                    </h3>
                                    <p className="text-[#64748B]">
                                        <span className="font-semibold text-[#FFB347]">50% refund</span> of the total booking amount.
                                    </p>
                                </div>
                            </div>

                            {/* Less than 14 days */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FF6B6B]/10 border border-[#FF6B6B]/20">
                                <AlertCircle size={24} className="text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-[#1A365D] mb-1">
                                        Less than 14 days before check-in
                                    </h3>
                                    <p className="text-[#64748B]">
                                        <span className="font-semibold text-[#FF6B6B]">No refund</span>. Full payment is non-refundable.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-[#1A365D] mb-4">How to Cancel</h2>
                            <p className="text-[#64748B] leading-relaxed">
                                To cancel your reservation, please contact us directly via email or phone. Include your booking confirmation number and the primary guest's name. Cancellations must be received in writing to be processed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1A365D] mb-4">Modifications</h2>
                            <p className="text-[#64748B] leading-relaxed">
                                Changes to your reservation (dates, number of guests, etc.) are subject to availability and may result in rate adjustments. Please contact us as soon as possible if you need to modify your booking.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1A365D] mb-4">Weather & Emergencies</h2>
                            <p className="text-[#64748B] leading-relaxed">
                                In the event of a mandatory evacuation order or extreme weather event that makes the property inaccessible, we will work with you to reschedule your stay or provide a full refund for affected nights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1A365D] mb-4">Early Departure</h2>
                            <p className="text-[#64748B] leading-relaxed">
                                If you choose to leave early for any reason, no refund will be provided for unused nights. We recommend purchasing travel insurance to protect your investment.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-[#1A365D] mb-4">Contact Us</h2>
                            <p className="text-[#64748B] leading-relaxed">
                                If you have any questions about our cancellation policy, please contact us at{" "}
                                <a href={`mailto:${SITE_CONFIG.contact?.email || ""}`} className="text-[#0077B6] hover:underline">
                                    {SITE_CONFIG.contact?.email || "our email"}
                                </a>.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
