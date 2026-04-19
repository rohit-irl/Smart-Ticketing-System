import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="font-semibold text-white">
              Internal Department Event Ticket Booking
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed">
              Base layout for managing internal department events and ticket
              reservations. Business logic and integrations will be added in a
              future iteration.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-medium text-white">Quick links</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  to="/booking"
                  className="hover:text-white hover:underline"
                >
                  Book tickets
                </Link>
              </li>
              <li>
                <Link to="/event" className="hover:text-white hover:underline">
                  Event details
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-slate-700 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Department Events — placeholder footer
        </p>
      </div>
    </footer>
  )
}

export default Footer
