import { Link } from "react-router-dom";

function EventCard({
  title = "Event title",
  date = "Date TBD",
  venue = "Venue TBD",
  description = "Short description will appear here.",
  price = "Free",
  tickets = 100,
  linkTo = "/event",
  linkLabel = "View details",
}) {
  return (
    <article className="group flex flex-col rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 p-6 shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.03]">
      
      {/* Date Badge */}
      <div className="mb-3 inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
        📅 {date}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-800 group-hover:text-emerald-600 transition">
        {title}
      </h3>

      {/* Venue */}
      <p className="mt-1 text-sm text-gray-500">📍 {venue}</p>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
        {description}
      </p>

      {/* Extra Info */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-emerald-600">
          💰 ₹{price}
        </span>

        <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
          {tickets} left
        </span>
      </div>

      {/* Button */}
      <Link
        to={linkTo}
        className="mt-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg"
      >
        {linkLabel}
      </Link>
    </article>
  );
}

export default EventCard;