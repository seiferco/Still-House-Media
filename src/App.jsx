import { Link, Route, Routes, NavLink, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DemoTemplate from './pages/DemoTemplate.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BookingConfirmation from './components/BookingConfirmation.jsx'

function SiteNav() {
  const linkCls = ({ isActive }) =>
    "px-3 py-2 rounded-lg " +
    (isActive
      ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/50")

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900 grid place-items-center font-semibold">SHM</div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Still House Media</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <NavLink to="/" className={linkCls} end>Home</NavLink>

          {/* OPEN DEMO IN NEW TAB */}
          <a
            href="https://www.staycoralbreeze.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/50"
          >
            Demo
          </a>

          {(() => {
            const token = localStorage.getItem('token')
            return token ? (
              <NavLink to="/dashboard" className={linkCls}>Dashboard</NavLink>
            ) : (
              <NavLink to="/login" className={linkCls}>Host Portal</NavLink>
            )
          })()}
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  const location = useLocation()
  const isDemo = location.pathname.startsWith('/demo-template')
  const isConfirmation = location.pathname === '/booking/confirmation'

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">

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
      {!isDemo && !isConfirmation && (
        <footer className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
            <span>© {new Date().getFullYear()} Stillhouse Media</span>
            <span className="opacity-80">Built for direct-booking hosts</span>
          </div>
        </footer>
      )}
    </div>
  )
}
