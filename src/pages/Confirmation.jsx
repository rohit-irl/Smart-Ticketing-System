import { Link } from 'react-router-dom'

function Confirmation() {
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
          Booking received (placeholder)
        </h1>
        <p className="mt-3 text-slate-600 leading-relaxed">
          This is a static confirmation layout. In production, this screen will
          show a reference number, summary, and next steps after a successful
          submission.
        </p>
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6 text-left text-sm text-slate-600">
          <p className="font-medium text-slate-900">Placeholder summary</p>
          <ul className="mt-3 space-y-2">
            <li>
              <span className="text-slate-500">Event:</span> Innovation Summit
              2026
            </li>
            <li>
              <span className="text-slate-500">Reference:</span> REF-PLACEHOLDER
            </li>
            <li>
              <span className="text-slate-500">Status:</span> Pending
              confirmation email
            </li>
          </ul>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Back to home
          </Link>
          <Link
            to="/booking"
            className="inline-flex rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Book another
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
