import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SingleVenues from "./pages/SingleVenues";
import { AuthProvider } from "../src/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profiles/:name" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/venue/:id" element={<SingleVenues />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
