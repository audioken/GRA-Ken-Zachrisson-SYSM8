import "./CartPage.css";
import { useContext } from "react";
import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import CartItemsList from "../../components/Cart/CartItemsList/CartItemsList";
import CartTotal from "../../components/Cart/CartTotal/CartTotal";
import { CartContext } from "../../context/CartContext";

function CartPage() {
  const { cartItems, emptyCart } = useContext(CartContext);

  return (
    <div className="cart-page-container">
      <TitleHeader pageTitleBlue="Your" pageTitleRed="Cart!" />
      <div className="cart-page-body">
        <CartItemsList />
        <CartTotal />
      </div>
    </div>
  );
}

export default CartPage;
