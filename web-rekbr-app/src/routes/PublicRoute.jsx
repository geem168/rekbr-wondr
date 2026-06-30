import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { isLoggedIn, isChecking } = useAuth();

  if (isChecking) return null;

  if (isLoggedIn) {
    return <Navigate to='/users' replace />;
  }

  return children;
};

export default PublicRoute;
