import "./Header.css";
import logo from "../../assets/images/drone-delights-logo.png";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";
import ButtonLink from "../ButtonLink/ButtonLink";

function Header() {
  const { cartQuantity } = useContext(CartContext);

  return (
    <nav className="header-container" aria-label="Main Navigation">
      <div className="full-logo-container">
        <Link to="/" className="logo-link">
          <img
            src={logo}
            alt="Drone Delights Logo"
            className="drone-delights-logo"
          />
          <h1 className="header-title">
            <span className="drone">Drone</span>
            <span className="delights">Delights</span>
          </h1>
        </Link>
      </div>
      <div className="header-btns-container">
        <ButtonLink path={"/login"} style={"lite"} text={"Log in"} />
        <ButtonLink path={"/register"} style={"full"} text={"Register"} />
        <Link to="/cart" className="basket-btn">
          <div
            className={`basket-counter-container ${
              cartQuantity === 0 ? "hide" : ""
            }`}
          >
            <span className="basket-counter">{cartQuantity}</span>
          </div>
          <i class="fa-solid fa-cart-shopping basket-icon"></i>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
