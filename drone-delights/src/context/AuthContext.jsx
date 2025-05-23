// Createcontext skapar en ny context för att hantera autentisering
import { createContext, useContext, useState } from "react";

// Skapar AuthContect för att hantera autentisering
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Skapar en stateful variabel för att lagra token
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });


  // Funktion för att logga in
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken); // Lagrar token i localStorage
    localStorage.setItem("user", JSON.stringify(userData)); // Lagrar användarinformation i localStorage
    setUser(userData); // Lagrar användarinformation i state
    setToken(newToken); // Uppdaterar state med den nya token
  };

  // Funktion för att logga ut
  const logout = () => {
    localStorage.removeItem("token"); // Tar bort token från localStorage
    localStorage.removeItem("user"); // Tar bort användarinformation från localStorage
    setToken(null); // Återställer state till null
    setUser(null); // Återställer användarinformation i state
  };

  return (
    // AuthContext.Provider tillhandahåller token och funktioner för login/logout till barnkomponenter
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children} {/* Renderar barnkomponenter */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext); // Hämtar kontext från aktuella värden
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider"); // Felmeddelande om useAuth används utanför AuthProvider
  }
  return context; // Returnerar kontexten
};
