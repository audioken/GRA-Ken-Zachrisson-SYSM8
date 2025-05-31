import "../UserMenu/UserMenuStyles.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DeliveryContext } from "../../../context/DeliveryContext";

function MobileUserMenu() {
  const { token, logout, user } = useAuth();
  const { resetDeliveryInfo } = useContext(DeliveryContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    resetDeliveryInfo();
    navigate("/");
    setOpen(false);
  }

  return (
    <div className="dropdown-container mobile-only">
      <div className="dropdown-button-container" onClick={() => setOpen(!open)}>
        <span className="user-icon">
          <i className="fa-solid fa-user"></i>
        </span>
        <span className="dropdown-icon">
          <i className="fa-solid fa-caret-down"></i>
        </span>
      </div>

      {open && (
        <div className="dropdown-menu-container">
          {token ? (
            <>
              <Link
                to="/user"
                className="dropdown-menu-btn"
                onClick={() => setOpen(false)}
              >
                <i className="fa-solid fa-cog dropdown-menu-btn-icon"></i>
                <span className="dropdown-menu-btn-text">User Settings</span>
              </Link>
              <button className="dropdown-menu-btn" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket dropdown-menu-btn-icon"></i>
                <span className="dropdown-menu-btn-text">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="dropdown-menu-btn"
                onClick={() => setOpen(false)}
              >
                <i className="fa-solid fa-right-to-bracket dropdown-menu-btn-icon"></i>
                <span className="dropdown-menu-btn-text">Log In</span>
              </Link>
              <Link
                to="/register"
                className="dropdown-menu-btn"
                onClick={() => setOpen(false)}
              >
                <i className="fa-solid fa-user-plus dropdown-menu-btn-icon"></i>
                <span className="dropdown-menu-btn-text">Register</span>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileUserMenu;
