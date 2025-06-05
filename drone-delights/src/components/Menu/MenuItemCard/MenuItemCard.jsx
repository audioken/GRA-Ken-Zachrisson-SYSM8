import "./MenuItemCard.css";
import "../../../styles/TypographyStyles.css";
import "../../../styles/ItemCardStyles.css";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MenuItemCard({ _id, name, image, price, description }) {
  const { cartItems, addToCart, updateQuantity, removeFromCart } =
    useContext(CartContext);

  const { token, user, login } = useAuth();
  const navigate = useNavigate();
  const cartItem = cartItems.find((item) => item._id === _id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const [isExpanded, setIsExpanded] = useState(false);

  // Kontrollera om produkten är favorit
  const isFavourite = user?.favourites?.includes(_id);

  // Hantera klick på hjärtat
  const handleFavouriteClick = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      if (isFavourite) {
        // Ta bort favorit
        const res = await axios.delete(
          `${process.env.REACT_APP_API_URL}/users/favorites/${_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        login(token, { ...user, favourites: res.data.favourites });
      } else {
        // Lägg till favorit
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/users/favorites/${_id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        login(token, { ...user, favourites: res.data.favourites });
      }
    } catch (err) {
      console.error("Kunde inte uppdatera favoriter", err);
    }
  };

  return (
    <article
      className="menu-item-card hl-item-card"
      aria-label={`Menu item: ${name}`}
    >
      <div className="img-container">
        {/* IMAGE */}
        <img src={image} alt={name} className="menu-item-img" />
      </div>
      {/* INFO */}
      <div
        className={`menu-item-info-full ${isExpanded ? "bounce-expand" : ""}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* QUANTITY */}
        <div
          className={`quantity-wrapper quantity-wrapper-menu ${
            quantity < 1 ? "hide" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {/* TRASH BUTTON */}
            <button
              className={`quantity-btn hl-quantity ${
                quantity > 1 ? "hide" : ""
              }`}
              onClick={() => removeFromCart(_id)}
            >
              <i className="fa-solid fa-trash quantity-icon quantity-trash-icon"></i>
            </button>
            {/* MINUS BUTTON */}
            <button
              className={`quantity-btn  hl-quantity ${
                quantity < 2 ? "hide" : ""
              }`}
              onClick={() => updateQuantity(_id, quantity - 1)}
            >
              <i className="fa-solid fa-minus quantity-icon quantity-minus-icon"></i>
            </button>
          </div>
          <div className="quantity-counter-container">
            <span className="quantity-counter">{quantity}</span>
          </div>
          {/* PLUS BUTTON */}
          <button
            className="quantity-btn hl-quantity"
            onClick={() => updateQuantity(_id, quantity + 1)}
          >
            <i className="fa-solid fa-plus quantity-icon quantity-plus-icon"></i>
          </button>
        </div>
        {/* PLUS BUTTON ALONE */}
        <button
          className={`quantity-plus-btn-alone hl ${quantity > 0 ? "hide" : ""}`}
          onClick={(e) => {
            addToCart({ _id, name, image, price, description }, 1);
            e.stopPropagation();
          }}
        >
          <i className="fa-solid fa-plus quantity-icon quantity-plus-icon"></i>
        </button>
        <div className="menu-item-top-info">
          {/* NAME */}
          <h3
            className={`menu-item-name menu-item-card-title ${
              !isExpanded ? "truncated-text" : ""
            }`}
          >
            {name}
          </h3>
          {/* FAVORITE BUTTON */}
          <button
            className="add-to-favourites-btn hl"
            onClick={(e) => {
              e.stopPropagation();
              handleFavouriteClick();
            }}
            aria-label={
              isFavourite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <i
              className={`fa-heart fav-icon ${
                isFavourite ? "fa-solid fav-selected" : "fa-regular"
              }`}
            ></i>
          </button>
        </div>
        <div className="menu-item-middle-bottom-container">
          <div className="menu-item-middle-info">
            {/* PRICE */}
            <span className="price">${price}</span>
          </div>
          <div className="menu-item-bottom-info">
            {/* DESCRIPTION */}
            <p
              className={`menu-item-description ${
                !isExpanded ? "truncated-text" : ""
              }`}
            >
              {description}
            </p>
            <button className="expand-icon-container">
              <i className="fa-solid fa-chevron-down expand-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MenuItemCard;
