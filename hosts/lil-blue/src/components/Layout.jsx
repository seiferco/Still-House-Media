import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink, Phone } from "lucide-react";
import { SITE_CONFIG } from "../site-config";
import Footer from "./Footer";

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/properties", label: "Properties" },
        { path: "/#attractions", label: "Things To Do" },
        { path: "#contact", label: "Contact" },
    ];

    const isActive = (path) => {
        if (path.startsWith("#") || path.includes("/#")) return false;
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#1A365D] font-sans selection:bg-[#0077B6]/20 flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#E2E8F0] shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <img
                                src="/favicon.png"
                                alt="Logo"
                                className="h-10 w-10 md:h-12 md:w-12 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all group-hover:scale-105"
                            />
                            <div className="hidden sm:block">
                                <span className="font-semibold text-lg text-[#1A365D] block leading-tight">
                                    {SITE_CONFIG.brand.name}
                                </span>
                                <span className="text-xs text-[#64748B]">
                                    Florida Vacation Rentals
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${isActive(link.path)
                                            ? "bg-[#0077B6]/10 text-[#0077B6]"
                                            : "text-[#64748B] hover:text-[#1A365D] hover:bg-[#F1F5F9]"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* CTA Button */}
                            <Link
                                to="/properties"
                                className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077B6] text-white font-semibold rounded-xl hover:bg-[#005F92] transition-all shadow-md hover:shadow-lg"
                            >
                                Book Now
                                <ExternalLink size={16} />
                            </Link>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2.5 rounded-lg text-[#64748B] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-[#E2E8F0] bg-white overflow-hidden"
                        >
                            <nav className="px-4 py-4 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block px-4 py-3.5 rounded-xl font-medium text-base transition-colors ${isActive(link.path)
                                                ? "bg-[#0077B6]/10 text-[#0077B6]"
                                                : "text-[#64748B] hover:bg-[#F1F5F9]"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {/* Mobile CTA */}
                                <Link
                                    to="/properties"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-3.5 mt-2 bg-[#0077B6] text-white font-semibold rounded-xl text-center"
                                >
                                    Book Now
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
