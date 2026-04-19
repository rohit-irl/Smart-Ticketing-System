import { Link } from 'react-router-dom'

function EventDetails() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <p className="text-sm font-medium text-indigo-600">
          Event reference: EVT-2026-001
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Department Innovation Summit 2026
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Full event information will load from your backend or CMS later. Below
          is static placeholder content for layout and typography.
        </p>

        <dl className="mt-10 grid gap-6 border-t border-slate-100 pt-10 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-slate-500">Date & time</dt>
            <dd className="mt-1 text-slate-900">June 15–16, 2026 · 9:00 AM – 6:00 PM</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Location</dt>
            <dd className="mt-1 text-slate-900">
              Main campus — Auditorium & breakout rooms (TBD)
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Organizer</dt>
            <dd className="mt-1 text-slate-900">Internal Department Events Office</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Capacity</dt>
            <dd className="mt-1 text-slate-900">Placeholder: 250 seats</dd>
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
          <Link
            to="/booking"
            className="inline-flex rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Book tickets
          </Link>
          <Link
            to="/"
            className="inline-flex rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
