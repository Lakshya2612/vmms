import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";
import { toast } from "react-toastify";
import { matchPath } from "react-router-dom";

export default function ProtectedRoute() {
  const { role, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const isApplyingForJob = matchPath("/apply/:jobId", location.pathname);

  if (!loading && !isAuthenticated && isApplyingForJob) {
    return <Navigate to="/login" />;
  }

  if (
    !loading &&
    (location.pathname === "/admin" ||
      location.pathname === "/admin/allapplication" ||
      location.pathname === "/admin/allqueries") &&
    role !== "admin"
  ) {
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

  return <>{!loading && <Outlet />}</>;
}
