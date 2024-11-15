import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Aboutus from "./components/Aboutus/Aboutus";
import Fotter from "./components/Fotter/Footer";
import Contactus from "./components/Contactus/Contactus";
import Jobs from "./components/Jobs/Jobs";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Forgotpassword from "./components/Forgotpassword/Forgotpassword";
import Resetpassword from "./components/Forgotpassword/Resetpassword";
import Applyform from "./components/Jobs/Applyform";
import Admin from "./components/Admin/Admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import GetAllApplications from "./components/Admin/GetAllApplications";
import GetAllQueries from "./components/Admin/GetAllQueries";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <div className="pages" style={{ minHeight: "calc(100vh - 13rem)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/apply/:jobId" element={<Applyform />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/forgetpassword" element={<Forgotpassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/resetpassword/:token" element={<Resetpassword />} />
          </Route>
          <Route element={<ProtectedRoute />}>
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
