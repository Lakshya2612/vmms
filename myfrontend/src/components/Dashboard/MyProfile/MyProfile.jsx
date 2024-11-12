import React, { useState } from "react";

export default function MyProfile() {
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeSection, setActiveSection] = useState("name"); // Toggle between 'name' and 'password'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeSection === "name") {
      console.log("Name:", name);
      // Add logic to update name
    } else if (activeSection === "password") {
      if (newPassword !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      console.log("Old Password:", oldPassword);
      console.log("New Password:", newPassword);
      // Add logic to update password
    }
  };

  return (
    <div className="w-1/4 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* Tab Navigation */}
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 text-sm font-medium text-center rounded-md ${
            activeSection === "name"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveSection("name")}
        >
          Change Name
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium text-center rounded-md ${
            activeSection === "password"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveSection("password")}
        >
          Change Password
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeSection === "name" && (
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Change Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
        )}

        {activeSection === "password" && (
          <>
            <div className="mb-4">
              <label
                htmlFor="old-password"
                className="block text-sm font-medium text-gray-700"
              >
                Old Password
              </label>
              <input
                type="password"
                id="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your old password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {activeSection === "name" ? "Change Name" : "Change Password"}
        </button>
      </form>
    </div>
  );
}
