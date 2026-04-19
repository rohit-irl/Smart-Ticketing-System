import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { EVENT_NAME, PRICE_PER_TICKET } from '../constants/bookingConfig'
import {
  fetchTicketAvailability,
  submitBooking,
} from '../services/bookingApi'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getInitialForm() {
  return {
    name: '',
    email: '',
    department: '',
    tickets: '',
  }
}

function Booking() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const preselectedEvent = location.state?.selectedEvent
  const currentEventName = preselectedEvent ? preselectedEvent.name : EVENT_NAME
  const currentEventPrice = preselectedEvent ? preselectedEvent.price : PRICE_PER_TICKET

  const [form, setForm] = useState(getInitialForm)
  const [errors, setErrors] = useState({})
  const [availableTickets, setAvailableTickets] = useState(null)
  const [ticketsLoading, setTicketsLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)

  const loadTickets = useCallback(async () => {
    setTicketsLoading(true)
    setLoadError(null)
    try {
      if (preselectedEvent) {
         setAvailableTickets(preselectedEvent.availableTickets)
      } else {
         const data = await fetchTicketAvailability()
         setAvailableTickets(data.availableTickets)
      }
    } catch (err) {
      setLoadError(err.message || 'Could not load ticket availability.')
      setAvailableTickets(null)
    } finally {
      setTicketsLoading(false)
    }
  }, [preselectedEvent])

  useEffect(() => {
    loadTickets()
  }, [loadTickets])

  const soldOut = availableTickets === 0
  const ready = !ticketsLoading && availableTickets !== null && !loadError

  function handleChange(field, value) {
    setApiError(null)
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  function validate() {
    const next = {}
    const { name, email, department, tickets } = form

    if (!name.trim()) next.name = 'Name is required.'
    if (!email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!department) next.department = 'Please select a department.'

    const count = Number.parseInt(String(tickets).trim(), 10)
    if (tickets === '' || String(tickets).trim() === '') {
      next.tickets = 'Number of tickets is required.'
    } else if (Number.isNaN(count) || count <= 0) {
      next.tickets = 'Tickets must be greater than zero.'
    } else if (availableTickets !== null && count > availableTickets) {
      next.tickets = `Only ${availableTickets} ticket(s) available.`
    }

    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!ready || soldOut || submitting) return

    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const count = Number.parseInt(String(form.tickets).trim(), 10)
    setSubmitting(true)
    setApiError(null)

    const { ok, data } = await submitBooking({
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department,
      tickets: count,
    })

    setSubmitting(false)

    if (ok && data.success && data.data?.booking) {
      const b = data.data.booking
      setForm(getInitialForm())
      setErrors({})
      navigate('/confirmation', {
        state: {
          booking: {
            name: b.name,
            eventName: currentEventName,
            ticketCount: b.tickets,
            totalAmount: b.tickets * currentEventPrice,
            bookingId: b._id,
          },
        },
      })
      return
    }

    setApiError(data.message || 'Booking failed. Please try again.')
  }

  const inputError =
    'border-red-400 bg-red-50 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/20'
  const inputNormal =
    'border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-400/20'

  const ticketLabel =
    ticketsLoading || availableTickets === null
      ? 'Loading…'
      : soldOut
        ? 'Sold out'
        : `${availableTickets} left`

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Book Tickets</h1>
          <p className="mt-4 text-lg text-slate-600 flex flex-wrap justify-center items-center gap-2">
            <span className="font-medium text-slate-900">{currentEventName}</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>
              <span className="font-bold text-slate-800">${currentEventPrice}</span>{' '}
              <span className="text-slate-500 text-sm">per ticket</span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold shadow-sm ${soldOut ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}`}>{ticketLabel}</span>
          </p>
        </div>

        {loadError && (
          <div
            className="mt-8 flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 shadow-sm"
            role="alert"
          >
            <div className="flex items-center gap-3">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <p className="font-medium">{loadError}</p>
            </div>
            <button
              type="button"
              onClick={() => loadTickets()}
              className="text-xs font-bold uppercase tracking-wide text-amber-700 transition-colors hover:text-amber-900"
            >
              Retry
            </button>
          </div>
        )}

        {soldOut && ready && (
          <div
            className="mt-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800 shadow-sm"
            role="alert"
          >
            <svg className="h-6 w-6 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="font-medium">All tickets have been reserved. Please check back if more seats open.</p>
          </div>
        )}

        {apiError && (
          <div
            className="mt-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800 shadow-sm"
            role="alert"
          >
            <svg className="h-6 w-6 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="font-medium">{apiError}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="relative mt-10 space-y-8 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-8 shadow-xl backdrop-blur-md sm:p-12 animate-fade-in-up"
        >
          {/* Decorative top border */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
          
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-slate-700 uppercase tracking-wide"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Rohit Raj"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={!ready || soldOut || submitting}
              className={`mt-2 w-full rounded-xl border px-5 py-3.5 text-base text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${
                errors.name ? inputError : inputNormal
              }`}
            />
            {errors.name && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-slate-700 uppercase tracking-wide"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="rohit@department.example"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={!ready || soldOut || submitting}
              className={`mt-2 w-full rounded-xl border px-5 py-3.5 text-base text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${
                errors.email ? inputError : inputNormal
              }`}
            />
            {errors.email && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-sm font-bold text-slate-700 uppercase tracking-wide"
            >
              Department
            </label>
            <div className="relative">
              <select
                id="department"
                name="department"
                value={form.department}
                onChange={(e) => handleChange('department', e.target.value)}
                disabled={!ready || soldOut || submitting}
                className={`mt-2 w-full appearance-none rounded-xl border px-5 py-3.5 text-base text-slate-900 transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${
                  errors.department ? inputError : inputNormal
                }`}
              >
                <option value="">Select department</option>
                <option value="engineering">Engineering</option>
                <option value="operations">Operations</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 pt-2 text-slate-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            {errors.department && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.department}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="tickets"
              className="block text-sm font-bold text-slate-700 uppercase tracking-wide"
            >
              Number of tickets
            </label>
            <input
              id="tickets"
              name="tickets"
              type="number"
              min="1"
              max={availableTickets && availableTickets > 0 ? availableTickets : undefined}
              placeholder="1"
              value={form.tickets}
              onChange={(e) => handleChange('tickets', e.target.value)}
              disabled={!ready || soldOut || submitting}
              className={`mt-2 w-full rounded-xl border px-5 py-3.5 text-base text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 ${
                errors.tickets ? inputError : inputNormal
              }`}
            />
            {errors.tickets && (
              <p className="mt-2 text-sm font-medium text-red-600">{errors.tickets}</p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100">
            <Link
              to="/event"
              className="text-center text-sm font-bold text-emerald-600 transition hover:text-emerald-800 uppercase tracking-wide"
            >
              Review event details
            </Link>
            <button
              type="submit"
              disabled={!ready || soldOut || submitting}
              className="inline-flex w-full justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:scale-[1.02] hover:from-emerald-600 hover:to-teal-700 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none disabled:hover:scale-100 sm:w-auto animate-fade-in"
            >
              {submitting
                ? 'Processing…'
                : soldOut
                  ? 'Sold out'
                  : 'Complete reservation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
