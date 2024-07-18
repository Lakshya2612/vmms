import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState } from "react";
import "./NavBar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
export default function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <span>
            <img src={logo} id="navlogo" />
          </span>
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              to="/"
              activeclassname="active"
              className="nav-links"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/aboutus"
              activeclassname="active"
              className="nav-links"
              onClick={handleClick}
            >
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/contactus"
              activeclassname="active"
              className="nav-links"
              onClick={handleClick}
            >
              Contact Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/Jobs"
              activeclassname="active"
              className="nav-links"
              onClick={handleClick}
            >
              Jobs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/login"
              activeclassname="active"
              className="nav-links"
              onClick={handleClick}
            >
              Login
            </NavLink>
          </li>
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
