import "./UserMenuStyles.css";
import "../../../styles/TypographyStyles.css";

function UserMenuLink({ user, onClick }) {
  return (
    <button className="user-menu-button-container hl" onClick={onClick}>
      <span className="user-icon">
        <i className="fa-solid fa-user"></i>
      </span>
      <div className="user-menu-text">
        <span className="user-menu-text-hi">Hi,</span>
        <span className="user-menu-text-username">{user?.username}!</span>
      </div>
      <span className="dropdown-icon">
        <i className="fa-solid fa-caret-down"></i>
      </span>
    </button>
  );
}

export default UserMenuLink;
