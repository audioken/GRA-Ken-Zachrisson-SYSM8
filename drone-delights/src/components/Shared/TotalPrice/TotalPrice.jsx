import "./TotalPrice.css";
import "../../../styles/TypographyStyles.css";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

function TotalPrice() {
  const { totalPrice } = useContext(CartContext);

  return (
    <div className="total-price-container">
      <div className="total-price-wrapper">
        <h2 className="total-price-title">Total</h2>
        <p className="total-price-inc-text">(inc. VAT and fees)</p>
      </div>
      <div className="total-price">${totalPrice}</div>
    </div>
  );
}

export default TotalPrice;
