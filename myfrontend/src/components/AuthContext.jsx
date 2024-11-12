import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../AxiosInstance";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthentication = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/user/current-user");
      setRole(data.data.role);
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, role, setRole, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
