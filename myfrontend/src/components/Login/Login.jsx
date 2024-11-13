import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useAuth();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/v1/user/login", inputs);
      // console.log("Login successful:", response);
      setIsAuthenticated(true);
      setRole(response.data.data.user.role);
      toast.success(response.data.message || "Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Response data:", error.response.data.message);
        toast.error(error.response.data.message || "Login failed!");
      } else {
        toast.error(
          error.response.data.message || "An unexpected error occurred."
        );
      }
    }
  };

  return (
    <>
      <div
        className=" flex flex-col items-center bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6"
        style={{ minHeight: "calc(100vh - 13rem)" }}
      >
        <div className="w-full max-w-3xl mt-10 p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center items-center mb-6">
            <hr className="w-20 h-0.5 bg-blue-500 mr-2" />
            <span className="text-navy-700 font-semibold text-3xl sm:text-lg">
              Login
            </span>
            <hr className="w-20 h-0.5 bg-blue-500 ml-2" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={inputs.email}
                onChange={handleChange}
                className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={inputs.password}
                onChange={handleChange}
                className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
              >
                Login
              </button>
              <Link to="/signup" className="text-blue-500">
                Create Account
              </Link>
              <Link to="/forgetpassword" className="text-blue-500">
                Forget Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
