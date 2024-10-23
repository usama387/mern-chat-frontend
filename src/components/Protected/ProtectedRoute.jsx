import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// This ProtectedRoute is to guard routes that require user authentication
const ProtectedRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} />;
  return children || <Outlet />
};

export default ProtectedRoute;
