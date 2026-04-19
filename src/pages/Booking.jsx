import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { EVENT_NAME, PRICE_PER_TICKET, SAMPLE_EVENTS } from '../constants/bookingConfig'
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
  
  const allEvents = [
    {
      id: 'main',
      name: EVENT_NAME,
      department: 'Main Event',
      date: 'June 15–16, 2026',
      venue: 'Main Campus Auditorium',
      price: PRICE_PER_TICKET,
      availableTickets: null,
      isMain: true
    },
    ...SAMPLE_EVENTS
  ]

  const preselected = location.state?.selectedEvent?.id || ''
  const [selectedEventId, setSelectedEventId] = useState(preselected)
  
  const currentEvent = selectedEventId 
    ? allEvents.find(e => String(e.id) === String(selectedEventId)) 
    : null

  const [form, setForm] = useState(getInitialForm)
  const [errors, setErrors] = useState({})
  const [availableTickets, setAvailableTickets] = useState(currentEvent?.isMain ? null : currentEvent?.availableTickets ?? null)
  const [ticketsLoading, setTicketsLoading] = useState(!!currentEvent?.isMain)
  const [loadError, setLoadError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [apiError, setApiError] = useState(null)
  
  // For price change animation highlight
  const [highlightTotal, setHighlightTotal] = useState(false)

  useEffect(() => {
    let active = true
    async function load() {
      if (!currentEvent) {
         setTicketsLoading(false)
         setAvailableTickets(null)
         return
      }

      if (currentEvent.isMain) {
        setTicketsLoading(true)
        setLoadError(null)
        try {
          const data = await fetchTicketAvailability()
          if (active) setAvailableTickets(data.availableTickets)
        } catch (err) {
          if (active) {
            setLoadError(err.message || 'Could not load ticket availability.')
            setAvailableTickets(null)
          }
        } finally {
          if (active) setTicketsLoading(false)
        }
      } else {
        setTicketsLoading(false)
        setLoadError(null)
        setAvailableTickets(currentEvent.availableTickets)
      }
    }
    load()
    return () => { active = false }
  }, [selectedEventId]) // eslint-disable-line react-hooks/exhaustive-deps

  const ticketCount = Number.parseInt(String(form.tickets).trim(), 10) || 0
  const totalPrice = currentEvent ? ticketCount * currentEvent.price : 0

  useEffect(() => {
    if (totalPrice > 0) {
       setHighlightTotal(true)
       const timer = setTimeout(() => setHighlightTotal(false), 500)
       return () => clearTimeout(timer)
    }
  }, [totalPrice])

  const soldOut = currentEvent ? availableTickets === 0 : false
  const ready = currentEvent ? (!ticketsLoading && availableTickets !== null && !loadError) : false

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
    
    if (!currentEvent) {
        next.event = 'Please select an event to continue.'
        return next
    }

    const { name, email, department, tickets } = form

    if (!name.trim()) next.name = 'Full name is required.'
    if (!email.trim()) next.email = 'Email address is required.'
    else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = 'Please enter a valid format.'
    }
    if (!department) next.department = 'Please select a department.'

    const count = Number.parseInt(String(tickets).trim(), 10)
    if (tickets === '' || String(tickets).trim() === '') {
      next.tickets = 'Total tickets required.'
    } else if (Number.isNaN(count) || count <= 0) {
      next.tickets = 'Must be greater than zero.'
    } else if (availableTickets !== null && count > availableTickets) {
      next.tickets = `Exceeds max (${availableTickets}).`
    }

    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!currentEvent || !ready || soldOut || submitting) return

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
            eventName: currentEvent.name,
            ticketCount: b.tickets,
            totalAmount: b.tickets * currentEvent.price,
            bookingId: b._id,
          },
        },
      })
      return
    }

    setApiError(data.message || 'Booking failed. Please try again.')
  }

  const inputError = 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/20 text-red-900'
  const inputNormal = 'border-slate-200 bg-white hover:bg-slate-50 focus:border-emerald-400 focus:ring-emerald-400/20 text-slate-900'

  const ticketLabel = !currentEvent 
    ? 'Select Event'
    : ticketsLoading 
      ? 'Loading...' 
      : soldOut 
        ? 'Sold out' 
        : `${availableTickets} remaining`

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:py-20 lg:flex lg:gap-12 animate-fade-in-up">
      
      {/* Left Column: Event Selection & Booking Form */}
      <div className="lg:flex-1 space-y-10">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Book Your Spot</h1>
          <p className="mt-4 text-lg text-slate-600">Secure entry to premium industry events and workshops.</p>
        </div>

        {/* 1. EVENT SELECT DROPDOWN */}
        <div className="rounded-2xl border border-emerald-100 bg-white/70 p-6 shadow-md backdrop-blur-md">
          <label htmlFor="eventSelect" className="block text-sm font-bold uppercase tracking-wide text-emerald-800 mb-3">
            1. Select Event
          </label>
          <div className="relative">
            <select
              id="eventSelect"
              value={selectedEventId}
              onChange={(e) => {
                 setSelectedEventId(e.target.value)
                 setErrors(prev => ({...prev, event: null}))
              }}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-5 py-4 text-base font-medium text-slate-900 shadow-sm transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
            >
              <option value="" disabled>Please choose an event</option>
              {allEvents.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.name} — {ev.date}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          {errors.event && <p className="mt-2 text-sm font-bold text-red-500 animate-fade-in">{errors.event}</p>}
        </div>

        {/* 2. DYNAMIC EVENT INFO PANEL */}
        <div className={`relative overflow-hidden rounded-2xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-teal-50/50 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 ${!currentEvent ? 'opacity-50 grayscale select-none' : 'opacity-100'}`}>
          <div className="absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b from-emerald-400 to-teal-500" />
          <div className="pl-4">
             <div className="flex flex-wrap items-center justify-between gap-4">
               <div>
                 <h2 className="text-xl font-bold text-slate-900">{currentEvent?.name || 'Awaiting Selection'}</h2>
                 <div className="mt-2 flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
                   <span className="flex items-center gap-1.5">
                     <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                     {currentEvent?.date || '—'}
                   </span>
                   <span className="flex items-center gap-1.5">
                     <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     {currentEvent?.venue || '—'}
                   </span>
                 </div>
               </div>
               <div className="sticky right-0 flex flex-col items-end shrink-0">
                 <span className="text-2xl font-black text-slate-900">${currentEvent?.price || '0'}</span>
                 <span className={`mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${soldOut ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-500/30'}`}>
                   {ticketLabel}
                 </span>
               </div>
             </div>
          </div>
        </div>

        {/* ERROR BANNERS */}
        {loadError && (
          <div className="flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 shadow-sm">
            <span className="font-medium">{loadError}</span>
            <button type="button" onClick={() => setSelectedEventId(currentEvent?.id)} className="font-bold text-amber-700 hover:text-amber-900">RETRY</button>
          </div>
        )}
        {apiError && (
            <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 shadow-sm">
              <svg className="h-5 w-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {apiError}
            </div>
        )}

        {/* 3. BOOKING FORM UI */}
        <form onSubmit={handleSubmit} className={`relative rounded-2xl border border-slate-200 bg-white/70 p-6 sm:p-10 shadow-xl backdrop-blur-xl border-t-4 border-t-emerald-500 transition-all ${!currentEvent ? 'opacity-60 pointer-events-none grayscale-[50%]' : ''}`}>
          <h3 className="mb-6 text-lg font-extrabold text-slate-800">2. Attendee Details</h3>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block w-fit text-sm font-bold text-slate-700 mb-2">Personal Name</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="Rohit Raj"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!currentEvent || !ready || soldOut || submitting}
                  className={`w-full rounded-xl border pl-11 pr-5 py-3.5 text-base transition-all focus:outline-none focus:ring-4 disabled:opacity-60 ${errors.name ? inputError : inputNormal}`}
                />
              </div>
              {errors.name && <p className="mt-1.5 text-xs font-bold text-red-500 animate-fade-in">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block w-fit text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="rohit@example.com"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!currentEvent || !ready || soldOut || submitting}
                  className={`w-full rounded-xl border pl-11 pr-5 py-3.5 text-base transition-all focus:outline-none focus:ring-4 disabled:opacity-60 ${errors.email ? inputError : inputNormal}`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs font-bold text-red-500 animate-fade-in">{errors.email}</p>}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="department" className="block w-fit text-sm font-bold text-slate-700 mb-2">Department</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <select
                    id="department"
                    value={form.department}
                    onChange={(e) => handleChange('department', e.target.value)}
                    disabled={!currentEvent || !ready || soldOut || submitting}
                    className={`w-full appearance-none rounded-xl border pl-11 pr-10 py-3.5 text-base transition-all focus:outline-none focus:ring-4 disabled:opacity-60 ${errors.department ? inputError : inputNormal}`}
                  >
                    <option value="">Select scope</option>
                    <option value="engineering">Engineering</option>
                    <option value="operations">Operations</option>
                    <option value="hr">Human Resources</option>
                    <option value="finance">Finance</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.department && <p className="mt-1.5 text-xs font-bold text-red-500 animate-fade-in">{errors.department}</p>}
              </div>

              <div>
                <label htmlFor="tickets" className="block w-fit text-sm font-bold text-slate-700 mb-2">Quantity</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                  </div>
                  <input
                    id="tickets"
                    type="number"
                    min="1"
                    max={availableTickets || undefined}
                    placeholder="1"
                    value={form.tickets}
                    onChange={(e) => handleChange('tickets', e.target.value)}
                    disabled={!currentEvent || !ready || soldOut || submitting}
                    className={`w-full rounded-xl border pl-11 pr-5 py-3.5 text-base transition-all focus:outline-none focus:ring-4 disabled:opacity-60 ${errors.tickets ? inputError : inputNormal}`}
                  />
                </div>
                {errors.tickets && <p className="mt-1.5 text-xs font-bold text-red-500 animate-fade-in">{errors.tickets}</p>}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 4. LIVE BOOKING SUMMARY SIDEBAR */}
      <div className="mt-12 lg:mt-0 lg:w-[400px] shrink-0">
        <div className="sticky top-28 overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-8 shadow-2xl backdrop-blur-2xl ring-1 ring-slate-100">
          <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-200 pb-4 mb-6">Booking Summary</h3>
          
          <div className="space-y-4 text-base font-medium text-slate-600">
            <div className="flex justify-between">
              <span>Event</span>
              <span className="text-slate-900 font-bold max-w-[180px] text-right truncate">
                {currentEvent ? currentEvent.name : 'None selected'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Ticket Price</span>
              <span className={`text-slate-900 font-bold transition-all duration-300 ${highlightTotal ? 'scale-110 text-emerald-600' : ''}`}>
                ${currentEvent?.price || '0'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Quantity</span>
              <span className="text-slate-900 font-bold">x {ticketCount || 0}</span>
            </div>
          </div>

          <div className="my-6 border-t border-dashed border-slate-300" />
          
          <div className="flex items-end justify-between mb-8">
            <span className="text-lg font-bold text-slate-900">Total Amount</span>
            <span className={`text-4xl font-extrabold tracking-tight transition-all duration-500 ${highlightTotal ? 'text-teal-500 scale-110' : 'text-emerald-600'}`}>
              ${totalPrice}
            </span>
          </div>

          <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest opacity-80">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            Secure AES-256 Booking
          </p>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!currentEvent || !ready || soldOut || submitting}
            className="group relative flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-4 text-lg font-extrabold text-white shadow-lg shadow-emerald-200 transition-all duration-300 hover:scale-[1.03] hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-400/50 disabled:cursor-not-allowed disabled:from-slate-300 disabled:to-slate-400 disabled:text-slate-500 disabled:shadow-none disabled:hover:scale-100"
          >
            {!currentEvent ? 'Choose an event' : submitting ? 'Confirming...' : soldOut ? 'Tickets Unavailable' : 'Complete Reservation'}
            {currentEvent && !submitting && !soldOut && (
              <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Booking
