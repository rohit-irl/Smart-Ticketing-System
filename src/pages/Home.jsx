import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard'

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 px-4 py-16 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-400 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-200">
            Annual showcase
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Department Innovation Summit 2026
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-indigo-100 md:text-xl">
            Connect with teams, celebrate milestones, and reserve your seat for
            the biggest internal event of the year.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
            >
              Book Now
            </Link>
            <Link
              to="/event"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            About this event
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            This placeholder section will later summarize the agenda, speakers,
            and registration rules. For now, it demonstrates the hero-to-content
            flow and keeps the page ready for real copy.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <EventCard
            title="Keynote & awards"
            date="June 15, 2026"
            venue="Main auditorium"
            description="Opening session and department recognition. Time and room subject to final schedule."
          />
          <EventCard
            title="Workshop track"
            date="June 15–16, 2026"
            venue="Breakout rooms A–C"
            description="Hands-on sessions. Ticket count may be capped per session in a future release."
            linkLabel="View details"
          />
          <EventCard
            title="Networking dinner"
            date="June 16, 2026"
            venue="Campus hall"
            description="Optional evening event. Dietary preferences will be collected when logic is added."
          />
        </div>
      </section>
    </div>
  )
}

export default Home
