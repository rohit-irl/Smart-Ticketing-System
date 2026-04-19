import { Link } from 'react-router-dom'

function Booking() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold text-slate-900">Book tickets</h1>
        <p className="mt-2 text-slate-600">
          Form fields below are UI-only. Validation and submission will be wired
          in a later iteration.
        </p>

        <form className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
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
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
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
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
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
              defaultValue=""
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="" disabled>
                Select department
              </option>
              <option value="engineering">Engineering</option>
              <option value="operations">Operations</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
              <option value="other">Other</option>
            </select>
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
              placeholder="1"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/confirmation"
              className="inline-flex justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Continue to confirmation (preview)
            </Link>
            <Link
              to="/event"
              className="text-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
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
