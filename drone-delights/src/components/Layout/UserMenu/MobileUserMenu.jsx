import "./UserMenuStyles.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import UserMenu from "./UserMenu";

function MobileUserMenu() {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mobile-user-menu-container mobile-only" ref={menuRef}>
      <button
        className="user-menu-button-container hl"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="user-icon">
          <i className="fa-solid fa-user"></i>
        </span>
        <span className="dropdown-icon">
          <i className="fa-solid fa-caret-down"></i>
        </span>
      </button>

      {open &&
        (token ? (
          <UserMenu closeMenu={() => setOpen(false)} />
        ) : (
          <div className="user-menu-container">
            <Link
              to="/login"
              className="user-menu-btn hl"
              onClick={() => setOpen(false)}
            >
              <i className="fa-solid fa-right-to-bracket user-menu-btn-icon"></i>
              <span className="user-menu-btn-text">Log In</span>
            </Link>
            <Link
              to="/register"
              className="user-menu-btn hl"
              onClick={() => setOpen(false)}
            >
              <i className="fa-solid fa-user-plus user-menu-btn-icon"></i>
              <span className="user-menu-btn-text">Register</span>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default MobileUserMenu;
