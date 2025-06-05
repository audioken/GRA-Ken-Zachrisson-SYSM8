import "./Header.css";
import "../../../styles/TypographyStyles.css";
import logo from "../../../assets/images/drone-delights-logo.png";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import useIsMobile from "../../../hooks/useIsMobile";
import ButtonLink from "../../UI/Button/ButtonLink";
import UserMenuContainer from "../UserMenu/UserMenuContainer";
import MobileUserMenu from "../UserMenu/MobileUserMenu";

function Header() {
  const { cartQuantity } = useContext(CartContext);
  const { token, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = useIsMobile(900);

  return (
    <header className="header-container">
      <nav className="header-nav" aria-label="Main Navigation">
        {/* LOGO + COMPANY NAME */}
        <div className="full-logo-container">
          <Link to="/" className="logo-link">
            <img
              src={logo}
              alt="Drone Delights Logo"
              className="drone-delights-logo"
            />
            <h1 className="company-name-container">
              <span className="company-name-blue">Drone</span>
              <span className="company-name-red">Delights</span>
            </h1>
          </Link>
        </div>

        <div className="all-header-btns-container">
          {/* DESKTOP-VY */}
          {!isMobile && (
            <div className="all-header-btns-container">
              {token ? (
                <UserMenuContainer user={user} />
              ) : (
                <>
                  <ButtonLink path={"/login"} style={"lite"} text={"Log in"} />
                  <ButtonLink
                    path={"/register"}
                    style={"full"}
                    text={"Register"}
                  />
                </>
              )}
            </div>
          )}

          {/* MOBIL-VY */}
          {isMobile && (
            <div className="mobile-menu-wrapper">
              <MobileUserMenu
                token={token}
                user={user}
                closeMenu={() => setMenuOpen(false)}
              />
            </div>
          )}

          {/* KUNDVAGN IKONEN – visa alltid */}
          <Link to="/cart" className="basket-btn hl">
            <div
              className={`basket-counter-container ${
                cartQuantity === 0 ? "hide" : ""
              }`}
            >
              <span className="basket-counter">{cartQuantity}</span>
            </div>
            <i className="fa-solid fa-cart-shopping basket-icon"></i>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
