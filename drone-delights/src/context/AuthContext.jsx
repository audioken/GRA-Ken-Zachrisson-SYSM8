// Createcontext skapar en ny context för att hantera autentisering
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";

// Skapar AuthContect för att hantera autentisering
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Skapar en stateful variabel för att lagra token
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const logoutTimer = useRef(); // Referens för att hantera utloggningstimer

  // Funktion för att logga in
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken); // Lagrar token i localStorage
    localStorage.setItem("user", JSON.stringify(userData)); // Lagrar användarinformation i localStorage
    setUser(userData); // Lagrar användarinformation i state
    setToken(newToken); // Uppdaterar state med den nya token
  };

  // Funktion för att logga ut
  const logout = () => {
    console.log("Removed token: " + token);
    localStorage.removeItem("token"); // Tar bort token från localStorage
    localStorage.removeItem("user"); // Tar bort användarinformation från localStorage
    localStorage.removeItem("deliveryInfo"); // Tar bort leveransinformation från localStorage
    setToken(null); // Återställer state till null
    setUser(null); // Återställer användarinformation i statew
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

    const expiresAt = decoded.exp * 1000; // sekunder -> ms
    const timeout = expiresAt - Date.now();

    if (timeout <= 0) {
      logout();
    } else {
      logoutTimer.current = setTimeout(logout, timeout);
    }

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
    // eslint-disable-next-line
  }, [token]);

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
