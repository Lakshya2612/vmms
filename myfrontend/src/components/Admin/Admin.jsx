import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("queries");
  const [queries, setQueries] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/contact/getallqueries"
        );
        setQueries(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
        console.error("Error fetching queries:", error.response.data.message);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/v1/application/getallapplication"
        );
        setApplications(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching applications:",
          error.response.data.message
        );
      }
    };

    fetchQueries();
    fetchApplications();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Hi Admin
      </h1>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mx-2 rounded-lg text-white transition duration-300 
                      ${
                        activeTab === "queries"
                          ? "bg-blue-600"
                          : "bg-blue-400 hover:bg-blue-500"
                      }`}
          onClick={() => setActiveTab("queries")}
        >
          View Queries
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-lg text-white transition duration-300 
                      ${
                        activeTab === "applications"
                          ? "bg-blue-600"
                          : "bg-blue-400 hover:bg-blue-500"
                      }`}
          onClick={() => setActiveTab("applications")}
        >
          View Applications
        </button>
      </div>

      <section className="grid grid-cols-1 gap-4">
        {activeTab === "queries"
          ? queries.map((query) => (
              <div
                key={query._id}
                className="border rounded-lg p-4 shadow-md bg-gray-50"
              >
                <h3 className="font-semibold text-lg">{query.name}</h3>
                <p className="text-gray-600">Email: {query.email}</p>
                <p className="text-gray-600">Phone: {query.phone}</p>
                <p className="text-gray-800 mt-2">{query.message}</p>
              </div>
            ))
          : applications.map((app) => (
              <div
                key={app._id}
                className="border rounded-lg p-4 shadow-md bg-gray-50"
              >
                <h3 className="font-semibold text-lg">
                  {app.firstName} {app.lastName}
                </h3>
                <p className="text-gray-600">Email: {app.email}</p>
                <p className="text-gray-600">Phone: {app.phone}</p>
                <div className="mt-2">
                  <img
                    src={app.url}
                    alt={`${app.firstName}'s photo`}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <p className="text-gray-800 mt-2">
                  <a href={app.resume} className="text-blue-500 underline">
                    View Resume
                  </a>
                </p>
              </div>
            ))}
      </section>
    </div>
  );
}
