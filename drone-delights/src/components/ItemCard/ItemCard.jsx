import "./ItemCard.css";
import { useState } from "react";

function ItemCard({ name, image, price, description }) {
  const [quantity, setQuantity] = useState(0);

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
              onClick={() => setQuantity(0)}
            >
              <i class="fa-solid fa-trash quantity-icon trash-icon"></i>
            </button>
            {/* MINUS BUTTON */}
            <button
              className={`minus-btn quantity-btn ${quantity < 2 ? "hide" : ""}`}
              onClick={() => setQuantity(quantity - 1)}
            >
              <i class="fa-solid fa-minus quantity-icon minus-icon"></i>
            </button>
          </div>
          <div className="quantity-container">
            <span className="quantity">{quantity}</span>
          </div>
          <div className="plus-btns-container">
            {/* PLUS BUTTON */}
            <button
              className="plus-btn quantity-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              <i class="fa-solid fa-plus quantity-icon plus-icon"></i>
            </button>
          </div>
        </div>
        {/* PLUS BUTTON ALONE */}
        <button
          className={`plus-btn-alone quantity-btn ${
            quantity > 0 ? "hide" : ""
          }`}
          onClick={() => setQuantity(quantity + 1)}
        >
          <i class="fa-solid fa-plus quantity-icon plus-icon"></i>
        </button>
      </div>
      {/* INFO */}
      <div className="item-info-full">
        <div className="item-top-info">
          {/* NAME */}
          <h3 className="item-name">{name}</h3>
          {/* FAVORITE BUTTON */}
          <button className="add-to-favourites-btn">
            <i class="fa-regular fa-heart fav-icon"></i>
          </button>
        </div>
        <div className="item-middle-bottom-container">
          <div className="item-middle-info">
            {/* PRICE */}
            <span className="price">${price}</span>
          </div>
          <div className="item-bottom-info">
            {/* DESCRIPTION */}
            <p className="item-description truncated-text">{description}</p>
            <button className="expand-icon-container">
              <i class="fa-solid fa-chevron-down expand-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
