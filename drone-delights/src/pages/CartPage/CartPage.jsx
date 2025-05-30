import "./CartPage.css";
import PageHeader from "../../components/Layout/PageHeader/PageHeader";
import CartList from "../../components/Cart/CartList/CartList";
import CartSummary from "../../components/Cart/CartSummary/CartSummary";

function CartPage() {
  return (
    <div className="cart-page-container">
      <PageHeader pageTitleBlue="Your" pageTitleRed="Cart!" />
      <div className="cart-page-body">
        <CartList />
        <CartSummary />
      </div>
    </div>
  );
}

export default CartPage;
