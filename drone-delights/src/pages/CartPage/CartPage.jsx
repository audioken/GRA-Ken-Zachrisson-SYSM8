import "./CartPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import CartList from "../../components/CartList/CartList";
import CartSummary from "../../components/CartSummary/CartSummary";

function CartPage() {
  return (
    <div className="cart-page-container">
      <PageHeader pageTitleBlue="Your" pageTitleRed="Cart!" />
      <CartList />
      <CartSummary />
    </div>
  );
}

export default CartPage;
