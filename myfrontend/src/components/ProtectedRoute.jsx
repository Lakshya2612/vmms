import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "react-toastify";

export default function ProtectedRoute() {
  const { role, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (!loading && !isAuthenticated && location.pathname === "/apply/:jobId") {
    return <Navigate to="/login" />;
  }

  if (!loading && location.pathname === "/admin" && role !== "admin") {
    toast.error("Not Authorized");
    return <Navigate to="/" />;
  }

  if (
    !loading &&
    isAuthenticated &&
    (location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/forgetpassword" ||
      location.pathname === "/resetpassword")
  ) {
    return <Navigate to="/" />;
  }

  return <div>{!loading && <Outlet />}</div>;
}
