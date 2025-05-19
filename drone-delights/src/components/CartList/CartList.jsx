import "./CartList.css";
import CartItemCard from "../CartItemCard/CartItemCard";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

function CartList() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-list-container">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))
      ) : (
        <p className="empty-cart-message">Your cart is empty.</p>
      )}
    </div>
  );
}

export default CartList;
