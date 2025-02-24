import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Aboutus from "./pages/Aboutus";
import Fotter from "./components/Fotter/Footer";
import Contactus from "./pages/Contactus";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Applyform from "./pages/Applyform";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import GetAllApplications from "./pages/GetAllApplications";
import GetAllQueries from "./pages/GetAllQueries";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <div className="pages" style={{ minHeight: "calc(100vh - 13rem)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/jobs" element={<Jobs />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/apply/:jobId" element={<Applyform />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgetpassword" element={<Forgotpassword />} />
            <Route path="/resetpassword/:token" element={<Resetpassword />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/allapplications" />}
            />
            <Route path="/admin" element={<Admin />}>
              <Route path="allapplications" element={<GetAllApplications />} />
              <Route path="allqueries" element={<GetAllQueries />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" style={{ marginTop: "5rem" }} />
      <Fotter />
    </>
  );
}

export default App;
