import React from "react";
import { FaUser, FaBriefcase, FaQuestionCircle, FaTools } from "react-icons/fa"; // Added FaTools icon for "Manage Job"
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div
      className="h-full shadow-lg"
      style={{
        backgroundColor: "#f9f9f9",
        padding: "1rem",
        borderRadius: "0.5rem",
        minHeight: "68.9vh",
      }}
    >
      <ul
        className="space-y-4 text-gray-800"
        style={{ listStyle: "none", padding: 0 }}
      >
        {/* MY PROFILE */}
        <li
          className="flex items-center px-4 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 cursor-pointer"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <Link to="/myprofile">
            <FaUser className="mr-3" /> {/* User Icon */}
            <span>MY PROFILE</span>
          </Link>
        </li>
        {/* APPLIED JOBS */}
        <li
          className="flex items-center px-4 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 cursor-pointer"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <FaBriefcase className="mr-3" /> {/* Briefcase Icon */}
          <span>APPLIED JOBS</span>
        </li>
        {/* ALL JOBS */}
        <li
          className="flex items-center px-4 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 cursor-pointer"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <FaBriefcase className="mr-3" /> {/* Briefcase Icon */}
          <span>ALL JOBS</span>
        </li>
        {/* MANAGE JOB */}
        <li
          className="flex items-center px-4 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 cursor-pointer"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          {" "}
          <Link to="/managejob">
            <FaTools className="mr-3" /> {/* Tools Icon */}
            <span>MANAGE JOB</span>
          </Link>
        </li>
        {/* MY QUERIES */}
        <li
          className="flex items-center px-4 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 cursor-pointer"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <FaQuestionCircle className="mr-3" /> {/* Question Icon */}
          <span>MY QUERIES</span>
        </li>
        {/* ALL QUERIES */}
        <li
          className="flex items-center px-4 py-3 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 cursor-pointer"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <FaQuestionCircle className="mr-3" /> {/* Question Icon */}
          <span>ALL QUERIES</span>
        </li>
      </ul>
    </div>
  );
}
