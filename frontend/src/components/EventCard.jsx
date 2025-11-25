import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event._id}`}
      className="block bg-white rounded-xl shadow hover:shadow-lg transition p-5 border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-900">
        {event.title}
      </h2>

      <p className="text-gray-600 mt-2 line-clamp-2">
        {event.description}
      </p>

      <div className="mt-4 text-sm text-gray-500 flex gap-3">
        <span>{event.date}</span>
        {event.venue && <span>• {event.venue}</span>}
      </div>
    </Link>
  );
}
