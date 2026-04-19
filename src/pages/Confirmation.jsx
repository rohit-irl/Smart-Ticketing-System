import { Link, useLocation } from 'react-router-dom'

function Confirmation() {
  const location = useLocation()
  const bookingData = location.state?.booking

  if (!bookingData) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-md">
          <p className="text-lg font-medium text-slate-800">No booking found</p>
          <p className="mt-2 text-slate-600">
            Complete a booking from the booking page to see your confirmation
            here.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const { name, eventName, ticketCount, totalAmount, bookingId } = bookingData

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900 md:text-3xl">
          Booking confirmed
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Thank you — your reservation is saved in the database. A confirmation
          email can be added in a future iteration.
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-left shadow-md">
          <p className="font-semibold text-slate-900">Booking summary</p>
          {bookingId && (
            <p className="mt-1 text-xs text-slate-500">
              Reference: <span className="font-mono">{String(bookingId)}</span>
            </p>
          )}
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="text-slate-500">Name</dt>
              <dd className="font-medium text-slate-900">{name}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="text-slate-500">Event</dt>
              <dd className="font-medium text-slate-900">{eventName}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
              <dt className="text-slate-500">Tickets</dt>
              <dd className="font-medium text-slate-900">{ticketCount}</dd>
            </div>
            <div className="flex justify-between gap-4 pt-1">
              <dt className="text-base font-semibold text-slate-900">
                Total amount
              </dt>
              <dd className="text-base font-bold text-emerald-700">
                ${Number(totalAmount).toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Back to home
          </Link>
          <Link
            to="/booking"
            className="inline-flex rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Book another
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
