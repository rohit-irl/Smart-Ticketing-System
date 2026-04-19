import { Link } from 'react-router-dom'

/**
 * Placeholder card for listing events on the home page.
 * Props can be wired to real data later.
 */
function EventCard({
  title = 'Event title',
  date = 'Date TBD',
  venue = 'Venue TBD',
  description = 'Short description will appear here.',
  linkTo = '/event',
  linkLabel = 'View details',
}) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 inline-flex w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
        {date}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{venue}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
      <Link
        to={linkTo}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
      >
        {linkLabel}
      </Link>
    </article>
  )
}

export default EventCard
