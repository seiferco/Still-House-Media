import { useState } from 'react'
import { Link, Route, Routes, NavLink, useLocation, Navigate } from 'react-router-dom'
import { Menu, X, ArrowRight, Loader2 } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfService from './pages/TermsOfService.jsx'
import OnboardingQuiz from './components/OnboardingQuiz.jsx'

function SiteNav({ onOpenQuiz }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/#features", label: "Features", isHash: true },
    { path: "/#pricing", label: "Pricing", isHash: true },
    { path: "/#faq", label: "FAQ", isHash: true },
  ]

  const token = localStorage.getItem('token')

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Brand */}
          <Link to="/" className="block group">
            <img
              src="/SHM-full-logo.png"
              alt="Still House Media"
              className="h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.path}
                  href={link.path}
                  className="font-medium text-[15px] text-gray-400 hover:text-white transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                </a>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium text-[15px] transition-colors relative group ${isActive ? "text-amber-500" : "text-gray-400 hover:text-white"
                    }`
                  }
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left scale-x-100 transition-transform" />
                  )}
                </NavLink>
              )
            ))}

            {token ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 active:scale-95 transition-all shadow-sm hover:shadow-md"
              >
                Dashboard
                <ArrowRight size={18} />
              </Link>
            ) : (
              <button
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 active:scale-95 transition-all border border-white/10 cursor-pointer"
              >
                Get Started
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-lg text-gray-400 hover:bg-white/10 active:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0f172a] shadow-lg">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-base text-gray-400 hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium text-base transition-colors ${location.pathname === link.path
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-gray-400 hover:bg-white/5"
                    }`}
                >
                  {link.label}
                </Link>
              )
            ))}

            {token ? (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg text-center hover:bg-amber-400 transition-colors mt-3"
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => { setIsMenuOpen(false); onOpenQuiz(); }}
                className="block w-full px-4 py-3 bg-white/10 text-white font-semibold rounded-lg text-center hover:bg-white/20 transition-colors mt-3 border border-white/10"
              >
                Get Started
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

function SiteFooter({ onOpenQuiz }) {
  return (
    <footer className="bg-[#0b1120] text-white border-t border-white/5 relative overflow-hidden">
      {/* Footer Gradient Mesh */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <img
                src="/SHM-full-logo.png"
                alt="Still House Media"
                className="h-10 w-auto object-contain brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Empowering vacation rental hosts with professional direct-booking websites.
              Stop paying commissions. Own your guest data. Keep 100% of your revenue.
            </p>
            <button 
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-2 text-amber-500 font-medium hover:text-amber-400 transition-colors"
            >
              Start Your Project <ArrowRight size={16} />
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6 text-gray-500">Quick Links</h3>
            <ul className="space-y-4">
              <li><a href="/#features" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Feature Showcase</a></li>
              <li><a href="/#pricing" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">Pricing</a></li>
              <li><a href="/#faq" className="text-gray-400 hover:text-amber-400 transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-6 text-gray-500">Contact</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="mailto:stillhousemedia@outlook.com" className="hover:text-amber-400 transition-colors">stillhousemedia@outlook.com</a></li>
              <li><a href="tel:5412943114" className="hover:text-amber-400 transition-colors">541-294-3114</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div>© {new Date().getFullYear()} Still House Media. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const location = useLocation()
  const isConfirmation = location.pathname === '/booking/confirmation'
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hide global navbar on confirmation routes */}
      {!isConfirmation && <SiteNav onOpenQuiz={() => setIsQuizOpen(true)} />}

      <AnimatePresence>
        {isQuizOpen && <OnboardingQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home onOpenSignUp={() => setIsQuizOpen(true)} />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="*" element={<Home onOpenSignUp={() => setIsQuizOpen(true)} />} />
      </Routes>

      {/* Hide global footer on confirmation routes */}
      {!isConfirmation && <SiteFooter onOpenQuiz={() => setIsQuizOpen(true)} />}
    </div>
  )
}
