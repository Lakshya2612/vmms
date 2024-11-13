import React, { useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
import "./Navbar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated, role, setRole } = useAuth();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const handlelogout = async () => {
    try {
      const response = await axios.post("/api/v1/user/logout");
      toast.success(response.data.message);
      setRole("");
      setIsAuthenticated(false);
      handleClick();
      navigate("/");
    } catch (error) {
      toast.error(error.data.message);
      handleClick();
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <span>
            <img src={logo} id="navlogo" />
          </span>
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item" onClick={handleClick}>
            <NavLink to="/" activeclassname="active" className="nav-links">
              Home
            </NavLink>
          </li>
          <li className="nav-item" onClick={handleClick}>
            <NavLink
              to="/aboutus"
              activeclassname="active"
              className="nav-links"
            >
              About Us
            </NavLink>
          </li>
          {role === "admin" && (
            <li className="nav-item" onClick={handleClick}>
              <NavLink
                to="/admin"
                activeclassname="active"
                className="nav-links"
              >
                Admin
              </NavLink>
            </li>
          )}
          <li className="nav-item" onClick={handleClick}>
            <NavLink
              to="/contactus"
              activeclassname="active"
              className="nav-links"
            >
              Contact Us
            </NavLink>
          </li>
          <li className="nav-item" onClick={handleClick}>
            <NavLink to="/Jobs" activeclassname="active" className="nav-links">
              Jobs
            </NavLink>
          </li>
          {!isAuthenticated ? (
            <li className="nav-item" onClick={handleClick}>
              <NavLink
                to="/login"
                activeclassname="active"
                className="nav-links"
              >
                Login
              </NavLink>
            </li>
          ) : (
            <li
              className="nav-item text-[white]"
              style={{ cursor: "pointer" }}
              onClick={handlelogout}
            >
              Logout
            </li>
          )}
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {click ? (
            <span className="icon">
              <HamburgetMenuClose />{" "}
            </span>
          ) : (
            <span className="icon">
              <HamburgetMenuOpen />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
