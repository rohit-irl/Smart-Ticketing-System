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
    : 'bg-indigo-600 hover:bg-indigo-700'

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md md:p-10">
        <p className="text-sm font-medium text-indigo-600">
          Event reference: EVT-2026-001
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          {EVENT_NAME}
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Full event information will load from your backend or CMS later. Below
          is static placeholder content for layout and typography.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
            {error}{' '}
            <button
              type="button"
              onClick={() => load()}
              className="font-semibold underline hover:text-amber-950"
            >
              Retry
            </button>
          </div>
        )}

        {fewLeft && !loading && (
          <p
            className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
            role="status"
          >
            Hurry! Few tickets left
          </p>
        )}

        {soldOut && !loading && !error && (
          <p
            className="mt-4 rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800"
            role="status"
          >
            Sold Out
          </p>
        )}

        <dl className="mt-10 grid gap-6 border-t border-slate-100 pt-10 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-slate-500">Date & time</dt>
            <dd className="mt-1 text-slate-900">
              June 15–16, 2026 · 9:00 AM – 6:00 PM
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Location</dt>
            <dd className="mt-1 text-slate-900">
              Main campus — Auditorium & breakout rooms (TBD)
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Organizer</dt>
            <dd className="mt-1 text-slate-900">
              Internal Department Events Office
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">
              Tickets available
            </dt>
            <dd className="mt-1 text-slate-900">
              {loading ? (
                <span className="text-slate-500">Loading…</span>
              ) : (
                <>
                  <span className="font-semibold text-indigo-700">
                    {availableTickets ?? '—'}
                  </span>{' '}
                  remaining · ${PRICE_PER_TICKET} each
                </>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-10 space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-xl font-semibold text-slate-900">Agenda (preview)</h2>
          <p>
            Morning keynotes, afternoon workshops, and an optional networking
            dinner. Detailed timings and speaker bios will appear here once data
            is connected.
          </p>
          <ul className="list-inside list-disc space-y-2 text-slate-600">
            <li>Registration & welcome coffee — placeholder time</li>
            <li>Department address & roadmap — placeholder time</li>
            <li>Parallel tracks — placeholder time</li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          {loading ? (
            <span className="inline-flex rounded-lg bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-600">
              Loading…
            </span>
          ) : soldOut || error ? (
            <span
              className={`inline-flex rounded-lg px-6 py-3 text-sm font-semibold text-white ${bookButtonClass}`}
            >
              Book tickets
            </span>
          ) : (
            <Link
              to="/booking"
              className="inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Book tickets
            </Link>
          )}
          <Link
            to="/"
            className="inline-flex rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
