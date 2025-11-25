import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold">unoSphere</Link>

        <div className="space-x-6">
          <Link to="/events">Events</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
