import "./CartItemsList.css";
import { CartContext } from "../../../context/CartContext";
import { useContext } from "react";
import CartItemCard from "../CartItemCard/CartItemCard";
import EmptyCart from "../EmptyCart/EmptyCart";

function CartItemsList() {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="cart-list-container">
      {cartItems.map((item) => (
        <CartItemCard key={item._id} {...item} />
      ))}
    </div>
  );
}

export default CartItemsList;
