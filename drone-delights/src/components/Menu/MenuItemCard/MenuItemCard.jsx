import "./MenuItemCard.css";
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
      navigate("/register");
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
    <div className="item-card">
      <div className="img-container">
        {/* IMAGE */}
        <img src={image} alt={name} className="item-img" />
        {/* QUANTITY */}
        <div
          className={`full-quantity-container ${quantity < 1 ? "hide" : ""}`}
        >
          <div className="trash-minus-container">
            {/* TRASH BUTTON */}
            <button
              className={`trash-btn quantity-btn ${quantity > 1 ? "hide" : ""}`}
              onClick={() => removeFromCart(_id)}
            >
              <i className="fa-solid fa-trash quantity-icon trash-icon"></i>
            </button>
            {/* MINUS BUTTON */}
            <button
              className={`minus-btn quantity-btn ${quantity < 2 ? "hide" : ""}`}
              onClick={() => updateQuantity(_id, quantity - 1)}
            >
              <i className="fa-solid fa-minus quantity-icon minus-icon"></i>
            </button>
          </div>
          <div className="quantity-container">
            <span className="quantity">{quantity}</span>
          </div>
          <div className="plus-btns-container">
            {/* PLUS BUTTON */}
            <button
              className="plus-btn quantity-btn"
              onClick={() => updateQuantity(_id, quantity + 1)}
            >
              <i className="fa-solid fa-plus quantity-icon plus-icon"></i>
            </button>
          </div>
        </div>
        {/* PLUS BUTTON ALONE */}
        <button
          className={`plus-btn-alone quantity-btn ${
            quantity > 0 ? "hide" : ""
          }`}
          onClick={() => addToCart({ _id, name, image, price, description }, 1)}
        >
          <i className="fa-solid fa-plus quantity-icon plus-icon"></i>
        </button>
      </div>
      {/* INFO */}
      <div className={`item-info-full ${isExpanded ? "bounce-expand" : ""}`}>
        <div className="item-top-info">
          {/* NAME */}
          <h3 className={`item-name ${!isExpanded ? "truncated-text" : ""}`}>
            {name}
          </h3>
          {/* FAVORITE BUTTON */}
          <button
            className="add-to-favourites-btn"
            onClick={handleFavouriteClick}
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
        <div
          className="item-middle-bottom-container"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="item-middle-info">
            {/* PRICE */}
            <span className="price">${price}</span>
          </div>
          <div className="item-bottom-info">
            {/* DESCRIPTION */}
            <p
              className={`item-description ${
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
    </div>
  );
}

export default MenuItemCard;
