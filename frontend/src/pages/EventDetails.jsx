import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // NEW: Track registration status

  // Temporary hardcoded user ID, matching the Dashboard logic
  const tempUserId = "123";

  useEffect(() => {
    // Fetch event details
    api(`/events/${id}`)
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    //  Check if the user is already registered for this event
    // The Dashboard logic fetches all registered events, but we don't have a specific
    // endpoint to check single registration yet. For now, we rely on the
    // registration POST response to update the UI.

  }, [id]);

  const handleRegister = async () => {
    setStatus("Registering...");
    try {
      const res = await api(`/registrations`, {
        method: "POST",
        body: JSON.stringify({
          userId: tempUserId, 
          eventId: id,
        }),
      });

      if (res.message === "Already registered") {
        setStatus("You are already registered for this event.");
        setIsRegistered(true);
      } else {
        setStatus("Registered successfully!");
        setIsRegistered(true);
      }

    } catch (err) {
      console.error(err);
      setStatus("Registration failed. Please try again.");
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
    
  const isButtonDisabled = status === "Registering..." || isRegistered || status === "You are already registered for this event.";
  const buttonText = isRegistered || status === "You are already registered for this event." ? "Registered" : "Register";


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
          disabled={isButtonDisabled}
          className={`mt-8 px-6 py-3 rounded-lg hover:shadow-lg transition shadow-sm 
            ${isButtonDisabled 
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'}`
          }
        >
          {buttonText}
        </button>

        {status && (
          <p className={`mt-4 font-semibold 
              ${status.includes("successfully") || status.includes("Already registered") ? "text-green-600" : "text-red-600"}`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}