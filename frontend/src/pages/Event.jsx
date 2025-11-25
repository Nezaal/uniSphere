import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import EventCard from "../components/EventCard"; // This is imported, but currently unused
import api from "../lib/api";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api('/events')
      .then(setEvents)
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">All University Events</h1>

      <div className="mt-6 space-y-4"> {/* Increased top margin and spacing */}
        {events.map(e => (
          // BEFORE:
          // <Link
          //   key={e._id}
          //   to={`/events/${e._id}`}
          //   className="block p-4 border rounded hover:bg-gray-50"
          // >
          //   {e.title}
          // </Link>
          
          // AFTER: Use EventCard component
          <EventCard key={e._id} event={e} />
        ))}
      </div>
    </div>
  );
}