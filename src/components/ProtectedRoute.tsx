import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loader from "./Loader";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: string[]; // e.g., ['admin', 'user']
};

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isInitialized } = useAuth();

  // Wait until initialization completes
  if (!isInitialized) {
    return <Loader/>
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && requiredRole.length > 0 && !requiredRole.includes(user?.role as string)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};
