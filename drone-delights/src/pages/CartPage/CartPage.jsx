import "./CartPage.css";
import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import CartItemsList from "../../components/Cart/CartItemsList/CartItemsList";
import CartTotal from "../../components/Cart/CartTotal/CartTotal";

function CartPage() {
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
