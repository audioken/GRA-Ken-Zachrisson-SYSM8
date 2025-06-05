import { createContext, useContext, useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const logoutTimer = useRef();

  // Funktion för att uppdatera användarinformation
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Funktion för att logga in
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken); 
    localStorage.setItem("user", JSON.stringify(userData)); 
    setUser(userData); 
    setToken(newToken); 
  };

  // Funktion för att logga ut
  const logout = () => {
    console.log("Removed token: " + token);
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    localStorage.removeItem("deliveryInfo"); 
    setToken(null); 
    setUser(null); 
  };

  // Automatisk utloggning när token går ut
  useEffect(() => {
    if (!token) return;

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch {
      logout();
      return;
    }

    if (!decoded.exp) return;

    const expiresAt = decoded.exp * 1000; 
    const timeout = expiresAt - Date.now();

    if (timeout <= 0) {
      logout();
    } else {
      logoutTimer.current = setTimeout(logout, timeout);
    }

    return () => {
      if (logoutTimer.current) {
        clearTimeout(logoutTimer.current);
        logoutTimer.current = null;
      }
    };
    // eslint-disable-next-line
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateUser }}>
      {children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext); 
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context; 
};
