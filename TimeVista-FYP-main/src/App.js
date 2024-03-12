import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.js";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/login.js";
import Signup from "./components/signUp.js";
import Analytics from "./components/Analytics.js";
import GISMAP from "../src/components/Map.js";
import NotFound from "./components/NotFound.js"; // Import your 404 page component

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/extreme-events-map" element={<GISMAP />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
