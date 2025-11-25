import  "./styles/index.css"; // <-- ADDED
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout.jsx"; // <-- ADDED

import Home from "./pages/Home.jsx";
import Events from "./pages/Event.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import AddEvent from "./pages/AddEvent.jsx";   // <-- FIXED

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addEvent" element={<AddEvent />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
