import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import About from "./components/Aboutus/Aboutus";
import Contact from "./components/Contact/Contact";
import "./App.css";
import Jobs from "./components/Jobs/Jobs";
import Fotter from "./components/Fotter/Fotter";
import Auth from "./components/auth/auth";
function App() {
  return (
    <>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
        </Routes>
      </div>
      <Fotter />
    </>
  );
}

export default App;
