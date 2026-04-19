import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { EVENT_NAME, PRICE_PER_TICKET, SAMPLE_EVENTS } from '../constants/bookingConfig'
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

  const soldOut = availableTickets === 0

  const allEvents = [
    {
      id: 'main',
      name: EVENT_NAME,
      department: 'Main Event',
      date: 'June 15–16, 2026',
      venue: 'Main Campus Auditorium',
      price: PRICE_PER_TICKET,
      availableTickets: availableTickets,
      isMain: true
    },
    ...SAMPLE_EVENTS
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Event Directory
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Browse all upcoming workshops, summits, and bootcamps securely.
        </p>
      </div>

      {error && (
        <div className="mb-8 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 shadow-sm">
          <span className="flex items-center gap-2 font-medium">
            <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Main Event API: {error}
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

      <div className="flex flex-col gap-6">
        {allEvents.map((event) => {
          const ticketsLoading = event.isMain && loading
          const eventSoldOut = event.isMain ? soldOut : event.availableTickets === 0
          const availableCount = event.isMain ? availableTickets : event.availableTickets

          return (
            <div 
              key={event.id} 
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur-md p-8 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Event Info Context */}
              <div className="flex-1 space-y-4 w-full">
                {event.isMain && (
                   <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                     Featured Event
                   </span>
                )}
                <h2 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-emerald-600">
                  {event.name}
                </h2>
                <p className="text-slate-600">
                  Join the immersive {event.department} engagement. Highly anticipated insights and actionable growth opportunities directly linked to future scale.
                </p>
                
                <div className="flex flex-wrap gap-5 text-sm font-medium text-slate-500 pt-2">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {event.venue}
                  </div>
                </div>
              </div>

              {/* Event Action Panel */}
              <div className="w-full md:w-56 flex flex-col items-center md:items-end gap-4 border-t border-slate-100 pt-6 md:border-t-0 md:border-l md:pl-6 md:pt-0 shrink-0">
                <div className="text-4xl font-black text-slate-900">
                  ${event.price}
                </div>
                
                {ticketsLoading ? (
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 animate-pulse">
                    Loading...
                  </span>
                ) : eventSoldOut ? (
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Sold Out
                  </span>
                ) : (
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    {availableCount} tickets left
                  </span>
                )}

                <Link
                  to="/booking"
                  state={{ selectedEvent: event }}
                  className={`mt-2 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    eventSoldOut 
                      ? 'cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:from-emerald-600 hover:to-teal-600'
                  }`}
                  onClick={(e) => {
                    if (eventSoldOut) e.preventDefault()
                  }}
                >
                  Book Now
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      
      <div className="mt-16 text-center">
         <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl border-2 border-slate-200 bg-slate-50 px-8 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-white hover:border-slate-300"
          >
            Back to Home
          </Link>
      </div>
    </div>
  )
}

export default EventDetails
