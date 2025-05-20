import "./CartPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import CartList from "../../components/CartList/CartList";
import CartSummary from "../../components/CartSummary/CartSummary";

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
