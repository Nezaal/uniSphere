import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api(`/events/${id}`)
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleRegister = async () => {
    try {
      const res = await api(`/registrations`, {
        method: "POST",
        body: JSON.stringify({
          userId: "123", // temp until auth
          eventId: id,
        }),
      });

      setStatus(res.message || "Registered successfully!");
    } catch (err) {
      console.error(err);
      setStatus("Registration failed.");
    }
  };

  if (loading)
    return <p className="p-6 text-gray-500 text-lg">Loading event...</p>;

  if (!event)
    return (
      <p className="p-6 text-red-500 text-lg">
        Event not found or removed.
      </p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-md border">
        <h1 className="text-4xl font-bold text-gray-900">
          {event.title}
        </h1>

        <div className="mt-4 text-gray-600 flex gap-4 text-sm">
          <span>{event.date}</span>
          {event.venue && <span>• {event.venue}</span>}
        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">
          {event.description}
        </p>

        <button
          onClick={handleRegister}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
          Register
        </button>

        {status && (
          <p className="mt-4 text-green-600 font-semibold">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
