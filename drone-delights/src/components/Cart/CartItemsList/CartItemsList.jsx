import "./CartItemsList.css";
import { CartContext } from "../../../context/CartContext";
import { useContext } from "react";
import CartItemCard from "../CartItemCard/CartItemCard";
import EmptyCart from "../EmptyCart/EmptyCart";
import Button from "../../UI/Button/Button";

function CartItemsList() {
  const { cartItems, emptyCart } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="cart-items-list-container">
      <Button text="Empty Cart" style="clear-all" onClick={() => emptyCart()} />
      <div className="cart-list-container">
        {cartItems.map((item) => (
          <CartItemCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default CartItemsList;
