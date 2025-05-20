import "./CartSummary.css";

function CartSummmary() {
  return (
    <div className="cart-summary-container">
      <h2 className="cart-summary-title">
        <span className="cart-summary-total">Total</span>
        <span className="cart-summary-inc">(inc. VAT and fees)</span>
      </h2>
      <p className="cart-summary-price">${86.98}</p>
    </div>
  );
}

export default CartSummmary;
