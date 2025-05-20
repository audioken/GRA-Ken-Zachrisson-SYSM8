import "./CartSummary.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import TotalPrice from "../TotalPrice/TotalPrice";

function CartSummmary() {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="cart-summary-container">
      <TotalPrice />
      <div className="cart-summary-btn-container">
        <Link
          to="/menu"
          className="cart-summary-continue-shopping-btn cart-summary-btn"
        >
          &lt; Continue shopping
        </Link>
        <Link
          to="/checkout"
          className="cart-summary-checkout-btn cart-summary-btn"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartSummmary;
