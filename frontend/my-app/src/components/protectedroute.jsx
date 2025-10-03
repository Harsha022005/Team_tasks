import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("access_token")) {
        window.location.href = "/login";
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("access_token");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    localStorage.removeItem("access_token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;