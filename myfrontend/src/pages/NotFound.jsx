import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="flex items-center justify-center bg-gray-100"
      style={{ minHeight: "calc(100vh - 13rem)" }}
    >
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
