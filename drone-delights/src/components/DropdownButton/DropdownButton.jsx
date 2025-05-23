import "./DropdownButton.css";

function DropdownButton({user, onClick}) {
    return (
      <div className="dropdown-button-container" onClick={onClick}>
          <span className="user-icon">
            <i className="fa-solid fa-user"></i>
          </span>
          <div className="dropdown-text">
            <span className="hi-dropdown-text">Hi,</span>
            <span className="username-dropdown-text">{user?.username}!</span>
          </div>
          <span className="dropdown-icon">
            <i className="fa-solid fa-caret-down"></i>
          </span>
      </div>
    );
}

export default DropdownButton;