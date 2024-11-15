import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axiosInstance from "../../AxiosInstance";
import { FaEnvelope, FaTasks } from "react-icons/fa";

export default function Admin() {
  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/user/current-user");
      console.log(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      className="flex bg-gray-100"
      style={{ minHeight: "calc(100vh - 13rem)" }}
    >
      <div className="w-64 bg-[navy] text-white p-6 shadow-lg rounded-tr-lg rounded-br-lg">
        <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
        <ul className="space-y-6">
          <li>
            <Link
              to="/admin/allapplications"
              className="flex items-center text-lg font-semibold text-gray-300 hover:text-white transition-colors duration-300"
            >
              <FaTasks className="mr-2" /> All Applications
            </Link>
          </li>
          <li>
            <Link
              to="/admin/allqueries"
              className="flex items-center text-lg font-semibold text-gray-300 hover:text-white transition-colors duration-300"
            >
              <FaEnvelope className="mr-2" /> All Queries
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-12 overflow-y-auto bg-white shadow-lg rounded-lg m-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome Back!</h1>
        <p className="text-lg text-gray-700 mb-4">
          Here you can manage all queries and applications.
        </p>
        <Outlet />
      </div>
    </div>
  );
}
