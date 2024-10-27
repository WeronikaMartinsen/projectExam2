import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import Home from "../src/pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SingleVenues from "./pages/SingleVenues";
import CreateVenue from "./pages/CreateVenue";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profiles/:name" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/venue/:id" element={<SingleVenues />} />
          <Route path="/venues" element={<CreateVenue />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
