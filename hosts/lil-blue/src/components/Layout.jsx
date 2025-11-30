import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "../site-config";

export default function Layout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/properties", label: "Properties" },
        // { path: "/about", label: "About" }, // Add later if needed
        // { path: "/contact", label: "Contact" }, // Add later if needed
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#1E1E1E] font-sans selection:bg-[#E17654]/20 flex flex-col">
            <header className="sticky top-0 z-50 backdrop-blur-lg bg-[#FAF7F2]/90 border-b border-[#CBBBAA]/60 shadow-[0_20px_45px_-30px_rgba(30,30,30,0.45)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                        <img src="/favicon.png" alt="Logo" className="h-9 w-9 sm:h-11 sm:w-11 rounded-2xl object-cover shadow-lg shadow-[#E17654]/40 group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-base sm:text-lg text-[#1E1E1E]">{SITE_CONFIG.brand.name}</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`transition-colors ${location.pathname === link.path ? "text-[#E17654]" : "text-[#3F6F63]/80 hover:text-[#3F6F63]"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            to="/properties"
                            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-[#E17654] text-white shadow-sm shadow-[#E17654]/40 hover:bg-[#C65A3A] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D7A44E]/70"
                        >
                            Book Now <ExternalLink size={16} />
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-3 rounded-lg text-[#3F6F63] hover:bg-[#F4EDE4] active:bg-[#E8DDD0] transition-colors touch-manipulation"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-[#CBBBAA]/60 bg-[#FAF7F2] shadow-lg">
                        <nav className="mx-auto max-w-7xl px-4 py-2 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-4 py-3.5 rounded-lg font-semibold text-base transition-colors touch-manipulation min-h-[44px] flex items-center ${location.pathname === link.path
                                        ? "bg-[#F4EDE4] text-[#E17654]"
                                        : "text-[#3F6F63] hover:bg-[#F4EDE4]"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="border-t border-[#CBBBAA]/40 bg-[#FAF7F2]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#1E1E1E]/60">
                    <div>© {new Date().getFullYear()} {SITE_CONFIG.brand.name}.</div>
                    <div className="opacity-80">Powered by Still House Media</div>
                </div>
            </footer>
        </div>
    );
}
