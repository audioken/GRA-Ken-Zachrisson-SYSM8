import "./CartEmpty.css";
import { Link } from "react-router-dom";

function CartEmpty() {
  return (
    <div className="cart-empty-container">
      <div className="cart-empty-text-container">
        <p className="cart-empty-line">
          <span className="no-food-in-cart">No food in cart</span>
        </p>
        <p className="cart-empty-line">
          <span className="no-food">No food</span>{" "}
          <span className="in">in</span> <span className="belly">belly</span>{" "}
          <span className="smiley">:(</span>{" "}
        </p>
      </div>
      <Link to="/menu" className="cart-empty-see-menu-btn">
        See Menu
      </Link>
    </div>
  );
}

export default CartEmpty;
