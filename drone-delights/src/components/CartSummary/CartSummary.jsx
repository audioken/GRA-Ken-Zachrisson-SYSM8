import "./CartSummary.css";
import { Link } from "react-router-dom";

function CartSummmary() {
  return (
    <div className="cart-summary-container">
      <div className="cart-summary-total-container">
        <h2 className="cart-summary-total-title">
          <span className="cart-summary-total-text">Total</span>
          <span className="cart-summary-inc-text">(inc. VAT and fees)</span>
        </h2>
        <p className="cart-summary-price">${86.98}</p>
      </div>
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
