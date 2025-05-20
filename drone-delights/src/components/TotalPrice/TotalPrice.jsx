import "./TotalPrice.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function TotalPrice() {
  const { totalPrice } = useContext(CartContext);

  return (
    <div className="total-price-container">
      <h2 className="total-price-title">
        <span className="total-price-total-text">Total</span>
        <span className="total-price-inc-text">(inc. VAT and fees)</span>
      </h2>
      <p className="total-price">${totalPrice}</p>
    </div>
  );
}

export default TotalPrice;
