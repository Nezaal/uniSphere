import { useEffect, useState } from 'react';
import api from '../lib/api';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = "123"; 

  useEffect(() => {
    api(`/registrations/user/${userId}`)
      .then(data => {
        setRegisteredEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching registered events:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading)
    return <p className="p-6 text-gray-500 text-lg">Loading your dashboard...</p>;
    
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Dashboard</h1>

      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold">Registered Events ({registeredEvents.length})</h2>
        <Link 
            to="/addEvent" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
        >
            Add New Event
        </Link>
      </div>

      {registeredEvents.length > 0 ? (
        <div className="space-y-4">
          {registeredEvents.map(event => (

<EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center p-10 border rounded-lg bg-white shadow-sm">
          <p className="text-lg text-gray-500">You are not registered for any events yet.</p>
          <Link to="/events" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
            Browse all events to register!
          </Link>
        </div>
      )}
    </div>
  );
}