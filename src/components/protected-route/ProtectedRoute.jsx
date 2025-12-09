import { Navigate } from "react-router-dom";
import { isTokenValid } from "../../hooks/tokenUtils";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token || !isTokenValid(token)) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
  
  return children;
};