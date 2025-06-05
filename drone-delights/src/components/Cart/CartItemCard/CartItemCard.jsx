import "./CartItemCard.css";
import "../../../styles/TypographyStyles.css";
import "../../../styles/ItemCardStyles.css";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

function CartItemCard({ _id, name, image, price, description }) {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  // Hitta aktuell vara i kundvagnen baserat på dess ID
  const cartItem = cartItems.find((item) => item._id === _id);
  const quantity = cartItem ? cartItem.quantity : 1;

  return (
    <article className="cart-item-card-container">
      <div className="cart-item-img-container">
        {/* IMAGE */}
        <img src={image} alt={name} className="cart-item-img" />
      </div>
      {/* INFO */}
      <div className="cart-item-info-container">
        <div className="cart-item-left-info">
          {/* NAME */}
          <h3 className="cart-item-card-title">{name}</h3>
          {/* PRICE */}
          <span className="cart-item-card-price">${price}</span>
        </div>
        <div className="cart-item-middle-right-container">
          <div className="cart-item-middle-info">
            {/* DESCRIPTION */}
            <p className="cart-item-card-description">{description}</p>
          </div>

          <div className="cart-item-right-info">
            {/* QUANTITY */}
            <div className={`quantity-wrapper ${quantity < 1 ? "hide" : ""}`}>
              <div>
                {/* TRASH BUTTON */}
                <button
                  className={`quantity-btn ${quantity > 1 ? "hide" : ""}`}
                  onClick={() => removeFromCart(_id)}
                >
                  <i className="fa-solid fa-trash quantity-icon quantity-trash-icon"></i>
                </button>
                {/* MINUS BUTTON */}
                <button
                  className={`quantity-btn ${quantity < 2 ? "hide" : ""}`}
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
                className="cart-item-plus-btn quantity-btn"
                onClick={() => updateQuantity(_id, quantity + 1)}
              >
                <i className="fa-solid fa-plus quantity-icon quantity-plus-icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItemCard;
