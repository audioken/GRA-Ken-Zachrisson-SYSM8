import "./Navbar.css";
import logo from "../../assets/images/drone-delights-logo.png";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="full-logo-container">
        <img src={logo} alt="Logo" className="drone-delights-logo" />
        <h1 className="navbar-title">
          <span className="drone">Drone</span>
          <span className="delights">Delights</span>
        </h1>
      </div>
      <div className="navbar-btns-container">
        <button className="login-btn navbar-btn">Log in</button>
        <button className="register-btn navbar-btn">Register</button>
        <button className="basket-btn">
          <div className="basket-counter-container">
            <span className="basket-counter">0</span>
          </div>
          <i class="fa-solid fa-cart-shopping basket-icon"></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
