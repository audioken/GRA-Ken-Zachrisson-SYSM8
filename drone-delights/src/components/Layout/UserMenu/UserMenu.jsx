import "./UserMenuStyles.css";
import "../../../styles/TypographyStyles.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useContext } from "react";
import { DeliveryContext } from "../../../context/DeliveryContext";

// function UserMenu() {
//   const { logout } = useAuth();
//   const { resetDeliveryInfo } = useContext(DeliveryContext);
//   const navigate = useNavigate();

//   function handleLogout() {
//     logout();
//     resetDeliveryInfo();
//     navigate("/");
//   }

//   return (
//     <div className="user-menu-container">
//       <Link to="/user" className="user-menu-btn">
//         <i className="fa-solid fa-cog user-menu-btn-icon"></i>{" "}
//         <span className="user-menu-btn-text">User Settings</span>
//       </Link>
//       <button className="user-menu-btn" onClick={handleLogout}>
//         <i className="fa-solid fa-right-from-bracket user-menu-btn-icon"></i>{" "}
//         <span className="user-menu-btn-text">Logout</span>
//       </button>
//     </div>
//   );
// }

// export default UserMenu;

function UserMenu({ closeMenu }) {
  const { logout } = useAuth();
  const { resetDeliveryInfo } = useContext(DeliveryContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    resetDeliveryInfo();
    closeMenu();
    navigate("/");
  }

  function handleNavigate() {
    closeMenu();
  }

  return (
    <div className="user-menu-container">
      <Link to="/user" className="user-menu-btn" onClick={handleNavigate}>
        <i className="fa-solid fa-cog user-menu-btn-icon"></i>
        <span className="user-menu-btn-text">User Settings</span>
      </Link>
      <button className="user-menu-btn" onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket user-menu-btn-icon"></i>
        <span className="user-menu-btn-text">Logout</span>
      </button>
    </div>
  );
}

export default UserMenu;