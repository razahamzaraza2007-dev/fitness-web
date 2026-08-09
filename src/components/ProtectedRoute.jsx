import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const auth = useAuth();

  // Safety fallback if hook returns undefined
  if (!auth) {
    console.error("useAuth must be used within an AuthProvider");
    return null;
  }

  const { currentUser, role, loading } = auth;

  // Wait for Firebase to check authentication state on page refresh
  if (loading) {
    return <div style={{ color: "#00e5ff", padding: "20px" }}>Loading CrossArena...</div>;
  }

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If required role doesn't match, redirect to dashboard
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // Support both wrapper components ({children}) and Layout Routes (<Outlet />)
  return children ? children : <Outlet />;
}