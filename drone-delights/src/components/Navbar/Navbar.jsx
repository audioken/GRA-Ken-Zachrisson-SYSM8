import "./Navbar.css";
import logo from "../../assets/images/drone-delights-logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar-container" aria-label="Main Navigation">
      <div className="full-logo-container">
        <Link to="/" className="logo-link">
          <img
            src={logo}
            alt="Drone Delights Logo"
            className="drone-delights-logo"
          />
          <h1 className="navbar-title">
            <span className="drone">Drone</span>
            <span className="delights">Delights</span>
          </h1>
        </Link>
      </div>
      <div className="navbar-btns-container">
        <Link to="/login" className="login-btn navbar-btn">
          Log in
        </Link>
        <Link to="/register" className="register-btn navbar-btn">
          Register
        </Link>
        <Link to="/basket" className="basket-btn">
          <div className="basket-counter-container">
            <span className="basket-counter">0</span>
          </div>
          <i class="fa-solid fa-cart-shopping basket-icon"></i>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
