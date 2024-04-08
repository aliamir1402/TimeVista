import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.js";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/login.js";
import Signup from "./components/signUp.js";
import Analytics from "./components/Analytics.js";
import ExMAP from "../src/components/ExtremeEventsContent.js";
import NotFound from "./components/NotFound.js"; // Import your 404 page component
import DatasetPage from "./components/datasets.js";
import AboutUs from "./components/aboutus.js";
import Contact from "./components/contact.js";
import Carbontracker from "./components/carbontracker.js";

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
          <Route path="/extreme-events-map" element={<ExMAP />} />
          <Route path="/datasets" element={<DatasetPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/carbon-tracker" element={<Carbontracker />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
