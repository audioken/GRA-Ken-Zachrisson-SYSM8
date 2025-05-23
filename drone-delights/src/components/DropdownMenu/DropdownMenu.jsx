import "./DropdownMenu.css";
import { Link } from "react-router-dom";

function DropdownMenu({ onLogout }) {
  return (
    <div className="dropdown-menu-container">
      <Link to="/user-profile" className="dropdown-menu-btn">
        <i className="fa-solid fa-cog dropdown-menu-btn-icon"></i>{" "}
        <span className="dropdown-menu-btn-text">User Settings</span>
      </Link>
      <button className="dropdown-menu-btn" onClick={onLogout}>
        <i className="fa-solid fa-right-from-bracket dropdown-menu-btn-icon"></i>{" "}
        <span className="dropdown-menu-btn-text">Logout</span>
      </button>
    </div>
  );
}

export default DropdownMenu;
