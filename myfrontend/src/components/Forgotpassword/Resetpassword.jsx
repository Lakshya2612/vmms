import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Resetpassword() {
  const [inputs, setInputs] = useState({
    Password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputs.Password !== inputs.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "/api/v1/user/resetpassword/:token",
        inputs
      );
      console.log(response.data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div
      className="flex flex-col items-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6"
      style={{ minHeight: "calc(100vh - 13rem)" }}
    >
      <div className="w-full max-w-3xl mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center items-center mb-6">
          <hr className="w-20 h-0.5 bg-blue-500 mr-2" />
          <span className="text-navy-700 font-semibold text-3xl sm:text-lg text-center">
            Reset password
          </span>
          <hr className="w-20 h-0.5 bg-blue-500 ml-2" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={inputs.Password}
              onChange={handleChange}
              className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={handleChange}
              className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
