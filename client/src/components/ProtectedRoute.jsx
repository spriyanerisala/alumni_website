import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // If no admin token, redirect to admin login
    return <Navigate to="/admin/login" replace />;
  }

  // If admin token exists, render the children component
  return children;
};

export default ProtectedRoute;
