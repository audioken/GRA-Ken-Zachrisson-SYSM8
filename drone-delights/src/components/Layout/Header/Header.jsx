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

  // const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isMobile = useIsMobile(900);

  // useEffect(() => {
  //   function handleResize() {
  //     setIsMobile(window.innerWidth < 900);
  //     if (window.innerWidth >= 900) setMenuOpen(false);
  //   }
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <nav className="header-container" aria-label="Main Navigation">
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
          <div>
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
        <Link to="/cart" className="basket-btn">
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
  );
}

export default Header;
