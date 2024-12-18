import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import Home from "../src/pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SingleVenues from "./pages/SingleVenues";
import CreateVenue from "./pages/CreateVenue";
import UpdateVenue from "./pages/UpdateVenue";
import Bookings from "./pages/Bookings";
import { ScrollRestorationProvider } from "./context/ScrollRestorationProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollRestorationProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profiles/:name" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/venue/:id" element={<SingleVenues />} />
            <Route path="/venues" element={<CreateVenue />} />
            <Route path="/venues/:venueId" element={<UpdateVenue />} />
            <Route path="/profiles/:name/bookings" element={<Bookings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ScrollRestorationProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
