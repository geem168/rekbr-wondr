import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  const checkAuth = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setIsChecking(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now || !decoded.isAdmin) {
        localStorage.removeItem("accessToken");
        setUser(null);
        setIsChecking(false);
        return;
      }

      setUser({ ...decoded });
    } catch (err) {
      console.error("Token tidak valid:", err);
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setIsChecking(false);
    }
  };

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    checkAuth();
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isChecking,
        user,
        isAdmin: user?.isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
