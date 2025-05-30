import "./CartList.css";
import { CartContext } from "../../../context/CartContext";
import { useContext } from "react";
import CartItemCard from "../CartItemCard/CartItemCard";
import CartEmpty from "../CartEmpty/CartEmpty";

function CartList() {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="cart-list-container">
      {cartItems.map((item) => (
        <CartItemCard key={item._id} {...item} />
      ))}
    </div>
  );
}

export default CartList;
