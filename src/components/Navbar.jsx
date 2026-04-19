import { NavLink } from 'react-router-dom'

const linkBase =
  'rounded-lg px-3 py-2 text-sm font-medium transition-colors md:px-4'
const inactive = 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
const active = 'bg-indigo-100 text-indigo-800'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/event', label: 'Event Details' },
  { to: '/booking', label: 'Booking' },
  { to: '/confirmation', label: 'Confirmation' },
  { to: '/about', label: 'About' },
]

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-lg font-bold text-white">
            IT
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Internal Department
            </p>
            <p className="text-sm font-semibold text-slate-900">
              Event Ticket Booking
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-1">
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
