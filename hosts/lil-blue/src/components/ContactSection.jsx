import { Mail, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "../site-config";

export default function ContactSection() {
    const { email } = SITE_CONFIG.contact;

    return (
        <section id="contact" className="py-20 px-4 bg-white border-t border-[#CBBBAA]/20">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block p-3 bg-[#E17654]/10 rounded-full mb-6">
                    <MessageSquare size={32} className="text-[#E17654]" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-4">
                    Have Questions?
                </h2>
                <p className="text-lg text-[#1E1E1E]/70 mb-10 max-w-xl mx-auto">
                    Whether you're ready to book or just have a few questions about the property,
                    we're here to help you plan your perfect stay.
                </p>

                <div className="max-w-md mx-auto">
                    {/* Email Card/Button */}
                    <a
                        href={`mailto:${email}`}
                        className="group flex flex-col items-center p-8 rounded-2xl border border-[#CBBBAA]/40 bg-[#FAF7F2] hover:bg-white hover:shadow-xl hover:border-[#E17654]/30 transition-all duration-300"
                    >
                        <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                            <Mail size={24} className="text-[#3F6F63]" />
                        </div>
                        <h3 className="font-semibold text-lg text-[#1E1E1E] mb-1">Email Us</h3>
                        <p className="text-[#1E1E1E]/60 text-sm mb-4">We usually respond within an hour</p>
                        <span className="text-[#E17654] font-medium group-hover:underline">{email}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
