// import "./Header.css";
// import "../../../styles/TypographyStyles.css";
// import logo from "../../../assets/images/drone-delights-logo.png";
// import { Link } from "react-router-dom";
// import { CartContext } from "../../../context/CartContext";
// import { useContext } from "react";
// import { useAuth } from "../../../context/AuthContext";
// import { useState, useEffect } from "react";
// import ButtonLink from "../../UI/Button/ButtonLink";
// import UserMenuContainer from "../UserMenu/UserMenuContainer";
// import MobileUserMenu from "../MobileUserMenu/MobileUserMenu"; // Skapa denna ny

// function Header() {
//   const { cartQuantity } = useContext(CartContext);
//   const { token, user } = useAuth();

//   const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     function handleResize() {
//       setIsMobile(window.innerWidth < 900);
//       if (window.innerWidth >= 900) setMenuOpen(false); // Stäng meny på desktop
//     }
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <nav className="header-container" aria-label="Main Navigation">
//       <div className="full-logo-container">
//         <Link to="/" className="logo-link">
//           <img
//             src={logo}
//             alt="Drone Delights Logo"
//             className="drone-delights-logo"
//           />
//           <h1 className="company-name-container">
//             <span className="company-name-blue">Drone</span>
//             <span className="company-name-red">Delights</span>
//           </h1>
//         </Link>
//       </div>
//       <div className="header-btns-container">
//         {/* {token ? (
//           <UserMenuContainer user={user} />
//         ) : (
//           <div>
//             <ButtonLink path={"/login"} style={"lite"} text={"Log in"} />
//             <ButtonLink path={"/register"} style={"full"} text={"Register"} />
//           </div>
//         )} */}

//         {isMobile ? (
//           <>
//             <button
//               aria-label="Open user menu"
//               onClick={() => setMenuOpen((prev) => !prev)}
//               className="user-icon-btn"
//             >
//               <i className="fa-solid fa-user"></i>
//             </button>
//             {menuOpen && (
//               <MobileUserMenu
//                 token={token}
//                 user={user}
//                 closeMenu={() => setMenuOpen(false)}
//               />
//             )}
//           </>
//         ) : token ? (
//           <UserMenuContainer user={user} />
//         ) : (
//           <>
//             <ButtonLink path={"/login"} style={"lite"} text={"Log in"} />
//             <ButtonLink path={"/register"} style={"full"} text={"Register"} />
//           </>
//         )}
//         <Link to="/cart" className="basket-btn">
//           <div
//             className={`basket-counter-container ${
//               cartQuantity === 0 ? "hide" : ""
//             }`}
//           >
//             <span className="basket-counter">{cartQuantity}</span>
//           </div>
//           <i className="fa-solid fa-cart-shopping basket-icon"></i>
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Header;

import "./Header.css";
import "../../../styles/TypographyStyles.css";
import logo from "../../../assets/images/drone-delights-logo.png";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import ButtonLink from "../../UI/Button/ButtonLink";
import UserMenuContainer from "../UserMenu/UserMenuContainer";
import MobileUserMenu from "../MobileUserMenu/MobileUserMenu"; // Du har redan denna

function Header() {
  const { cartQuantity } = useContext(CartContext);
  const { token, user } = useAuth();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) setMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      <div className="container-test">
        {/* DESKTOP-VY */}
        {!isMobile && (
          <div className="header-btns-container">
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
