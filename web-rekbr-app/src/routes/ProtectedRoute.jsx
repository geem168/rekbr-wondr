import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isChecking, isAdmin } = useAuth();

  if (isChecking) return null; // bisa diganti dengan loading spinner

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
