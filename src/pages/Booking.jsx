import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

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
  const {
    availableTickets,
    completeBooking,
    pricePerTicket,
    eventName,
  } = useBooking()

  const [form, setForm] = useState(getInitialForm)
  const [errors, setErrors] = useState({})
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const soldOut = availableTickets === 0

  useEffect(() => {
    if (!submitSuccess) return
    const id = window.setTimeout(() => {
      navigate('/confirmation')
    }, 650)
    return () => window.clearTimeout(id)
  }, [submitSuccess, navigate])

  function handleChange(field, value) {
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
    } else if (count > availableTickets) {
      next.tickets = `Only ${availableTickets} ticket(s) available.`
    }

    return next
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (soldOut) return

    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const count = Number.parseInt(String(form.tickets).trim(), 10)

    completeBooking({
      name: form.name,
      email: form.email,
      department: form.department,
      tickets: count,
    })

    setForm(getInitialForm())
    setErrors({})
    setSubmitSuccess(true)
  }

  const inputError =
    'border-red-500 focus:border-red-500 focus:ring-red-500/20'
  const inputNormal =
    'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold text-slate-900">Book tickets</h1>
        <p className="mt-2 text-slate-600">
          {eventName} · <span className="font-medium text-slate-800">${pricePerTicket}</span>{' '}
          per ticket ·{' '}
          <span className="font-medium text-indigo-700">
            {soldOut ? 'Sold out' : `${availableTickets} left`}
          </span>
        </p>

        {soldOut && (
          <div
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            All tickets have been reserved. Please check back if more seats
            open.
          </div>
        )}

        {submitSuccess && (
          <div
            className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
            role="status"
          >
            Booking confirmed — redirecting to your confirmation…
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
              disabled={soldOut || submitSuccess}
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
              disabled={soldOut || submitSuccess}
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
              disabled={soldOut || submitSuccess}
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
              max={availableTickets || undefined}
              placeholder="1"
              value={form.tickets}
              onChange={(e) => handleChange('tickets', e.target.value)}
              disabled={soldOut || submitSuccess}
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
              disabled={soldOut || submitSuccess}
              className="inline-flex justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {soldOut ? 'Sold out' : 'Complete booking'}
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
