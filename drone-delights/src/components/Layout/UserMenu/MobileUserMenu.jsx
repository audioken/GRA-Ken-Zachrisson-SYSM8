// import "./UserMenuStyles.css";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { DeliveryContext } from "../../../context/DeliveryContext";
// import UserMenu from "./UserMenu";

// function MobileUserMenu() {
//   const { token, logout, user } = useAuth();
//   const { resetDeliveryInfo } = useContext(DeliveryContext);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   function handleLogout() {
//     logout();
//     resetDeliveryInfo();
//     navigate("/");
//     setOpen(false);
//   }

//   return (
//     <div className="mobile-user-menu-container mobile-only">
//       <div
//         className="user-menu-button-container"
//         onClick={() => setOpen(!open)}
//       >
//         <span className="user-icon">
//           <i className="fa-solid fa-user"></i>
//         </span>
//         <span className="dropdown-icon">
//           <i className="fa-solid fa-caret-down"></i>
//         </span>
//       </div>

//       {open &&
//         (token ? (
//           <UserMenu />
//         ) : (
//           <div className="user-menu-container">
//             <Link
//               to="/login"
//               className="user-menu-btn"
//               onClick={() => setOpen(false)}
//             >
//               <i className="fa-solid fa-right-to-bracket user-menu-btn-icon"></i>
//               <span className="user-menu-btn-text">Log In</span>
//             </Link>
//             <Link
//               to="/register"
//               className="user-menu-btn"
//               onClick={() => setOpen(false)}
//             >
//               <i className="fa-solid fa-user-plus user-menu-btn-icon"></i>
//               <span className="user-menu-btn-text">Register</span>
//             </Link>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default MobileUserMenu;

import "./UserMenuStyles.css";
import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { DeliveryContext } from "../../../context/DeliveryContext";
import UserMenu from "./UserMenu";

function MobileUserMenu() {
  const { token, logout, user } = useAuth();
  const { resetDeliveryInfo } = useContext(DeliveryContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  function handleLogout() {
    logout();
    resetDeliveryInfo();
    navigate("/");
    setOpen(false);
  }

  // 👇 Lägg till klick-utanför-logik
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
      <div
        className="user-menu-button-container"
        onClick={() => setOpen(!open)}
      >
        <span className="user-icon">
          <i className="fa-solid fa-user"></i>
        </span>
        <span className="dropdown-icon">
          <i className="fa-solid fa-caret-down"></i>
        </span>
      </div>

      {open &&
        (token ? (
          <UserMenu closeMenu={() => setOpen(false)} />
        ) : (
          <div className="user-menu-container">
            <Link
              to="/login"
              className="user-menu-btn"
              onClick={() => setOpen(false)}
            >
              <i className="fa-solid fa-right-to-bracket user-menu-btn-icon"></i>
              <span className="user-menu-btn-text">Log In</span>
            </Link>
            <Link
              to="/register"
              className="user-menu-btn"
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
