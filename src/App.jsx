import { useState } from 'react'
import { Link, Route, Routes, NavLink, useLocation, Navigate } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import Home from './pages/Home.jsx'
import DemoTemplate from './pages/DemoTemplate.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BookingConfirmation from './components/BookingConfirmation.jsx'

function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/#features", label: "Features", isHash: true },
    { path: "/#how-it-works", label: "How It Works", isHash: true },
    { path: "/#pricing", label: "Pricing", isHash: true },
  ]

  const token = localStorage.getItem('token')

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo + Brand */}
          <Link to="/" className="block group">
            <img
              src="/SHM-full-logo.png"
              alt="Still House Media"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.path}
                  href={link.path}
                  className="font-medium text-[15px] text-[#4F5D75] hover:text-[#2D3142] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B35] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                </a>
              ) : (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium text-[15px] transition-colors relative group ${isActive ? "text-[#FF6B35]" : "text-[#4F5D75] hover:text-[#2D3142]"
                    }`
                  }
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B35] transform origin-left scale-x-100 transition-transform" />
                  )}
                </NavLink>
              )
            ))}

            <a
              href="https://www.staycoralbreeze.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[15px] text-[#4F5D75] hover:text-[#2D3142] transition-colors"
            >
              Demo
            </a>

            {token ? (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg hover:bg-[#E85D2A] active:scale-95 transition-all shadow-sm hover:shadow-md"
              >
                Dashboard
                <ArrowRight size={18} />
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2D3142] text-white font-semibold rounded-lg hover:bg-[#1a1c25] active:scale-95 transition-all shadow-sm hover:shadow-md"
              >
                Host Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-lg text-[#4F5D75] hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-base text-[#4F5D75] hover:bg-gray-100 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium text-base transition-colors ${location.pathname === link.path
                    ? "bg-[#FFEEE8] text-[#FF6B35]"
                    : "text-[#4F5D75] hover:bg-gray-100"
                    }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <a
              href="https://www.staycoralbreeze.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 rounded-lg font-medium text-base text-[#4F5D75] hover:bg-gray-100 transition-colors"
            >
              View Demo
            </a>

            {token ? (
              <Link
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 bg-[#FF6B35] text-white font-semibold rounded-lg text-center hover:bg-[#E85D2A] transition-colors mt-3"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 bg-[#2D3142] text-white font-semibold rounded-lg text-center hover:bg-[#1a1c25] transition-colors mt-3"
              >
                Host Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="bg-[#2D3142] text-white border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="mb-4">
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="/#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How It Works</a></li>
              <li><a href="/#pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
              <li><a href="https://www.staycoralbreeze.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">View Demo</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="mailto:hello@stillhousemedia.com" className="hover:text-white transition-colors">hello@stillhousemedia.com</a></li>
              <li><a href="tel:5412943114" className="hover:text-white transition-colors">541-294-3114</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div>© {new Date().getFullYear()} Still House Media. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const location = useLocation()
  const isDemo = location.pathname.startsWith('/demo-template')
  const isConfirmation = location.pathname === '/booking/confirmation'

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#2D3142]">
      {/* Hide global navbar on demo and confirmation routes */}
      {!isDemo && !isConfirmation && <SiteNav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo-template" element={<DemoTemplate />} />
        <Route path="/booking/confirmation" element={<BookingConfirmation />} />
        <Route path="/login" element={
          localStorage.getItem('token') ? <Navigate to="/dashboard" replace /> : <Login />
        } />
        <Route path="/dashboard" element={
          localStorage.getItem('token') ? <Dashboard /> : <Navigate to="/login" replace />
        } />
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Hide global footer on demo and confirmation routes */}
      {!isDemo && !isConfirmation && <SiteFooter />}
    </div>
  )
}
