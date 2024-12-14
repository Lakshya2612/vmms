import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/send-otp`,
        {
          email: inputs.email,
        }
      );
      toast.success(response.data.message || "OTP sent successfully!");
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP!");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/signup`,
        inputs
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Sign up failed");
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
            Create Account
          </span>
          <hr className="w-20 h-0.5 bg-blue-500 ml-2" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={inputs.name}
              onChange={handleChange}
              className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={inputs.email}
              onChange={handleChange}
              className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={inputs.password}
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
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={inputs.otp}
              onChange={handleChange}
              className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={otpSent}
            />
            <div className="flex gap-4 ">
              <button
                type="button"
                onClick={handleSendOtp}
                className="px-2 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
              >
                Send OTP
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
              >
                Create Account
              </button>
            </div>
            <Link to="/login" className="text-blue-500">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
