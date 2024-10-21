import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../src/pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SingleVenues from "./pages/SingleVenues";
import { AuthProvider } from "../src/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap the AuthProvider around BrowserRouter */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/venue/:id" element={<SingleVenues />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
