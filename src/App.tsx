import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SingleVenues from "./pages/SingleVenues";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/:id" element={<SingleVenues />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
