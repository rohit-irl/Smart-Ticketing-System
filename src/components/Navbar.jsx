import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'

const linkBase =
  'relative rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 group'
const inactive = 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
const active = 'bg-emerald-50/80 text-emerald-700 shadow-sm border border-emerald-100'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/event', label: 'Event Details' },
  { to: '/booking', label: 'Booking' },
  { to: '/confirmation', label: 'Confirmation' },
  { to: '/about', label: 'About' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group cursor-pointer z-50">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200 text-lg font-black text-white transition-transform duration-300 group-hover:scale-105 group-hover:shadow-emerald-300">
            TS
          </span>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-500">
              Department
            </p>
            <p className="bg-gradient-to-r from-slate-900 to-emerald-900 bg-clip-text text-sm md:text-base font-black text-transparent group-hover:from-emerald-700 group-hover:to-teal-800 transition-colors">
              Ticketing System
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${linkBase} ${isActive ? active : inactive}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          title="Toggle Menu"
          aria-label="Toggle Menu"
          className="md:hidden z-50 rounded-lg p-2 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4 gap-2">
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-base font-bold transition-all ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
