import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaEnvelope, FaTasks } from "react-icons/fa";

export default function Admin() {
  return (
    <div className="bg-gray-100 p-10 sm:p-6">
      <div className="flex justify-between sm:flex-col">
        <h1 className="font-bold text-3xl sm:text-2xl">Admin Dashboard</h1>
        <div className="flex sm:flex-col">
          <Link
            to="/admin/allapplications"
            className="flex items-center text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-300"
          >
            <FaTasks className="mx-3" />
            <span>All Applications</span>
          </Link>
          <Link
            to="/admin/allqueries"
            className="flex items-center text-gray-700 hover:text-blue-600 font-medium text-lg transition-colors duration-300"
          >
            <FaEnvelope className="mx-3" />
            <span>All Queries</span>
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-xl">
        <Outlet />
      </div>
    </div>
  );
}
