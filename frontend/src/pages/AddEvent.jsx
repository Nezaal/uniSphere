import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    club: '',
    category: '',
    date: '',
    time: '',
    venue: '',
    description: '',
  });
  const [status, setStatus] = useState(null); // To show success/error messages

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    
    try {
      // API call uses the proxy set up in vite.config.js to hit the backend /events route
      await api('/events', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      setStatus("Event created successfully!");
      // Redirect to the events list after a short delay
      setTimeout(() => navigate('/events'), 1500); 

    } catch (err) {
      console.error(err);
      setStatus("Failed to create event. Please check the details.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Event</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title and Club */}
        <div className="flex gap-4">
          <Input 
            label="Event Title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="Organizing Club" 
            name="club" 
            value={formData.club} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Category and Venue */}
        <div className="flex gap-4">
          <Input 
            label="Category (e.g., Tech, Sports)" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="Venue" 
            name="venue" 
            value={formData.venue} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Date and Time */}
        <div className="flex gap-4">
          <Input 
            label="Date (e.g., Nov 25, 2025)" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="Time (e.g., 7:00 PM)" 
            name="time" 
            value={formData.time} 
            onChange={handleChange} 
          />
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Status Message */}
        {status && (
          <p className={`font-medium ${status.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
            {status}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "Submitting..."}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {status === "Submitting..." ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}

// Simple reusable Input Component for cleaner form code
const Input = ({ label, name, value, onChange, required = false, type = 'text' }) => (
  <div className="w-1/2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);