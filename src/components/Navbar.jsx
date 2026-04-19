import { NavLink } from 'react-router-dom'

const linkBase =
  'rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-300 md:px-4'
const inactive = 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
const active = 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/event', label: 'Event Details' },
  { to: '/booking', label: 'Booking' },
  { to: '/confirmation', label: 'Confirmation' },
  { to: '/about', label: 'About' },
]

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-200 text-lg font-bold text-white transition-transform duration-300 group-hover:scale-105 group-hover:shadow-indigo-300">
            IT
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
              Internal Department
            </p>
            <p className="bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-sm font-extrabold text-transparent">
              Event Ticket Booking
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1.5">
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
      </div>
    </header>
  )
}

export default Navbar
