import { Link, useLocation } from 'react-router-dom'

function Confirmation() {
  const location = useLocation()
  const bookingData = location.state?.booking

  if (!bookingData) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 animate-fade-in-up">
        <div className="mx-auto max-w-lg rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl p-12 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-6">
            <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <p className="text-2xl font-bold text-slate-900">No booking found</p>
          <p className="mt-4 text-slate-600 text-lg">
            Complete a booking from the booking page to see your confirmation
            here.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:scale-[1.02] hover:from-emerald-600 hover:to-teal-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const { name, eventName, ticketCount, totalAmount, bookingId } = bookingData

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 animate-fade-in-up">
      <div className="mx-auto max-w-lg text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-xl shadow-emerald-200">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-25"></div>
          <svg
            className="h-12 w-12 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
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
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Booking confirmed
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 max-w-md mx-auto">
          Thank you! Your reservation is safely stored. A confirmation
          email can be added in a future iteration.
        </p>

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-8 sm:p-10 text-left shadow-2xl">
          <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
          
          <div className="flex justify-between items-end border-b-2 border-dashed border-slate-200 pb-6">
            <div>
              <p className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">Ticket Receipt</p>
              {bookingId && (
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Ref: <span className="font-mono text-slate-600">{String(bookingId)}</span>
                </p>
              )}
            </div>
            <svg className="h-10 w-10 text-slate-200" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 2h6v2H9V8zm0 4h6v2H9v-2z" /></svg>
          </div>
          
          <dl className="mt-6 space-y-4">
            <div className="flex justify-between gap-4">
              <dt className="text-base font-semibold text-slate-500">Name</dt>
              <dd className="text-base font-bold text-slate-900">{name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-base font-semibold text-slate-500">Event</dt>
              <dd className="text-base font-bold text-slate-900 text-right">{eventName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-base font-semibold text-slate-500">Tickets</dt>
              <dd className="text-base font-bold text-slate-900">{ticketCount}</dd>
            </div>
          </dl>
          
          <div className="mt-6 flex items-center justify-between rounded-2xl bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 p-6 pt-5 pb-5">
            <dt className="text-lg font-extrabold uppercase tracking-widest text-emerald-800">
              Total Paid
            </dt>
            <dd className="text-3xl font-black text-emerald-600">
              ${Number(totalAmount).toFixed(2)}
            </dd>
          </div>
          
          {/* subtle cutouts for receipt effect */}
          <div className="absolute -left-3 bottom-24 h-6 w-6 rounded-full bg-slate-50/50 shadow-inner"></div>
          <div className="absolute -right-3 bottom-24 h-6 w-6 rounded-full bg-slate-50/50 shadow-inner"></div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full justify-center rounded-xl bg-slate-800 px-8 py-4 text-base font-bold text-white shadow-lg shadow-slate-200 transition-all hover:scale-[1.02] hover:bg-slate-900 sm:w-auto"
          >
            Back to home
          </Link>
          <Link
            to="/booking"
            className="inline-flex w-full justify-center rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition-all hover:bg-white hover:border-slate-300 sm:w-auto"
          >
            Book another
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
