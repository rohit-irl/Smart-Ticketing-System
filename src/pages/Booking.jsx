import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
      const data = await fetchTicketAvailability()
      setAvailableTickets(data.availableTickets)
    } catch (err) {
      setLoadError(err.message || 'Could not load ticket availability.')
      setAvailableTickets(null)
    } finally {
      setTicketsLoading(false)
    }
  }, [])

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
            eventName: EVENT_NAME,
            ticketCount: b.tickets,
            totalAmount: b.tickets * PRICE_PER_TICKET,
            bookingId: b._id,
          },
        },
      })
      return
    }

    setApiError(data.message || 'Booking failed. Please try again.')
  }

  const inputError =
    'border-red-500 focus:border-red-500 focus:ring-red-500/20'
  const inputNormal =
    'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'

  const ticketLabel =
    ticketsLoading || availableTickets === null
      ? 'Loading…'
      : soldOut
        ? 'Sold out'
        : `${availableTickets} left`

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold text-slate-900">Book tickets</h1>
        <p className="mt-2 text-slate-600">
          {EVENT_NAME} ·{' '}
          <span className="font-medium text-slate-800">${PRICE_PER_TICKET}</span>{' '}
          per ticket ·{' '}
          <span className="font-medium text-indigo-700">{ticketLabel}</span>
        </p>

        {loadError && (
          <div
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            role="alert"
          >
            <p>{loadError}</p>
            <button
              type="button"
              onClick={() => loadTickets()}
              className="mt-2 text-sm font-semibold text-amber-800 underline hover:text-amber-950"
            >
              Retry
            </button>
          </div>
        )}

        {soldOut && ready && (
          <div
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            All tickets have been reserved. Please check back if more seats
            open.
          </div>
        )}

        {apiError && (
          <div
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {apiError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-md"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={!ready || soldOut || submitting}
              className={`mt-2 w-full rounded-lg border px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${
                errors.name ? inputError : inputNormal
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@department.example"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              disabled={!ready || soldOut || submitting}
              className={`mt-2 w-full rounded-lg border px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${
                errors.email ? inputError : inputNormal
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-slate-700"
            >
              Department
            </label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={(e) => handleChange('department', e.target.value)}
              disabled={!ready || soldOut || submitting}
              className={`mt-2 w-full rounded-lg border bg-white px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${
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
            {errors.department && (
              <p className="mt-1.5 text-sm text-red-600">{errors.department}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="tickets"
              className="block text-sm font-medium text-slate-700"
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
              className={`mt-2 w-full rounded-lg border px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 ${
                errors.tickets ? inputError : inputNormal
              }`}
            />
            {errors.tickets && (
              <p className="mt-1.5 text-sm text-red-600">{errors.tickets}</p>
            )}
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={!ready || soldOut || submitting}
              className="inline-flex justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {submitting
                ? 'Submitting…'
                : soldOut
                  ? 'Sold out'
                  : 'Complete booking'}
            </button>
            <Link
              to="/event"
              className="text-center text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
            >
              Review event details
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
