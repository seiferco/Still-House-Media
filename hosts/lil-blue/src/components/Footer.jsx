import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Twitter,
    Heart,
    ExternalLink
} from "lucide-react";
import { SITE_CONFIG } from "../site-config";

const footerLinks = {
    quickLinks: [
        { label: "Home", path: "/" },
        { label: "Properties", path: "/properties" },
        { label: "Book Now", path: "/properties" },
        { label: "Contact", path: "#contact" },
    ],
    legal: [
        { label: "Terms of Service", path: "/terms-of-service" },
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Cancellation Policy", path: "/cancellation-policy" },
    ],
};

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#1A365D] text-white">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6 group">
                            <img
                                src="/favicon.png"
                                alt={SITE_CONFIG.brand.name}
                                className="h-12 w-12 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform"
                            />
                            <span className="font-semibold text-xl text-white">
                                {SITE_CONFIG.brand.name}
                            </span>
                        </Link>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                            Experience the perfect Florida getaway. Our vacation rentals offer comfort,
                            style, and unforgettable memories just steps from the beach.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077B6] transition-colors"
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white/90">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-white/70 hover:text-[#00B4D8] transition-colors text-sm inline-flex items-center gap-2"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white/90">
                            Policies
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-white/70 hover:text-[#00B4D8] transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-sm uppercase tracking-wider mb-5 text-white/90">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#00B4D8] mt-0.5 flex-shrink-0" />
                                <span className="text-white/70 text-sm">
                                    {SITE_CONFIG.contact?.address || "Florida, USA"}
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[#00B4D8] flex-shrink-0" />
                                <a
                                    href={`tel:${SITE_CONFIG.contact?.phone || ""}`}
                                    className="text-white/70 hover:text-white transition-colors text-sm"
                                >
                                    {SITE_CONFIG.contact?.phone || "Contact for phone"}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#00B4D8] flex-shrink-0" />
                                <a
                                    href={`mailto:${SITE_CONFIG.contact?.email || ""}`}
                                    className="text-white/70 hover:text-white transition-colors text-sm"
                                >
                                    {SITE_CONFIG.contact?.email || "Contact for email"}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                        <div className="text-white/60">
                            © {currentYear} {SITE_CONFIG.brand.name}. All rights reserved.
                        </div>
                        <div className="flex items-center gap-1 text-white/60">
                            <span>Made with</span>
                            <Heart size={14} className="text-[#FF6B6B] fill-[#FF6B6B]" />
                            <span>by</span>
                            <a
                                href="https://stillhousemedia.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#00B4D8] hover:text-white transition-colors inline-flex items-center gap-1"
                            >
                                Still House Media
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
