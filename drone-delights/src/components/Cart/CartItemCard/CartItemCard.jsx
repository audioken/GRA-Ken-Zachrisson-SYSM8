import "./CartItemCard.css";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

function CartItemCard({ _id, name, image, price, description }) {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const cartItem = cartItems.find((item) => item._id === _id);
  const quantity = cartItem ? cartItem.quantity : 1;

  return (
    <div className="cart-item-card-container">
      <div className="cart-item-img-container">
        {/* IMAGE */}
        <img src={image} alt={name} className="cart-item-img" />
      </div>
      {/* INFO */}
      <div className="cart-item-info-container">
        <div className="cart-item-left-info">
          {/* NAME */}
          <h3 className="cart-item-name">{name}</h3>
          {/* PRICE */}
          <span className="cart-item-price">${price}</span>
        </div>

        <div className="cart-item-middle-info">
          {/* DESCRIPTION */}
          <p className="cart-item-description">{description}</p>
        </div>

        <div className="cart-item-right-info">
          {/* QUANTITY */}
          <div
            className={`cart-item-full-quantity-container ${
              quantity < 1 ? "hide" : ""
            }`}
          >
            <div className="cart-item-trash-minus-container">
              {/* TRASH BUTTON */}
              <button
                className={`cart-item-trash-btn cart-item-quantity-btn ${
                  quantity > 1 ? "hide" : ""
                }`}
                onClick={() => removeFromCart(_id)}
              >
                <i className="fa-solid fa-trash cart-item-quantity-icon cart-item-trash-icon"></i>
              </button>
              {/* MINUS BUTTON */}
              <button
                className={`cart-item-minus-btn cart-item-quantity-btn ${
                  quantity < 2 ? "hide" : ""
                }`}
                onClick={() => updateQuantity(_id, quantity - 1)}
              >
                <i className="fa-solid fa-minus cart-item-quantity-icon cart-item-minus-icon"></i>
              </button>
            </div>
            <div className="cart-item-quantity-container">
              <span className="cart-item-quantity">{quantity}</span>
            </div>
            <div className="cart-item-plus-btns-container">
              {/* PLUS BUTTON */}
              <button
                className="cart-item-plus-btn quantity-btn"
                onClick={() => updateQuantity(_id, quantity + 1)}
              >
                <i className="fa-solid fa-plus cart-item-quantity-icon cart-item-plus-icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
