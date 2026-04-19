import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENT_NAME, PRICE_PER_TICKET } from '../constants/bookingConfig'
import { fetchTicketAvailability } from '../services/bookingApi'

function EventDetails() {
  const [availableTickets, setAvailableTickets] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTicketAvailability()
      setAvailableTickets(data.availableTickets)
    } catch (err) {
      setError(err.message || 'Could not load availability.')
      setAvailableTickets(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const fewLeft =
    availableTickets !== null && availableTickets > 0 && availableTickets < 10
  const soldOut = availableTickets === 0

  const bookButtonClass = soldOut
    ? 'cursor-not-allowed bg-slate-400 opacity-70'
    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] shadow-lg shadow-emerald-200 transition-all duration-300'

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 animate-fade-in-up">
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl p-8 shadow-2xl md:p-12">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-100/60 to-teal-100/60 blur-3xl z-0" />
        
        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-600">
            Event reference: EVT-2026-001
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {EVENT_NAME}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Full event information will load from your backend or CMS later. Below
            is static placeholder content for layout and typography.
          </p>

          {error && (
            <div className="mt-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 shadow-sm">
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {error}
              </span>
              <button
                type="button"
                onClick={() => load()}
                className="text-xs font-bold uppercase tracking-wide text-red-700 transition-colors hover:text-red-900"
              >
                Retry
              </button>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {fewLeft && !loading && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-bold text-cyan-700 shadow-sm transition-all duration-300 hover:bg-cyan-100">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                </span>
                Hurry! Few tickets left
              </span>
            )}

            {soldOut && !loading && !error && (
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-sm font-bold text-slate-600 shadow-sm">
                Sold Out
              </span>
            )}
          </div>

          <dl className="mt-12 grid gap-8 border-t border-slate-200/60 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-transparent bg-white/50 p-6 transition-all hover:border-slate-100 hover:bg-white hover:shadow-md backdrop-blur-md">
              <dt className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Date & time
              </dt>
              <dd className="mt-3 font-medium text-slate-900">
                June 15–16, 2026<br/>
                <span className="text-sm text-slate-500">9:00 AM – 6:00 PM</span>
              </dd>
            </div>
            
            <div className="rounded-2xl border border-transparent bg-white/50 p-6 transition-all hover:border-slate-100 hover:bg-white hover:shadow-md backdrop-blur-md">
              <dt className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Location
              </dt>
              <dd className="mt-3 font-medium leading-snug text-slate-900">
                Main campus<br/>
                <span className="text-sm text-slate-500">Auditorium & breakout rooms (TBD)</span>
              </dd>
            </div>
            
            <div className="rounded-2xl border border-transparent bg-white/50 p-6 transition-all hover:border-slate-100 hover:bg-white hover:shadow-md backdrop-blur-md">
              <dt className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Organizer
              </dt>
              <dd className="mt-3 font-medium text-slate-900">
                Events Office<br/>
                <span className="text-sm text-slate-500">Internal Department</span>
              </dd>
            </div>
            
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-6 transition-all hover:bg-emerald-50 hover:shadow-md">
              <dt className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                Tickets available
              </dt>
              <dd className="mt-3 text-slate-900">
                {loading ? (
                  <span className="animate-pulse text-sm text-slate-500">Loading availability…</span>
                ) : (
                  <>
                    <span className="text-2xl font-extrabold tracking-tight text-emerald-600">
                      {availableTickets ?? '—'}
                    </span>
                    <span className="ml-1 font-medium text-slate-600">left</span>
                    <div className="mt-1 text-sm font-medium text-slate-500">${PRICE_PER_TICKET} each</div>
                  </>
                )}
              </dd>
            </div>
          </dl>

          <div className="mt-12 rounded-2xl bg-white/50 backdrop-blur-md p-8 leading-relaxed text-slate-600 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900">Agenda (preview)</h2>
            <p className="mt-2 text-lg">
              Morning keynotes, afternoon workshops, and an optional networking
              dinner. Detailed timings and speaker bios will appear here once data
              is connected.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <li className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <span className="text-sm font-bold">1</span>
                </div>
                <span>Registration & welcome coffee<br/><span className="text-sm text-slate-400">Placeholder time</span></span>
              </li>
              <li className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <span className="text-sm font-bold">2</span>
                </div>
                <span>Department address & roadmap<br/><span className="text-sm text-slate-400">Placeholder time</span></span>
              </li>
              <li className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                  <span className="text-sm font-bold">3</span>
                </div>
                <span>Parallel tracks & deep dives<br/><span className="text-sm text-slate-400">Placeholder time</span></span>
              </li>
            </ul>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            {loading ? (
              <span className="inline-flex w-full animate-pulse items-center justify-center rounded-xl bg-slate-200 px-8 py-4 text-base font-bold text-slate-500 sm:w-auto">
                Loading…
              </span>
            ) : soldOut || error ? (
              <span
                className={`inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white shadow-sm sm:w-auto ${bookButtonClass}`}
              >
                Book tickets
              </span>
            ) : (
              <Link
                to="/booking"
                className={`inline-flex w-full items-center justify-center rounded-xl px-8 py-4 text-base font-bold text-white sm:w-auto ${bookButtonClass}`}
              >
                Get Tickets Now
              </Link>
            )}
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 py-4 text-base font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
